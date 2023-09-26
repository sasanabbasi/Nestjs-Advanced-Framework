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
exports.WalletsService = void 0;
const wallet_entity_1 = require("./entities/wallet.entity");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let WalletsService = class WalletsService {
    constructor(WalletModel, connection) {
        this.WalletModel = WalletModel;
        this.connection = connection;
    }
    async create(createWalletDto) {
        return new this.WalletModel(createWalletDto).save();
    }
    async findAll() {
        return this.WalletModel.find().exec();
    }
    async findOne(_id) {
        return this.WalletModel.findOne({ _id }).exec();
    }
    async findByUser(_id) {
        return this.WalletModel.find({ user: _id }).exec();
    }
    async update(_id, updateWalletDto, session = null) {
        return this.WalletModel.updateOne({ _id }, { $set: { ...updateWalletDto } });
    }
    async remove(_id) {
        return await this.WalletModel.deleteOne({ _id });
    }
    async updateLockedBalance(_id, amount, session = null) {
        return this.WalletModel.updateOne({ _id }, { $set: { $inc: { lockedBalance: amount } } }).session(session);
    }
};
WalletsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wallet_entity_1.Wallet.name)),
    __param(1, (0, mongoose_3.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose.Connection])
], WalletsService);
exports.WalletsService = WalletsService;
//# sourceMappingURL=wallets.service.js.map