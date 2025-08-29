// src/db/noteModel.ts
import db from "./database";

export async function addNote(
  userID: string | null,
  noteID: Number | null,
  title: string,
  description: string
) {
  try {
    const createdAt = Date.now();
    console.log("noteID", noteID);

    if (noteID) {
      const result = await db.runAsync(
        `UPDATE notes 
                 SET userID=?, title=?, description=?, createdAt=?, isdelete=0, isync=0 
            WHERE note_id=?;`,
        [userID, title, description, createdAt, Number(noteID)]
      );
      return result.lastInsertRowId;
    } else {
      const result = await db.runAsync(
        `INSERT INTO notes (userID, title, description, createdAt, isdelete, isync) 
       VALUES (?, ?, ?, ?, 0, 0);`,
        [userID, title, description, createdAt]
      );
      return result.lastInsertRowId;
    }
  } catch (error) {
    console.error("❌ Error inserting note:", error);
    throw error;
  }
}

export async function syncNotesFromAPI(apiNotes: any[], userToken: string) {
  try {
    await db.withTransactionAsync(async () => {
      for (const note of apiNotes) {
        console.log("note", note);
        const createdAt = Date.now(); // number

        await db.runAsync(
          `INSERT INTO notes (note_id, userID, title, description, isync, createdAt)
           VALUES (?, ?, ?, ?, 1, ?)
            ON CONFLICT(note_id) DO UPDATE SET
             title = excluded.title,
             description = excluded.description,
              isync = 0,
              "createdAt" = excluded.createdAt`,
          [note.note_id, userToken, note.title, note.description, createdAt]
        );
      }
    });
    console.log("✅ Notes synced successfully");
  } catch (err) {
    console.error("❌ Sync error:", err);
  }
}

export async function deleteNotesTable() {
  try {
    await db.execAsync(`
      DROP TABLE IF EXISTS notes;
    `);
    console.log("✅ Notes table deleted");
  } catch (err) {
    console.error("❌ Error deleting notes table:", err);
  }
}

export async function getNotes(userToken: string | null) {
  try {
    const rows = await db.getAllAsync(
      `SELECT description ,note_id , title,createdAt  FROM notes  ORDER BY createdAt desc;`
    );
    return rows; // already an array of objects
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    throw error;
  }
}

export async function getNoteofNotSync(userToken: string | null) {
  console.log("userToken", userToken);
  try {
    const rows = await db.getAllAsync(
      `SELECT 
   note_id,
    userID as user_id,
     title as title,
     description as description,
    createdAt as notes_time
      FROM notes
       WHERE isdelete = 0 
         AND isync = 0 
         AND userID = ? 
       ORDER BY createdAt DESC;`,
      [userToken] // ✅ safely binds the value
    );
    console.log("rows", rows);
    return rows; // already an array of objects
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    throw error;
  }
}

export const updateNoteSyncStatus = async (
  noteId: number,
  syncStatus: number
) => {
  try {
    await db.runAsync(
      `UPDATE notes 
       SET isync = ? 
       WHERE note_id = ?;`,
      [syncStatus, noteId]
    );
    console.log(`Note ${noteId} sync status updated to ${syncStatus}`);
  } catch (err) {
    console.error("❌ Failed to update sync status", err);
    throw err;
  }
};
