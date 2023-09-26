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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("@nestjs/axios");
const mongoose_1 = require("@nestjs/mongoose");
const tenant_user_role_schema_1 = require("../schemas/tenant-user-role.schema");
const mongoose_2 = require("mongoose");
class AuthTokenService {
    async generateToken(userId, userAgent) {
        const user = await this.usersService.findOne(userId);
        const tenantUser = await this.TenantUserRoleModel.findOne({
            userId,
            status: 'active',
        }).select(['userRoleId']);
        let isSuperAdmin;
        let roleId;
        let tenantId;
        if (tenantUser && tenantUser.userRoleId.length > 0) {
            tenantId = Object.keys(tenantUser.userRoleId[0])[0];
            roleId = Object.values(tenantUser.userRoleId[0])[0];
            if (tenantId === 'superAdmin')
                isSuperAdmin = true;
        }
        const storedData = {
            userId,
            email: user.email,
            isSuperAdmin,
            roleId,
            tenantId: !isSuperAdmin ? tenantId : undefined,
            isLevelUser: false,
            isDefaultUser: true,
        };
        let accessToken;
        let refreshToken;
        if (userAgent === process.env.IPAD_USER_AGENT) {
            accessToken = this.jwtService.sign(storedData, {
                secret: process.env.IPAD_TOKEN_SECRET,
                expiresIn: '7d',
            });
            refreshToken = this.jwtService.sign(storedData, {
                secret: process.env.IPAD_REFRESH_TOKEN_SECRET,
                expiresIn: '365d',
            });
        }
        else {
            accessToken = this.jwtService.sign(storedData, {
                secret: process.env.TOKEN_SECRET,
                expiresIn: '1d',
            });
            refreshToken = this.jwtService.sign(storedData, {
                secret: process.env.REFRESH_TOKEN_SECRET,
                expiresIn: '2d',
            });
        }
        return {
            accessToken,
            refreshToken,
        };
    }
    async verifyToken(request) {
        var _a;
        const authToken = ((_a = request.cookies) === null || _a === void 0 ? void 0 : _a.tokens)
            ? JSON.parse(request.cookies.tokens)
            : request.headers;
        const accessToken = authToken.accesstoken || authToken.accessToken;
        const refreshToken = authToken.refreshtoken || authToken.refreshToken;
        let TOKEN_SECRET;
        let REFRESH_TOKEN_SECRET;
        if (request.headers['user-agent'] !== process.env.IPAD_USER_AGENT) {
            TOKEN_SECRET = process.env.TOKEN_SECRET;
            REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
        }
        else {
            TOKEN_SECRET = process.env.IPAD_TOKEN_SECRET;
            REFRESH_TOKEN_SECRET = process.env.IPAD_REFRESH_TOKEN_SECRET;
        }
        try {
            let jwtData = await this.jwtService.verify(accessToken || refreshToken, {
                secret: accessToken ? TOKEN_SECRET : REFRESH_TOKEN_SECRET,
            });
            const token = await this.generateToken(jwtData.userId, request.headers['user-agent']);
            let user = await this.usersService.findOneWithRolePermissionDependencies(jwtData.userId);
            const permissions = user.roles
                .map((rol) => rol.permissions.map((prm) => prm.name))
                .flat();
            jwtData = {
                ...jwtData,
                user,
                permissions,
                headers: {
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                },
                newTokens: token,
            };
            return jwtData;
        }
        catch (error) {
            return null;
        }
    }
}
__decorate([
    (0, common_1.Inject)(users_service_1.UsersService),
    __metadata("design:type", users_service_1.UsersService)
], AuthTokenService.prototype, "usersService", void 0);
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], AuthTokenService.prototype, "jwtService", void 0);
__decorate([
    (0, common_1.Inject)(axios_1.HttpService),
    __metadata("design:type", axios_1.HttpService)
], AuthTokenService.prototype, "httpService", void 0);
__decorate([
    (0, mongoose_1.InjectModel)(tenant_user_role_schema_1.TenantUserRole.name),
    __metadata("design:type", mongoose_2.Model)
], AuthTokenService.prototype, "TenantUserRoleModel", void 0);
exports.AuthTokenService = AuthTokenService;
//# sourceMappingURL=auth-token.service.js.map