export default function Loading() {
    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 20,
            }}>
                {
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 4,
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                height: 140,
                                background: 'linear-gradient(90deg, var(--surface2) 25%, var(--border) 50%, var(--surface2) 75%)',
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 1.5s infinite',
                            }} />
                            <div style={{ padding: 16 }}>
                                <div style={{ height: 14, background: 'var(--border)', borderRadius: 2, marginBottom: 8, width: '70%' }} />
                                <div style={{ height: 10, background: 'var(--surface2)', borderRadius: 2, marginBottom: 16, width: '40%' }} />
                                <div style={{ height: 36, background: 'var(--surface2)', borderRadius: 4 }} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}