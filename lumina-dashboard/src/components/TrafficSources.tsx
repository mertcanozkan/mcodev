import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { trafficSources } from '../data/mock'

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="rounded-xl px-3 py-2" style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)' }}>
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: d.payload.color }} />
        <span style={{ fontSize: '12px', color: 'var(--color-text-primary)', fontWeight: 600 }}>{d.name}</span>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{d.value}%</span>
      </div>
    </div>
  )
}

export default function TrafficSources() {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>Traffic Sources</h3>
      <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>Current period breakdown</p>

      <div className="flex items-center gap-4">
        <div style={{ width: 110, height: 110, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {trafficSources.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2.5">
          {trafficSources.map((s) => (
            <div key={s.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: s.color }} />
                  <span style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>{s.name}</span>
                </div>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{s.value}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-3)' }}>
                <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.color, opacity: 0.75 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
