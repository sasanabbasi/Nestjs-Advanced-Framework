import { SetMetadata } from '@nestjs/common';

export enum PermissionList {
  UsersView = 'users_view',
  UsersCreate = 'users_create',
  UsersUpdate = 'users_update',
  UsersDelete = 'users_delete',
  UsersInvite = 'users_invite',
  UsersPermission = 'users_permission',
  RolesView = 'roles_view',
  RolesCreate = 'roles_create',
  RolesUpdate = 'roles_update',
  RolesDelete = 'roles_delete',
  PermissionsView = 'permissions_view',
  PermissionsCreate = 'permissions_create',
  PermissionsUpdate = 'permissions_update',
  PermissionsDelete = 'permissions_delete',
  UsersInvitationView = 'users_invitation_view',
  UsersInvitationCreate = 'users_invitation_create',
  UsersInvitationUpdate = 'users_invitation_update',
  UsersInvitationDelete = 'users_invitation_delete',
}

export const ROLES_KEY = 'user.permissions';
export const RequirePermissions = (permission: PermissionList[]) =>
  SetMetadata(ROLES_KEY, permission);
