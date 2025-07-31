export declare class PlayerShowService {
    createPlayerShow(user_id: number, blind_box_id: number, content: string, images: string[], rating: number): Promise<void>;
    getPlayerShowList(): Promise<any[]>;
    getPlayerShowDetail(id: number): Promise<any>;
    deletePlayerShow(id: number, user_id?: number, isAdmin?: boolean): Promise<void>;
    getBlindBoxRanking(limit?: number): Promise<any[]>;
}
