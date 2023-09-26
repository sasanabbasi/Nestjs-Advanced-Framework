import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TenantUserRole,
  TenantUserRoleSchema,
} from 'src/schemas/tenant-user-role.schema';
import { UsersModule } from 'src/users/users.module';
import { AuthTokenService } from './auth-token.service';
import { UtilsService } from './utils.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
    }),
    MongooseModule.forFeature([
      { name: TenantUserRole.name, schema: TenantUserRoleSchema },
    ]),
  ],
  providers: [UtilsService, AuthTokenService],
  exports: [UtilsService, AuthTokenService],
})
export class UtilsModule {}
