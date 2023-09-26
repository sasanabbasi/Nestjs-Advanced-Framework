import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { LoggedInUser } from '../utils/entities/logged-in-user.entity';
import { Mapper } from '@automapper/core';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    private readonly classMapper;
    private readonly utilsService;
    constructor(usersService: UsersService, classMapper: Mapper);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(_id: string, user: LoggedInUser): Promise<User>;
    update(_id: string, updateUserDto: UpdateUserDto): Promise<import("mongodb").UpdateResult>;
    updateRoles(_id: string, updateUserRolesDto: UpdateUserRoleDto): Promise<import("mongodb").UpdateResult>;
    remove(_id: string): Promise<import("mongodb").DeleteResult>;
}
