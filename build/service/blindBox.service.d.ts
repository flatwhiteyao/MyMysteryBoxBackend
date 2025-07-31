export declare class BlindBoxService {
    getAllBlindBoxes(): Promise<any[]>;
    searchBlindBoxes(keyword: string): Promise<any[]>;
    addBlindBox(name: string, description: string, price: number, photo: string): Promise<number>;
    deleteBlindBox(id: number): Promise<void>;
    updateBlindBox(id: number, name: string, description: string, price: number, photo: string): Promise<void>;
    getLatestBlindBox(): Promise<any>;
}
