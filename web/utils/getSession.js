import sqlite3 from "sqlite3";
import { open } from "sqlite";

// open database connection
const dbPromise = open({
  filename: "./database.sqlite",
  driver: sqlite3.Database,
});

export default async function findLatestSessionByShop(shop) {
  try {
    const db = await dbPromise;
    const row = await db.get(
      `SELECT * 
       FROM shopify_sessions 
       WHERE shop = ? 
       LIMIT 1`,
      [shop]
    );

    return row || null;
  } catch (err) {
    console.error("Error finding latest session by shop:", err);
    return null;
  }
}
