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
exports.UserMapperProfile = exports.UserVM = void 0;
const classes_1 = require("@automapper/classes");
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const role_entity_1 = require("../../roles/entities/role.entity");
const base64 = require('base-64');
class UserVM {
}
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserVM.prototype, "_id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserVM.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserVM.prototype, "email", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserVM.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [role_entity_1.Role]),
    __metadata("design:type", Array)
], UserVM.prototype, "roles", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [String]),
    __metadata("design:type", Array)
], UserVM.prototype, "loginAccess", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserVM.prototype, "profilePic", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], UserVM.prototype, "joinedDate", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], UserVM.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], UserVM.prototype, "deletedAt", void 0);
exports.UserVM = UserVM;
let UserMapperProfile = class UserMapperProfile extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, user_entity_1.User, UserVM, (0, core_1.forMember)((destination) => destination._id, (0, core_1.mapFrom)((source) => source['_id'])), (0, core_1.forMember)((destination) => destination.email, (0, core_1.mapFrom)((source) => base64.decode(source.email))));
        };
    }
};
UserMapperProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], UserMapperProfile);
exports.UserMapperProfile = UserMapperProfile;
//# sourceMappingURL=user.vm.js.map