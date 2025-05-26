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
exports.Restaurant = exports.RestaurantStatus = void 0;
const typeorm_1 = require("typeorm");
const menu_entity_1 = require("../../menus/entities/menu.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
const table_type_entity_1 = require("../../table-types/entities/table-type.entity");
const reservation_entity_1 = require("../../reservations/entities/reservation.entity");
const waiting_entity_1 = require("../../waitings/entities/waiting.entity");
const review_entity_1 = require("../../reviews/entities/review.entity");
const favorite_entity_1 = require("../../favorites/entities/favorite.entity");
var RestaurantStatus;
(function (RestaurantStatus) {
    RestaurantStatus["MANY_SEATS"] = "MANY_SEATS";
    RestaurantStatus["NORMAL"] = "NORMAL";
    RestaurantStatus["WAITING"] = "WAITING";
    RestaurantStatus["CLOSED"] = "CLOSED";
    RestaurantStatus["BREAK_TIME"] = "BREAK_TIME";
})(RestaurantStatus || (exports.RestaurantStatus = RestaurantStatus = {}));
let Restaurant = class Restaurant {
    id;
    name;
    address;
    phoneNumber;
    description;
    businessHours;
    imageUrl;
    isActive;
    openTime;
    closeTime;
    breakStartTime;
    breakEndTime;
    waitingCount;
    status;
    totalSeats;
    availableSeats;
    createdAt;
    updatedAt;
    menus;
    orders;
    owner;
    tableTypes;
    reservations;
    waitings;
    reviews;
    favorites;
};
exports.Restaurant = Restaurant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Restaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Restaurant.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "businessHours", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Restaurant.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Restaurant.prototype, "openTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Restaurant.prototype, "closeTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "breakStartTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "breakEndTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Restaurant.prototype, "waitingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RestaurantStatus,
        default: RestaurantStatus.CLOSED,
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Restaurant.prototype, "totalSeats", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Restaurant.prototype, "availableSeats", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Restaurant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Restaurant.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => menu_entity_1.Menu, (menu) => menu.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "menus", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.restaurants),
    __metadata("design:type", user_entity_1.User)
], Restaurant.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => table_type_entity_1.TableType, (tableType) => tableType.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "tableTypes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, (reservation) => reservation.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => waiting_entity_1.Waiting, (waiting) => waiting.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "waitings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favorite_entity_1.Favorite, (favorite) => favorite.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "favorites", void 0);
exports.Restaurant = Restaurant = __decorate([
    (0, typeorm_1.Entity)()
], Restaurant);
//# sourceMappingURL=restaurant.entity.js.map