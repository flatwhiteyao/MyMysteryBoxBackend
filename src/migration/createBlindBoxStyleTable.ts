// src_backend/migration/createBlindBoxStyleTable.ts
import dbPromise from '../database/sqlite';

async function createBlindBoxStyleTable() {
    const db = await dbPromise;
    await db.exec(`
    CREATE TABLE IF NOT EXISTS blind_box_styles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        blind_box_id INTEGER,
        name TEXT,
        photo TEXT,
        probability REAL,
        FOREIGN KEY (blind_box_id) REFERENCES blind_boxes(id)
    )
    `);
}

export default createBlindBoxStyleTable;