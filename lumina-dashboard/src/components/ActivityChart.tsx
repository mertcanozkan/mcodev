import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import { weeklyActivity } from '../data/mock'

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-xl px-3 py-2.5 shadow-2xl"
      style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)' }}
    >
      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-3 justify-between" style={{ marginBottom: '3px' }}>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.fill }} />
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{p.name}</span>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

const TODAY_IDX = 4 // Friday

export default function ActivityChart() {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Weekly Activity</h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Sessions & conversions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: '#60a5fa' }} />
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Sessions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: '#34d399' }} />
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Conversions</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={weeklyActivity} margin={{ top: 4, right: 4, left: -12, bottom: 0 }} barGap={3}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
          <YAxis tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} dx={-4} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 4 }} />
          <Bar dataKey="sessions" name="Sessions" radius={[4, 4, 0, 0]} maxBarSize={28}>
            {weeklyActivity.map((_, i) => (
              <Cell key={i} fill={i === TODAY_IDX ? '#60a5fa' : 'rgba(96,165,250,0.28)'} />
            ))}
          </Bar>
          <Bar dataKey="conversions" name="Conversions" radius={[4, 4, 0, 0]} maxBarSize={28}>
            {weeklyActivity.map((_, i) => (
              <Cell key={i} fill={i === TODAY_IDX ? '#34d399' : 'rgba(52,211,153,0.28)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
