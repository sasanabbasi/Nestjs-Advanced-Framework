"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
const fetchUser = async (request, cacheService, httpService) => {
    let res;
    try {
        res = await httpService
            .post(`${process.env.BITTESTAN_API_URL}/authentication`, {
            strategy: 'jwt',
            accessToken: request.headers.authorization,
        })
            .toPromise();
    }
    catch (error) {
        return null;
    }
    await cacheService.set(request.headers.cookie, res.data, 100000000);
    return res.data;
};
exports.fetchUser = fetchUser;
//# sourceMappingURL=user.decorator.js.map