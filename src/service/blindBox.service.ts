// src_backend/service/blindBox.service.ts
import { Provide } from '@midwayjs/core';
import dbPromise from '../database/sqlite';

@Provide()
export class BlindBoxService {
  async getAllBlindBoxes() {
    const db = await dbPromise;
    const blindBoxes = await db.all('SELECT * FROM blind_boxes');
    return blindBoxes;
  }

  async searchBlindBoxes(keyword: string) {
    const db = await dbPromise;
    const searchKeyword = `%${keyword}%`;
    const blindBoxes = await db.all(`
      SELECT * FROM blind_boxes 
      WHERE name LIKE ? OR description LIKE ?
      ORDER BY id DESC
    `, [searchKeyword, searchKeyword]);
    return blindBoxes;
  }

  async addBlindBox(name: string, description: string, price: number, photo: string) {
    const db = await dbPromise;
    const result = await db.run(`
      INSERT INTO blind_boxes (name, description, price, photo)
      VALUES (?,?,?,?)
    `, [name, description, price, photo]);
    return result.lastID;
  }

  async deleteBlindBox(id: number) {
    const db = await dbPromise;
    await db.run('DELETE FROM blind_boxes WHERE id =?', [id]);
  }

  async updateBlindBox(id: number, name: string, description: string, price: number, photo: string) {
    const db = await dbPromise;
    if (photo) {
      await db.run(`
        UPDATE blind_boxes
        SET name =?, description =?, price =?, photo =?
        WHERE id =?
      `, [name, description, price, photo, id]);
    } else {
      await db.run(`
        UPDATE blind_boxes
        SET name =?, description =?, price =?
        WHERE id =?
      `, [name, description, price, id]);
    }
  }

  async getLatestBlindBox() {
    const db = await dbPromise;
    return await db.get('SELECT * FROM blind_boxes ORDER BY id DESC LIMIT 1');
  }
}