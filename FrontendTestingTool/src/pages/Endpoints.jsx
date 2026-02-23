import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import {
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const modeColors = {
  production: { bg: 'rgba(59,130,246,0.12)', text: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
  staging: { bg: 'rgba(139,92,246,0.12)', text: '#a78bfa', border: 'rgba(139,92,246,0.2)' },
  testing: { bg: 'rgba(245,158,11,0.12)', text: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
  'dry-run': { bg: 'rgba(107,114,128,0.12)', text: '#9ca3af', border: 'rgba(107,114,128,0.2)' },
};

export default function Endpoints() {
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);

  const fetchEndpoints = () => {
    setLoading(true);
    api.get('/endpoints')
      .then((r) => setEndpoints(r.data))
      .catch(() => toast.error('Failed to load endpoints'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEndpoints(); }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeleting(id);
    try {
      await api.delete(`/endpoints/${id}`);
      toast.success('Endpoint deleted');
      setEndpoints((prev) => prev.filter((e) => e._id !== id));
    } catch {
      toast.error('Failed to delete endpoint');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = endpoints.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.url.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader text="LOADING ENDPOINTS..." />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{
          position: 'relative',
          flex: '1',
          minWidth: '240px',
          maxWidth: '380px',
        }}>
          <MagnifyingGlassIcon style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
            color: 'var(--text-muted)',
            pointerEvents: 'none',
          }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search endpoints..."
            style={{
              width: '100%',
              padding: '10px 12px 10px 38px',
              background: 'var(--bg-800)',
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
        <Link to="/endpoints/new" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 20px',
          background: 'var(--accent)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 0 15px rgba(59,130,246,0.25)',
          flexShrink: 0,
          transition: 'background 0.15s',
        }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
        >
          <PlusIcon style={{ width: 16, height: 16 }} />
          New Endpoint
        </Link>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div style={{
          padding: '64px',
          textAlign: 'center',
          background: 'var(--bg-800)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>{search ? 'No endpoints match your search.' : 'No endpoints yet.'}</p>
          {!search && (
            <Link to="/endpoints/new" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              marginTop: '16px', padding: '10px 20px',
              background: 'var(--accent)', color: 'white', textDecoration: 'none',
              borderRadius: '10px', fontSize: '14px', fontWeight: 600,
            }}>
              <PlusIcon style={{ width: 16, height: 16 }} />
              Add First Endpoint
            </Link>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {filtered.map((ep, i) => {
            const mc = modeColors[ep.mode] || modeColors['dry-run'];
            return (
              <div key={ep._id} style={{
                background: 'var(--bg-800)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'all 0.2s',
                animation: `fadeUp 0.4s ${i * 0.05}s ease both`,
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                {/* Card header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.url}</p>
                  </div>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    background: mc.bg,
                    color: mc.text,
                    border: `1px solid ${mc.border}`,
                    flexShrink: 0,
                  }}>
                    {ep.mode.toUpperCase()}
                  </span>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[
                    { label: ep.method, color: '#94a3b8' },
                    { label: `${ep.expectedStatus}`, color: '#94a3b8' },
                    { label: `${ep.intervalMinutes}m`, color: '#94a3b8' },
                    { label: `≤${ep.maxResponseTime}ms`, color: '#94a3b8' },
                    ...(ep.authType !== 'none' ? [{ label: ep.authType, color: '#a78bfa' }] : []),
                  ].map((tag, ti) => (
                    <span key={ti} style={{
                      padding: '2px 8px',
                      borderRadius: '5px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-display)',
                      background: 'var(--bg-700)',
                      color: tag.color,
                      border: '1px solid var(--border)',
                    }}>
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <Link to={`/endpoints/${ep._id}`} style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px',
                    background: 'var(--accent-muted)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '8px',
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    transition: 'all 0.15s',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59,130,246,0.18)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent-muted)'}
                  >
                    <ArrowTopRightOnSquareIcon style={{ width: 14, height: 14 }} />
                    Details
                  </Link>
                  <button
                    onClick={() => handleDelete(ep._id, ep.name)}
                    disabled={deleting === ep._id}
                    style={{
                      padding: '8px 12px',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.15)',
                      borderRadius: '8px',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                  >
                    <TrashIcon style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}