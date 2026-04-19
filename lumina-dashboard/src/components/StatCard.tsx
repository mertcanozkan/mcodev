interface StatCardProps {
  title: string
  value: string
  change: string
  positive: boolean
  icon: React.ReactNode
  iconBg: string
  sparkline?: number[]
  color: string
}

export default function StatCard({ title, value, change, positive, icon, iconBg, sparkline, color }: StatCardProps) {
  const max = sparkline ? Math.max(...sparkline) : 1
  const min = sparkline ? Math.min(...sparkline) : 0
  const range = max - min || 1

  const points = sparkline
    ? sparkline.map((v, i) => {
        const x = (i / (sparkline.length - 1)) * 80
        const y = 24 - ((v - min) / range) * 20
        return `${x},${y}`
      }).join(' ')
    : ''

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 transition-all duration-200"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-hover)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)' }}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-30" style={{ background: `radial-gradient(circle, ${color}30, transparent 70%)` }} />

      <div className="flex items-start justify-between">
        <div>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {title}
          </p>
          <p className="mt-2" style={{ fontSize: '26px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>
            {value}
          </p>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span
              className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
              style={{
                background: positive ? 'var(--color-green-dim)' : 'var(--color-red-dim)',
                color: positive ? 'var(--color-green)' : 'var(--color-red)',
              }}
            >
              {positive ? '↑' : '↓'} {change}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>vs last month</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: iconBg }}>
            {icon}
          </div>
          {sparkline && (
            <svg width="80" height="28" viewBox="0 0 80 28" fill="none">
              <polyline
                points={points}
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.7"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}
