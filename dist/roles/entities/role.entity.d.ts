import mongoose, { Document } from 'mongoose';
import { Permission } from 'src/permissions/entities/permission.entity';
export declare type RoleDocument = Role & Document;
export declare class Role {
    name: string;
    description: string;
    permissions: Permission[];
    status: string;
}
export declare const RoleSchema: mongoose.Schema<Role, mongoose.Model<Role, any, any, any, any>, {}, {}, {}, {}, "type", Role>;
