import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("notes.db");

// Run this once at app start
export async function initDB() {
  console.log("db ==>", db);
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        note_id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID TEXT,
        title TEXT,
        description TEXT,
        isdelete INTEGER DEFAULT 0,
        isync INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT (datetime('now'))
      );
    `);
    console.log("✅ Notes table ready");
  } catch (error) {
    console.error("❌ Error creating table:", error);
  }
}

export default db;
