import mongoose, { Document } from 'mongoose';
export declare type TenantUserRoleDocument = TenantUserRole & Document;
export declare class TenantUserRole {
    userId: string;
    userRoleId: object[];
    status: string;
    createdAt: Date;
    deletedAt: Date;
}
export declare const TenantUserRoleSchema: mongoose.Schema<TenantUserRole, mongoose.Model<TenantUserRole, any, any, any, any>, {}, {}, {}, {}, "type", TenantUserRole>;
