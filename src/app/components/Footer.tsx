export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            padding: '24px 20px',
            marginTop: 64,
            textAlign: 'center',
            color: 'var(--text2)',
            fontSize: 12,
        }}>
            <span style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontSize: 14 }}>
                MEME ARENA
            </span>
            {' '}— Next.js 14 · App Router · Server Components · Server Actions
        </footer>
    )
}