import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  CACHE_MANAGER,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { AuthTokenService } from 'src/utils/auth-token.service';

@Injectable()
export class LoginRequiredInterceptor implements NestInterceptor {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @Inject(AuthTokenService) private authService: AuthTokenService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    request.user = await this.authService.verifyToken(request);
    if (!request.user) throw new UnauthorizedException();
    return next.handle();
  }
}
