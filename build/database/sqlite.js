"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/database/sqlite.ts
const sqlite3_1 = require("sqlite3"); // 修改为正确的导入方式
const sqlite_1 = require("sqlite");
const dbPromise = (0, sqlite_1.open)({
    filename: './database.db',
    driver: sqlite3_1.Database, // 显式类型转换以避免类型问题（如需要）
});
exports.default = dbPromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsaXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RhdGFiYXNlL3NxbGl0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUF5QjtBQUN6QixxQ0FBbUMsQ0FBQyxhQUFhO0FBQ2pELG1DQUE4QjtBQUU5QixNQUFNLFNBQVMsR0FBRyxJQUFBLGFBQUksRUFBQztJQUNyQixRQUFRLEVBQUUsZUFBZTtJQUN6QixNQUFNLEVBQUUsa0JBQWUsRUFBRSxxQkFBcUI7Q0FDL0MsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsU0FBUyxDQUFDIn0=