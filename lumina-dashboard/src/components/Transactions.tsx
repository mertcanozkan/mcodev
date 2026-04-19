import { transactions } from '../data/mock'

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  paid:    { bg: 'var(--color-green-dim)',  color: 'var(--color-green)', label: 'Paid' },
  pending: { bg: 'var(--color-amber-dim)', color: 'var(--color-amber)', label: 'Pending' },
  failed:  { bg: 'var(--color-red-dim)',   color: 'var(--color-red)',   label: 'Failed' },
}

const PLAN_COLORS: Record<string, string> = {
  Enterprise: '#a78bfa',
  Pro:        '#60a5fa',
  Starter:    '#34d399',
}

export default function Transactions() {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Recent Transactions</h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Last 6 payments</p>
        </div>
        <button
          className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
          style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-blue)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)' }}
        >
          View all →
        </button>
      </div>

      <div className="space-y-1">
        {transactions.map((tx) => {
          const s = STATUS_STYLES[tx.status]
          return (
            <div
              key={tx.id}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
              style={{ cursor: 'default' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              {/* Avatar */}
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-secondary)' }}
              >
                {tx.user.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Name + ID */}
              <div className="min-w-0 flex-1">
                <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>{tx.user}</p>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{tx.id}</p>
              </div>

              {/* Plan */}
              <span
                className="hidden rounded-md px-2 py-0.5 text-[10.5px] font-semibold sm:inline-block"
                style={{ background: `${PLAN_COLORS[tx.plan]}18`, color: PLAN_COLORS[tx.plan] }}
              >
                {tx.plan}
              </span>

              {/* Date */}
              <span className="hidden w-12 text-right text-[11px] md:block" style={{ color: 'var(--color-text-muted)' }}>
                {tx.date}
              </span>

              {/* Amount */}
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', width: '46px', textAlign: 'right' }}>
                ${tx.amount}
              </span>

              {/* Status */}
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ background: s.bg, color: s.color, minWidth: '52px', textAlign: 'center' }}
              >
                {s.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
