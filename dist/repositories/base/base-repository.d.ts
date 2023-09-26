import { IRead } from '../contracts/read.interface';
import { IWrite } from '../contracts/write.interface';
import BaseDTO from './base.dto';
export default abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    model: any;
    constructor(model: any);
    create(item: BaseDTO, session?: any): Promise<T>;
    update(_id: string, item: BaseDTO, session?: any): Promise<any>;
    remove(_id: any, session?: any): Promise<any>;
    findAll(): Promise<T[]>;
    findOne(_id: string): Promise<T>;
}
