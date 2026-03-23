import Link from "next/link";
import { getMemes, getStats } from "./lib/actions";
import MemesList from "./components/MemesList";
import MainContent from "./components/MainContent";

export default async function Home() {

  const [memes, stats] = await Promise.all([await getMemes('hot'), await getStats()]);
  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <MainContent stats={stats} />
      <MemesList memes={memes} />
    </div>
  );
}
