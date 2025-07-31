import { PlayerShowService } from '../service/playerShow.service';
import { UserService } from '../service/user.service';
export declare class PlayerShowController {
    playerShowService: PlayerShowService;
    userService: UserService;
    createPlayerShow(user_id: number, blind_box_id: number, content: string, images: string[], rating: number): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
    }>;
    getPlayerShowList(): Promise<{
        success: boolean;
        list: any[];
    }>;
    getPlayerShowDetail(id: number): Promise<{
        success: boolean;
        message: string;
        detail?: undefined;
    } | {
        success: boolean;
        detail: any;
        message?: undefined;
    }>;
    deletePlayerShow(id: number, user_id: number, is_admin: boolean): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    getBlindBoxRanking(limit: number): Promise<{
        success: boolean;
        ranking: any[];
    }>;
}
