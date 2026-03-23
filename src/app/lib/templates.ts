import { MemeTemplate } from "../types/meme";

export const MEME_TEMPLATES: MemeTemplate[] = [
  {
    id: "drake",
    name: "Drake Approve",
    emoji: "🦆",
    bgColor: "#1a1a2e",
    textColor: "#eee",
    accentColor: "#e94560",
    style: "classic",
  },
  {
    id: "doge",
    name: "Much Wow",
    emoji: "🐕",
    bgColor: "#f9f3e3",
    textColor: "#333",
    accentColor: "#ff9500",
    style: "chaos",
  },
  {
    id: "distracted",
    name: "Distracted BF",
    emoji: "👀",
    bgColor: "#0f3460",
    textColor: "#e0e0e0",
    accentColor: "#e94560",
    style: "classic",
  },
  {
    id: "buttons",
    name: "Two Buttons",
    emoji: "🆘",
    bgColor: "#2d1b69",
    textColor: "#fff",
    accentColor: "#11998e",
    style: "modern",
  },
  {
    id: "cat",
    name: "Screaming Cat",
    emoji: "😾",
    bgColor: "#1a0533",
    textColor: "#ff79c6",
    accentColor: "#bd93f9",
    style: "chaos",
  },
  {
    id: "brain",
    name: "Expanding Brain",
    emoji: "🧠",
    bgColor: "#0d0d0d",
    textColor: "#39ff14",
    accentColor: "#ff00ff",
    style: "modern",
  },
];

export function getTemplate(id: string): MemeTemplate {
  return MEME_TEMPLATES.find((t) => t.id === id) || MEME_TEMPLATES[0];
}
