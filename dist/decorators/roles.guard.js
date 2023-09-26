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
const user_decorator_1 = require("./user.decorator");
let RolesGuard = class RolesGuard {
    constructor(reflector, httpService, cacheService) {
        this.reflector = reflector;
        this.httpService = httpService;
        this.cacheService = cacheService;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(permissions_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        console.log(requiredRoles);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        request.user = await (0, user_decorator_1.fetchUser)(request, this.cacheService, this.httpService);
        if (request.user === null)
            throw new common_1.UnauthorizedException();
        return requiredRoles === request.user.user.permissions;
    }
};
RolesGuard = __decorate([
    (0, common_3.Injectable)(),
    __param(2, (0, common_1.Inject)(common_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [core_1.Reflector,
        axios_1.HttpService, Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map