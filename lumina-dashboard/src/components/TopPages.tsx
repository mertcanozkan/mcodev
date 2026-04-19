import { topPages } from '../data/mock'

const maxViews = Math.max(...topPages.map(p => p.views))

export default function TopPages() {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>Top Pages</h3>
      <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>By pageviews this month</p>

      <div className="space-y-3">
        {topPages.map((page, i) => (
          <div key={page.path}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', width: '14px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-blue)' }}>{page.path}</span>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{page.bounce} bounce</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)', width: '44px', textAlign: 'right' }}>
                  {page.views.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-3)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${(page.views / maxViews) * 100}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', opacity: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
