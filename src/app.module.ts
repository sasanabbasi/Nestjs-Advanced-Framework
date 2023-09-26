import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GlobalModules } from './global.module';
import * as redisStore from 'cache-manager-redis-store';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './decorators/permissions.guard';
import { SocketModule } from './socket/socket.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { RedisService } from './redis/redis.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersInvitaionModule } from './users-invitaion/users-invitaion.module';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import WinstonLogsConfig from './utils/winston.logger';
import { WinstonModule } from 'nest-winston';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING),
    CacheModule.register<any>({
      isGlobal: true,
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    GlobalModules,
    SocketModule,
    ScheduleModule.forRoot(),
    UsersModule,
    RolesModule,
    PermissionsModule,
    UsersInvitaionModule,
    UtilsModule,
    AuthModule,
    WinstonModule.forRoot(WinstonLogsConfig()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CronService,
    RedisService,
  ],
})
export class AppModule {}
