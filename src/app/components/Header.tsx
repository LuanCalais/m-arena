import Link from "next/link";
import { getStats } from "../lib/actions";

export default async function Header() {

    const stats = await getStats();

    return (
        <header style={{
            borderBottom: '1px solid var(--border)',
            background: 'rgba(10,10,15,0.9)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                gap: 16,
            }}>
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 28 }} className="animate-float">🔥</span>
                    <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--accent)', lineHeight: 1 }}>
                            MEME ARENA
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text2)', letterSpacing: 3 }}>BATALHA DE MEMES</div>
                    </div>
                </Link>
                <nav style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 16, marginRight: 8 }}>
                        <span style={{ color: 'var(--text2)', fontSize: 12 }}>
                            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: 16 }}>
                                {stats.totalMemes || 0}
                            </span> memes
                        </span>
                        <span style={{ color: 'var(--text2)', fontSize: 12 }}>
                            <span style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)', fontSize: 16 }}>
                                {stats.totalVotes || 0}
                            </span> votos
                        </span>
                    </div>
                    <Link href="/arena" className="btn btn-secondary" style={{ fontSize: 14, padding: '6px 16px' }}>
                        🏆 Arena
                    </Link>
                    <Link href="/criar" className="btn btn-primary" style={{ fontSize: 14, padding: '6px 16px' }}>
                        + Criar Meme
                    </Link>
                </nav>
            </div>
        </header>
    )
}