import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  background: 'var(--bg-700)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'var(--font-body)',
  transition: 'border-color 0.15s',
};

const selectStyle = { ...inputStyle, cursor: 'pointer' };

function Field({ label, hint, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>{hint}</p>}
    </div>
  );
}

export default function AddEndpoint() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    url: '',
    method: 'GET',
    mode: 'dry-run',
    authType: 'none',
    token: '',
    expectedStatus: 200,
    maxResponseTime: 2000,
    intervalMinutes: 10,
    body: '',
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/endpoints', form);
      toast.success('Endpoint created successfully!');
      navigate('/endpoints');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create endpoint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', animation: 'fadeUp 0.4s ease' }}>
      <form onSubmit={handleSubmit}>
        <div style={{
          background: 'var(--bg-800)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
        }}>
          {/* Section: Basic */}
          <div style={{ padding: '28px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '20px' }}>
              BASIC CONFIGURATION
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <Field label="ENDPOINT NAME">
                <input value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="e.g. Production Auth API" style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </Field>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px' }}>
                <Field label="METHOD">
                  <select value={form.method} onChange={(e) => set('method', e.target.value)} style={selectStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  >
                    {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => (
                      <option key={m} value={m} style={{ background: '#0f172a' }}>{m}</option>
                    ))}
                  </select>
                </Field>
                <Field label="URL">
                  <input value={form.url} onChange={(e) => set('url', e.target.value)} required placeholder="https://api.example.com/health" style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </Field>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Field label="ENVIRONMENT">
                  <select value={form.mode} onChange={(e) => set('mode', e.target.value)} style={selectStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  >
                    {['production', 'staging', 'testing', 'dry-run'].map((m) => (
                      <option key={m} value={m} style={{ background: '#0f172a' }}>{m}</option>
                    ))}
                  </select>
                </Field>
                <Field label="CHECK INTERVAL (MINUTES)">
                  <input type="number" min={1} value={form.intervalMinutes} onChange={(e) => set('intervalMinutes', +e.target.value)} style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Section: Validation */}
          <div style={{ padding: '28px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '20px' }}>
              VALIDATION RULES
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="EXPECTED STATUS CODE">
                <input type="number" value={form.expectedStatus} onChange={(e) => set('expectedStatus', +e.target.value)} style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </Field>
              <Field label="MAX RESPONSE TIME (MS)" hint="Checks slower than this are flagged">
                <input type="number" value={form.maxResponseTime} onChange={(e) => set('maxResponseTime', +e.target.value)} style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </Field>
            </div>
          </div>

          {/* Section: Auth */}
          <div style={{ padding: '28px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '20px' }}>
              AUTHENTICATION
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Field label="AUTH TYPE">
                <select value={form.authType} onChange={(e) => set('authType', e.target.value)} style={selectStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                >
                  {['none', 'bearer', 'apikey', 'basic'].map((t) => (
                    <option key={t} value={t} style={{ background: '#0f172a', textTransform: 'capitalize' }}>{t === 'none' ? 'No Auth' : t === 'apikey' ? 'API Key (X-API-Key)' : t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </Field>
              {form.authType !== 'none' && (
                <Field label="TOKEN / CREDENTIAL">
                  <input type="password" value={form.token} onChange={(e) => set('token', e.target.value)} placeholder="Enter your token or credentials" style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </Field>
              )}
            </div>
          </div>

          {/* Section: Body */}
          {['POST', 'PUT', 'PATCH'].includes(form.method) && (
            <div style={{ padding: '28px', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '20px' }}>
                REQUEST BODY
              </p>
              <Field label="BODY (JSON)">
                <textarea value={form.body} onChange={(e) => set('body', e.target.value)} rows={5} placeholder='{"key": "value"}' style={{
                  ...inputStyle,
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  resize: 'vertical',
                  lineHeight: 1.6,
                }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </Field>
            </div>
          )}

          {/* Submit */}
          <div style={{ padding: '20px 28px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={() => navigate('/endpoints')} style={{
              padding: '10px 24px',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-700)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{
              padding: '10px 28px',
              background: loading ? 'var(--bg-600)' : 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 0 20px rgba(59,130,246,0.3)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              {loading && <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />}
              {loading ? 'Creating...' : 'Create Endpoint'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}