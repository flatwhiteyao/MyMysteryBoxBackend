import { BlindBoxService } from '../service/blindBox.service';
import { BlindBoxStyleService } from '../service/blindBoxStyle.service';
import { UserDrawnBlindBoxService } from '../service/userDrawnBlindBox.service';
import { Context } from '@midwayjs/koa';
export declare class BlindBoxController {
    blindBoxService: BlindBoxService;
    blindBoxStyleService: BlindBoxStyleService;
    userDrawnBlindBoxService: UserDrawnBlindBoxService;
    getAllBlindBoxes(): Promise<{
        success: boolean;
        blindBoxes: any[];
    }>;
    searchBlindBoxes(keyword: string): Promise<{
        success: boolean;
        blindBoxes: any[];
        message: string;
        keyword?: undefined;
        count?: undefined;
    } | {
        success: boolean;
        blindBoxes: any[];
        keyword: string;
        count: number;
        message: string;
    } | {
        success: boolean;
        message: string;
        blindBoxes?: undefined;
        keyword?: undefined;
        count?: undefined;
    }>;
    addBlindBox(ctx: Context): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteBlindBox(id: number, ctx: Context): Promise<{
        success: boolean;
        message: string;
    }>;
    updateBlindBox(ctx: Context): Promise<{
        success: boolean;
        message: string;
    }>;
    getBlindBoxStyles(id: number): Promise<{
        success: boolean;
        styles: any[];
    }>;
    randomDraw(id: number, user_id: number): Promise<{
        success: boolean;
        style: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        style?: undefined;
    }>;
}
