import { Database } from 'sqlite3';
declare const dbPromise: Promise<import("sqlite").Database<Database, import("sqlite3").Statement>>;
export default dbPromise;
