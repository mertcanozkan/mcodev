import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 100, suffix: '%', label: 'Code Quality Focus' },
]

function AnimatedNumber({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const start = performance.now()

          function tick(now) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="text-gradient font-display text-4xl font-bold sm:text-5xl">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-surface/50 to-transparent" aria-label="Key statistics">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map(({ value, suffix, label }, i) => (
            <div
              key={label}
              className="animate-fade-up text-center"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <AnimatedNumber target={value} suffix={suffix} />
              <p className="mt-2 text-sm font-medium text-text-secondary">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
