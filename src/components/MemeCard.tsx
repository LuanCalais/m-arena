'use client'

import { useState } from "react";
import { Meme } from "../app/types/meme";
import { getTemplate } from "../lib/templates";
import Link from "next/link";
import MemeVisual from "./MemeVisual";
import VoteButton from "./VoteButton";
import { deleteMeme } from "@/lib/actions";

export default function MemeCard({ meme }: { meme: Meme; initialVoted?: boolean }) {
    const [votes] = useState(meme.votes)
    const [loading, setLoading] = useState(false)
    const tmpl = getTemplate(meme.template)


    async function handleDelete() {
        if (loading) return
        setLoading(true)
        try {
            const res = await deleteMeme(meme.id)
            if (res.success) {
            } else {
                alert(res.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <span className="card-container">
            <button className="delete-button" onClick={handleDelete}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div className="card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>

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
        </span>
    )
} 