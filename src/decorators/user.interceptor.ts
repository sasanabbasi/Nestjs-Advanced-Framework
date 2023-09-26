import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { fetchUser } from './user.decorator';
import { AuthTokenService } from 'src/utils/auth-token.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
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
    // request.user = await fetchUser(
    //   request,
    //   this.cacheService,
    //   this.httpService,
    // );
    // if (request.user === null) throw new UnauthorizedException();
    request.user = await this.authService.verifyToken(request);
    return next.handle();
  }
}
