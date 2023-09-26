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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions.service");
const create_permission_dto_1 = require("./dto/create-permission.dto");
const update_permission_dto_1 = require("./dto/update-permission.dto");
const permissions_decorator_1 = require("../decorators/permissions.decorator");
let PermissionsController = class PermissionsController {
    constructor(permissionsService) {
        this.permissionsService = permissionsService;
    }
    create(createPermissionDto) {
        return this.permissionsService.create(createPermissionDto);
    }
    findAll() {
        return this.permissionsService.findAll();
    }
    findOne(_id) {
        return this.permissionsService.findOne(_id);
    }
    update(_id, updatePermissionDto) {
        return this.permissionsService.update(_id, updatePermissionDto);
    }
    remove(_id) {
        return this.permissionsService.remove(_id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.PermissionsCreate]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.PermissionsView]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.PermissionsView]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.PermissionsUpdate]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permission_dto_1.UpdatePermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.PermissionsDelete]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "remove", null);
PermissionsController = __decorate([
    (0, common_1.Controller)({
        path: 'permission',
        version: common_1.VERSION_NEUTRAL,
    }),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
exports.PermissionsController = PermissionsController;
//# sourceMappingURL=permissions.controller.js.map