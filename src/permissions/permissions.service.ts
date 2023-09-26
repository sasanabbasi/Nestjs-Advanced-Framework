import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import BaseRepository from 'src/repositories/base/base-repository';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './entities/permission.entity';

@Injectable()
export class PermissionsService extends BaseRepository<Permission> {
  constructor(
    @InjectModel(Permission.name)
    public PermissionModel: Model<PermissionDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {
    super(PermissionModel);
  }
}
