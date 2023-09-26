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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import {
  PermissionList,
  RequirePermissions,
} from 'src/decorators/permissions.decorator';

@Controller({
  path: 'permission',
  version: VERSION_NEUTRAL,
})
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @RequirePermissions([PermissionList.PermissionsCreate])
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @RequirePermissions([PermissionList.PermissionsView])
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @RequirePermissions([PermissionList.PermissionsView])
  findOne(@Param('id') _id: string) {
    return this.permissionsService.findOne(_id);
  }

  @Patch(':id')
  @RequirePermissions([PermissionList.PermissionsUpdate])
  update(
    @Param('id') _id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(_id, updatePermissionDto);
  }

  @Delete(':id')
  @RequirePermissions([PermissionList.PermissionsDelete])
  remove(@Param('id') _id: string) {
    return this.permissionsService.remove(_id);
  }
}
