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
    PermissionList["UsersPermission"] = "users_permission";
    PermissionList["RolesView"] = "roles_view";
    PermissionList["RolesCreate"] = "roles_create";
    PermissionList["RolesUpdate"] = "roles_update";
    PermissionList["RolesDelete"] = "roles_delete";
    PermissionList["PermissionsView"] = "permissions_view";
    PermissionList["PermissionsCreate"] = "permissions_create";
    PermissionList["PermissionsUpdate"] = "permissions_update";
    PermissionList["PermissionsDelete"] = "permissions_delete";
    PermissionList["UsersInvitationView"] = "users_invitation_view";
    PermissionList["UsersInvitationCreate"] = "users_invitation_create";
    PermissionList["UsersInvitationUpdate"] = "users_invitation_update";
    PermissionList["UsersInvitationDelete"] = "users_invitation_delete";
})(PermissionList = exports.PermissionList || (exports.PermissionList = {}));
exports.ROLES_KEY = 'user.permissions';
const RequirePermissions = (permission) => (0, common_1.SetMetadata)(exports.ROLES_KEY, permission);
exports.RequirePermissions = RequirePermissions;
//# sourceMappingURL=permissions.decorator.js.map