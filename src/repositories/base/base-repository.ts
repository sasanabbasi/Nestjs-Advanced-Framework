// Interfaces
import { Model } from 'mongoose';
import { IRead } from '../contracts/read.interface';
import { IWrite } from '../contracts/write.interface';
import BaseDTO from './base.dto';
// The class only can be extended
export default abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  constructor(public model: any) {}

  async create(item: BaseDTO, session?: any): Promise<T> {
    return new this.model(item).save();
  }

  async update(_id: string, item: BaseDTO, session?: any) {
    return this.model.updateOne({ _id }, { $set: { ...item } });
  }

  async remove(_id: any, session?: any) {
    return await this.model.deleteOne({ _id });
  }

  async findAll(): Promise<T[]> {
    console.log('Hello');
    return this.model.find().exec();
  }

  async findOne(_id: string): Promise<T> {
    return this.model.findOne({ _id }).exec();
  }

  //   async find(query: any, aggregates?: any, session?: any) {
  //     return this.repository.getList(query, aggregates, session);
  //   }

  //   async findAndCountAll(query: any, aggregates?: any, session?: any) {
  //     return this.repository.getListAndCountAll(query, aggregates, session);
  //   }

  //   startSession(options: any) {
  //     return this.repository.startSession(options);
  //   }

  //   startTransaction(session: any, options: any) {
  //     this.repository.startTransaction(session, options);
  //   }

  //   async commit(session: any, options: any) {
  //     return this.repository.commit(session, options);
  //   }

  //   async rollback(session: any, options: any) {
  //     return this.repository.rollback(session, options);
  //   }

  //   endSession(session: any) {
  //     this.repository.endSession(session);
  //   }
}
