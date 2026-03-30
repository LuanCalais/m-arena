import { getTemplate } from "../lib/templates";

type Props = { topText: string; bottomText: string; templateId: string }

export default function MemePreview({ topText, bottomText, templateId }: Props) {
    const tmpl = getTemplate(templateId)
    console.log(tmpl)
    return (
        <div style={{
            background: tmpl.bgColor,
            border: `2px solid ${tmpl.accentColor}44`,
            borderRadius: 4,
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute', top: 8, right: 8,
                fontSize: 10, color: tmpl.accentColor,
                fontFamily: 'var(--font-display)', letterSpacing: 2, opacity: 0.7,
            }}>PREVIEW</div>


            {tmpl.style === 'chaos' && (
                <div style={{ textAlign: 'center', padding: 24 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>{tmpl.emoji}</div>
                    {topText && <div style={{ fontFamily: 'Impact, Arial Black', color: tmpl.accentColor, fontSize: 18, transform: 'rotate(-2deg)', marginBottom: 8, textShadow: '2px 2px 0 #000' }}>{topText.toUpperCase()}</div>}
                    {bottomText && <div style={{ fontFamily: 'Impact, Arial Black', color: tmpl.textColor, fontSize: 18, transform: 'rotate(1deg)', textShadow: '2px 2px 0 #000' }}>{bottomText.toUpperCase()}</div>}
                </div>
            )}

            {tmpl.style === 'modern' && (
                <div style={{ background: `linear-gradient(135deg, ${tmpl.bgColor}, ${tmpl.accentColor})`, padding: '24px 20px', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
                    <div style={{ fontSize: 40 }}>{tmpl.emoji}</div>
                    {topText && <div style={{ fontFamily: 'var(--font-display)', color: tmpl.textColor, fontSize: 20, letterSpacing: 2 }}>{topText.toUpperCase()}</div>}
                    {bottomText && <div style={{ borderLeft: `4px solid ${tmpl.textColor}`, paddingLeft: 12, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{bottomText}</div>}
                </div>
            )}

            {tmpl.style === 'classic' && (
                <div style={{ background: tmpl.bgColor, minHeight: 200 }}>
                    {topText && (
                        <div style={{ padding: '20px', borderBottom: `3px solid ${tmpl.accentColor}`, display: 'flex', gap: 16, alignItems: 'center' }}>
                            <span style={{ fontSize: 28 }}>❌</span>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#777', fontSize: 13, textDecoration: 'line-through' }}>{topText}</span>
                        </div>
                    )}
                    {bottomText && (
                        <div style={{ padding: '20px', display: 'flex', gap: 16, alignItems: 'center' }}>
                            <span style={{ fontSize: 28 }}>{tmpl.emoji}</span>
                            <span style={{ fontFamily: 'Impact, Arial Black', color: tmpl.accentColor, fontSize: 16, fontWeight: 900 }}>{bottomText.toUpperCase()}</span>
                        </div>
                    )}
                </div>
            )}
            {!topText && !bottomText && (
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 13, padding: 40 }}>
                    Comece a digitar para ver o preview...
                </div>
            )}
        </div>
    )

}