import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Permission } from 'src/permissions/entities/permission.entity';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  description: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
    default: [],
  })
  permissions: Permission[];

  @Prop({
    enum: ['active', 'inactive', 'deleted'],
    default: 'active',
    required: true,
  })
  status: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
mongoose.model(Role.name, RoleSchema);
