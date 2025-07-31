import { UserService } from '../service/user.service';
export declare class UserController {
    userService: UserService;
    register(nickname: string, name: string, phone: string, email: string, password: string, confirmPassword: string, role: string): Promise<{
        success: boolean;
        message: string;
    }>;
    login(phone: string, password: string): Promise<{
        success: boolean;
        message: string;
        user?: any;
    }>;
    updateUser(id: number, nickname: string, name: string, phone: string, email: string, password: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
