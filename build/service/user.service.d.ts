export declare class UserService {
    register(nickname: string, name: string, phone: string, email: string, password: string, role: string): Promise<number>;
    login(phone: string, password: string): Promise<any>;
    getUser(uid: number): Promise<any>;
    updateUser(id: number, nickname: string, name: string, phone: string, email: string, password: string): Promise<void>;
}
