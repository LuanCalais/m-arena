import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container" style={{
            padding: '80px 20px',
            textAlign: 'center',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{ fontSize: 80, marginBottom: 24 }}>💀</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 72, color: 'var(--accent)', marginBottom: 8 }}>404</h1>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text2)', marginBottom: 32 }}>
                ESSE MEME NÃO EXISTE!<br />
                VOLTE PARA A ARENA E VOTE NOS MEMES MAIS ENGRAÇADOS! 😂
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
                <Link href="/" className="btn btn-primary">🏠 Início</Link>
                <Link href="/criar" className="btn btn-secondary">🎨 Criar Meme</Link>
            </div>
        </div>
    )
}