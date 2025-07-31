"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerShowService = void 0;
const core_1 = require("@midwayjs/core");
const sqlite_1 = require("../database/sqlite");
let PlayerShowService = class PlayerShowService {
    // 创建玩家秀
    async createPlayerShow(user_id, blind_box_id, content, images, rating) {
        const db = await sqlite_1.default;
        // 检查盲盒是否存在
        const blindBox = await db.get('SELECT id FROM blind_boxes WHERE id = ?', [
            blind_box_id,
        ]);
        if (!blindBox)
            throw new Error('盲盒不存在');
        await db.run('INSERT INTO player_shows (user_id, blind_box_id, content, images, rating) VALUES (?, ?, ?, ?, ?)', [user_id, blind_box_id, content, JSON.stringify(images || []), rating]);
    }
    // 获取玩家秀列表（带用户昵称和盲盒信息）
    async getPlayerShowList() {
        const db = await sqlite_1.default;
        return await db.all(`
      SELECT ps.*, u.nickname as user_nickname, bb.name as blind_box_name, bb.photo as blind_box_photo
      FROM player_shows ps
      JOIN users u ON ps.user_id = u.id
      JOIN blind_boxes bb ON ps.blind_box_id = bb.id
      ORDER BY ps.created_at DESC
    `);
    }
    // 获取玩家秀详情
    async getPlayerShowDetail(id) {
        const db = await sqlite_1.default;
        return await db.get(`
      SELECT ps.*, u.nickname as user_nickname, bb.name as blind_box_name, bb.photo as blind_box_photo
      FROM player_shows ps
      JOIN users u ON ps.user_id = u.id
      JOIN blind_boxes bb ON ps.blind_box_id = bb.id
      WHERE ps.id = ?
    `, [id]);
    }
    // 删除玩家秀（管理员或本人）
    async deletePlayerShow(id, user_id, isAdmin) {
        const db = await sqlite_1.default;
        if (isAdmin) {
            await db.run('DELETE FROM player_shows WHERE id = ?', [id]);
        }
        else {
            await db.run('DELETE FROM player_shows WHERE id = ? AND user_id = ?', [
                id,
                user_id,
            ]);
        }
    }
    // 获取盲盒排行榜（按平均评分降序）
    async getBlindBoxRanking(limit = 10) {
        const db = await sqlite_1.default;
        return await db.all(`
      SELECT bb.id, bb.name, bb.photo, bb.description, AVG(ps.rating) as avg_rating, COUNT(ps.id) as show_count
      FROM blind_boxes bb
      JOIN player_shows ps ON bb.id = ps.blind_box_id
      GROUP BY bb.id
      HAVING show_count > 0
      ORDER BY avg_rating DESC, show_count DESC
      LIMIT ?
    `, [limit]);
    }
};
PlayerShowService = __decorate([
    (0, core_1.Provide)()
], PlayerShowService);
exports.PlayerShowService = PlayerShowService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyU2hvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvcGxheWVyU2hvdy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUF5QztBQUN6QywrQ0FBMkM7QUFHcEMsSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBaUI7SUFDNUIsUUFBUTtJQUNSLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDcEIsT0FBZSxFQUNmLFlBQW9CLEVBQ3BCLE9BQWUsRUFDZixNQUFnQixFQUNoQixNQUFjO1FBRWQsTUFBTSxFQUFFLEdBQUcsTUFBTSxnQkFBUyxDQUFDO1FBQzNCLFdBQVc7UUFDWCxNQUFNLFFBQVEsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMseUNBQXlDLEVBQUU7WUFDdkUsWUFBWTtTQUNiLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQ1Ysa0dBQWtHLEVBQ2xHLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQ3ZFLENBQUM7SUFDSixDQUFDO0lBRUQsc0JBQXNCO0lBQ3RCLEtBQUssQ0FBQyxpQkFBaUI7UUFDckIsTUFBTSxFQUFFLEdBQUcsTUFBTSxnQkFBUyxDQUFDO1FBQzNCLE9BQU8sTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDOzs7Ozs7S0FNbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVU7SUFDVixLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBVTtRQUNsQyxNQUFNLEVBQUUsR0FBRyxNQUFNLGdCQUFTLENBQUM7UUFDM0IsT0FBTyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQ2pCOzs7Ozs7S0FNRCxFQUNDLENBQUMsRUFBRSxDQUFDLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQVUsRUFBRSxPQUFnQixFQUFFLE9BQWlCO1FBQ3BFLE1BQU0sRUFBRSxHQUFHLE1BQU0sZ0JBQVMsQ0FBQztRQUMzQixJQUFJLE9BQU8sRUFBRTtZQUNYLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7YUFBTTtZQUNMLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsRUFBRTtnQkFDcEUsRUFBRTtnQkFDRixPQUFPO2FBQ1IsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsbUJBQW1CO0lBQ25CLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUNqQyxNQUFNLEVBQUUsR0FBRyxNQUFNLGdCQUFTLENBQUM7UUFDM0IsT0FBTyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQ2pCOzs7Ozs7OztLQVFELEVBQ0MsQ0FBQyxLQUFLLENBQUMsQ0FDUixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUE3RVksaUJBQWlCO0lBRDdCLElBQUEsY0FBTyxHQUFFO0dBQ0csaUJBQWlCLENBNkU3QjtBQTdFWSw4Q0FBaUIifQ==