import { Module } from '@nestjs/common';
import { UsersInvitaionService } from './users-invitaion.service';
import { UsersInvitaionController } from './users-invitaion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserInvitation,
  UserInvitationSchema,
} from './entities/users-invitaion.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserInvitation.name, schema: UserInvitationSchema },
    ]),
  ],
  controllers: [UsersInvitaionController],
  providers: [UsersInvitaionService],
  exports: [UsersInvitaionService],
})
export class UsersInvitaionModule {}
