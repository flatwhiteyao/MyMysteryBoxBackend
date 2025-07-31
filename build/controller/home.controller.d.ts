import { PlayerShowService } from '../service/playerShow.service';
import { BlindBoxService } from '../service/blindBox.service';
export declare class HomeController {
    playerShowService: PlayerShowService;
    blindBoxService: BlindBoxService;
    home(): Promise<string>;
    getRanking(): Promise<{
        success: boolean;
        ranking: any[];
    }>;
    getAd(): Promise<{
        success: boolean;
        message: string;
        ad?: undefined;
    } | {
        success: boolean;
        ad: any;
        message?: undefined;
    }>;
}
