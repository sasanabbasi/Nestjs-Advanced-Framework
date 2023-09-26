import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseInterceptors,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FastifyReply } from 'fastify';
import { LoginRequiredInterceptor } from 'src/decorators/login.interceptor';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserInterceptor } from 'src/decorators/user.interceptor';
import { User } from 'src/users/entities/user.entity';
import { LoggedInUser } from 'src/utils/entities/logged-in-user.entity';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller({
  path: 'auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginAuthDto: LoginAuthDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.authService.login(loginAuthDto, request.headers, response);
  }

  @Get('me')
  @UseInterceptors(UserInterceptor)
  findMe(@Req() request: any, @CurrentUser() user: LoggedInUser) {
    return user;
  }
}
