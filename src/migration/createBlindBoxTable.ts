// src_backend/migration/createBlindBoxTable.ts
import dbPromise from '../database/sqlite';

async function createBlindBoxTable() {
    const db = await dbPromise;
    await db.exec(`
    CREATE TABLE IF NOT EXISTS blind_boxes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL,
        photo TEXT
    )
    `);
}

export default createBlindBoxTable;