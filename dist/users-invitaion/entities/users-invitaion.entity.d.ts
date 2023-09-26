import mongoose, { Document } from 'mongoose';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
export declare type UserInvitationDocument = UserInvitation & Document;
export declare class UserInvitation {
    userId: User;
    userEmail: string;
    roleId: Role;
    tenantId: string;
    parentId: string;
    levelId: string;
    levelTemplateId: string;
    invitationToken: string;
    inviteAcceptStatus: number;
    status: string;
    type: string;
    createdAt: Date;
    deletedAt: Date;
    expiredAt: Date;
}
export declare const UserInvitationSchema: mongoose.Schema<UserInvitation, mongoose.Model<UserInvitation, any, any, any, any>, {}, {}, {}, {}, "type", UserInvitation>;
