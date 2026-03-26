import { getDb } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

type Params = { params: { id: string } };

export async function POST(_: NextRequest, { params }: Params) {
  try {
    const db = getDb();
    const meme = db.prepare("SELECT * FROM memes WHERE id = ?").get(params.id);

    if (!meme)
      return NextResponse.json({ error: "Meme not found" }, { status: 404 });

    const cookieStore = cookies();
    const session = cookieStore.get("meme_session")?.value || uuidv4();

    const existing = db
      .prepare("SELECT 1 FROM votes WHERE meme_id = ? AND user_session = ?")
      .get(params.id, session);

    if (existing)
      return NextResponse.json({ error: "you already voted" }, { status: 409 });

    db.prepare("INSERT INTO votes (meme_id, user_session) VALUES (?, ?)").run(
      params.id,
      session,
    );

    db.prepare("UPDATE memes SET votes = votes + 1 WHERE id = ?").run(
      params.id,
    );

    const updated = db
      .prepare("SELECT * FROM memes WHERE id = ?")
      .get(params.id);

    const response = NextResponse.json({ success: true, data: updated });
    response.cookies.set("meme_session", session, {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      { error: `Internal server error ${e}` },
      { status: 500 },
    );
  }
}
