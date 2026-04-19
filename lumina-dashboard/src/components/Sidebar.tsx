
const NAV = [
  {
    label: 'Overview', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Analytics', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M18 9l-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    label: 'Revenue', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8m4 0v2m0-10V6" />
      </svg>
    ),
  },
  {
    label: 'Users', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: 'Reports', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: 'Settings', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
]

interface SidebarProps {
  active: string
  onSelect: (label: string) => void
  collapsed: boolean
}

export default function Sidebar({ active, onSelect, collapsed }: SidebarProps) {
  return (
    <aside
      className="flex flex-col border-r transition-all duration-300"
      style={{
        width: collapsed ? '64px' : '220px',
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 border-b px-4"
        style={{ height: '60px', borderColor: 'var(--color-border)' }}
      >
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {!collapsed && (
          <span className="font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--color-text-primary)' }}>
            Lumina
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-2 pt-3">
        {NAV.map((item) => {
          const isActive = item.label === active
          return (
            <button
              key={item.label}
              onClick={() => onSelect(item.label)}
              title={collapsed ? item.label : undefined}
              className="relative mb-0.5 flex w-full items-center gap-3 rounded-xl transition-all duration-150"
              style={{
                padding: collapsed ? '10px 14px' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: isActive ? 'var(--color-blue-dim)' : 'transparent',
                color: isActive ? 'var(--color-blue)' : 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent'
              }}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-r-full"
                  style={{ background: 'var(--color-blue)' }}
                />
              )}
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && (
                <span style={{ fontSize: '13.5px', fontWeight: isActive ? 600 : 400 }}>
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div className="border-t p-3" style={{ borderColor: 'var(--color-border)' }}>
        <div
          className="flex items-center gap-3 rounded-xl p-2 cursor-pointer transition-colors"
          style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)', color: '#fff' }}
          >
            AC
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>Alex Chen</p>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
