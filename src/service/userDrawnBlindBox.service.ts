import { Provide } from '@midwayjs/core';
import dbPromise from '../database/sqlite';

@Provide()
export class UserDrawnBlindBoxService {
  // 新增：记录用户抽到的盲盒款式
  async addUserDrawnBlindBox(user_id: number, blind_box_id: number, style_id: number) {
    const db = await dbPromise;
    await db.run(
      `INSERT INTO user_drawn_blind_boxes (user_id, blind_box_id, style_id, drawn_at)
       VALUES (?, ?, ?, datetime('now'))`,
      [user_id, blind_box_id, style_id]
    );
  }

  // 查询：用户抽到的所有盲盒款式
  async getUserDrawnBlindBoxes(user_id: number) {
    const db = await dbPromise;
    // 联表查出盲盒和款式信息
    return await db.all(
      `SELECT udbb.id, udbb.drawn_at, 
              bb.id as blind_box_id, bb.name as blind_box_name, bb.photo as blind_box_photo,
              s.id as style_id, s.name as style_name, s.photo as style_photo
         FROM user_drawn_blind_boxes udbb
         JOIN blind_boxes bb ON udbb.blind_box_id = bb.id
         JOIN blind_box_styles s ON udbb.style_id = s.id
        WHERE udbb.user_id = ?
        ORDER BY udbb.drawn_at DESC`,
      [user_id]
    );
  }
}