'use client'

import { voteMeme } from "@/app/lib/actions"
import { useState } from "react"

export default function VoteButton({ memeId, initialVotes, initialVoted }: {
    memeId: string
    initialVotes: number
    initialVoted: boolean
}) {

    const [votes, setVotes] = useState(initialVotes)
    const [voted, setVoted] = useState(initialVoted)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState<string | null>(null)

    async function handleVote() {
        if (voted || loading) return
        setLoading(true)
        try {
            const res = await voteMeme(memeId)
            if (res.success) {
                setVotes(res.votes)
                setVoted(true)
                setToast('🔥 Votado!')
            } else {
                setToast(res.message)
            }

        } finally {
            setLoading(false)
            setTimeout(() => setToast(null), 2500)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            {toast && (
                <div style={{ fontSize: 12, color: voted ? 'var(--success)' : 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                    {toast}
                </div>
            )}
            <button
                className={`btn btn-vote ${voted ? 'voted' : ''}`}
                onClick={handleVote}
                disabled={voted || loading}
                style={{ minWidth: 140, fontSize: 20 }}
            >
                {loading ? '⏳' : voted ? '✅ VOTADO' : '🔥 VOTAR'}
                {!loading && <span style={{ fontSize: 14, opacity: 0.8 }}>({votes})</span>}
            </button>
        </div>
    )
}