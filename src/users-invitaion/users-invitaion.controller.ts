import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UsersInvitaionService } from './users-invitaion.service';
import { CreateUsersInvitaionDto } from './dto/create-users-invitaion.dto';
import { UpdateUsersInvitaionDto } from './dto/update-users-invitaion.dto';
import {
  PermissionList,
  RequirePermissions,
} from 'src/decorators/permissions.decorator';

@Controller({
  path: 'user-invitaion',
  version: VERSION_NEUTRAL,
})
export class UsersInvitaionController {
  constructor(private readonly usersInvitaionService: UsersInvitaionService) {}

  @Post()
  @RequirePermissions([PermissionList.UsersInvitationCreate])
  create(@Body() createUsersInvitaionDto: CreateUsersInvitaionDto) {
    return this.usersInvitaionService.create(createUsersInvitaionDto);
  }

  @Get()
  @RequirePermissions([PermissionList.UsersInvitationView])
  findAll() {
    return this.usersInvitaionService.findAll();
  }

  @Get(':id')
  @RequirePermissions([PermissionList.UsersInvitationView])
  findOne(@Param('id') _id: string) {
    return this.usersInvitaionService.findOne(_id);
  }

  @Patch(':id')
  @RequirePermissions([PermissionList.UsersInvitationUpdate])
  update(
    @Param('id') _id: string,
    @Body() updateUsersInvitaionDto: UpdateUsersInvitaionDto,
  ) {
    return this.usersInvitaionService.update(_id, updateUsersInvitaionDto);
  }

  @Delete(':id')
  @RequirePermissions([PermissionList.UsersInvitationDelete])
  remove(@Param('id') _id: string) {
    return this.usersInvitaionService.remove(_id);
  }
}
