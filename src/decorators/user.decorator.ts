import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AuthTokenService } from 'src/utils/auth-token.service';

// export const User = createParamDecorator(
//   async (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const httpService = new HttpService();
//     let res = await httpService
//       .post(`${process.env.COSMICNODE_API_URL}/authentication`, {
//         strategy: 'jwt',
//         accessToken: request.headers.authorization,
//       })
//       .toPromise();
//     return res.data;
//   },
// );

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// export const InjectUser = (): MethodDecorator => {
//     return (
//         target: Object,
//         propertyKey: string | symbol,
//         descriptor: PropertyDescriptor
//     ) => {

//         // Here, is possibile to access a Nest.js service (i.e. TestService) instance?
//         console.log("Hello 123")
//         return descriptor;
//     }
// };

export const fetchUser = async (request, cacheService, httpService) => {
  //   let user = await cacheService.get(request.headers.authorization);
  //   if (user) return user;
  //   else {
  let res: any;
  try {
    res = await httpService
      .post(`${process.env.BITTESTAN_API_URL}/authentication`, {
        strategy: 'jwt',
        accessToken: request.headers.authorization,
      })
      .toPromise();
  } catch (error) {
    return null;
  }
  await cacheService.set(request.headers.cookie, res.data, 100000000);
  return res.data;
  //   }
};
