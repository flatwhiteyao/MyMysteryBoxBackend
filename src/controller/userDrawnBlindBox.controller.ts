import { Controller, Get, Query, Inject, Post, Body } from "@midwayjs/core";
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

    @Post("/user-delete-drawn-blind-box")
    public async deleteUserDrawnBlindBox(@Body("id") id: number) {
        if (!id) {
            return { success: false, message: "缺少id参数" };
        }
        try {
            await this.userDrawnBlindBoxService.deleteUserDrawnBlindBox(id);
            return { success: true };
        } catch (error) {
            return { success: false, message: "删除失败" };
        }
    }
}