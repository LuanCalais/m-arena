import Link from "next/link";

export default function Home() {

  const [memes, stats] = [0, 0]; // TODO: fetch from API 

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64, padding: '60px 20px', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,45,85,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <span style={{ fontSize: 64, marginBottom: 16, display: 'inline-block' }} className="animate-float">🔥</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 72, lineHeight: 1, marginBottom: 16 }}>
          <span style={{ color: 'var(--accent)' }}>MEME</span><br />
          <span style={{ color: 'var(--accent2)' }}>ARENA</span>
        </h1>
        <p style={{ color: 'var(--text2)', maxWidth: 400, margin: '0 auto 32px', fontSize: 13 }}>
          Crie memes, vote nos mais engraçados, conquiste o topo do ranking. A arena não perdoa os fracos. 💀
        </p>

        <div style={{
          display: 'inline-flex', gap: 32, padding: '16px 32px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 4, marginBottom: 32,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--accent)' }}>
              {memes}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text2)', letterSpacing: 2 }}>MEMES</div>
          </div>
          <div style={{ width: 1, background: 'var(--border)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--accent2)' }}>
              {stats}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text2)', letterSpacing: 2 }}>VOTOS</div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/criar" className="btn btn-primary">🎨 Criar Meme</Link>
            <Link href="/arena" className="btn btn-secondary">🏆 Ver Arena</Link>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>MAIS QUENTES</h2>
          <span className="badge badge-hot">🔥 HOT</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text2)' }}>Revalidado a cada 30s (ISR)</span>
        </div>

      </div>
      {memes === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px 20px',
          background: 'var(--surface)', border: '1px dashed var(--border)', borderRadius: 4,
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>😴</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text2)', marginBottom: 16 }}>
            A ARENA ESTÁ VAZIA
          </div>
          <Link href="/criar" className="btn btn-primary">Seja o primeiro herói</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          TODO: listar memes mais votados
        </div>
      )}

    </div>
  );
}
