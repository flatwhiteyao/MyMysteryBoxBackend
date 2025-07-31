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
exports.UserDrawnBlindBoxController = void 0;
const core_1 = require("@midwayjs/core");
const userDrawnBlindBox_service_1 = require("../service/userDrawnBlindBox.service");
let UserDrawnBlindBoxController = class UserDrawnBlindBoxController {
    async getUserDrawnBlindBoxes(user_id) {
        const drawnBlindBoxes = await this.userDrawnBlindBoxService.getUserDrawnBlindBoxes(user_id);
        return { success: true, drawnBlindBoxes };
    }
    async deleteUserDrawnBlindBox(id) {
        if (!id) {
            return { success: false, message: '缺少id参数' };
        }
        try {
            await this.userDrawnBlindBoxService.deleteUserDrawnBlindBox(id);
            return { success: true };
        }
        catch (error) {
            return { success: false, message: '删除失败' };
        }
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", userDrawnBlindBox_service_1.UserDrawnBlindBoxService)
], UserDrawnBlindBoxController.prototype, "userDrawnBlindBoxService", void 0);
__decorate([
    (0, core_1.Get)('/'),
    __param(0, (0, core_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserDrawnBlindBoxController.prototype, "getUserDrawnBlindBoxes", null);
__decorate([
    (0, core_1.Del)('/:id'),
    __param(0, (0, core_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserDrawnBlindBoxController.prototype, "deleteUserDrawnBlindBox", null);
UserDrawnBlindBoxController = __decorate([
    (0, core_1.Controller)('/user-drawn-blind-boxes')
], UserDrawnBlindBoxController);
exports.UserDrawnBlindBoxController = UserDrawnBlindBoxController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckRyYXduQmxpbmRCb3guY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyL3VzZXJEcmF3bkJsaW5kQm94LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQTRFO0FBQzVFLG9GQUFnRjtBQUd6RSxJQUFNLDJCQUEyQixHQUFqQyxNQUFNLDJCQUEyQjtJQUt6QixBQUFOLEtBQUssQ0FBQyxzQkFBc0IsQ0FBbUIsT0FBZTtRQUNuRSxNQUFNLGVBQWUsR0FDbkIsTUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUdZLEFBQU4sS0FBSyxDQUFDLHVCQUF1QixDQUFjLEVBQVU7UUFDMUQsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNQLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztTQUM5QztRQUNELElBQUk7WUFDRixNQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzFCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7U0FDNUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXRCQztJQUFDLElBQUEsYUFBTSxHQUFFOzhCQUNpQixvREFBd0I7NkVBQUM7QUFHdEM7SUFEWixJQUFBLFVBQUcsRUFBQyxHQUFHLENBQUM7SUFDNEIsV0FBQSxJQUFBLFlBQUssRUFBQyxTQUFTLENBQUMsQ0FBQTs7Ozt5RUFJcEQ7QUFHWTtJQURaLElBQUEsVUFBRyxFQUFDLE1BQU0sQ0FBQztJQUMwQixXQUFBLElBQUEsWUFBSyxFQUFDLElBQUksQ0FBQyxDQUFBOzs7OzBFQVVoRDtBQXRCVSwyQkFBMkI7SUFEdkMsSUFBQSxpQkFBVSxFQUFDLHlCQUF5QixDQUFDO0dBQ3pCLDJCQUEyQixDQXVCdkM7QUF2Qlksa0VBQTJCIn0=