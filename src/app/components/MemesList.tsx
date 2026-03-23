import Link from "next/link";
import { Meme } from "../types/meme";
import MemeCard from "./MemeCard";

export default function MemesList({ memes }: { memes: Meme[] }) {
    return <>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>MAIS QUENTES</h2>
            <span className="badge badge-hot">🔥 HOT</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text2)' }}>Revalidado a cada 30s (ISR)</span>
        </div>
        {!memes || memes.length === 0 ? (
            <div style={{
                textAlign: 'center', padding: '80px 20px',
                background: 'var(--surface)', border: '1px dashed var(--border)', borderRadius: 4,
            }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>😴</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text2)', marginBottom: 16 }}>
                    A ARENA ESTÁ VAZIA
                </div>
                <Link href="/create" className="btn btn-primary">Seja o primeiro herói</Link>
            </div>
        ) : (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {(memes as Meme[]).map(meme => (
                <MemeCard key={meme.id} meme={meme} />
            ))}
        </div>)}
    </>
}