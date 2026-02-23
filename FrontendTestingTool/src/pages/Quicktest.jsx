import { useState } from 'react';
import api from '../utils/api';
import { BoltIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function QuickTest() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const handleTest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await api.get(`/test/ping?url=${encodeURIComponent(url)}`);
      const data = res.data;
      setResult(data);
      setHistory((prev) => [{ url, ...data, ts: new Date() }, ...prev.slice(0, 9)]);
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Input card */}
      <div style={{ background: 'var(--bg-800)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em' }}>PING AN ENDPOINT</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Instantly test any public URL and see its response status and time.</p>
        </div>
        <form onSubmit={handleTest} style={{ padding: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="https://api.example.com/health"
            style={{
              flex: 1,
              minWidth: '240px',
              padding: '12px 16px',
              background: 'var(--bg-700)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'var(--font-display)',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
          <button type="submit" disabled={loading} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: loading ? 'var(--bg-600)' : 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 0 15px rgba(59,130,246,0.25)',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}>
            {loading
              ? <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />Testing...</>
              : <><BoltIcon style={{ width: 15, height: 15 }} />Ping</>
            }
          </button>
        </form>

        {/* Result */}
        {(result || error) && (
          <div style={{ padding: '0 24px 24px' }}>
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: error ? 'rgba(239,68,68,0.08)' : result?.status >= 200 && result?.status < 300 ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
              border: `1px solid ${error ? 'rgba(239,68,68,0.2)' : result?.status >= 200 && result?.status < 300 ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
            }}>
              {error ? (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <XCircleIcon style={{ width: 20, height: 20, color: 'var(--danger)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--danger)', fontSize: '14px', marginBottom: '4px' }}>Request Failed</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{error}</p>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {result.status >= 200 && result.status < 300
                      ? <CheckCircleIcon style={{ width: 24, height: 24, color: 'var(--success)' }} />
                      : <XCircleIcon style={{ width: 24, height: 24, color: 'var(--warning)' }} />
                    }
                    <div>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}>STATUS</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: result.status >= 200 && result.status < 300 ? 'var(--success)' : 'var(--warning)' }}>{result.status}</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}>RESPONSE TIME</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>{result.timeMs}ms</p>
                  </div>
                  {result.snippet && (
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', marginBottom: '6px' }}>RESPONSE PREVIEW</p>
                      <pre style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-900)',
                        padding: '10px',
                        borderRadius: '6px',
                        overflow: 'auto',
                        maxHeight: '80px',
                        fontFamily: 'var(--font-display)',
                        border: '1px solid var(--border)',
                      }}>
                        {result.snippet}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div style={{ background: 'var(--bg-800)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em' }}>SESSION HISTORY</p>
          </div>
          <div>
            {history.map((h, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 20px',
                borderBottom: i < history.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background 0.1s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span className="status-dot" style={{ background: h.status >= 200 && h.status < 300 ? 'var(--success)' : 'var(--danger)', flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.url}</span>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-display)', color: h.status >= 200 && h.status < 300 ? 'var(--success)' : 'var(--warning)', flexShrink: 0 }}>{h.status}</span>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-display)', color: 'var(--accent)', flexShrink: 0 }}>{h.timeMs}ms</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>{h.ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}