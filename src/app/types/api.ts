import { Meme } from "./meme";

export type Stats = {
  totalMemes: number;
  totalVotes: number;
  topMeme?: Meme | null;
};

export type DeleteActionReturn = {
  id: string;
  message: string;
  success: boolean;
};
