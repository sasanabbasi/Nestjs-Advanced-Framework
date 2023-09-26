import { Request } from 'express';
import { TenantUserRoleDocument } from 'src/schemas/tenant-user-role.schema';
import { Model } from 'mongoose';
export declare class AuthTokenService {
    private readonly usersService;
    private readonly jwtService;
    private readonly httpService;
    TenantUserRoleModel: Model<TenantUserRoleDocument>;
    generateToken(userId: string, userAgent: string): Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
    verifyToken(request: Request): Promise<any>;
}
