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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInvitationSchema = exports.UserInvitation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_entity_1 = require("../../roles/entities/role.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let UserInvitation = class UserInvitation {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_entity_1.User)
], UserInvitation.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserInvitation.prototype, "userEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    }),
    __metadata("design:type", role_entity_1.Role)
], UserInvitation.prototype, "roleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        required: true,
    }),
    __metadata("design:type", String)
], UserInvitation.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
    }),
    __metadata("design:type", String)
], UserInvitation.prototype, "parentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        required: true,
    }),
    __metadata("design:type", String)
], UserInvitation.prototype, "levelId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: mongoose_2.default.Schema.Types.ObjectId,
            },
        ],
        default: void 0,
    }),
    __metadata("design:type", String)
], UserInvitation.prototype, "levelTemplateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserInvitation.prototype, "invitationToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], UserInvitation.prototype, "inviteAcceptStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['active', 'inactive', 'deleted'],
        default: 'active',
        required: true,
    }),
    __metadata("design:type", String)
], UserInvitation.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['invitationToken', 'registerationOTP', 'loginOTP'],
        default: 'invitationToken',
        required: true,
    }),
    __metadata("design:type", String)
], UserInvitation.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date }),
    __metadata("design:type", Date)
], UserInvitation.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], UserInvitation.prototype, "deletedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], UserInvitation.prototype, "expiredAt", void 0);
UserInvitation = __decorate([
    (0, mongoose_1.Schema)({ collection: 'invite_users' })
], UserInvitation);
exports.UserInvitation = UserInvitation;
exports.UserInvitationSchema = mongoose_1.SchemaFactory.createForClass(UserInvitation);
mongoose_2.default.model(UserInvitation.name, exports.UserInvitationSchema);
//# sourceMappingURL=users-invitaion.entity.js.map