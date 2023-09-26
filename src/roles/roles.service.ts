import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import BaseRepository from 'src/repositories/base/base-repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './entities/role.entity';

@Injectable()
export class RolesService extends BaseRepository<Role> {
  constructor(
    @InjectModel(Role.name) public RoleModel: Model<RoleDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {
    super(RoleModel);
  }

  async updatePermission(
    _id: string,
    updateRolePermissionDto: UpdateRolePermissionDto,
  ) {
    return this.RoleModel.updateOne(
      { _id },
      { $set: { ...updateRolePermissionDto } },
    );
  }
}
