import mongoose, { Model } from 'mongoose';
import BaseRepository from 'src/repositories/base/base-repository';
import { UserInvitation, UserInvitationDocument } from './entities/users-invitaion.entity';
export declare class UsersInvitaionService extends BaseRepository<UserInvitation> {
    UserInvitationModel: Model<UserInvitationDocument>;
    private readonly connection;
    constructor(UserInvitationModel: Model<UserInvitationDocument>, connection: mongoose.Connection);
}
