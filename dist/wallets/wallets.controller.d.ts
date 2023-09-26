import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
export declare class WalletsController {
    private readonly WalletsService;
    private readonly httpService;
    private cacheService;
    constructor(WalletsService: WalletsService, httpService: HttpService, cacheService: Cache);
    create(createWalletDto: CreateWalletDto): Promise<import("./entities/wallet.entity").Wallet>;
    findAll(): Promise<import("./entities/wallet.entity").Wallet[]>;
    findAuth(request: any): Promise<any>;
    findOne(id: string): Promise<import("./entities/wallet.entity").Wallet>;
    findByUser(id: string): Promise<import("./entities/wallet.entity").Wallet[]>;
    update(id: string, updateWalletDto: UpdateWalletDto): Promise<import("mongodb").UpdateResult>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
