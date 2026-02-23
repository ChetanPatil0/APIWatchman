import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  BellIcon,
  EnvelopeIcon,
  SunIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';

function Section({ title, children }) {
  return (
    <div style={{ background: 'var(--bg-800)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em' }}>{title}</p>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {children}
      </div>
    </div>
  );
}

function Toggle({ label, desc, value, onChange }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
      <div>
        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{label}</p>
        {desc && <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{desc}</p>}
      </div>
      <div
        onClick={onChange}
        style={{
          width: '44px', height: '24px', borderRadius: '12px',
          background: value ? 'var(--accent)' : 'var(--bg-600)',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
          border: '1px solid transparent',
        }}
      >
        <span style={{
          position: 'absolute',
          top: '2px',
          left: value ? '22px' : '2px',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: 'white',
          transition: 'left 0.2s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }} />
      </div>
    </div>
  );
}

export default function Settings() {
  const [alerts, setAlerts] = useState({ email: true, failOnly: false, slowAlerts: true });
  const [notifEmail, setNotifEmail] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    setTimeout(() => {
      toast.success('Settings saved!');
      setSaving(false);
    }, 800);
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      <Section title="NOTIFICATION SETTINGS">
        <Toggle label="Email Alerts" desc="Get notified when an endpoint fails" value={alerts.email} onChange={() => setAlerts((a) => ({ ...a, email: !a.email }))} />
        <div style={{ height: '1px', background: 'var(--border)' }} />
        <Toggle label="Failure Only" desc="Only alert on complete failures, not slow responses" value={alerts.failOnly} onChange={() => setAlerts((a) => ({ ...a, failOnly: !a.failOnly }))} />
        <div style={{ height: '1px', background: 'var(--border)' }} />
        <Toggle label="Slow Response Alerts" desc="Alert when response time exceeds max threshold" value={alerts.slowAlerts} onChange={() => setAlerts((a) => ({ ...a, slowAlerts: !a.slowAlerts }))} />
      </Section>

      <Section title="NOTIFICATION EMAIL">
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', marginBottom: '8px' }}>
            SEND ALERTS TO
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              value={notifEmail}
              onChange={(e) => setNotifEmail(e.target.value)}
              placeholder="alerts@yourcompany.com"
              style={{
                flex: 1,
                padding: '11px 14px',
                background: 'var(--bg-700)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
            Leave blank to use your account email.
          </p>
        </div>
      </Section>

      <Section title="CHECK DEFAULTS">
        {[
          { label: 'DEFAULT INTERVAL (MIN)', val: '10', hint: 'Default check interval for new endpoints' },
          { label: 'DEFAULT MAX RESPONSE (MS)', val: '2000', hint: 'Default max response time threshold' },
        ].map(({ label, val, hint }) => (
          <div key={label}>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', marginBottom: '8px' }}>
              {label}
            </label>
            <input defaultValue={val} type="number" style={{
              width: '180px',
              padding: '10px 14px',
              background: 'var(--bg-700)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'border-color 0.15s',
            }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>{hint}</p>
          </div>
        ))}
      </Section>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={save} disabled={saving} style={{
          padding: '11px 28px',
          background: 'var(--accent)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: saving ? 'not-allowed' : 'pointer',
          boxShadow: '0 0 20px rgba(59,130,246,0.25)',
          transition: 'background 0.15s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
        >
          {saving && <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}