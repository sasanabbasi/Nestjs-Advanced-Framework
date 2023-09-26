"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("./entities/user.entity");
const base64 = require('base-64');
const bcrypt = require("bcrypt");
const utils_service_1 = require("../utils/utils.service");
const mongodb_error_codes_1 = require("../utils/mongodb-error-codes");
const base_repository_1 = require("../repositories/base/base-repository");
let UsersService = class UsersService extends base_repository_1.default {
    constructor(UserModel, connection) {
        super(UserModel);
        this.UserModel = UserModel;
        this.connection = connection;
    }
    async create(createUserDto) {
        try {
            const salt = await bcrypt.genSalt();
            createUserDto = {
                ...createUserDto,
                name: await this.utilsService.nameFormatter(createUserDto.name),
                password: await bcrypt.hash(createUserDto.password, salt),
                email: base64.encode(createUserDto.email.trim().toLowerCase()),
            };
            return await new this.UserModel(createUserDto).save();
        }
        catch (error) {
            if (error.code === mongodb_error_codes_1.MongoDBErrorCodes.DUPLICATE_ENTRY)
                throw new common_1.ConflictException();
            throw new common_1.InternalServerErrorException();
        }
    }
    async find(query) {
        return this.UserModel.find(query).exec();
    }
    async findOneWithRolePermissionDependencies(_id) {
        return this.UserModel.findOne({ _id })
            .populate({
            path: 'roles',
            populate: { path: 'permissions' },
        })
            .exec();
    }
    async update(_id, updateUserDto) {
        if (updateUserDto.name)
            updateUserDto.name = await this.utilsService.nameFormatter(updateUserDto.name);
        return this.UserModel.updateOne({ _id }, { $set: { ...updateUserDto } });
    }
    async updateRole(_id, updateUserRoleDto) {
        return this.UserModel.updateOne({ _id }, { $set: { ...updateUserRoleDto } });
    }
    async remove(_id) {
        return await this.UserModel.deleteOne({ _id });
    }
};
__decorate([
    (0, common_1.Inject)(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], UsersService.prototype, "utilsService", void 0);
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.default.Connection])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map