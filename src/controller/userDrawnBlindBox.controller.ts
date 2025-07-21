import { Controller, Get, Query, Inject } from "@midwayjs/core";
import { UserDrawnBlindBoxService } from "../service/userDrawnBlindBox.service";

@Controller("/user-drawn-blind-boxes")
export class UserDrawnBlindBoxController {
    @Inject()
    userDrawnBlindBoxService: UserDrawnBlindBoxService;

    @Get("/")
    public async getUserDrawnBlindBoxes(@Query("user_id") user_id: number) {
        const drawnBlindBoxes = await this.userDrawnBlindBoxService.getUserDrawnBlindBoxes(user_id);
        return { success: true, drawnBlindBoxes };
    }
}