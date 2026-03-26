import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const db = getDb();

    const meme = db.prepare("SELECT * FROM memes WHERE id = ?").get(params.id);

    if (!meme)
      return NextResponse.json({ error: "Meme not found" }, { status: 404 });

    const deleteMeme = db.transaction(() => {
      db.prepare("DELETE FROM votes WHERE meme_id = ?").run(params.id);
      return db.prepare("DELETE FROM memes WHERE id = ?").run(params.id);
    });

    const result = deleteMeme();

    if (result.changes === 0) {
      return NextResponse.json(
        { error: "Failed to delete meme" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Meme and associated votes deleted successfully",
      data: result,
    });
  } catch (e) {
    return NextResponse.json(
      { error: `Internal server error ${e}` },
      { status: 500 },
    );
  }
}
