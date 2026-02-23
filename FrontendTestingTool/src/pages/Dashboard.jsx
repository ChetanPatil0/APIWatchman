import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Loader from '../components/Loader';
import {
  ServerStackIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div style={{
      background: 'var(--bg-800)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transition: 'all 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(${color === 'success' ? '16,185,129' : color === 'danger' ? '239,68,68' : color === 'warning' ? '245,158,11' : '59,130,246'},0.3)`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: '40px', height: '40px',
          borderRadius: '10px',
          background: `rgba(${color === 'success' ? '16,185,129' : color === 'danger' ? '239,68,68' : color === 'warning' ? '245,158,11' : '59,130,246'},0.12)`,
          border: `1px solid rgba(${color === 'success' ? '16,185,129' : color === 'danger' ? '239,68,68' : color === 'warning' ? '245,158,11' : '59,130,246'},0.2)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon style={{ width: 20, height: 20, color: `var(--${color === 'blue' ? 'accent' : color})` }} />
        </div>
        {sub && <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>{sub}</span>}
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</p>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>{label}</p>
      </div>
    </div>
  );
}

function EndpointRow({ endpoint }) {
  const statusColor = endpoint.isUp ? 'var(--success)' : 'var(--danger)';
  const modeColors = {
    production: '#3b82f6',
    staging: '#8b5cf6',
    testing: '#f59e0b',
    'dry-run': '#6b7280',
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto auto auto auto',
      alignItems: 'center',
      gap: '16px',
      padding: '16px 20px',
      borderBottom: '1px solid var(--border)',
      transition: 'background 0.15s',
    }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <span className="status-dot" style={{ background: statusColor, flexShrink: 0, ...(endpoint.isUp ? { animation: 'pulse-glow 2s infinite', boxShadow: '0 0 0 0 rgba(16,185,129,0.4)' } : {}) }} />
        <div style={{ minWidth: 0 }}>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{endpoint.name}</p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>{endpoint.url}</p>
        </div>
      </div>

      <span style={{
        padding: '3px 10px',
        borderRadius: '6px',
        fontSize: '11px',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        background: `${modeColors[endpoint.mode]}20`,
        color: modeColors[endpoint.mode],
        border: `1px solid ${modeColors[endpoint.mode]}30`,
        whiteSpace: 'nowrap',
        letterSpacing: '0.04em',
      }}>
        {endpoint.mode.toUpperCase()}
      </span>

      <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
        /{endpoint.method}
      </span>

      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
        {endpoint.intervalMinutes}m interval
      </span>

      <Link to={`/endpoints/${endpoint._id}`} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '13px',
        color: 'var(--accent)',
        textDecoration: 'none',
        fontWeight: 500,
        transition: 'gap 0.15s',
        whiteSpace: 'nowrap',
      }}
        onMouseEnter={(e) => e.currentTarget.style.gap = '8px'}
        onMouseLeave={(e) => e.currentTarget.style.gap = '4px'}
      >
        View <ArrowRightIcon style={{ width: 14, height: 14 }} />
      </Link>
    </div>
  );
}

export default function Dashboard() {
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/endpoints')
      .then((r) => setEndpoints(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="LOADING DASHBOARD..." />;

  const up = endpoints.filter((e) => e.isUp !== false).length;
  const down = endpoints.filter((e) => e.isUp === false).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeIn 0.3s ease' }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCard icon={ServerStackIcon} label="Total Endpoints" value={endpoints.length} color="blue" />
        <StatCard icon={CheckCircleIcon} label="Healthy" value={up} color="success" />
        <StatCard icon={ExclamationCircleIcon} label="Down / Failing" value={down} color="danger" />
        <StatCard icon={ClockIcon} label="Avg Check Interval" value={endpoints.length ? Math.round(endpoints.reduce((s, e) => s + e.intervalMinutes, 0) / endpoints.length) + 'm' : '—'} color="warning" />
      </div>

      {/* Endpoints list */}
      <div style={{
        background: 'var(--bg-800)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
              MONITORED ENDPOINTS
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{endpoints.length} endpoint{endpoints.length !== 1 ? 's' : ''} configured</p>
          </div>
          <Link to="/endpoints/new" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: 'var(--accent)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 0 15px rgba(59,130,246,0.25)',
            transition: 'all 0.15s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            <PlusIcon style={{ width: 16, height: 16 }} />
            Add Endpoint
          </Link>
        </div>

        {endpoints.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <ServerStackIcon style={{ width: 48, height: 48, color: 'var(--text-muted)', margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '16px', fontWeight: 500 }}>No endpoints yet</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>Start monitoring by adding your first API endpoint.</p>
            <Link to="/endpoints/new" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 24px', background: 'var(--accent)', color: 'white',
              textDecoration: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
            }}>
              <PlusIcon style={{ width: 16, height: 16 }} />
              Add Your First Endpoint
            </Link>
          </div>
        ) : (
          <div>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto auto auto',
              gap: '16px',
              padding: '10px 20px',
              background: 'var(--bg-700)',
              borderBottom: '1px solid var(--border)',
            }}>
              {['Endpoint', 'Environment', 'Method', 'Interval', ''].map((h, i) => (
                <span key={i} style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{h}</span>
              ))}
            </div>
            {endpoints.map((ep) => <EndpointRow key={ep._id} endpoint={ep} />)}
          </div>
        )}
      </div>
    </div>
  );
}