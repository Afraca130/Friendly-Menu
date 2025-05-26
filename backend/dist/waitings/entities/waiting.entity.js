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
exports.Waiting = exports.WaitingStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
var WaitingStatus;
(function (WaitingStatus) {
    WaitingStatus["WAITING"] = "WAITING";
    WaitingStatus["ENTERED"] = "ENTERED";
    WaitingStatus["CANCELLED"] = "CANCELLED";
})(WaitingStatus || (exports.WaitingStatus = WaitingStatus = {}));
let Waiting = class Waiting {
    id;
    waitingTime;
    peopleCount;
    status;
    createdAt;
    updatedAt;
    user;
    restaurant;
};
exports.Waiting = Waiting;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Waiting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Waiting.prototype, "waitingTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Waiting.prototype, "peopleCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: WaitingStatus,
        default: WaitingStatus.WAITING,
    }),
    __metadata("design:type", String)
], Waiting.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Waiting.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Waiting.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.waitings),
    __metadata("design:type", user_entity_1.User)
], Waiting.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.Restaurant, (restaurant) => restaurant.waitings),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], Waiting.prototype, "restaurant", void 0);
exports.Waiting = Waiting = __decorate([
    (0, typeorm_1.Entity)()
], Waiting);
//# sourceMappingURL=waiting.entity.js.map