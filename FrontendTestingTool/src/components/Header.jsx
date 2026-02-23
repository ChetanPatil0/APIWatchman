import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const pageTitles = {
  '/dashboard': { title: 'Dashboard', sub: 'Overview of your monitored endpoints' },
  '/endpoints': { title: 'Endpoints', sub: 'Manage your API endpoints' },
  '/endpoints/new': { title: 'Add Endpoint', sub: 'Configure a new endpoint to monitor' },
  '/test': { title: 'Quick Test', sub: 'Ping any URL instantly' },
  '/settings': { title: 'Settings', sub: 'Configure your preferences' },
  '/profile': { title: 'Profile', sub: 'Your account details' },
};

export default function Header({ onToggleSidebar }) {
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);

  const current = Object.entries(pageTitles).find(([key]) => location.pathname.startsWith(key));
  const info = current?.[1] || { title: 'APIWatch', sub: '' };

  return (
    <header style={{
      height: '64px',
      background: 'var(--bg-800)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 90,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-600)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <Bars3Icon style={{ width: 20, height: 20 }} />
        </button>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            {info.title}
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '1px' }}>{info.sub}</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Status indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '20px',
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.2)',
          fontSize: '12px',
          color: 'var(--success)',
          fontFamily: 'var(--font-display)',
        }}>
          <span className="status-dot success" />
          ALL SYSTEMS NOMINAL
        </div>

        {/* Notification bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-600)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <BellIcon style={{ width: 20, height: 20 }} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '7px',
              height: '7px',
              background: 'var(--accent)',
              borderRadius: '50%',
              border: '2px solid var(--bg-800)',
            }} />
          </button>

          {notifOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '300px',
              background: 'var(--bg-700)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              padding: '16px',
              zIndex: 200,
              animation: 'fadeIn 0.15s ease',
            }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '0.05em' }}>
                NOTIFICATIONS
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { msg: 'Endpoint "Auth API" recovered', time: '2m ago', type: 'success' },
                  { msg: 'Endpoint "Payments" is slow', time: '15m ago', type: 'warning' },
                  { msg: 'Endpoint "Legacy API" failed', time: '1h ago', type: 'danger' },
                ].map((n, i) => (
                  <div key={i} style={{
                    padding: '10px 12px',
                    background: 'var(--bg-600)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: `3px solid var(--${n.type})`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '8px',
                  }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{n.msg}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}