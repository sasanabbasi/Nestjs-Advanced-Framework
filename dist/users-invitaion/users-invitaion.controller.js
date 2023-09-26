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
exports.UsersInvitaionController = void 0;
const common_1 = require("@nestjs/common");
const users_invitaion_service_1 = require("./users-invitaion.service");
const create_users_invitaion_dto_1 = require("./dto/create-users-invitaion.dto");
const update_users_invitaion_dto_1 = require("./dto/update-users-invitaion.dto");
const permissions_decorator_1 = require("../decorators/permissions.decorator");
let UsersInvitaionController = class UsersInvitaionController {
    constructor(usersInvitaionService) {
        this.usersInvitaionService = usersInvitaionService;
    }
    create(createUsersInvitaionDto) {
        return this.usersInvitaionService.create(createUsersInvitaionDto);
    }
    findAll() {
        return this.usersInvitaionService.findAll();
    }
    findOne(_id) {
        return this.usersInvitaionService.findOne(_id);
    }
    update(_id, updateUsersInvitaionDto) {
        return this.usersInvitaionService.update(_id, updateUsersInvitaionDto);
    }
    remove(_id) {
        return this.usersInvitaionService.remove(_id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.UsersInvitationCreate]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_users_invitaion_dto_1.CreateUsersInvitaionDto]),
    __metadata("design:returntype", void 0)
], UsersInvitaionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.UsersInvitationView]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersInvitaionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.UsersInvitationView]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersInvitaionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.UsersInvitationUpdate]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_users_invitaion_dto_1.UpdateUsersInvitaionDto]),
    __metadata("design:returntype", void 0)
], UsersInvitaionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.UsersInvitationDelete]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersInvitaionController.prototype, "remove", null);
UsersInvitaionController = __decorate([
    (0, common_1.Controller)({
        path: 'user-invitaion',
        version: common_1.VERSION_NEUTRAL,
    }),
    __metadata("design:paramtypes", [users_invitaion_service_1.UsersInvitaionService])
], UsersInvitaionController);
exports.UsersInvitaionController = UsersInvitaionController;
//# sourceMappingURL=users-invitaion.controller.js.map