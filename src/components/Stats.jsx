import { useEffect, useRef, useState } from 'react'

// Arc geometry: 270° speedometer shape
const R = 48
const SW = 2.5
const CIRC = 2 * Math.PI * R       // full circumference ≈ 301.6
const ARC = (270 / 360) * CIRC     // visible 270° arc ≈ 226.2
const GAP = CIRC - ARC             // invisible 90° gap ≈ 75.4

const stats = [
  { value: 50,  suffix: '+', label: 'Projects Delivered', fillPct: 0.80 },
  { value: 5,   suffix: '+', label: 'Years Experience',   fillPct: 0.65 },
  { value: 30,  suffix: '+', label: 'Happy Clients',      fillPct: 0.75 },
  { value: 100, suffix: '%', label: 'Code Quality Focus', fillPct: 1.00 },
]

function StatRing({ value, suffix, label, fillPct, index }) {
  const [count, setCount] = useState(0)
  const [dashOffset, setDashOffset] = useState(ARC)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const duration = 1700 + index * 80
          const start = performance.now()

          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1)
            const ease = 1 - (1 - t) ** 3
            setCount(Math.round(ease * value))
            setDashOffset(ARC * (1 - ease * fillPct))
            if (t < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [value, fillPct, index])

  const size = 132
  const center = size / 2

  return (
    <div
      ref={ref}
      className="animate-fade-up flex flex-col items-center"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: 'rotate(-135deg)' }}
          aria-hidden="true"
        >
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={R}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={SW}
            strokeDasharray={`${ARC} ${GAP}`}
            strokeLinecap="round"
          />
          {/* Animated fill arc */}
          <circle
            cx={center}
            cy={center}
            r={R}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={SW}
            strokeDasharray={`${ARC} ${GAP}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 5px rgba(var(--color-accent-rgb), 0.55))',
            }}
          />
        </svg>

        {/* Centre readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-[1.6rem] font-bold leading-none text-gradient">
            {count}{suffix}
          </span>
        </div>
      </div>

      <p
        className="mt-2 text-center text-sm font-medium leading-snug text-text-secondary"
        style={{ maxWidth: 112 }}
      >
        {label}
      </p>
    </div>
  )
}

export default function Stats() {
  return (
    <section
      className="relative bg-gradient-to-b from-surface/50 to-transparent px-6 py-20"
      aria-label="Key statistics"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, i) => (
            <StatRing key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
