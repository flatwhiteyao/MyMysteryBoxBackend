import { UserService } from '../service/user.service';
export declare class ApiController {
    userService: UserService;
    getUser(uid: number): Promise<{
        success: boolean;
        user: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        user?: undefined;
    }>;
}
