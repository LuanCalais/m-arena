export type Meme = {
  id: string;
  title: string;
  top_text: string;
  bottom_text: string;
  template: string;
  author: string;
  votes: number;
  created_at: number;
};

export type MemeTemplate = {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  style: "classic" | "modern" | "chaos";
};