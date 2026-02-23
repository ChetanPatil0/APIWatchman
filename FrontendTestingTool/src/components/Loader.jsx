export default function Loader({ size = 40, text = '' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '48px',
    }}>
      <div style={{
        width: size,
        height: size,
        border: `2px solid rgba(59,130,246,0.15)`,
        borderTop: `2px solid #3b82f6`,
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
      {text && (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontFamily: 'var(--font-display)' }}>
          {text}
        </p>
      )}
    </div>
  );
}