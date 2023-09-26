import { Request } from 'express';
import { FastifyReply } from 'fastify';
import { LoggedInUser } from 'src/utils/entities/logged-in-user.entity';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginAuthDto: LoginAuthDto, request: Request, response: FastifyReply): Promise<false | {
        accessToken: any;
        refreshToken: any;
    }>;
    findMe(request: any, user: LoggedInUser): LoggedInUser;
}
