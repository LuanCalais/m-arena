'use client'

import { useState } from "react";
import { Meme } from "../app/types/meme";
import { getTemplate } from "../lib/templates";
import Link from "next/link";
import MemeVisual from "./MemeVisual";
import VoteButton from "./VoteButton";

export default function MemeCard({ meme, initialVoted = false }: { meme: Meme; initialVoted?: boolean }) {
    const [votes, setVotes] = useState(meme.votes)
    const [voted, setVoted] = useState(initialVoted)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState<string | null>(null)
    const tmpl = getTemplate(meme.template)

    async function handleVote() { }

    return (
        <div className="card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {toast && (
                <div style={{
                    position: 'absolute', top: 8, right: 8, zIndex: 10,
                    background: 'var(--surface2)', border: '1px solid var(--accent)',
                    padding: '4px 12px', borderRadius: 2,
                    fontSize: 12, fontFamily: 'var(--font-display)', color: 'var(--accent)',
                }}>{toast}</div>
            )}

            <Link href={`/meme/${meme.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                <MemeVisual meme={meme} />
            </Link>

            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        {votes > 5 && <span className="badge badge-hot">🔥 HOT</span>}
                        <span className="badge">{tmpl.emoji} {tmpl.name}</span>
                    </div>
                    <Link href={`/meme/${meme.id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text)', letterSpacing: 1, marginTop: 4 }}>
                            {meme.title.toUpperCase()}
                        </h3>
                    </Link>
                    <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4 }}>
                        por <span style={{ color: 'var(--accent2)' }}>{meme.author}</span>
                        {' • '}{new Date(meme.created_at * 1000).toLocaleDateString('pt-BR')}
                    </div>
                </div>

                <VoteButton memeId={meme.id} initialVotes={meme.votes} initialVoted={true} isReadOnly />
            </div>
        </div>
    )
} 