// src/database/sqlite.ts
import { Database } from 'sqlite3'; // 修改为正确的导入方式
import { open } from 'sqlite';

const dbPromise = open({
  filename: './database.db', // 数据库文件路径
  driver: Database as any, // 显式类型转换以避免类型问题（如需要）
});

export default dbPromise;
