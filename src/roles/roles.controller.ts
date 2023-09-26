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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission';
import {
  PermissionList,
  RequirePermissions,
} from 'src/decorators/permissions.decorator';

@Controller({
  path: 'role',
  version: VERSION_NEUTRAL,
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @RequirePermissions([PermissionList.RolesCreate])
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @RequirePermissions([PermissionList.RolesView])
  findAll() {
    console.log('SASASANNNNNNN');
    return this.rolesService.findAll();
  }

  @Get(':id')
  @RequirePermissions([PermissionList.RolesView])
  findOne(@Param('id') _id: string) {
    return this.rolesService.findOne(_id);
  }

  @Patch(':id')
  @RequirePermissions([PermissionList.RolesUpdate])
  update(@Param('id') _id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(_id, updateRoleDto);
  }

  @Patch('permission/:id')
  @RequirePermissions([PermissionList.RolesUpdate])
  updateRoles(
    @Param('id') _id: string,
    @Body() updateRolePermissionDto: UpdateRolePermissionDto,
  ) {
    return this.rolesService.updatePermission(_id, updateRolePermissionDto);
  }

  @Delete(':id')
  @RequirePermissions([PermissionList.RolesDelete])
  remove(@Param('id') _id: string) {
    return this.rolesService.remove(_id);
  }
}
