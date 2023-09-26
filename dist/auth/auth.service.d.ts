import { FastifyReply } from 'fastify';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthService {
    private readonly authTokenService;
    private readonly usersService;
    login(loginAuthDto: LoginAuthDto, headers: any, res: FastifyReply): Promise<false | {
        accessToken: any;
        refreshToken: any;
    }>;
    findMe(headers: any): Promise<any>;
}
