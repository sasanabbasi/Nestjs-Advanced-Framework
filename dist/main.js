"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const compress_1 = require("@fastify/compress");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./utils/http-exception-filter");
const nest_winston_1 = require("nest-winston");
const cookie_1 = require("@fastify/cookie");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)));
    await app.register(cookie_1.default);
    const extractor = (request) => {
        var _a;
        return [(_a = request.headers['versions']) !== null && _a !== void 0 ? _a : '']
            .flatMap((v) => v.split(','))
            .filter((v) => !!v)
            .sort()
            .reverse();
    };
    app.enableVersioning({
        type: common_1.VersioningType.CUSTOM,
        defaultVersion: '1',
        extractor,
    });
    await app.register(compress_1.default, { encodings: ['gzip', 'deflate'] });
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map