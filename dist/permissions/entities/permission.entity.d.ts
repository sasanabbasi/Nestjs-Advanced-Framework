import mongoose, { Document } from 'mongoose';
export declare type PermissionDocument = Permission & Document;
export declare class Permission {
    name: string;
    description: string;
    displayName: string;
}
export declare const PermissionSchema: mongoose.Schema<Permission, mongoose.Model<Permission, any, any, any, any>, {}, {}, {}, {}, "type", Permission>;
