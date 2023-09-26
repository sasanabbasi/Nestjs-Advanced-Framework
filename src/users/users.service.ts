import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
const base64 = require('base-64');
import * as bcrypt from 'bcrypt';
import { UtilsService } from 'src/utils/utils.service';
import { MongoDBErrorCodes } from 'src/utils/mongodb-error-codes';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import BaseRepository from 'src/repositories/base/base-repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserVM } from './entities/user.vm';

@Injectable()
export class UsersService extends BaseRepository<User> {
  @Inject(UtilsService)
  private readonly utilsService: UtilsService;

  constructor(
    @InjectModel(User.name) public UserModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {
    super(UserModel);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      createUserDto = {
        ...createUserDto,
        name: await this.utilsService.nameFormatter(createUserDto.name),
        password: await bcrypt.hash(createUserDto.password, salt),
        email: base64.encode(createUserDto.email.trim().toLowerCase()),
      };
      return await new this.UserModel(createUserDto).save();
    } catch (error) {
      if (error.code === MongoDBErrorCodes.DUPLICATE_ENTRY)
        throw new ConflictException();
      throw new InternalServerErrorException();
    }
  }

  async find(query): Promise<User[]> {
    return this.UserModel.find(query).exec();
  }

  async findOneWithRolePermissionDependencies(_id: string): Promise<User> {
    return this.UserModel.findOne({ _id })
      .populate({
        path: 'roles',
        populate: { path: 'permissions' },
      })
      .exec();
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.name)
      updateUserDto.name = await this.utilsService.nameFormatter(
        updateUserDto.name,
      );
    return this.UserModel.updateOne({ _id }, { $set: { ...updateUserDto } });
  }

  async updateRole(_id: string, updateUserRoleDto: UpdateUserRoleDto) {
    return this.UserModel.updateOne(
      { _id },
      { $set: { ...updateUserRoleDto } },
    );
  }

  async remove(_id: string) {
    return await this.UserModel.deleteOne({ _id });
  }
}
