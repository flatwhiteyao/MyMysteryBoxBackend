import { UserDrawnBlindBoxService } from '../service/userDrawnBlindBox.service';
export declare class UserDrawnBlindBoxController {
    userDrawnBlindBoxService: UserDrawnBlindBoxService;
    getUserDrawnBlindBoxes(user_id: number): Promise<{
        success: boolean;
        drawnBlindBoxes: any[];
    }>;
    deleteUserDrawnBlindBox(id: number): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
}
