import mongoose, { Model } from 'mongoose';
import BaseRepository from 'src/repositories/base/base-repository';
import { UpdateRolePermissionDto } from './dto/update-role-permission';
import { Role, RoleDocument } from './entities/role.entity';
export declare class RolesService extends BaseRepository<Role> {
    RoleModel: Model<RoleDocument>;
    private readonly connection;
    constructor(RoleModel: Model<RoleDocument>, connection: mongoose.Connection);
    updatePermission(_id: string, updateRolePermissionDto: UpdateRolePermissionDto): Promise<import("mongodb").UpdateResult>;
}
