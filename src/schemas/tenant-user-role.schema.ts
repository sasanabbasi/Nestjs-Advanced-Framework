import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TenantUserRoleDocument = TenantUserRole & Document;

@Schema({ collection: 'tenant_user_roles' })
export class TenantUserRole {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: string;

  @Prop()
  userRoleId: object[];

  @Prop({
    enum: ['active', 'deleted'],
    default: 'active',
  })
  status: string;

  @Prop({ default: Date })
  createdAt: Date;

  @Prop({ default: null })
  deletedAt: Date;
}

export const TenantUserRoleSchema =
  SchemaFactory.createForClass(TenantUserRole);
mongoose.model(TenantUserRole.name, TenantUserRoleSchema);
