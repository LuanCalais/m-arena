import { getMemeById, hasVoted } from "@/lib/actions";
import { getTemplate } from "@/lib/templates";
import { Meme } from "@/app/types/meme";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VoteButton from "../../../components/VoteButton";

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const meme = await getMemeById(params.id) as Meme | undefined
    if (!meme) return { title: "Não encontrado" }
    return {
        title: `${meme.title} — Meme Arena 🔥`,
        description: `${meme.top_text} / ${meme.bottom_text} — por ${meme.author}. ${meme.votes} votos!`,
    }
}

export default async function MemePage({ params }: Props) {
    const [meme, voted] = await Promise.all([getMemeById(params.id), hasVoted(params.id)])

    if (!meme) notFound()
    const m = meme as Meme
    const tmpl = getTemplate(m.template)

    return (
        <div className="container" style={{ padding: '40px 20px', maxWidth: 700 }}>
            <Link href="/" style={{ color: 'var(--text2)', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
                ← Voltar para arena
            </Link>
            <div className="card" style={{ marginBottom: 24, overflow: 'visible', position: 'relative' }}>
                <div style={{
                    position: 'absolute', top: -16, right: 16,
                    background: m.votes > 5 ? 'var(--accent)' : 'var(--surface2)',
                    border: `1px solid ${m.votes > 5 ? 'var(--accent)' : 'var(--border)'}`,
                    padding: '4px 16px',
                    fontFamily: 'var(--font-display)', fontSize: 18,
                    borderRadius: 2, zIndex: 1,
                }}>
                    🔥 {m.votes} {m.votes === 1 ? 'voto' : 'votos'}
                </div>

                <div style={{
                    background: tmpl.bgColor, padding: '48px 40px', minHeight: 300,
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'center', gap: 24, position: 'relative',
                }}>
                    <div style={{ fontSize: 72 }} className="animate-float">{tmpl.emoji}</div>
                    {m.top_text && (
                        <div style={{
                            fontFamily: 'Impact, Arial Black',
                            color: tmpl.style === 'classic' ? '#888' : tmpl.accentColor,
                            fontSize: 28, textAlign: 'center',
                            textShadow: '3px 3px 0 rgba(0,0,0,0.5)',
                            textDecoration: tmpl.style === 'classic' ? 'line-through' : 'none',
                        }}>
                            {m.top_text.toUpperCase()}
                        </div>
                    )}
                    {m.bottom_text && (
                        <div style={{
                            fontFamily: 'Impact, Arial Black',
                            color: tmpl.textColor,
                            fontSize: 32, textAlign: 'center',
                            textShadow: '3px 3px 0 rgba(0,0,0,0.5)',
                        }}>
                            {m.bottom_text.toUpperCase()}
                        </div>
                    )}
                </div>
                <div style={{
                    padding: '16px 24px', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between',
                    borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: 12,
                }}>
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 4 }}>
                            {m.title.toUpperCase()}
                        </h1>
                        <div style={{ fontSize: 12, color: 'var(--text2)' }}>
                            por <span style={{ color: 'var(--accent2)' }}>{m.author}</span>
                            {' • '}
                            {new Date(m.created_at * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </div>
                    </div>

                    <VoteButton memeId={m.id} initialVotes={m.votes} initialVoted={voted} />
                </div>
            </div>
        </div>
    )
}