import { AlipayService } from '../service/alipay.service';
export declare class AlipayController {
    alipayService: AlipayService;
    createOrder(outTradeNo: string, totalAmount: number, subject: string): Promise<any>;
}
