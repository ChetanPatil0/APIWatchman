import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import {
  ArrowLeftIcon,
  BoltIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-700)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      padding: '12px 16px',
    }}>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>{label}</p>
      <p style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 600 }}>
        {payload[0].value} ms
      </p>
    </div>
  );
};

export default function EndpointDetail() {
  const { id } = useParams();
  const [endpoint, setEndpoint] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [epRes, logRes] = await Promise.all([
        api.get(`/endpoints/${id}`),
        api.get(`/endpoints/${id}/logs`),
      ]);
      setEndpoint(epRes.data);
      setLogs(logRes.data);
    } catch {
      toast.error('Failed to load endpoint');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const handleManualCheck = async () => {
    setChecking(true);
    try {
      await api.post(`/endpoints/${id}/check-now`);
      toast.success('Check triggered! Refreshing in 4s...');
      setTimeout(fetchData, 4000);
    } catch {
      toast.error('Failed to trigger check');
    } finally {
      setChecking(false);
    }
  };

  if (loading) return <Loader text="LOADING ENDPOINT..." />;
  if (!endpoint) return <div style={{ textAlign: 'center', padding: '60px' }}><p style={{ color: 'var(--text-muted)' }}>Endpoint not found.</p></div>;

  const latest = logs[0] || {};
  const isHealthy = latest.success;
  const isSlow = !latest.success && latest.responseTime > endpoint.maxResponseTime;
  const statusLabel = isHealthy ? 'Healthy' : isSlow ? 'Degraded' : logs.length ? 'Failing' : 'Pending';
  const statusColor = isHealthy ? 'var(--success)' : isSlow ? 'var(--warning)' : logs.length ? 'var(--danger)' : 'var(--text-muted)';

  const chartData = logs.slice(0, 30).reverse().map((log) => ({
    time: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    responseTime: log.responseTime,
    success: log.success,
  }));

  const successRate = logs.length ? Math.round((logs.filter((l) => l.success).length / logs.length) * 100) : null;
  const avgTime = logs.length ? Math.round(logs.reduce((s, l) => s + l.responseTime, 0) / logs.length) : null;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <Link to="/endpoints" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '13px', marginBottom: '12px', transition: 'color 0.15s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <ArrowLeftIcon style={{ width: 14, height: 14 }} />
            All Endpoints
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor, flexShrink: 0 }} />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{endpoint.name}</h1>
            <span style={{
              padding: '3px 10px', borderRadius: '6px', fontSize: '11px',
              fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.06em',
              background: `${statusColor}15`, color: statusColor, border: `1px solid ${statusColor}25`,
            }}>
              {statusLabel.toUpperCase()}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginTop: '6px' }}>{endpoint.url}</p>
        </div>

        <button
          onClick={handleManualCheck}
          disabled={checking}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: checking ? 'var(--bg-600)' : 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: checking ? 'not-allowed' : 'pointer',
            boxShadow: checking ? 'none' : '0 0 15px rgba(59,130,246,0.25)',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
        >
          {checking
            ? <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />Checking...</>
            : <><BoltIcon style={{ width: 15, height: 15 }} />Run Check Now</>
          }
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        {[
          { label: 'Uptime (100 checks)', value: successRate !== null ? `${successRate}%` : '—', color: successRate >= 95 ? 'var(--success)' : successRate >= 80 ? 'var(--warning)' : 'var(--danger)', icon: CheckCircleIcon },
          { label: 'Avg Response Time', value: avgTime !== null ? `${avgTime}ms` : '—', color: avgTime <= endpoint.maxResponseTime ? 'var(--success)' : 'var(--warning)', icon: ClockIcon },
          { label: 'Last Check', value: latest.timestamp ? new Date(latest.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—', color: 'var(--text-secondary)', icon: ClockIcon },
          { label: 'Total Logs', value: logs.length, color: 'var(--accent)', icon: ClockIcon },
        ].map(({ label, value, color, icon: Icon }, i) => (
          <div key={i} style={{
            background: 'var(--bg-800)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', padding: '16px 20px',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>{label.toUpperCase()}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Config */}
      <div style={{ background: 'var(--bg-800)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em' }}>CONFIGURATION</p>
        </div>
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
          {[
            ['Method', endpoint.method],
            ['Environment', endpoint.mode],
            ['Auth', endpoint.authType],
            ['Expected Status', endpoint.expectedStatus],
            ['Max Response', `${endpoint.maxResponseTime}ms`],
            ['Interval', `${endpoint.intervalMinutes} min`],
          ].map(([label, value]) => (
            <div key={label}>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', marginBottom: '4px' }}>{label.toUpperCase()}</p>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500, textTransform: 'capitalize' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ background: 'var(--bg-800)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em' }}>RESPONSE TIME (LAST 30 CHECKS)</p>
        </div>
        <div style={{ padding: '20px' }}>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 11, fontFamily: 'Space Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 11, fontFamily: 'Space Mono' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={endpoint.maxResponseTime} stroke="#ef444460" strokeDasharray="4 4" label={{ value: 'Max', fill: '#ef4444', fontSize: 11, fontFamily: 'Space Mono' }} />
                <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={2} dot={(props) => {
                  const { cx, cy, payload } = props;
                  return <circle key={payload.time} cx={cx} cy={cy} r={4} fill={payload.success ? '#10b981' : '#ef4444'} stroke="var(--bg-800)" strokeWidth={2} />;
                }} name="Response Time (ms)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
              <p>No data yet. Run your first check!</p>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      <div style={{ background: 'var(--bg-800)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em' }}>CHECK HISTORY</p>
        </div>
        {logs.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>No checks yet.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-700)' }}>
                  {['Timestamp', 'Status', 'Code', 'Response Time', 'Mode', 'Error'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '0.06em', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>
                      {h.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => {
                  const logOk = log.success;
                  const logSlow = !logOk && log.responseTime > endpoint.maxResponseTime;
                  return (
                    <tr key={log._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          background: logOk ? 'rgba(16,185,129,0.12)' : logSlow ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
                          color: logOk ? '#10b981' : logSlow ? '#f59e0b' : '#ef4444',
                        }}>
                          {logOk ? 'OK' : logSlow ? 'SLOW' : 'FAIL'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontFamily: 'var(--font-display)', color: 'var(--text-secondary)' }}>
                        {log.statusCode || '—'}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontFamily: 'var(--font-display)', color: log.responseTime > endpoint.maxResponseTime ? 'var(--warning)' : 'var(--text-secondary)' }}>
                        {log.responseTime}ms
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                        {log.mode}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--danger)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {log.errorMessage || <span style={{ color: 'var(--text-muted)' }}>—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}