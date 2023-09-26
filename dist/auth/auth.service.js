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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const base64 = require('base-64');
const bcrypt = require("bcrypt");
const auth_token_service_1 = require("../utils/auth-token.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    async login(loginAuthDto, headers, res) {
        let user = await this.usersService.find({
            email: base64.encode(loginAuthDto.email.trim().toLowerCase()),
        });
        user = user[0];
        if (!user)
            throw new common_1.NotFoundException();
        if (!user.password)
            throw new common_1.BadRequestException();
        const isValid = await bcrypt.compare(loginAuthDto.password, user.password);
        if (!isValid)
            throw new common_1.BadRequestException();
        if (!user.loginAccess.includes(loginAuthDto.type))
            throw new common_1.UnauthorizedException();
        if (user.status === 'inactive')
            throw new common_1.ForbiddenException();
        if (user.status === 'notverified') {
            return false;
        }
        let token = await this.authTokenService.generateToken(user._id, headers['user-agent']);
        res.setCookie('tokens', JSON.stringify(token), {
            expires: new Date(new Date().setDate(new Date().getDate() + 1)),
        });
        return token;
    }
    async findMe(headers) {
        console.log(headers.accesstoken);
        return headers;
    }
};
__decorate([
    (0, common_1.Inject)(auth_token_service_1.AuthTokenService),
    __metadata("design:type", auth_token_service_1.AuthTokenService)
], AuthService.prototype, "authTokenService", void 0);
__decorate([
    (0, common_1.Inject)(users_service_1.UsersService),
    __metadata("design:type", users_service_1.UsersService)
], AuthService.prototype, "usersService", void 0);
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map