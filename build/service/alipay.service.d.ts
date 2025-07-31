export declare class AlipayService {
    private alipaySdk;
    createPaymentOrder(outTradeNo: string, totalAmount: number, subject: string): Promise<any>;
}
