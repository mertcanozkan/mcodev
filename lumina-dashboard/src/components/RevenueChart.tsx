import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { revenueData } from '../data/mock'

const fmt = (v: number) => `$${(v / 1000).toFixed(0)}k`

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-xl px-4 py-3 shadow-2xl"
      style={{
        background: 'var(--color-surface-3)',
        border: '1px solid var(--color-border)',
        minWidth: '140px',
      }}
    >
      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4" style={{ marginBottom: '4px' }}>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
            <span style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>{p.name}</span>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {p.dataKey === 'revenue' ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function RevenueChart() {
  const [mode, setMode] = useState<'revenue' | 'users' | 'both'>('both')

  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Revenue & Users</h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>12-month performance overview</p>
        </div>
        <div className="flex rounded-xl p-0.5" style={{ background: 'var(--color-surface-2)' }}>
          {(['both', 'revenue', 'users'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="rounded-lg px-3 py-1.5 capitalize transition-all duration-150"
              style={{
                fontSize: '11.5px',
                fontWeight: mode === m ? 600 : 400,
                background: mode === m ? 'var(--color-surface-3)' : 'transparent',
                color: mode === m ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="usrGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
          <YAxis
            yAxisId="rev"
            tickFormatter={fmt}
            tick={{ fill: '#4a5568', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            dx={-4}
            hide={mode === 'users'}
          />
          <YAxis
            yAxisId="usr"
            orientation="right"
            tick={{ fill: '#4a5568', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            dx={4}
            hide={mode === 'revenue'}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
          {mode !== 'users' && (
            <Area
              yAxisId="rev"
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#60a5fa"
              strokeWidth={2}
              fill="url(#revGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#60a5fa', stroke: '#06090f', strokeWidth: 2 }}
            />
          )}
          {mode !== 'revenue' && (
            <Area
              yAxisId="usr"
              type="monotone"
              dataKey="users"
              name="Users"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#usrGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#a78bfa', stroke: '#06090f', strokeWidth: 2 }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
