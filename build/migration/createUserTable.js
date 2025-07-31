"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src_backend/migration/createUserTable.ts
const sqlite_1 = require("../database/sqlite");
async function createUserTable() {
    const db = await sqlite_1.default;
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
exports.default = createUserTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlVXNlclRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZ3JhdGlvbi9jcmVhdGVVc2VyVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkM7QUFDM0MsK0NBQTJDO0FBRTNDLEtBQUssVUFBVSxlQUFlO0lBQzVCLE1BQU0sRUFBRSxHQUFHLE1BQU0sZ0JBQVMsQ0FBQztJQUMzQixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7S0FVWCxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsa0JBQWUsZUFBZSxDQUFDIn0=