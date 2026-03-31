import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/memes:
 *   get:
 *     summary: Get a list of memes
 *     tags: [Memes]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [hot, new]
 *           default: hot
 *         description: Sort order
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of memes to return
 *     responses:
 *       200:
 *         description: A list of memes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Meme'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     sort:
 *                       type: string
 *                     count:
 *                       type: integer
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const sort = searchParams.get("sort") || "hot";
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);

  const db = getDb();
  const orderBy =
    sort === "new" ? "created_at DESC" : "votes DESC, created_at DESC";

  const memes = db
    .prepare(`SELECT * FROM memes ORDER BY ${orderBy} LIMIT ?`)
    .all(limit);

  return NextResponse.json({
    data: memes,
    meta: { sort, count: memes.length },
  });
}

/**
 * @swagger
 * /api/memes:
 *   post:
 *     summary: Cria um novo meme
 *     tags: [Memes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Quando o café acaba na sexta
 *               top_text:
 *                 type: string
 *                 example: Fazer hora extra
 *               bottom_text:
 *                 type: string
 *                 example: Sair correndo às 18h
 *               template:
 *                 type: string
 *                 enum: [drake, doge, distracted, buttons, cat, brain]
 *                 default: drake
 *               author:
 *                 type: string
 *                 example: dev_cansado
 *     responses:
 *       201:
 *         description: Meme criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Meme'
 *       400:
 *         description: Dados inválidos
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, top_text, bottom_text, template, author } = body;
    if (!title || (!top_text && !bottom_text)) {
      return NextResponse.json(
        { error: "Missing mandatory fields" },
        { status: 400 },
      );
    }

    const db = getDb();
    const { v4: uuidv4 } = await import("uuid");
    const id = uuidv4();

    db.prepare(
      `INSERT INTO memes (id, title, top_text, bottom_text, template, author) VALUES (?, ?, ?, ?, ?, ?)`,
    ).run(
      id,
      title,
      top_text || "",
      bottom_text || "",
      template || "drake",
      author || "API User",
    );

    const meme = db.prepare("SELECT * FROM memes WHERE id = ?").get(id);

    return NextResponse.json({ data: meme }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: `Internal server error ${e}` },
      { status: 500 },
    );
  }
}
