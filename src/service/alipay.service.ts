// src/service/alipay.service.ts
import { Provide } from '@midwayjs/decorator';
const AlipaySdk = require('alipay-sdk').default; // 使用 require 导入
import { alipayConfig } from '../config/alipay.config';

@Provide()
export class AlipayService {
  private alipaySdk = new AlipaySdk(alipayConfig); // 现在可以正确实例化

  async createPaymentOrder(
    outTradeNo: string,
    totalAmount: number,
    subject: string
  ) {
    const bizContent = {
      out_trade_no: outTradeNo,
      total_amount: totalAmount,
      subject: subject,
      product_code: 'FAST_INSTANT_TRADE_PAY',
    };

    const result = await this.alipaySdk.exec('alipay.trade.page.pay', {
      bizContent,
      notify_url: 'your_notify_url', // 支付结果通知地址
      return_url: 'your_return_url', // 支付成功后跳转地址
    });

    return result;
  }
}
