import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import RevenueChart from './components/RevenueChart'
import ActivityChart from './components/ActivityChart'
import TrafficSources from './components/TrafficSources'
import Transactions from './components/Transactions'
import TopPages from './components/TopPages'
import { revenueData } from './data/mock'

const sparkRevenue = revenueData.slice(-8).map(d => d.revenue)
const sparkUsers   = revenueData.slice(-8).map(d => d.users)
const sparkConv    = [3.1, 2.9, 3.4, 3.0, 3.2, 3.5, 3.1, 3.24]
const sparkSession = [240, 262, 255, 278, 268, 272, 269, 272]

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
function DollarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#60a5fa' }}>
      <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8m4 0v2m0-10V6" />
    </svg>
  )
}
function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#a78bfa' }}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}
function TrendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#34d399' }}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbf24' }}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

const now = new Date()
const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

export default function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex" style={{ minHeight: '100svh', width: '100%', background: 'var(--color-bg)' }}>
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile unless open */}
      <div
        className={`fixed inset-y-0 left-0 z-50 lg:relative lg:flex lg:flex-shrink-0 transition-transform duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <Sidebar
          active={activeNav}
          onSelect={(l) => { setActiveNav(l); setMobileSidebarOpen(false) }}
          collapsed={sidebarCollapsed}
        />
      </div>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header
          className="flex items-center gap-4 border-b"
          style={{ height: '60px', padding: '0 40px', background: 'var(--color-surface)', borderColor: 'var(--color-border)', flexShrink: 0 }}
        >
          {/* Mobile menu + desktop collapse */}
          <button
            className="rounded-xl p-2 transition-colors lg:hidden"
            style={{ color: 'var(--color-text-secondary)', background: 'var(--color-surface-2)' }}
            onClick={() => setMobileSidebarOpen(true)}
          >
            <MenuIcon />
          </button>
          <button
            className="hidden rounded-xl p-2 transition-colors lg:flex"
            style={{ color: 'var(--color-text-secondary)', background: 'var(--color-surface-2)' }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <MenuIcon />
          </button>

          {/* Page title */}
          <div className="flex-1">
            <h1 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
              {activeNav}
            </h1>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{dateStr}</p>
          </div>

          {/* Search */}
          <div
            className="hidden items-center gap-2 rounded-xl px-3 py-2 sm:flex"
            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', minWidth: '200px' }}
          >
            <span style={{ color: 'var(--color-text-muted)' }}><SearchIcon /></span>
            <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>Search…</span>
            <kbd
              className="ml-auto rounded px-1.5 py-0.5"
              style={{ fontSize: '10px', background: 'var(--color-surface-3)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
            >
              ⌘K
            </kbd>
          </div>

          {/* Notification */}
          <button
            className="relative rounded-xl p-2 transition-colors"
            style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-blue)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)' }}
          >
            <BellIcon />
            <span
              className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-blue)' }}
            />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto" style={{ background: 'var(--color-bg)', padding: '24px 40px' }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          {/* Welcome bar */}
          <div
            className="mb-6 flex items-center justify-between rounded-2xl px-5 py-4"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(96,165,250,0.06) 50%, transparent 100%)',
              border: '1px solid rgba(96,165,250,0.15)',
            }}
          >
            <div>
              <p style={{ fontSize: '13px', color: 'var(--color-blue)', fontWeight: 600 }}>Good morning, Alex 👋</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                Revenue is up <strong style={{ color: 'var(--color-green)' }}>12.5%</strong> vs last month. You're on track for a record December.
              </p>
            </div>
            <button
              className="hidden rounded-xl px-4 py-2 text-xs font-semibold sm:block"
              style={{ background: 'rgba(96,165,250,0.15)', color: 'var(--color-blue)', border: '1px solid rgba(96,165,250,0.25)' }}
            >
              View Report →
            </button>
          </div>

          {/* Stat cards */}
          <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value="$48,295"
              change="12.5%"
              positive={true}
              icon={<DollarIcon />}
              iconBg="var(--color-blue-dim)"
              color="#60a5fa"
              sparkline={sparkRevenue}
            />
            <StatCard
              title="Active Users"
              value="2,847"
              change="8.2%"
              positive={true}
              icon={<UsersIcon />}
              iconBg="rgba(167,139,250,0.12)"
              color="#a78bfa"
              sparkline={sparkUsers}
            />
            <StatCard
              title="Conversion Rate"
              value="3.24%"
              change="1.1%"
              positive={false}
              icon={<TrendIcon />}
              iconBg="var(--color-green-dim)"
              color="#34d399"
              sparkline={sparkConv}
            />
            <StatCard
              title="Avg. Session"
              value="4m 32s"
              change="5.7%"
              positive={true}
              icon={<ClockIcon />}
              iconBg="var(--color-amber-dim)"
              color="#fbbf24"
              sparkline={sparkSession}
            />
          </div>

          {/* Revenue chart — full width */}
          <div className="mb-5">
            <RevenueChart />
          </div>

          {/* Activity + Traffic */}
          <div className="mb-5 grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ActivityChart />
            </div>
            <div>
              <TrafficSources />
            </div>
          </div>

          {/* Transactions + Top Pages */}
          <div className="grid gap-5 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Transactions />
            </div>
            <div className="lg:col-span-2">
              <TopPages />
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  )
}
