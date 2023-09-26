"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermissions = exports.ROLES_KEY = exports.PermissionList = void 0;
const common_1 = require("@nestjs/common");
var PermissionList;
(function (PermissionList) {
    PermissionList["UsersView"] = "users_view";
    PermissionList["UsersCreate"] = "users_create";
    PermissionList["UsersUpdate"] = "users_update";
    PermissionList["UsersDelete"] = "users_delete";
    PermissionList["UsersInvite"] = "users_invite";
})(PermissionList = exports.PermissionList || (exports.PermissionList = {}));
exports.ROLES_KEY = 'user.permissions';
const RequirePermissions = (permission) => (0, common_1.SetMetadata)(exports.ROLES_KEY, permission);
exports.RequirePermissions = RequirePermissions;
//# sourceMappingURL=roles.decorator.js.map