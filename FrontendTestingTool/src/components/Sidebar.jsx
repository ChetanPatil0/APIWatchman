import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import {
  ChartBarIcon,
  ServerStackIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: ChartBarIcon },
  { to: '/endpoints', label: 'Endpoints', icon: ServerStackIcon },
  { to: '/endpoints/new', label: 'Add Endpoint', icon: PlusCircleIcon },
  { to: '/test', label: 'Quick Test', icon: BeakerIcon },
  { to: '/settings', label: 'Settings', icon: Cog6ToothIcon },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside style={{
      width: collapsed ? '72px' : '240px',
      minHeight: '100vh',
      background: 'var(--bg-800)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.25s ease',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '24px 16px' : '24px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
      }} onClick={onToggle}>
        <div style={{
          width: '36px',
          height: '36px',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 20px rgba(59,130,246,0.3)',
        }}>
          <span style={{ color: 'white', fontSize: '16px', fontWeight: 700 }}>Λ</span>
        </div>
        {!collapsed && (
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              APIWATCH
            </p>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>MONITOR</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : ''}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: collapsed ? '10px 14px' : '10px 14px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              color: isActive ? '#3b82f6' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-muted)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(59,130,246,0.2)' : 'transparent'}`,
              transition: 'all 0.15s',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              whiteSpace: 'nowrap',
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.style.background.includes('accent-muted')) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.style.background = '';
                e.currentTarget.style.color = '';
              }
            }}
          >
            <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div style={{ padding: '16px 10px', borderTop: '1px solid var(--border)' }}>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            color: isActive ? '#3b82f6' : 'var(--text-secondary)',
            background: isActive ? 'var(--accent-muted)' : 'transparent',
            transition: 'all 0.15s',
            marginBottom: '4px',
          })}
        >
          <UserCircleIcon style={{ width: 18, height: 18, flexShrink: 0 }} />
          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email}
              </p>
            </div>
          )}
        </NavLink>

        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : ''}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          <ArrowRightOnRectangleIcon style={{ width: 18, height: 18, flexShrink: 0 }} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}