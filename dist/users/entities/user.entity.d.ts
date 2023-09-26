import mongoose, { Document } from 'mongoose';
import { Role } from 'src/roles/entities/role.entity';
export declare type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    password: string;
    status: string;
    roles: Role[];
    loginAccess: string[];
    profilePic: string;
    phone: string;
    joinedDate: Date;
    createdAt: Date;
    deletedAt: Date;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
