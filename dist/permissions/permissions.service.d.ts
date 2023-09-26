import mongoose, { Model } from 'mongoose';
import BaseRepository from 'src/repositories/base/base-repository';
import { Permission, PermissionDocument } from './entities/permission.entity';
export declare class PermissionsService extends BaseRepository<Permission> {
    PermissionModel: Model<PermissionDocument>;
    private readonly connection;
    constructor(PermissionModel: Model<PermissionDocument>, connection: mongoose.Connection);
}
