// doubao/backend/service/user.service.ts
import { Provide } from '@midwayjs/core';
import dbPromise from '../database/sqlite';

@Provide()
export class UserService {
  async register(
    nickname: string,
    name: string,
    phone: string,
    email: string,
    password: string,
    role: string
  ) {
    const db = await dbPromise;
    const result = await db.run(
      `
            INSERT INTO users (nickname, name, phone, email, password, role)
            VALUES (?,?,?,?,?,?)
        `,
      [nickname, name, phone, email, password, role]
    );
    return result.lastID;
  }

  async login(phone: string, password: string) {
    const db = await dbPromise;
    const user = await db.get(
      `
            SELECT * FROM users WHERE phone =? AND password =?
        `,
      [phone, password]
    );
    return user;
  }

  async getUser(uid: number) {
    const db = await dbPromise;
    const user = await db.get(
      `
            SELECT * FROM users WHERE id =?
        `,
      [uid]
    );
    return user;
  }

  async updateUser(
    id: number,
    nickname: string,
    name: string,
    phone: string,
    email: string,
    password: string
  ) {
    const db = await dbPromise;
    if (password) {
      await db.run(
        `
                UPDATE users
                SET nickname =?, name =?, phone =?, email =?, password =?
                WHERE id =?
            `,
        [nickname, name, phone, email, password, id]
      );
    } else {
      await db.run(
        `
                UPDATE users
                SET nickname =?, name =?, phone =?, email =?
                WHERE id =?
            `,
        [nickname, name, phone, email, id]
      );
    }
  }
}
