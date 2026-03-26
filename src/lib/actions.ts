"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { getDb } from "./db";
import { Meme } from "../app/types/meme";
import { DeleteActionReturn, Stats } from "../app/types/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getSession(): string {
  const cookieStore = cookies();
  return cookieStore.get("meme-session")?.value || uuidv4();
}

export async function getMemes(sort: "hot" | "new" = "hot"): Promise<Meme[]> {
  const db = getDb();
  const orderBy =
    sort === "hot" ? "votes DESC, created_at DESC" : "created_at DESC";
  return db.prepare(`SELECT * FROM memes ORDER BY ${orderBy}`).all() as Meme[];
}

export async function getMemeById(id: string) {
  const db = getDb();
  return db.prepare("SELECT * FROM memes WHERE id = ?").get(id);
}

export async function getStats(): Promise<Stats> {
  const db = getDb();
  const totalMemes = (
    db.prepare("SELECT COUNT(*) AS count FROM memes").get() as { count: number }
  ).count;
  const totalVotes =
    (
      db.prepare("SELECT SUM(votes) AS total FROM memes").get() as {
        total: number;
      }
    ).total || 0;
  const topMemeResult = db
    .prepare("SELECT * FROM memes ORDER BY votes DESC LIMIT 1")
    .get() as Meme | undefined;

  const topMeme = topMemeResult || null;
  return { totalMemes, totalVotes, topMeme };
}

export async function voteMeme(
  memeId: string,
): Promise<{ success: boolean; message: string; votes: number }> {
  const db = getDb();
  const session = getSession();

  const existing = db
    .prepare("SELECT 1 FROM votes WHERE meme_id = ? AND user_session = ?")
    .get(memeId, session);

  if (existing) {
    const meme = db
      .prepare("SELECT votes FROM memes WHERE id = ?")
      .get(memeId) as { votes: number };
    return {
      success: false,
      message: "Você já votou nesse meme! 😤",
      votes: meme?.votes || 0,
    };
  }

  db.prepare("INSERT INTO votes (meme_id, user_session) VALUES (?, ?)").run(
    memeId,
    session,
  );
  db.prepare("UPDATE memes SET votes = votes + 1 WHERE id = ?").run(memeId);
  const meme = db
    .prepare("SELECT votes FROM memes WHERE id = ?")
    .get(memeId) as { votes: number };

  revalidatePath("/");
  revalidatePath(`/meme/${memeId}`);
  return {
    success: true,
    message: "🔥 Voto registrado!",
    votes: meme?.votes || 0,
  };
}

export async function hasVoted(memeId: string): Promise<boolean> {
  const db = getDb();
  const session = getSession();
  const existing = db
    .prepare("SELECT 1 FROM votes WHERE meme_id = ? AND user_session = ?")
    .get(memeId, session);
  return !!existing;
}

export async function createMeme(formData: FormData) {
  const db = getDb();
  const id = uuidv4();

  const title = String(formData.get("title") || "").trim();
  const topText = String(formData.get("top_text") || "").trim();
  const bottomText = String(formData.get("bottom_text") || "").trim();
  const template = String(formData.get("template") || "drake");
  const author = String(formData.get("author") || "Anônimo").trim();

  if (!title || (!topText && !bottomText)) {
    throw new Error("Preencha o título e pelo menos um texto!");
  }

  db.prepare(
    `
      INSERT INTO memes (id, title, top_text, bottom_text, template, author)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(id, title, topText, bottomText, template, author);

  revalidatePath("/");
  revalidatePath("/arena");
  redirect(`/meme/${id}`);
}

export async function deleteMeme(memeId: string): Promise<DeleteActionReturn> {
  const db = getDb();

  const meme = db.prepare("SELECT * FROM memes WHERE id = ?").get(memeId);
  if (!meme)
    return {
      id: memeId,
      message: "Não foi possível encontrar o meme",
      success: false,
    };

  const deleteMeme = db.transaction(() => {
    db.prepare("DELETE FROM votes WHERE meme_id = ?").run(memeId);
    return db.prepare("DELETE FROM memes WHERE id = ?").run(memeId);
  });

  const result = deleteMeme();

  if (result.changes === 0) {
    return {
      id: memeId,
      message: "Não foi possível deletar o meme",
      success: false,
    };
  }
  revalidatePath("/");
  return {
    id: memeId,
    message: "Meme deletado com sucesso",
    success: true,
  };
}
