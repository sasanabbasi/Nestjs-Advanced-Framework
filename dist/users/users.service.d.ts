import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import BaseRepository from 'src/repositories/base/base-repository';
export declare class UsersService extends BaseRepository<User> {
    UserModel: Model<UserDocument>;
    private readonly connection;
    private readonly utilsService;
    constructor(UserModel: Model<UserDocument>, connection: mongoose.Connection);
    create(createUserDto: CreateUserDto): Promise<User>;
    find(query: any): Promise<User[]>;
    findOneWithRolePermissionDependencies(_id: string): Promise<User>;
    update(_id: string, updateUserDto: UpdateUserDto): Promise<import("mongodb").UpdateResult>;
    updateRole(_id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<import("mongodb").UpdateResult>;
    remove(_id: string): Promise<import("mongodb").DeleteResult>;
}
