"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlipayService = void 0;
// src/service/alipay.service.ts
const decorator_1 = require("@midwayjs/decorator");
const AlipaySdk = require('alipay-sdk').default; // 使用 require 导入
const alipay_config_1 = require("../config/alipay.config");
let AlipayService = class AlipayService {
    constructor() {
        this.alipaySdk = new AlipaySdk(alipay_config_1.alipayConfig); // 现在可以正确实例化
    }
    async createPaymentOrder(outTradeNo, totalAmount, subject) {
        const bizContent = {
            out_trade_no: outTradeNo,
            total_amount: totalAmount,
            subject: subject,
            product_code: 'FAST_INSTANT_TRADE_PAY',
        };
        const result = await this.alipaySdk.exec('alipay.trade.page.pay', {
            bizContent,
            notify_url: 'your_notify_url',
            return_url: 'your_return_url', // 支付成功后跳转地址
        });
        return result;
    }
};
AlipayService = __decorate([
    (0, decorator_1.Provide)()
], AlipayService);
exports.AlipayService = AlipayService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpcGF5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZS9hbGlwYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxnQ0FBZ0M7QUFDaEMsbURBQThDO0FBQzlDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0I7QUFDakUsMkRBQXVEO0FBR2hELElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFBbkI7UUFDRyxjQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsNEJBQVksQ0FBQyxDQUFDLENBQUMsWUFBWTtJQXNCL0QsQ0FBQztJQXBCQyxLQUFLLENBQUMsa0JBQWtCLENBQ3RCLFVBQWtCLEVBQ2xCLFdBQW1CLEVBQ25CLE9BQWU7UUFFZixNQUFNLFVBQVUsR0FBRztZQUNqQixZQUFZLEVBQUUsVUFBVTtZQUN4QixZQUFZLEVBQUUsV0FBVztZQUN6QixPQUFPLEVBQUUsT0FBTztZQUNoQixZQUFZLEVBQUUsd0JBQXdCO1NBQ3ZDLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hFLFVBQVU7WUFDVixVQUFVLEVBQUUsaUJBQWlCO1lBQzdCLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxZQUFZO1NBQzVDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFBO0FBdkJZLGFBQWE7SUFEekIsSUFBQSxtQkFBTyxHQUFFO0dBQ0csYUFBYSxDQXVCekI7QUF2Qlksc0NBQWEifQ==