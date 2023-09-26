"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(item, session) {
        return new this.model(item).save();
    }
    async update(_id, item, session) {
        return this.model.updateOne({ _id }, { $set: { ...item } });
    }
    async remove(_id, session) {
        return await this.model.deleteOne({ _id });
    }
    async findAll() {
        console.log('Hello');
        return this.model.find().exec();
    }
    async findOne(_id) {
        return this.model.findOne({ _id }).exec();
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=base-repository.js.map