"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite_1 = require("../database/sqlite");
async function createPlayerShowTable() {
    const db = await sqlite_1.default;
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
exports.default = createPlayerShowTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUGxheWVyU2hvd1RhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZ3JhdGlvbi9jcmVhdGVQbGF5ZXJTaG93VGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBMkM7QUFFM0MsS0FBSyxVQUFVLHFCQUFxQjtJQUNsQyxNQUFNLEVBQUUsR0FBRyxNQUFNLGdCQUFTLENBQUM7SUFDM0IsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7S0FZWCxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsa0JBQWUscUJBQXFCLENBQUMifQ==