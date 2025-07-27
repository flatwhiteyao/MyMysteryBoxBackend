import dbPromise from '../database/sqlite';

async function createPlayerShowTable() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS player_shows (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        blind_box_id INTEGER,
        content TEXT,
        images TEXT, -- 存储 JSON 数组字符串
        rating INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (blind_box_id) REFERENCES blind_boxes(id)
    )
    `);
}

export default createPlayerShowTable;
