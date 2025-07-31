export declare class BlindBoxStyleService {
    addBlindBoxStyles(blindBoxId: number, styles: {
        name: string;
        photo: string;
        probability: number;
    }[]): Promise<void>;
    getBlindBoxStyles(blindBoxId: number): Promise<any[]>;
    randomDraw(blindBoxId: number): Promise<any>;
}
