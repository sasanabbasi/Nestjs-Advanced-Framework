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
exports.TenantUserRoleSchema = exports.TenantUserRole = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TenantUserRole = class TenantUserRole {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, required: true, ref: 'User' }),
    __metadata("design:type", String)
], TenantUserRole.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], TenantUserRole.prototype, "userRoleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['active', 'deleted'],
        default: 'active',
    }),
    __metadata("design:type", String)
], TenantUserRole.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date }),
    __metadata("design:type", Date)
], TenantUserRole.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], TenantUserRole.prototype, "deletedAt", void 0);
TenantUserRole = __decorate([
    (0, mongoose_1.Schema)({ collection: 'tenant_user_roles' })
], TenantUserRole);
exports.TenantUserRole = TenantUserRole;
exports.TenantUserRoleSchema = mongoose_1.SchemaFactory.createForClass(TenantUserRole);
mongoose_2.default.model(TenantUserRole.name, exports.TenantUserRoleSchema);
//# sourceMappingURL=tenant-user-role.schema.js.map