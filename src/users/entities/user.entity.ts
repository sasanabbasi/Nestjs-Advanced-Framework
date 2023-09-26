import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from 'src/roles/entities/role.entity';
import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

@Schema()
export class User {
  @AutoMap()
  @Prop({ required: true })
  name: string;

  @AutoMap()
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @AutoMap()
  @Prop({
    enum: ['active', 'inactive', 'deleted', 'notverified'],
    default: 'active',
    required: true,
  })
  status: string;

  @AutoMap(() => [Role])
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
    default: [],
  })
  roles: Role[];

  @AutoMap(() => [String])
  @Prop({ default: [] })
  loginAccess: string[];

  @AutoMap()
  @Prop({ default: null })
  profilePic: string;

  @AutoMap()
  @Prop({ default: null })
  phone: string;

  @AutoMap()
  @Prop({ default: null })
  joinedDate: Date;

  @AutoMap()
  @Prop({ default: Date })
  createdAt: Date;

  @AutoMap()
  @Prop({ default: null })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
mongoose.model(User.name, UserSchema);
