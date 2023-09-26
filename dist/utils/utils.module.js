"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const tenant_user_role_schema_1 = require("../schemas/tenant-user-role.schema");
const users_module_1 = require("../users/users.module");
const auth_token_service_1 = require("./auth-token.service");
const utils_service_1 = require("./utils.service");
let UtilsModule = class UtilsModule {
};
UtilsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            jwt_1.JwtModule.register({
                global: true,
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: tenant_user_role_schema_1.TenantUserRole.name, schema: tenant_user_role_schema_1.TenantUserRoleSchema },
            ]),
        ],
        providers: [utils_service_1.UtilsService, auth_token_service_1.AuthTokenService],
        exports: [utils_service_1.UtilsService, auth_token_service_1.AuthTokenService],
    })
], UtilsModule);
exports.UtilsModule = UtilsModule;
//# sourceMappingURL=utils.module.js.map