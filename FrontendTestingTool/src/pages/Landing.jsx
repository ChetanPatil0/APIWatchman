import { Link } from 'react-router-dom';
import {
  BoltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BellAlertIcon,
  ServerStackIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: BoltIcon,
    title: 'Real-Time Monitoring',
    desc: 'Check your API endpoints every minute. Get instant alerts when something goes wrong.',
  },
  {
    icon: ChartBarIcon,
    title: 'Response Time Trends',
    desc: 'Track latency over time with beautiful charts. Spot degradation before users do.',
  },
  {
    icon: BellAlertIcon,
    title: 'Smart Alerts',
    desc: 'Email notifications when endpoints fail or slow down beyond your thresholds.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Auth Support',
    desc: 'Monitor authenticated endpoints with Bearer tokens, API keys, or Basic auth.',
  },
  {
    icon: ServerStackIcon,
    title: 'Multi-Environment',
    desc: 'Track production, staging, testing, and dry-run environments separately.',
  },
  {
    icon: ClockIcon,
    title: 'Check History',
    desc: 'Full log of every check performed — status codes, response times, and errors.',
  },
];

const freeFeatures = [
  'Up to 10 endpoints',
  'Email alerts',
  'Response time charts',
  '100 checks history per endpoint',
  'Multi-environment support',
  'API key & Bearer auth',
];

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-900)' }} className="grid-bg">
      {/* Nav */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(2,8,23,0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(59,130,246,0.35)',
          }}>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: 700 }}>Λ</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', letterSpacing: '0.06em' }}>APIWATCH</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/login" style={{
            padding: '8px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            fontSize: '14px',
            transition: 'color 0.15s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            Login
          </Link>
          <Link to="/register" style={{
            padding: '8px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            background: 'var(--accent)',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'background 0.15s',
            boxShadow: '0 0 20px rgba(59,130,246,0.3)',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Glow orb */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '20px',
          background: 'var(--accent-muted)',
          border: '1px solid rgba(59,130,246,0.25)',
          marginBottom: '32px',
          fontSize: '12px',
          color: 'var(--accent)',
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.08em',
        }}>
          <span className="status-dot success" style={{ width: '6px', height: '6px' }} />
          FREE — NO CREDIT CARD REQUIRED
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'var(--text-primary)',
          marginBottom: '24px',
          letterSpacing: '-0.02em',
          animation: 'fadeUp 0.6s ease forwards',
        }}>
          Monitor Your APIs<br />
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Before They Fail You.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'var(--text-secondary)',
          maxWidth: '560px',
          margin: '0 auto 48px',
          lineHeight: 1.7,
          animation: 'fadeUp 0.6s 0.1s ease both',
        }}>
          Real-time uptime monitoring, response time tracking, and instant email alerts for all your API endpoints.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp 0.6s 0.2s ease both' }}>
          <Link to="/register" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 32px',
            background: 'var(--accent)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow: '0 0 30px rgba(59,130,246,0.4)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'none'; }}
          >
            Start Monitoring Free
            <ArrowRightIcon style={{ width: 16, height: 16 }} />
          </Link>
          <Link to="/login" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 32px',
            background: 'transparent',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 500,
            border: '1px solid var(--border)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.background = 'var(--bg-700)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; }}
          >
            Sign In
          </Link>
        </div>

        {/* Mock terminal */}
        <div style={{
          maxWidth: '700px',
          margin: '64px auto 0',
          background: 'var(--bg-800)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.1)',
          animation: 'fadeUp 0.6s 0.3s ease both',
          textAlign: 'left',
        }}>
          <div style={{ padding: '12px 16px', background: 'var(--bg-700)', borderBottom: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
            {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
              <span key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
            <span style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>endpoint-status.log</span>
          </div>
          <div style={{ padding: '20px', fontFamily: 'var(--font-display)', fontSize: '13px', lineHeight: '1.8' }}>
            {[
              { time: '09:00:01', endpoint: 'POST /api/auth/login', ms: 142, status: 200, ok: true },
              { time: '09:00:01', endpoint: 'GET  /api/users/profile', ms: 89, status: 200, ok: true },
              { time: '09:05:01', endpoint: 'POST /api/payments/charge', ms: 2847, status: 200, ok: false, note: 'slow' },
              { time: '09:10:01', endpoint: 'GET  /api/products', ms: 0, status: 503, ok: false, note: 'failed' },
              { time: '09:10:05', endpoint: '⚡ Alert sent: products endpoint down', ms: null, alert: true },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{row.time}</span>
                {row.alert ? (
                  <span style={{ color: '#f59e0b' }}>{row.endpoint}</span>
                ) : (
                  <>
                    <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{row.endpoint}</span>
                    {row.ms !== null && <span style={{ color: row.ok || row.note !== 'slow' ? 'var(--text-muted)' : '#f59e0b' }}>{row.ms}ms</span>}
                    <span style={{
                      padding: '1px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      background: row.ok ? 'rgba(16,185,129,0.15)' : row.note === 'slow' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                      color: row.ok ? '#10b981' : row.note === 'slow' ? '#f59e0b' : '#ef4444',
                    }}>
                      {row.status}
                    </span>
                  </>
                )}
              </div>
            ))}
            <div style={{ marginTop: '4px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>_</span>
              <span style={{ animation: 'blink 1s step-start infinite' }}>█</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '12px' }}>
            CAPABILITIES
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Everything you need to stay ahead of downtime
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} style={{
              padding: '28px',
              background: 'var(--bg-800)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              transition: 'all 0.2s',
              cursor: 'default',
              animation: `fadeUp 0.5s ${i * 0.07}s ease both`,
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--accent-muted)',
                border: '1px solid rgba(59,130,246,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Icon style={{ width: 22, height: 22, color: 'var(--accent)' }} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Free plan */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{
          maxWidth: '520px',
          margin: '0 auto',
          padding: '48px',
          background: 'var(--bg-800)',
          border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-accent)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
          }} />

          <div style={{
            display: 'inline-block',
            padding: '4px 16px',
            borderRadius: '20px',
            background: 'var(--accent-muted)',
            border: '1px solid rgba(59,130,246,0.3)',
            fontSize: '12px',
            color: 'var(--accent)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.08em',
            marginBottom: '24px',
          }}>
            FREE FOREVER
          </div>

          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '56px', fontWeight: 700, color: 'var(--text-primary)' }}>$0</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '16px' }}>/month</span>
          </div>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
            Everything you need to get started with API monitoring.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', marginBottom: '36px' }}>
            {freeFeatures.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <CheckIcon style={{ width: 12, height: 12, color: 'var(--success)' }} />
                </div>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>

          <Link to="/register" style={{
            display: 'block',
            padding: '14px',
            background: 'var(--accent)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow: '0 0 25px rgba(59,130,246,0.35)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 48px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '13px', fontWeight: 700 }}>Λ</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', color: 'var(--text-muted)' }}>APIWATCH</span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>© 2025 APIWatch. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Terms', 'Docs'].map((l) => (
            <a key={l} href="#" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}