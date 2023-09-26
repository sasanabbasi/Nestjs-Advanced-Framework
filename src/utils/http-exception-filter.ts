import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request: any = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // this.logger.error(exception.message, {
    //   name: exception.name,
    //   date: new Date().toISOString(),
    //   statusCode: status,
    //   params: request.params,
    //   user: request.user,
    //   path: request.path,
    //   method: request.method,
    //   origin: request.headers.origin,
    // });

    response.status(status).send({
      statusCode: status,
      name: exception.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
