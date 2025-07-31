"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerShowController = void 0;
const core_1 = require("@midwayjs/core");
const playerShow_service_1 = require("../service/playerShow.service");
const user_service_1 = require("../service/user.service");
let PlayerShowController = class PlayerShowController {
    // 创建玩家秀
    async createPlayerShow(user_id, blind_box_id, content, images, rating) {
        try {
            await this.playerShowService.createPlayerShow(user_id, blind_box_id, content, images, rating);
            return { success: true };
        }
        catch (e) {
            return { success: false, message: e.message };
        }
    }
    // 获取玩家秀列表
    async getPlayerShowList() {
        const list = await this.playerShowService.getPlayerShowList();
        return { success: true, list };
    }
    // 获取玩家秀详情
    async getPlayerShowDetail(id) {
        const detail = await this.playerShowService.getPlayerShowDetail(id);
        if (!detail)
            return { success: false, message: '未找到玩家秀' };
        return { success: true, detail };
    }
    // 删除玩家秀
    async deletePlayerShow(id, user_id, is_admin) {
        try {
            await this.playerShowService.deletePlayerShow(id, user_id, is_admin);
            return { success: true };
        }
        catch (e) {
            return { success: false, message: '删除失败' };
        }
    }
    // 获取玩家秀排行榜（盲盒平均分排行）
    async getBlindBoxRanking(limit) {
        const ranking = await this.playerShowService.getBlindBoxRanking(limit || 10);
        return { success: true, ranking };
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", playerShow_service_1.PlayerShowService)
], PlayerShowController.prototype, "playerShowService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], PlayerShowController.prototype, "userService", void 0);
__decorate([
    (0, core_1.Post)('/'),
    __param(0, (0, core_1.Body)('user_id')),
    __param(1, (0, core_1.Body)('blind_box_id')),
    __param(2, (0, core_1.Body)('content')),
    __param(3, (0, core_1.Body)('images')),
    __param(4, (0, core_1.Body)('rating')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Array, Number]),
    __metadata("design:returntype", Promise)
], PlayerShowController.prototype, "createPlayerShow", null);
__decorate([
    (0, core_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayerShowController.prototype, "getPlayerShowList", null);
__decorate([
    (0, core_1.Get)('/:id'),
    __param(0, (0, core_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlayerShowController.prototype, "getPlayerShowDetail", null);
__decorate([
    (0, core_1.Del)('/:id'),
    __param(0, (0, core_1.Param)('id')),
    __param(1, (0, core_1.Query)('user_id')),
    __param(2, (0, core_1.Query)('is_admin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean]),
    __metadata("design:returntype", Promise)
], PlayerShowController.prototype, "deletePlayerShow", null);
__decorate([
    (0, core_1.Get)('/ranking'),
    __param(0, (0, core_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlayerShowController.prototype, "getBlindBoxRanking", null);
PlayerShowController = __decorate([
    (0, core_1.Controller)('/player-shows')
], PlayerShowController);
exports.PlayerShowController = PlayerShowController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyU2hvdy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvcGxheWVyU2hvdy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQVN3QjtBQUN4QixzRUFBa0U7QUFDbEUsMERBQXNEO0FBRy9DLElBQU0sb0JBQW9CLEdBQTFCLE1BQU0sb0JBQW9CO0lBTy9CLFFBQVE7SUFFRixBQUFOLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDSCxPQUFlLEVBQ1YsWUFBb0IsRUFDekIsT0FBZSxFQUNoQixNQUFnQixFQUNoQixNQUFjO1FBRTlCLElBQUk7WUFDRixNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FDM0MsT0FBTyxFQUNQLFlBQVksRUFDWixPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUMxQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRCxVQUFVO0lBRUosQUFBTixLQUFLLENBQUMsaUJBQWlCO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELFVBQVU7SUFFSixBQUFOLEtBQUssQ0FBQyxtQkFBbUIsQ0FBYyxFQUFVO1FBQy9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxRQUFRO0lBRUYsQUFBTixLQUFLLENBQUMsZ0JBQWdCLENBQ1AsRUFBVSxFQUNMLE9BQWUsRUFDZCxRQUFpQjtRQUVwQyxJQUFJO1lBQ0YsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzFCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsb0JBQW9CO0lBRWQsQUFBTixLQUFLLENBQUMsa0JBQWtCLENBQWlCLEtBQWE7UUFDcEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQzdELEtBQUssSUFBSSxFQUFFLENBQ1osQ0FBQztRQUNGLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3BDLENBQUM7Q0FDRixDQUFBO0FBbkVDO0lBQUMsSUFBQSxhQUFNLEdBQUU7OEJBQ1Usc0NBQWlCOytEQUFDO0FBRXJDO0lBQUMsSUFBQSxhQUFNLEdBQUU7OEJBQ0ksMEJBQVc7eURBQUM7QUFJbkI7SUFETCxJQUFBLFdBQUksRUFBQyxHQUFHLENBQUM7SUFFUCxXQUFBLElBQUEsV0FBSSxFQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2YsV0FBQSxJQUFBLFdBQUksRUFBQyxjQUFjLENBQUMsQ0FBQTtJQUNwQixXQUFBLElBQUEsV0FBSSxFQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2YsV0FBQSxJQUFBLFdBQUksRUFBQyxRQUFRLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxXQUFJLEVBQUMsUUFBUSxDQUFDLENBQUE7Ozs7NERBY2hCO0FBSUs7SUFETCxJQUFBLFVBQUcsRUFBQyxHQUFHLENBQUM7Ozs7NkRBSVI7QUFJSztJQURMLElBQUEsVUFBRyxFQUFDLE1BQU0sQ0FBQztJQUNlLFdBQUEsSUFBQSxZQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7K0RBSXJDO0FBSUs7SUFETCxJQUFBLFVBQUcsRUFBQyxNQUFNLENBQUM7SUFFVCxXQUFBLElBQUEsWUFBSyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQ1gsV0FBQSxJQUFBLFlBQUssRUFBQyxTQUFTLENBQUMsQ0FBQTtJQUNoQixXQUFBLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFBOzs7OzREQVFuQjtBQUlLO0lBREwsSUFBQSxVQUFHLEVBQUMsVUFBVSxDQUFDO0lBQ1UsV0FBQSxJQUFBLFlBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTs7Ozs4REFLdkM7QUFuRVUsb0JBQW9CO0lBRGhDLElBQUEsaUJBQVUsRUFBQyxlQUFlLENBQUM7R0FDZixvQkFBb0IsQ0FvRWhDO0FBcEVZLG9EQUFvQiJ9