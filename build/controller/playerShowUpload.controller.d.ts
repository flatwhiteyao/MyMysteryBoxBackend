import { Context } from '@midwayjs/koa';
export declare class PlayerShowUploadController {
    ctx: Context;
    upload(): Promise<{
        success: boolean;
        message: string;
        urls?: undefined;
    } | {
        success: boolean;
        urls: any[];
        message?: undefined;
    }>;
}
