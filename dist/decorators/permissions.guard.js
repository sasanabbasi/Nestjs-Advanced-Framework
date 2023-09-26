"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const permissions_decorator_1 = require("./permissions.decorator");
const axios_1 = require("@nestjs/axios");
const auth_token_service_1 = require("../utils/auth-token.service");
let RolesGuard = class RolesGuard {
    constructor(reflector, httpService, cacheService, authService) {
        this.reflector = reflector;
        this.httpService = httpService;
        this.cacheService = cacheService;
        this.authService = authService;
    }
    async canActivate(context) {
        const requiredPermissions = this.reflector.getAllAndOverride(permissions_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermissions) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        request.user = await this.authService.verifyToken(request);
        if (request.user === null)
            throw new common_1.UnauthorizedException();
        if (request.headers['internalauth'] === process.env.INTERNAL_SECRET)
            return true;
        let isExist = false;
        if (request.user.permissions && request.user.permissions.length > 0)
            requiredPermissions.forEach((permission) => {
                if (request.user.permissions.includes(permission)) {
                    isExist = true;
                    return;
                }
            });
        return isExist;
    }
};
RolesGuard = __decorate([
    (0, common_3.Injectable)(),
    __param(2, (0, common_1.Inject)(common_2.CACHE_MANAGER)),
    __param(3, (0, common_1.Inject)(auth_token_service_1.AuthTokenService)),
    __metadata("design:paramtypes", [core_1.Reflector,
        axios_1.HttpService, Object, auth_token_service_1.AuthTokenService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=permissions.guard.js.map