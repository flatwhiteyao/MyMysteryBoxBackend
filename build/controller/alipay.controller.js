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
exports.AlipayController = void 0;
// src/controller/alipay.controller.ts
const decorator_1 = require("@midwayjs/decorator");
const alipay_service_1 = require("../service/alipay.service");
let AlipayController = class AlipayController {
    async createOrder(outTradeNo, totalAmount, subject) {
        const result = await this.alipayService.createPaymentOrder(outTradeNo, totalAmount, subject);
        return result;
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", alipay_service_1.AlipayService)
], AlipayController.prototype, "alipayService", void 0);
__decorate([
    (0, decorator_1.Get)('/createOrder'),
    __param(0, (0, decorator_1.Query)('outTradeNo')),
    __param(1, (0, decorator_1.Query)('totalAmount')),
    __param(2, (0, decorator_1.Query)('subject')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], AlipayController.prototype, "createOrder", null);
AlipayController = __decorate([
    (0, decorator_1.Controller)('/alipay')
], AlipayController);
exports.AlipayController = AlipayController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpcGF5LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlci9hbGlwYXkuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsbURBQXFFO0FBQ3JFLDhEQUEwRDtBQUduRCxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUtyQixBQUFOLEtBQUssQ0FBQyxXQUFXLENBQ00sVUFBa0IsRUFDakIsV0FBbUIsRUFDdkIsT0FBZTtRQUVqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQ3hELFVBQVUsRUFDVixXQUFXLEVBQ1gsT0FBTyxDQUNSLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YsQ0FBQTtBQWhCQztJQUFDLElBQUEsa0JBQU0sR0FBRTs4QkFDTSw4QkFBYTt1REFBQztBQUd2QjtJQURMLElBQUEsZUFBRyxFQUFDLGNBQWMsQ0FBQztJQUVqQixXQUFBLElBQUEsaUJBQUssRUFBQyxZQUFZLENBQUMsQ0FBQTtJQUNuQixXQUFBLElBQUEsaUJBQUssRUFBQyxhQUFhLENBQUMsQ0FBQTtJQUNwQixXQUFBLElBQUEsaUJBQUssRUFBQyxTQUFTLENBQUMsQ0FBQTs7OzttREFRbEI7QUFoQlUsZ0JBQWdCO0lBRDVCLElBQUEsc0JBQVUsRUFBQyxTQUFTLENBQUM7R0FDVCxnQkFBZ0IsQ0FpQjVCO0FBakJZLDRDQUFnQiJ9