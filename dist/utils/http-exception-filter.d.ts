import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Logger } from 'winston';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: Logger);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
