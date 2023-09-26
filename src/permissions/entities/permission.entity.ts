import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  description: string;

  @Prop({ required: true })
  displayName: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
mongoose.model(Permission.name, PermissionSchema);
