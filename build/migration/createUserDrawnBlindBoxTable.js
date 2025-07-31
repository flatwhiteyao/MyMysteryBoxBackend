"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite_1 = require("../database/sqlite");
async function createUserDrawnBlindBoxTable() {
    const db = await sqlite_1.default;
    await db.exec(`
    CREATE TABLE IF NOT EXISTS user_drawn_blind_boxes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        blind_box_id INTEGER NOT NULL,
        style_id INTEGER NOT NULL,
        drawn_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (blind_box_id) REFERENCES blind_boxes(id),
        FOREIGN KEY (style_id) REFERENCES blind_box_styles(id)
    )
    `);
}
exports.default = createUserDrawnBlindBoxTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlVXNlckRyYXduQmxpbmRCb3hUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWdyYXRpb24vY3JlYXRlVXNlckRyYXduQmxpbmRCb3hUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUEyQztBQUUzQyxLQUFLLFVBQVUsNEJBQTRCO0lBQ3pDLE1BQU0sRUFBRSxHQUFHLE1BQU0sZ0JBQVMsQ0FBQztJQUMzQixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O0tBV1gsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELGtCQUFlLDRCQUE0QixDQUFDIn0=