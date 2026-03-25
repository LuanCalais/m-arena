# 🔥 MemeMaker Arena

Arena de batalha de memes feita com Next.js 14. Crie memes, vote nos melhores e conquiste o ranking.

Projeto criado para treinar os principais conceitos do Next.js App Router na prática.

---

## 🚀 Rodando localmente

```bash
npx create-next-app@14.2.0 meme-arena --typescript --app --no-tailwind --no-eslint --src-dir=false --import-alias="@/*"
cd meme-arena
npm install better-sqlite3 uuid
npm install -D @types/better-sqlite3
```

Substitua os arquivos pelos do projeto, depois:

```bash
npm run seed   # popula o banco com memes de exemplo
npm run dev    # http://localhost:3000
```

---

## 🐳 Rodando com Docker

```bash
docker compose up --build
docker compose exec app node scripts/seed.js
```

---

## 📁 Estrutura

```
meme-arena/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout raiz (Server Component)
│   │   ├── page.tsx             # Home com ISR
│   │   ├── loading.tsx          # Skeleton automático
│   │   ├── not-found.tsx        # Página 404
│   │   ├── globals.css
│   │   ├── arena/
│   │   │   └── page.tsx         # Ranking com searchParams
│   │   ├── criar/
│   │   │   └── page.tsx         # Formulário com Server Action
│   │   ├── meme/
│   │   │   └── [id]/
│   │   │       ├── page.tsx     # Rota dinâmica + generateMetadata
│   │   │       └── VoteButton.tsx
│   │   └── api/
│   │       └── memes/
│   │           ├── route.ts
│   │           └── [id]/vote/
│   │               └── route.ts
│   ├── components/
│   │   └── MemeCard.tsx
│   └── lib/
│       ├── actions.ts           # Server Actions
│       ├── db.ts                # SQLite
│       └── templates.ts
├── scripts/
│   └── seed.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── next.config.js
```

---

## 🗄️ Ver o banco de dados

**Via terminal:**

```bash
sqlite3 data/memes.db
.tables
SELECT * FROM memes;
.quit
```

**Via GUI:** [DB Browser for SQLite](https://sqlitebrowser.org/) — abre o arquivo `data/memes.db`.

---

## 📡 API

```bash
GET /api/memes
GET /api/memes?sort=new
GET /api/memes?limit=10

POST /api/memes
Content-Type: application/json
{ "title": "...", "top_text": "...", "bottom_text": "...", "template": "drake", "author": "..." }

POST /api/memes/:id/vote

## 🛠️ Stack

- **Next.js 14** — App Router
- **TypeScript**
- **better-sqlite3** — banco local, zero configuração
- **CSS puro** com variáveis CSS
- **Docker** com multi-stage build
```
