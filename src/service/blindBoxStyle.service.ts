// src_backend/service/blindBoxStyle.service.ts
import { Provide } from '@midwayjs/core';
import dbPromise from '../database/sqlite';

@Provide()
export class BlindBoxStyleService {
  async addBlindBoxStyles(blindBoxId: number, styles: { name: string; photo: string; probability: number }[]) {
    const db = await dbPromise;
    const insertPromises = styles.map(style => {
      return db.run(`
        INSERT INTO blind_box_styles (blind_box_id, name, photo, probability)
        VALUES (?,?,?,?)
      `, [blindBoxId, style.name, style.photo, style.probability]);
    });
    await Promise.all(insertPromises);
  }

  async getBlindBoxStyles(blindBoxId: number) {
    const db = await dbPromise;
    const styles = await db.all('SELECT * FROM blind_box_styles WHERE blind_box_id =?', [blindBoxId]);
    return styles;
  }

  async randomDraw(blindBoxId: number) {
    const db = await dbPromise;
    const styles = await db.all('SELECT * FROM blind_box_styles WHERE blind_box_id =?', [blindBoxId]);
    const totalProbability = styles.reduce((sum, style) => sum + style.probability, 0);
    const randomValue = Math.random() * totalProbability;
    let cumulativeProbability = 0;
    for (const style of styles) {
      cumulativeProbability += style.probability;
      if (randomValue < cumulativeProbability) {
        return style;
      }
    }
    return null;
  }
}