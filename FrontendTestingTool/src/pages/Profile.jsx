import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';
import api from '../utils/api';
import {
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

export default function Profile() {
  const { user } = useAuthStore();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      // You'd wire this up to your backend
      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.email?.slice(0, 2).toUpperCase() || 'U';

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Profile card */}
      <div style={{
        background: 'var(--bg-800)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
      }}>
        {/* Banner */}
        <div style={{
          height: '100px',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1a1040 100%)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
        </div>

        <div style={{ padding: '0 28px 28px' }}>
          {/* Avatar */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            border: '4px solid var(--bg-800)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-36px',
            marginBottom: '16px',
            boxShadow: '0 0 25px rgba(59,130,246,0.3)',
          }}>
            <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700 }}>{initials}</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {user?.email?.split('@')[0]}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>{user?.email}</p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { icon: ShieldCheckIcon, label: 'Free Plan' },
              { icon: CalendarIcon, label: 'Member since 2025' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px',
                background: 'var(--bg-700)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
              }}>
                <Icon style={{ width: 13, height: 13 }} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Account info */}
      <div style={{ background: 'var(--bg-800)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em' }}>ACCOUNT DETAILS</p>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'var(--bg-700)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <EnvelopeIcon style={{ width: 18, height: 18, color: 'var(--text-muted)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', marginBottom: '3px' }}>EMAIL</p>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{user?.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'var(--bg-700)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <LockClosedIcon style={{ width: 18, height: 18, color: 'var(--text-muted)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', marginBottom: '3px' }}>PASSWORD</p>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>••••••••••</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div style={{ background: 'var(--bg-800)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em' }}>CHANGE PASSWORD</p>
        </div>
        <form onSubmit={handlePasswordChange} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'CURRENT PASSWORD', val: currentPassword, set: setCurrentPassword },
            { label: 'NEW PASSWORD', val: newPassword, set: setNewPassword },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
                {label}
              </label>
              <input
                type="password"
                value={val}
                onChange={(e) => set(e.target.value)}
                required
                placeholder="••••••••"
                style={{
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
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={loading} style={{
              padding: '10px 24px',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Danger zone */}
      <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(239,68,68,0.15)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#ef4444', letterSpacing: '0.1em' }}>DANGER ZONE</p>
        </div>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Delete Account</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Permanently remove your account and all monitored endpoints.</p>
          </div>
          <button style={{
            padding: '9px 20px',
            background: 'transparent',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '10px',
            color: '#ef4444',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
            flexShrink: 0,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}