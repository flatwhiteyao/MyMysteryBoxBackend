"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src_backend/migration/createBlindBoxTable.ts
const sqlite_1 = require("../database/sqlite");
async function createBlindBoxTable() {
    const db = await sqlite_1.default;
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
exports.default = createBlindBoxTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQmxpbmRCb3hUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWdyYXRpb24vY3JlYXRlQmxpbmRCb3hUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUErQztBQUMvQywrQ0FBMkM7QUFFM0MsS0FBSyxVQUFVLG1CQUFtQjtJQUNoQyxNQUFNLEVBQUUsR0FBRyxNQUFNLGdCQUFTLENBQUM7SUFDM0IsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDOzs7Ozs7OztLQVFYLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxrQkFBZSxtQkFBbUIsQ0FBQyJ9