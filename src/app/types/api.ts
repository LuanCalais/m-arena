import { Meme } from "./meme";

export type Stats = {
  totalMemes: number;
  totalVotes: number;
  topMeme?: Meme | null;
};
