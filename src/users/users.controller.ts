import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Inject,
  VERSION_NEUTRAL,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import {
  PermissionList,
  RequirePermissions,
} from 'src/decorators/permissions.decorator';
import { LoginRequiredInterceptor } from 'src/decorators/login.interceptor';
import { CurrentUser } from 'src/decorators/user.decorator';
import { LoggedInUser } from '../utils/entities/logged-in-user.entity';
import { UtilsService } from 'src/utils/utils.service';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { User } from './entities/user.entity';
import { UserVM } from './entities/user.vm';

@Controller({
  path: 'user',
  version: VERSION_NEUTRAL,
})
export class UsersController {
  @Inject(UtilsService)
  private readonly utilsService: UtilsService;

  constructor(
    private readonly usersService: UsersService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  @Post()
  @RequirePermissions([PermissionList.UsersCreate])
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Version(['1', '2'])
  @Get()
  @UseInterceptors(MapInterceptor(User, UserVM, { isArray: true }))
  @RequirePermissions([PermissionList.UsersView])
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(User, UserVM))
  @UseInterceptors(LoginRequiredInterceptor)
  async findOne(@Param('id') _id: string, @CurrentUser() user: LoggedInUser) {
    this.utilsService.checkFindOnePermission(
      _id,
      user,
      PermissionList.UsersView,
    );
    return this.usersService.findOne(_id);
  }

  @Patch(':id')
  @RequirePermissions([PermissionList.UsersUpdate])
  update(@Param('id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    // TODO: Check if user is the loggedInUser
    return this.usersService.update(_id, updateUserDto);
  }

  @Patch('role/:id')
  @RequirePermissions([PermissionList.UsersPermission])
  updateRoles(
    @Param('id') _id: string,
    @Body() updateUserRolesDto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateRole(_id, updateUserRolesDto);
  }

  @Delete(':id')
  @RequirePermissions([PermissionList.UsersDelete])
  remove(@Param('id') _id: string) {
    return this.usersService.remove(_id);
  }
}
