import { Inject, UnauthorizedException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionList, ROLES_KEY } from './permissions.decorator';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { fetchUser } from './user.decorator';
import { AuthTokenService } from 'src/utils/auth-token.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @Inject(AuthTokenService) private authService: AuthTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions: any =
      this.reflector.getAllAndOverride<PermissionList>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    if (!requiredPermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    request.user = await this.authService.verifyToken(request);
    if (request.user === null) throw new UnauthorizedException();
    if (request.headers['internalauth'] === process.env.INTERNAL_SECRET)
      return true;
    let isExist = false;
    if (request.user.permissions && request.user.permissions.length > 0)
      requiredPermissions.forEach((permission) => {
        if (request.user.permissions.includes(permission)) {
          isExist = true;
          return;
        }
      });
    return isExist;
  }
}
