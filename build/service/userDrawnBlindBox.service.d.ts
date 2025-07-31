export declare class UserDrawnBlindBoxService {
    addUserDrawnBlindBox(user_id: number, blind_box_id: number, style_id: number): Promise<void>;
    getUserDrawnBlindBoxes(user_id: number): Promise<any[]>;
    deleteUserDrawnBlindBox(id: number): Promise<void>;
}
