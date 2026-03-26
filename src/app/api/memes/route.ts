import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
