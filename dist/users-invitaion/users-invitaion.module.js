"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersInvitaionModule = void 0;
const common_1 = require("@nestjs/common");
const users_invitaion_service_1 = require("./users-invitaion.service");
const users_invitaion_controller_1 = require("./users-invitaion.controller");
const mongoose_1 = require("@nestjs/mongoose");
const users_invitaion_entity_1 = require("./entities/users-invitaion.entity");
let UsersInvitaionModule = class UsersInvitaionModule {
};
UsersInvitaionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: users_invitaion_entity_1.UserInvitation.name, schema: users_invitaion_entity_1.UserInvitationSchema },
            ]),
        ],
        controllers: [users_invitaion_controller_1.UsersInvitaionController],
        providers: [users_invitaion_service_1.UsersInvitaionService],
        exports: [users_invitaion_service_1.UsersInvitaionService],
    })
], UsersInvitaionModule);
exports.UsersInvitaionModule = UsersInvitaionModule;
//# sourceMappingURL=users-invitaion.module.js.map