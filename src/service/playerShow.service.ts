import { Provide } from '@midwayjs/core';
import dbPromise from '../database/sqlite';

@Provide()
export class PlayerShowService {
  // 创建玩家秀
  async createPlayerShow(user_id: number, blind_box_id: number, content: string, images: string[], rating: number) {
    const db = await dbPromise;
    // 检查盲盒是否存在
    const blindBox = await db.get('SELECT id FROM blind_boxes WHERE id = ?', [blind_box_id]);
    if (!blindBox) throw new Error('盲盒不存在');
    await db.run(
      `INSERT INTO player_shows (user_id, blind_box_id, content, images, rating) VALUES (?, ?, ?, ?, ?)`,
      [user_id, blind_box_id, content, JSON.stringify(images || []), rating]
    );
  }

  // 获取玩家秀列表（带用户昵称和盲盒信息）
  async getPlayerShowList() {
    const db = await dbPromise;
    return await db.all(`
      SELECT ps.*, u.nickname as user_nickname, bb.name as blind_box_name, bb.photo as blind_box_photo
      FROM player_shows ps
      JOIN users u ON ps.user_id = u.id
      JOIN blind_boxes bb ON ps.blind_box_id = bb.id
      ORDER BY ps.created_at DESC
    `);
  }

  // 获取玩家秀详情
  async getPlayerShowDetail(id: number) {
    const db = await dbPromise;
    return await db.get(`
      SELECT ps.*, u.nickname as user_nickname, bb.name as blind_box_name, bb.photo as blind_box_photo
      FROM player_shows ps
      JOIN users u ON ps.user_id = u.id
      JOIN blind_boxes bb ON ps.blind_box_id = bb.id
      WHERE ps.id = ?
    `, [id]);
  }

  // 删除玩家秀（管理员或本人）
  async deletePlayerShow(id: number, user_id?: number, isAdmin?: boolean) {
    const db = await dbPromise;
    if (isAdmin) {
      await db.run('DELETE FROM player_shows WHERE id = ?', [id]);
    } else {
      await db.run('DELETE FROM player_shows WHERE id = ? AND user_id = ?', [id, user_id]);
    }
  }

  // 获取盲盒排行榜（按平均评分降序）
  async getBlindBoxRanking(limit: number = 10) {
    const db = await dbPromise;
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
} 