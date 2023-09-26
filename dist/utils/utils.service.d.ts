import { LoggedInUser } from './entities/logged-in-user.entity';
export declare class UtilsService {
    constructor();
    nameFormatter(name: any): Promise<any>;
    checkFindOnePermission(_id: string, user: LoggedInUser, permission: string): Promise<void>;
}
