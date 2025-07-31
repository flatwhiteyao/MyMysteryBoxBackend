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
exports.UserController = void 0;
// doubao/backend/controller/user.controller.ts
const core_1 = require("@midwayjs/core");
const user_service_1 = require("../service/user.service");
let UserController = class UserController {
    async register(nickname, name, phone, email, password, confirmPassword, role) {
        if (password !== confirmPassword) {
            return { success: false, message: '两次输入的密码不一致' };
        }
        try {
            await this.userService.register(nickname, name, phone, email, password, role);
            return { success: true, message: '注册成功' };
        }
        catch (error) {
            return { success: false, message: '注册失败，手机号可能已被注册' };
        }
    }
    async login(phone, password) {
        const user = await this.userService.login(phone, password);
        if (user) {
            return { success: true, message: '登录成功', user };
        }
        else {
            return { success: false, message: '手机号或密码错误' };
        }
    }
    async updateUser(id, nickname, name, phone, email, password) {
        try {
            await this.userService.updateUser(id, nickname, name, phone, email, password);
            return { success: true, message: '个人信息更新成功' };
        }
        catch (error) {
            return { success: false, message: '更新失败，请稍后重试' };
        }
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], UserController.prototype, "userService", void 0);
__decorate([
    (0, core_1.Post)('/register'),
    __param(0, (0, core_1.Body)('nickname')),
    __param(1, (0, core_1.Body)('name')),
    __param(2, (0, core_1.Body)('phone')),
    __param(3, (0, core_1.Body)('email')),
    __param(4, (0, core_1.Body)('password')),
    __param(5, (0, core_1.Body)('confirmPassword')),
    __param(6, (0, core_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, core_1.Post)('/login'),
    __param(0, (0, core_1.Body)('phone')),
    __param(1, (0, core_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, core_1.Post)('/update'),
    __param(0, (0, core_1.Body)('id')),
    __param(1, (0, core_1.Body)('nickname')),
    __param(2, (0, core_1.Body)('name')),
    __param(3, (0, core_1.Body)('phone')),
    __param(4, (0, core_1.Body)('email')),
    __param(5, (0, core_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
UserController = __decorate([
    (0, core_1.Controller)('/user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvdXNlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUErQztBQUMvQyx5Q0FBZ0U7QUFDaEUsMERBQXNEO0FBRy9DLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFLWixBQUFOLEtBQUssQ0FBQyxRQUFRLENBQ0QsUUFBZ0IsRUFDcEIsSUFBWSxFQUNYLEtBQWEsRUFDYixLQUFhLEVBQ1YsUUFBZ0IsRUFDVCxlQUF1QixFQUNsQyxJQUFZO1FBRTFCLElBQUksUUFBUSxLQUFLLGVBQWUsRUFBRTtZQUNoQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUM7U0FDbEQ7UUFDRCxJQUFJO1lBQ0YsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FDN0IsUUFBUSxFQUNSLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLFFBQVEsRUFDUixJQUFJLENBQ0wsQ0FBQztZQUNGLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUMzQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBR1ksQUFBTixLQUFLLENBQUMsS0FBSyxDQUNELEtBQWEsRUFDVixRQUFnQjtRQUVsQyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzRCxJQUFJLElBQUksRUFBRTtZQUNSLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDakQ7YUFBTTtZQUNMLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFHWSxBQUFOLEtBQUssQ0FBQyxVQUFVLENBQ1QsRUFBVSxFQUNKLFFBQWdCLEVBQ3BCLElBQVksRUFDWCxLQUFhLEVBQ2IsS0FBYSxFQUNWLFFBQWdCO1FBRWxDLElBQUk7WUFDRixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUMvQixFQUFFLEVBQ0YsUUFBUSxFQUNSLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLFFBQVEsQ0FDVCxDQUFDO1lBQ0YsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO1NBQy9DO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQW5FQztJQUFDLElBQUEsYUFBTSxHQUFFOzhCQUNJLDBCQUFXO21EQUFDO0FBR1o7SUFEWixJQUFBLFdBQUksRUFBQyxXQUFXLENBQUM7SUFFZixXQUFBLElBQUEsV0FBSSxFQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2hCLFdBQUEsSUFBQSxXQUFJLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFDWixXQUFBLElBQUEsV0FBSSxFQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2IsV0FBQSxJQUFBLFdBQUksRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNiLFdBQUEsSUFBQSxXQUFJLEVBQUMsVUFBVSxDQUFDLENBQUE7SUFDaEIsV0FBQSxJQUFBLFdBQUksRUFBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3ZCLFdBQUEsSUFBQSxXQUFJLEVBQUMsTUFBTSxDQUFDLENBQUE7Ozs7OENBa0JkO0FBR1k7SUFEWixJQUFBLFdBQUksRUFBQyxRQUFRLENBQUM7SUFFWixXQUFBLElBQUEsV0FBSSxFQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2IsV0FBQSxJQUFBLFdBQUksRUFBQyxVQUFVLENBQUMsQ0FBQTs7OzsyQ0FRbEI7QUFHWTtJQURaLElBQUEsV0FBSSxFQUFDLFNBQVMsQ0FBQztJQUViLFdBQUEsSUFBQSxXQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDVixXQUFBLElBQUEsV0FBSSxFQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2hCLFdBQUEsSUFBQSxXQUFJLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFDWixXQUFBLElBQUEsV0FBSSxFQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2IsV0FBQSxJQUFBLFdBQUksRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNiLFdBQUEsSUFBQSxXQUFJLEVBQUMsVUFBVSxDQUFDLENBQUE7Ozs7Z0RBZWxCO0FBbkVVLGNBQWM7SUFEMUIsSUFBQSxpQkFBVSxFQUFDLE9BQU8sQ0FBQztHQUNQLGNBQWMsQ0FvRTFCO0FBcEVZLHdDQUFjIn0=