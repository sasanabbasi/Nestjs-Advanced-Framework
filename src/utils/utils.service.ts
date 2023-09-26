import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggedInUser } from './entities/logged-in-user.entity';

@Injectable()
export class UtilsService {
  constructor() {}

  async nameFormatter(name) {
    const label = name.toLowerCase().split(' ');
    for (let i = 0; i < label.length; i++)
      label[i] = label[i].charAt(0).toUpperCase() + label[i].slice(1);
    return label.join(' ');
  }

  async checkFindOnePermission(
    _id: string,
    user: LoggedInUser,
    permission: string,
  ) {
    if (_id !== user.userId && !user.permissions.includes(permission))
      throw new UnauthorizedException();
  }
}
