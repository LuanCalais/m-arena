import { getTemplate } from "../lib/templates";
import { Meme } from "../app/types/meme";

export default function MemeVisual({ meme }: { meme: Meme }) {
    const tmpl = getTemplate(meme.template);
    if (!tmpl) return <>Template not found</>;

    if (tmpl.style === 'chaos') {
        return (
            <div style={{ background: tmpl.bgColor, padding: 16, minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 36 }}>{tmpl.emoji}</div>
                {meme.top_text && <div style={{ fontFamily: 'Impact, Arial Black', color: tmpl.accentColor, fontSize: 13, fontWeight: 900, textAlign: 'center', transform: 'rotate(-3deg)' }}>{meme.top_text.toUpperCase()}</div>}
                {meme.bottom_text && <div style={{ fontFamily: 'Impact, Arial Black', color: tmpl.textColor, fontSize: 13, fontWeight: 900, textAlign: 'center', transform: 'rotate(2deg)' }}>{meme.bottom_text.toUpperCase()}</div>}
            </div>
        )
    }

    if (tmpl.style === 'modern') {
        return (
            <div style={{ background: `linear-gradient(135deg, ${tmpl.bgColor}, ${tmpl.accentColor})`, padding: '16px 20px', minHeight: 120, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
                <div style={{ fontSize: 28 }}>{tmpl.emoji}</div>
                {meme.top_text && <div style={{ fontFamily: 'var(--font-display)', color: tmpl.textColor, fontSize: 16, letterSpacing: 1 }}>{meme.top_text.toUpperCase()}</div>}
                {meme.bottom_text && <div style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)', fontSize: 11, borderLeft: `3px solid ${tmpl.textColor}`, paddingLeft: 8 }}>{meme.bottom_text}</div>}
            </div>
        )
    }

    return (
        <div style={{ background: tmpl.bgColor, minHeight: 120 }}>
            {meme.top_text && (
                <div style={{ padding: '12px 16px', borderBottom: `2px solid ${tmpl.accentColor}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 20 }}>❌</span>
                    <span style={{ fontFamily: 'var(--font-body)', color: '#999', fontSize: 12, textDecoration: 'line-through' }}>{meme.top_text}</span>
                </div>
            )}
            {meme.bottom_text && (
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 20 }}>{tmpl.emoji}</span>
                    <span style={{ fontFamily: 'Impact, Arial Black', color: tmpl.accentColor, fontSize: 14, fontWeight: 900 }}>{meme.bottom_text.toUpperCase()}</span>
                </div>
            )}
        </div>
    )
}