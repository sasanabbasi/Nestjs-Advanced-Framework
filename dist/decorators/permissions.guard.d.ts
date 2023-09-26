import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { AuthTokenService } from 'src/utils/auth-token.service';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private readonly httpService;
    private cacheService;
    private authService;
    constructor(reflector: Reflector, httpService: HttpService, cacheService: Cache, authService: AuthTokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
