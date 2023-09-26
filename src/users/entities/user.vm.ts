import { AutoMap } from '@automapper/classes';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
const base64 = require('base-64');

export class UserVM {
  @AutoMap()
  public _id: string;

  @AutoMap()
  public name: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public status: string;

  @AutoMap(() => [Role])
  public roles: string[];

  @AutoMap(() => [String])
  public loginAccess: string[];

  @AutoMap()
  public profilePic: string;

  @AutoMap()
  public joinedDate: Date;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public deletedAt: Date;
}

@Injectable()
export class UserMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserVM,
        forMember(
          (destination) => destination._id,
          mapFrom((source) => source['_id']),
        ),
        forMember(
          (destination) => destination.email,
          mapFrom((source) => base64.decode(source.email)),
        ),
      );
    };
  }
}
