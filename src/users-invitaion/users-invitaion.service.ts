import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import BaseRepository from 'src/repositories/base/base-repository';
import { CreateUsersInvitaionDto } from './dto/create-users-invitaion.dto';
import { UpdateUsersInvitaionDto } from './dto/update-users-invitaion.dto';
import {
  UserInvitation,
  UserInvitationDocument,
} from './entities/users-invitaion.entity';

@Injectable()
export class UsersInvitaionService extends BaseRepository<UserInvitation> {
  constructor(
    @InjectModel(UserInvitation.name)
    public UserInvitationModel: Model<UserInvitationDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {
    super(UserInvitationModel);
  }
}
