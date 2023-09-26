import { Wallet, WalletDocument } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class WalletsService {
    WalletModel: Model<WalletDocument>;
    private readonly connection;
    constructor(WalletModel: Model<WalletDocument>, connection: mongoose.Connection);
    create(createWalletDto: CreateWalletDto): Promise<Wallet>;
    findAll(): Promise<Wallet[]>;
    findOne(_id: string): Promise<Wallet>;
    findByUser(_id: string): Promise<Wallet[]>;
    update(_id: string, updateWalletDto: UpdateWalletDto, session?: mongoose.ClientSession | null): Promise<import("mongodb").UpdateResult>;
    remove(_id: string): Promise<import("mongodb").DeleteResult>;
    updateLockedBalance(_id: string, amount: number, session?: mongoose.ClientSession | null): Promise<import("mongodb").UpdateResult>;
}
