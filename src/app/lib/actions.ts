"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { getDb } from "./db";
import { Meme } from "../types/meme";
import { Stats } from "../types/api";

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
