import dbPromise from '../database/sqlite';

async function createUserDrawnBlindBoxTable() {
    const db = await dbPromise;
    await db.exec(`
    CREATE TABLE IF NOT EXISTS user_drawn_blind_boxes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        blind_box_id INTEGER,
        style_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (blind_box_id) REFERENCES blind_boxes(id),
        FOREIGN KEY (style_id) REFERENCES blind_box_styles(id)
    )
    `);
}

export default createUserDrawnBlindBoxTable;