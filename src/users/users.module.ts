import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { UserMapperProfile } from './entities/user.vm';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UtilsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserMapperProfile],
  exports: [UsersService],
})
export class UsersModule {}
