import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { FastifyReply } from 'fastify';
import { LoginAuthDto } from './dto/login-auth.dto';
const base64 = require('base-64');
import * as bcrypt from 'bcrypt';
import { AuthTokenService } from 'src/utils/auth-token.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  @Inject(AuthTokenService)
  private readonly authTokenService: AuthTokenService;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  async login(loginAuthDto: LoginAuthDto, headers: any, res: FastifyReply) {
    let user: any = await this.usersService.find({
      email: base64.encode(loginAuthDto.email.trim().toLowerCase()),
    });

    user = user[0];

    if (!user) throw new NotFoundException();

    if (!user.password) throw new BadRequestException();

    const isValid = await bcrypt.compare(loginAuthDto.password, user.password);
    if (!isValid) throw new BadRequestException();

    if (!user.loginAccess.includes(loginAuthDto.type))
      throw new UnauthorizedException();

    if (user.status === 'inactive') throw new ForbiddenException();

    if (user.status === 'notverified') {
      // TODO: Resend OTP
      return false;
    }

    let token = await this.authTokenService.generateToken(
      user._id,
      headers['user-agent'],
    );

    res.setCookie('tokens', JSON.stringify(token), {
      expires: new Date(new Date().setDate(new Date().getDate() + 1)),
    });

    return token;
  }

  async findMe(headers: any) {
    console.log(headers.accesstoken);
    return headers;
  }
}
