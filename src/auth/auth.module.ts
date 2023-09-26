import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, UtilsModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
