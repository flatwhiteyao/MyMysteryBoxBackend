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
exports.ApiController = void 0;
// src/controller/api.controller.ts
const core_1 = require("@midwayjs/core");
const user_service_1 = require("../service/user.service");
let ApiController = class ApiController {
    async getUser(uid) {
        try {
            // 直接传递 uid 的值，而不是 { uid } 对象
            const user = await this.userService.getUser(uid);
            if (user) {
                return { success: true, user };
            }
            else {
                return { success: false, message: '用户不存在' };
            }
        }
        catch (error) {
            return { success: false, message: '获取用户信息失败' };
        }
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], ApiController.prototype, "userService", void 0);
__decorate([
    (0, core_1.Get)('/user'),
    __param(0, (0, core_1.Query)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getUser", null);
ApiController = __decorate([
    (0, core_1.Controller)('/api')
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlci9hcGkuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBbUM7QUFDbkMseUNBQWdFO0FBQ2hFLDBEQUFzRDtBQUcvQyxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBS1gsQUFBTixLQUFLLENBQUMsT0FBTyxDQUFlLEdBQVc7UUFDNUMsSUFBSTtZQUNGLDZCQUE2QjtZQUM3QixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pELElBQUksSUFBSSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUM3QztTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWpCQztJQUFDLElBQUEsYUFBTSxHQUFFOzhCQUNJLDBCQUFXO2tEQUFDO0FBR1o7SUFEWixJQUFBLFVBQUcsRUFBQyxPQUFPLENBQUM7SUFDUyxXQUFBLElBQUEsWUFBSyxFQUFDLEtBQUssQ0FBQyxDQUFBOzs7OzRDQVlqQztBQWpCVSxhQUFhO0lBRHpCLElBQUEsaUJBQVUsRUFBQyxNQUFNLENBQUM7R0FDTixhQUFhLENBa0J6QjtBQWxCWSxzQ0FBYSJ9