'use client'

import { useState } from "react"
import { createMeme } from "../../lib/actions"
import { MEME_TEMPLATES } from "../../lib/templates"
import MemePreview from "../../components/MemePreview"

export default function CreatePage() {
    const [topText, setTopText] = useState('')
    const [bottomText, setBottomText] = useState('')
    const [template, setTemplate] = useState('drake')
    const [pending, setPending] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setPending(true)
        const formData = new FormData(e.currentTarget)
        try {
            await createMeme(formData)
        } catch {
            setPending(false)
            alert('Preencha o título e pelo menos um texto!')
        }
    }

    return (
        <div className="container" style={{ padding: '40px 20px', maxWidth: 900 }}>
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, marginBottom: 8 }}>
                    CRIAR <span style={{ color: 'var(--accent)' }}>MEME</span>
                </h1>
                <p style={{ color: 'var(--text2)', fontSize: 13 }}>
                    Submit usa <span style={{ color: 'var(--accent)' }}>Server Action</span> — sem API route separada!
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: 11, color: 'var(--accent2)', letterSpacing: 2, marginBottom: 6, fontFamily: 'var(--font-display)' }}>TEMPLATE</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {MEME_TEMPLATES.map((t) => (
                                <label key={t.id} style={{
                                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                                    background: template === t.id ? 'rgba(255,45,85,0.15)' : 'var(--surface2)',
                                    border: `1px solid ${template === t.id ? 'var(--accent)' : 'var(--border)'}`,
                                    borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
                                }}>
                                    <input type="radio" name="template" value={t.id} checked={template === t.id} onChange={() => setTemplate(t.id)} style={{ display: 'none' }} />
                                    <span style={{ fontSize: 20 }}>{t.emoji}</span>
                                    <span style={{ fontSize: 12, color: template === t.id ? 'var(--accent)' : 'var(--text2)' }}>{t.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: 11, color: 'var(--accent2)', letterSpacing: 2, marginBottom: 6, fontFamily: 'var(--font-display)' }}>TÍTULO *</label>
                        <input name="title" placeholder="Ex: Quando o café acaba na sexta" required />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: 11, color: 'var(--accent2)', letterSpacing: 2, marginBottom: 6, fontFamily: 'var(--font-display)' }}>TEXTO DE CIMA</label>
                        <input name="top_text" placeholder="A coisa que você evita..." value={topText} onChange={(e) => setTopText(e.target.value)} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: 11, color: 'var(--accent2)', letterSpacing: 2, marginBottom: 6, fontFamily: 'var(--font-display)' }}>TEXTO DE BAIXO</label>
                        <input name="bottom_text" placeholder="A coisa que você aprova!" value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: 11, color: 'var(--accent2)', letterSpacing: 2, marginBottom: 6, fontFamily: 'var(--font-display)' }}>SEU NOME</label>
                        <input name="author" placeholder="Anônimo" />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={pending} style={{ width: '100%', fontSize: 20 }}>
                        {pending ? '⏳ Enviando...' : '🔥 Lançar na Arena'}
                    </button>
                </form>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--accent2)', letterSpacing: 2, marginBottom: 12, fontFamily: 'var(--font-display)' }}>PREVIEW AO VIVO</div>
                    <MemePreview topText={topText} bottomText={bottomText} templateId={template} />
                </div>
            </div>
        </div>
    )
}