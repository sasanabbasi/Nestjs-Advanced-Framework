export declare enum PermissionList {
    UsersView = "users_view",
    UsersCreate = "users_create",
    UsersUpdate = "users_update",
    UsersDelete = "users_delete",
    UsersInvite = "users_invite"
}
export declare const ROLES_KEY = "user.permissions";
export declare const RequirePermissions: (permission: PermissionList[]) => import("@nestjs/common").CustomDecorator<string>;
