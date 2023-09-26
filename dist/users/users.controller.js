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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const update_user_role_dto_1 = require("./dto/update-user-role.dto");
const permissions_decorator_1 = require("../decorators/permissions.decorator");
const login_interceptor_1 = require("../decorators/login.interceptor");
const user_decorator_1 = require("../decorators/user.decorator");
const logged_in_user_entity_1 = require("../utils/entities/logged-in-user.entity");
const utils_service_1 = require("../utils/utils.service");
const nestjs_1 = require("@automapper/nestjs");
const user_entity_1 = require("./entities/user.entity");
const user_vm_1 = require("./entities/user.vm");
let UsersController = class UsersController {
    constructor(usersService, classMapper) {
        this.usersService = usersService;
        this.classMapper = classMapper;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async findOne(_id, user) {
        this.utilsService.checkFindOnePermission(_id, user, permissions_decorator_1.PermissionList.UsersView);
        return this.usersService.findOne(_id);
    }
    update(_id, updateUserDto) {
        return this.usersService.update(_id, updateUserDto);
    }
    updateRoles(_id, updateUserRolesDto) {
        return this.usersService.updateRole(_id, updateUserRolesDto);
    }
    remove(_id) {
        return this.usersService.remove(_id);
    }
};
__decorate([
    (0, common_1.Inject)(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], UsersController.prototype, "utilsService", void 0);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.UsersCreate]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)((0, nestjs_1.MapInterceptor)(user_entity_1.User, user_vm_1.UserVM, { isArray: true })),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.UsersView]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseInterceptors)((0, nestjs_1.MapInterceptor)(user_entity_1.User, user_vm_1.UserVM)),
    (0, common_1.UseInterceptors)(login_interceptor_1.LoginRequiredInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, logged_in_user_entity_1.LoggedInUser]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.UsersUpdate]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('role/:id'),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.UsersPermission]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_role_dto_1.UpdateUserRoleDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateRoles", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)([permissions_decorator_1.PermissionList.UsersDelete]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.Controller)({
        path: 'user',
        version: common_1.VERSION_NEUTRAL,
    }),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [users_service_1.UsersService, Object])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map