// src/controller/alipay.controller.ts
import { Controller, Get, Inject, Query } from '@midwayjs/decorator';
import { AlipayService } from '../service/alipay.service';

@Controller('/alipay')
export class AlipayController {
  @Inject()
  alipayService: AlipayService;

  @Get('/createOrder')
  async createOrder(@Query('outTradeNo') outTradeNo: string, @Query('totalAmount') totalAmount: number, @Query('subject') subject: string) {
    const result = await this.alipayService.createPaymentOrder(outTradeNo, totalAmount, subject);
    return result;
  }
}