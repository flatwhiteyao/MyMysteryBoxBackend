"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDrawnBlindBoxService = void 0;
const core_1 = require("@midwayjs/core");
const sqlite_1 = require("../database/sqlite");
let UserDrawnBlindBoxService = class UserDrawnBlindBoxService {
    // 新增：记录用户抽到的盲盒款式
    async addUserDrawnBlindBox(user_id, blind_box_id, style_id) {
        const db = await sqlite_1.default;
        await db.run(`INSERT INTO user_drawn_blind_boxes (user_id, blind_box_id, style_id, drawn_at)
       VALUES (?, ?, ?, datetime('now'))`, [user_id, blind_box_id, style_id]);
    }
    // 查询：用户抽到的所有盲盒款式
    async getUserDrawnBlindBoxes(user_id) {
        const db = await sqlite_1.default;
        // 联表查出盲盒和款式信息
        return await db.all(`SELECT udbb.id, udbb.drawn_at, 
              bb.id as blind_box_id, bb.name as blind_box_name, bb.photo as blind_box_photo,
              s.id as style_id, s.name as style_name, s.photo as style_photo
         FROM user_drawn_blind_boxes udbb
         JOIN blind_boxes bb ON udbb.blind_box_id = bb.id
         JOIN blind_box_styles s ON udbb.style_id = s.id
        WHERE udbb.user_id = ?
        ORDER BY udbb.drawn_at DESC`, [user_id]);
    }
    // 删除：根据id删除用户抽到的盲盒款式
    async deleteUserDrawnBlindBox(id) {
        const db = await sqlite_1.default;
        await db.run('DELETE FROM user_drawn_blind_boxes WHERE id = ?', [id]);
    }
};
UserDrawnBlindBoxService = __decorate([
    (0, core_1.Provide)()
], UserDrawnBlindBoxService);
exports.UserDrawnBlindBoxService = UserDrawnBlindBoxService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckRyYXduQmxpbmRCb3guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3VzZXJEcmF3bkJsaW5kQm94LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXlDO0FBQ3pDLCtDQUEyQztBQUdwQyxJQUFNLHdCQUF3QixHQUE5QixNQUFNLHdCQUF3QjtJQUNuQyxpQkFBaUI7SUFDakIsS0FBSyxDQUFDLG9CQUFvQixDQUN4QixPQUFlLEVBQ2YsWUFBb0IsRUFDcEIsUUFBZ0I7UUFFaEIsTUFBTSxFQUFFLEdBQUcsTUFBTSxnQkFBUyxDQUFDO1FBQzNCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FDVjt5Q0FDbUMsRUFDbkMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUNsQyxDQUFDO0lBQ0osQ0FBQztJQUVELGlCQUFpQjtJQUNqQixLQUFLLENBQUMsc0JBQXNCLENBQUMsT0FBZTtRQUMxQyxNQUFNLEVBQUUsR0FBRyxNQUFNLGdCQUFTLENBQUM7UUFDM0IsY0FBYztRQUNkLE9BQU8sTUFBTSxFQUFFLENBQUMsR0FBRyxDQUNqQjs7Ozs7OztvQ0FPOEIsRUFDOUIsQ0FBQyxPQUFPLENBQUMsQ0FDVixDQUFDO0lBQ0osQ0FBQztJQUVELHFCQUFxQjtJQUNyQixLQUFLLENBQUMsdUJBQXVCLENBQUMsRUFBVTtRQUN0QyxNQUFNLEVBQUUsR0FBRyxNQUFNLGdCQUFTLENBQUM7UUFDM0IsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0NBQ0YsQ0FBQTtBQXJDWSx3QkFBd0I7SUFEcEMsSUFBQSxjQUFPLEdBQUU7R0FDRyx3QkFBd0IsQ0FxQ3BDO0FBckNZLDREQUF3QiJ9