import mongoose, { Document } from 'mongoose';
export declare type WalletDocument = Wallet & Document;
export declare class Wallet {
    asset: string;
    assetFa: string;
    balance: number;
    lockedBalance: number;
    coin: string;
    trading: boolean;
    withdrawAllEnable: boolean;
    depositAllEnable: boolean;
    free: number;
    freeze: number;
    isLegalMoney: boolean;
    locked: number;
}
export declare const WalletSchema: mongoose.Schema<Wallet, mongoose.Model<Wallet, any, any, any, any>, {}, {}, {}, {}, "type", Wallet>;
