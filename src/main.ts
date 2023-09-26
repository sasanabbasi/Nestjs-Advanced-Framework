import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import compression from '@fastify/compress';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-exception-filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(
    new HttpExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
  );

  await app.register(fastifyCookie);

  const extractor = (request: Request): string | string[] =>
    [request.headers['versions'] ?? '']
      .flatMap((v) => v.split(','))
      .filter((v) => !!v)
      .sort()
      .reverse();

  app.enableVersioning({
    type: VersioningType.CUSTOM,
    defaultVersion: '1',
    extractor,
  });

  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  // app.enableCors(
  //   {
  //     origin: [
  //       'http://localhost:8080',
  //       'http://localhost:3000'
  //     ],
  //   }
  // );
  await app.listen(process.env.PORT);
}
bootstrap();
