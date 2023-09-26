"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const global_module_1 = require("./global.module");
const redisStore = require("cache-manager-redis-store");
const core_1 = require("@nestjs/core");
const permissions_guard_1 = require("./decorators/permissions.guard");
const socket_module_1 = require("./socket/socket.module");
const schedule_1 = require("@nestjs/schedule");
const cron_service_1 = require("./cron/cron.service");
const redis_service_1 = require("./redis/redis.service");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const permissions_module_1 = require("./permissions/permissions.module");
const users_invitaion_module_1 = require("./users-invitaion/users-invitaion.module");
const utils_module_1 = require("./utils/utils.module");
const auth_module_1 = require("./auth/auth.module");
const winston_logger_1 = require("./utils/winston.logger");
const nest_winston_1 = require("nest-winston");
const nestjs_1 = require("@automapper/nestjs");
const classes_1 = require("@automapper/classes");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.development.env',
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING),
            common_1.CacheModule.register({
                isGlobal: true,
                store: redisStore,
                socket: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            nestjs_1.AutomapperModule.forRoot({
                strategyInitializer: (0, classes_1.classes)(),
            }),
            global_module_1.GlobalModules,
            socket_module_1.SocketModule,
            schedule_1.ScheduleModule.forRoot(),
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            users_invitaion_module_1.UsersInvitaionModule,
            utils_module_1.UtilsModule,
            auth_module_1.AuthModule,
            nest_winston_1.WinstonModule.forRoot((0, winston_logger_1.default)()),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: permissions_guard_1.RolesGuard,
            },
            cron_service_1.CronService,
            redis_service_1.RedisService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map