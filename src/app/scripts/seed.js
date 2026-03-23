const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const DB_PATH = path.join(process.cwd(), 'data', 'memes.db')
const dataDir = path.dirname(DB_PATH)

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')

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

const existing = db.prepare('SELECT COUNT(*) as count FROM memes').get()
if (existing.count > 0) {
  console.log('Banco já tem dados, pulando seed.')
  process.exit(0)
}

const memes = [
  { title: 'Sexta 17h58', top_text: 'Fazer hora extra na sexta', bottom_text: 'Sair correndo às 18h00', template: 'drake', author: 'dev_cansado', votes: 42 },
  { title: 'O console.log salvador', top_text: 'Ler a documentação', bottom_text: 'console.log em tudo até funcionar', template: 'doge', author: 'js_sofredor', votes: 87 },
  { title: 'Deploy na sexta', top_text: 'Fazer deploy numa sexta à noite', bottom_text: 'Rezar pro Deus do Git', template: 'buttons', author: 'sre_traumatizado', votes: 134 },
  { title: 'Stack Overflow vida', top_text: 'Escrever código do zero', bottom_text: 'Ctrl+C Ctrl+V do Stack Overflow', template: 'distracted', author: 'copy_master', votes: 61 },
  { title: 'Git blame', top_text: '', bottom_text: 'Quem escreveu esse lixo?? (git blame: você, 2 semanas atrás)', template: 'cat', author: 'amnesico_dev', votes: 29 },
  { title: 'Níveis de debugging', top_text: 'O bug acontece em produção', bottom_text: 'O bug NUNCA aparece quando o chefe tá olhando', template: 'brain', author: 'debug_master', votes: 55 },
]

const insert = db.prepare(`INSERT INTO memes (id, title, top_text, bottom_text, template, author, votes) VALUES (?, ?, ?, ?, ?, ?, ?)`)

for (const m of memes) {
  insert.run(crypto.randomUUID(), m.title, m.top_text, m.bottom_text, m.template, m.author, m.votes)
}

console.log(`✅ ${memes.length} memes criados com sucesso!`)