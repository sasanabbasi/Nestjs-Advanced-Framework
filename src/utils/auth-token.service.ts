import { BadRequestException, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { FastifyRequest } from 'fastify';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import {
  TenantUserRole,
  TenantUserRoleDocument,
} from 'src/schemas/tenant-user-role.schema';
import { Model } from 'mongoose';

export class AuthTokenService {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(HttpService)
  private readonly httpService: HttpService;

  @InjectModel(TenantUserRole.name)
  public TenantUserRoleModel: Model<TenantUserRoleDocument>;

  async generateToken(userId: string, userAgent: string) {
    const user = await this.usersService.findOne(userId);
    const tenantUser = await this.TenantUserRoleModel.findOne({
      userId,
      status: 'active',
    }).select(['userRoleId']);

    let isSuperAdmin;
    let roleId;
    let tenantId;
    if (tenantUser && tenantUser.userRoleId.length > 0) {
      tenantId = Object.keys(tenantUser.userRoleId[0])[0];
      roleId = Object.values(tenantUser.userRoleId[0])[0];
      if (tenantId === 'superAdmin') isSuperAdmin = true;
    }
    const storedData = {
      userId,
      email: user.email,
      isSuperAdmin,
      roleId,
      tenantId: !isSuperAdmin ? tenantId : undefined,
      isLevelUser: false,
      isDefaultUser: true,
    };

    let accessToken;
    let refreshToken;
    if (userAgent === process.env.IPAD_USER_AGENT) {
      accessToken = this.jwtService.sign(storedData, {
        secret: process.env.IPAD_TOKEN_SECRET,
        expiresIn: '7d',
      });
      refreshToken = this.jwtService.sign(storedData, {
        secret: process.env.IPAD_REFRESH_TOKEN_SECRET,
        expiresIn: '365d',
      });
    } else {
      accessToken = this.jwtService.sign(storedData, {
        secret: process.env.TOKEN_SECRET,
        expiresIn: '1d',
      });
      refreshToken = this.jwtService.sign(storedData, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '2d',
      });
    }
    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(request: Request) {
    const authToken = request.cookies?.tokens
      ? JSON.parse(request.cookies.tokens)
      : request.headers;
    const accessToken = authToken.accesstoken || authToken.accessToken;
    const refreshToken = authToken.refreshtoken || authToken.refreshToken;

    let TOKEN_SECRET;
    let REFRESH_TOKEN_SECRET;
    if (request.headers['user-agent'] !== process.env.IPAD_USER_AGENT) {
      TOKEN_SECRET = process.env.TOKEN_SECRET;
      REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    } else {
      TOKEN_SECRET = process.env.IPAD_TOKEN_SECRET;
      REFRESH_TOKEN_SECRET = process.env.IPAD_REFRESH_TOKEN_SECRET;
    }
    try {
      let jwtData = await this.jwtService.verify(accessToken || refreshToken, {
        secret: accessToken ? TOKEN_SECRET : REFRESH_TOKEN_SECRET,
      });
      const token = await this.generateToken(
        jwtData.userId,
        request.headers['user-agent'],
      );

      let user: any =
        await this.usersService.findOneWithRolePermissionDependencies(
          jwtData.userId,
        );

      const permissions = user.roles
        .map((rol) => rol.permissions.map((prm) => prm.name))
        .flat();
      jwtData = {
        ...jwtData,
        user,
        permissions,
        headers: {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
        newTokens: token,
      };
      return jwtData;
    } catch (error) {
      return null;
    }
  }
}
