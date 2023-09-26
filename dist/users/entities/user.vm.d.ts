import { AutomapperProfile } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
export declare class UserVM {
    _id: string;
    name: string;
    email: string;
    status: string;
    roles: string[];
    loginAccess: string[];
    profilePic: string;
    joinedDate: Date;
    createdAt: Date;
    deletedAt: Date;
}
export declare class UserMapperProfile extends AutomapperProfile {
    constructor(mapper: Mapper);
    get profile(): (mapper: any) => void;
}
