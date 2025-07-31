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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const core_1 = require("@midwayjs/core");
const playerShow_service_1 = require("../service/playerShow.service");
const blindBox_service_1 = require("../service/blindBox.service");
const path_1 = require("path");
const fs = require("fs");
let HomeController = class HomeController {
    async home() {
        try {
            // 返回前端页面
            const indexPath = (0, path_1.join)(__dirname, '../public/index.html');
            console.log('Index path:', indexPath);
            console.log('File exists:', fs.existsSync(indexPath));
            const content = fs.readFileSync(indexPath, 'utf8');
            console.log('File content length:', content.length);
            return content;
        }
        catch (error) {
            console.log('Error reading file:', error.message);
            console.log('Error stack:', error.stack);
            return 'Hello Midwayjs! (Fallback)';
        }
    }
    async getRanking() {
        const ranking = await this.playerShowService.getBlindBoxRanking(10);
        return { success: true, ranking };
    }
    async getAd() {
        const latest = await this.blindBoxService.getLatestBlindBox();
        if (!latest) {
            return { success: false, message: '暂无广告' };
        }
        return { success: true, ad: latest };
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", playerShow_service_1.PlayerShowService)
], HomeController.prototype, "playerShowService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", blindBox_service_1.BlindBoxService)
], HomeController.prototype, "blindBoxService", void 0);
__decorate([
    (0, core_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "home", null);
__decorate([
    (0, core_1.Get)('/ranking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getRanking", null);
__decorate([
    (0, core_1.Get)('/ad'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getAd", null);
HomeController = __decorate([
    (0, core_1.Controller)('/')
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvaG9tZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF5RDtBQUN6RCxzRUFBa0U7QUFDbEUsa0VBQThEO0FBQzlELCtCQUE0QjtBQUM1Qix5QkFBeUI7QUFHbEIsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBYztJQVFuQixBQUFOLEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBSTtZQUNGLFNBQVM7WUFDVCxNQUFNLFNBQVMsR0FBRyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUN6RCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzNDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLDRCQUE0QixDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzlELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7U0FDNUM7UUFDRCxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDdkMsQ0FBQztDQUNGLENBQUE7QUEvQkM7SUFBQyxJQUFBLGFBQU0sR0FBRTs4QkFDVSxzQ0FBaUI7eURBQUM7QUFFckM7SUFBQyxJQUFBLGFBQU0sR0FBRTs4QkFDUSxrQ0FBZTt1REFBQztBQUczQjtJQURMLElBQUEsVUFBRyxFQUFDLEdBQUcsQ0FBQzs7OzswQ0FTUjtBQUdLO0lBREwsSUFBQSxVQUFHLEVBQUMsVUFBVSxDQUFDOzs7O2dEQUlmO0FBR0s7SUFETCxJQUFBLFVBQUcsRUFBQyxLQUFLLENBQUM7Ozs7MkNBT1Y7QUEvQlUsY0FBYztJQUQxQixJQUFBLGlCQUFVLEVBQUMsR0FBRyxDQUFDO0dBQ0gsY0FBYyxDQWdDMUI7QUFoQ1ksd0NBQWMifQ==