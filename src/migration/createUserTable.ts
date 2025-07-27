// src_backend/migration/createUserTable.ts
import dbPromise from '../database/sqlite';

async function createUserTable() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nickname TEXT,
        name TEXT,
        phone TEXT UNIQUE,
        email TEXT,
        password TEXT,
        role TEXT DEFAULT 'user'
    )
    `);
}

export default createUserTable;
