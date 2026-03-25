import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = path.join(process.cwd(), 'data', 'memes.db')

const dataDir = path.dirname(DB_PATH)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

let db: Database.Database

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    initDb(db)
  }
  return db
}

function initDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS memes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      top_text TEXT NOT NULL,
      bottom_text TEXT NOT NULL,
      template TEXT NOT NULL,
      author TEXT NOT NULL,
      votes INTEGER DEFAULT 0,
      created_at INTEGER DEFAULT (strftime('%s', 'now'))
    );

    CREATE TABLE IF NOT EXISTS votes (
      meme_id TEXT NOT NULL,
      user_session TEXT NOT NULL,
      PRIMARY KEY (meme_id, user_session)
    );
  `)
}