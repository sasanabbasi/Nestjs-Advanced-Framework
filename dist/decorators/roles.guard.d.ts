import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private readonly httpService;
    private cacheService;
    constructor(reflector: Reflector, httpService: HttpService, cacheService: Cache);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
