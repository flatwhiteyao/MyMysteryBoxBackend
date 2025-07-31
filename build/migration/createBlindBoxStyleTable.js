"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src_backend/migration/createBlindBoxStyleTable.ts
const sqlite_1 = require("../database/sqlite");
async function createBlindBoxStyleTable() {
    const db = await sqlite_1.default;
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
exports.default = createBlindBoxStyleTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQmxpbmRCb3hTdHlsZVRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZ3JhdGlvbi9jcmVhdGVCbGluZEJveFN0eWxlVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvREFBb0Q7QUFDcEQsK0NBQTJDO0FBRTNDLEtBQUssVUFBVSx3QkFBd0I7SUFDckMsTUFBTSxFQUFFLEdBQUcsTUFBTSxnQkFBUyxDQUFDO0lBQzNCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0tBU1gsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELGtCQUFlLHdCQUF3QixDQUFDIn0=