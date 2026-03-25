export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getMemes } from '../lib/actions'
import { Meme } from '../types/meme'
import MemeCard from '../components/MemeCard'


type Props = { searchParams: { sort?: string } }

export default async function ArenaPage({ searchParams }: Props) {
  const sort = (searchParams.sort as 'hot' | 'new') || 'hot'
  const memes = await getMemes(sort) as Meme[]
  const podium = memes.slice(0, 3)
  const rest = memes.slice(3)

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 36 }}>🏆</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44 }}>ARENA</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/arena?sort=hot" className={`btn ${sort === 'hot' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: 14, padding: '6px 16px' }}>
            🔥 Hot
          </Link>
          <Link href="/arena?sort=new" className={`btn ${sort === 'new' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: 14, padding: '6px 16px' }}>
            🆕 Novos
          </Link>
        </div>
      </div>

      {memes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text2)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌵</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>NENHUM MEME AINDA</div>
          <Link href="/criar" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
            Seja o primeiro!
          </Link>
        </div>
      ) : (
        <>
          {sort === 'hot' && podium.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--accent3)', marginBottom: 20 }}>
                🥇 PÓDIO
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {podium.map((meme, i) => (
                  <div key={meme.id} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: -12, left: 12, zIndex: 2, fontSize: 32 }}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                    </div>
                    <MemeCard meme={meme} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {rest.length > 0 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text2)', marginBottom: 20 }}>
                TODOS OS MEMES
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 16 }}>
                {rest.map((meme) => <MemeCard key={meme.id} meme={meme} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}