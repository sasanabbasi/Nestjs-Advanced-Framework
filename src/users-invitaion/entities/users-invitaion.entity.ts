import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

export type UserInvitationDocument = UserInvitation & Document;

@Schema({ collection: 'invite_users' })
export class UserInvitation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  userEmail: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  })
  roleId: Role;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  tenantId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  parentId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  levelId: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    default: void 0,
  })
  levelTemplateId: string;

  @Prop({ required: true })
  invitationToken: string;

  @Prop({ required: true })
  inviteAcceptStatus: number; // 0=>pending, 1=>active, 2=>deactive

  @Prop({
    enum: ['active', 'inactive', 'deleted'],
    default: 'active',
    required: true,
  })
  status: string;

  @Prop({
    enum: ['invitationToken', 'registerationOTP', 'loginOTP'],
    default: 'invitationToken',
    required: true,
  })
  type: string;

  @Prop({ default: Date })
  createdAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  expiredAt: Date;
}

export const UserInvitationSchema =
  SchemaFactory.createForClass(UserInvitation);
mongoose.model(UserInvitation.name, UserInvitationSchema);
