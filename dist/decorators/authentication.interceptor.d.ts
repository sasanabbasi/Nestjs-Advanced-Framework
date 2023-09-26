import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { AuthTokenService } from 'src/utils/auth-token';
export declare class LoginRequiredInterceptor implements NestInterceptor {
    private readonly httpService;
    private cacheService;
    private authService;
    constructor(httpService: HttpService, cacheService: Cache, authService: AuthTokenService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
