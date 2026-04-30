import { useState, useEffect, useRef, useCallback } from 'react'

const R = 38
const SW = 3.5
const CIRC = 2 * Math.PI * R

const categories = [
  {
    id: '01',
    heading: 'Languages & Core',
    short: 'Languages',
    skills: [
      { name: 'HTML5', level: 98 },
      { name: 'CSS3', level: 96 },
      { name: 'JavaScript', level: 94 },
      { name: 'TypeScript', level: 85 },
      { name: 'Java', level: 75 },
      { name: 'Python', level: 72 },
    ],
  },
  {
    id: '02',
    heading: 'Frameworks & Libraries',
    short: 'Frameworks',
    skills: [
      { name: 'React', level: 93 },
      { name: 'Next.js', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Vite', level: 85 },
    ],
  },
  {
    id: '03',
    heading: 'Tools & Workflow',
    short: 'Tools',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Figma', level: 80 },
      { name: 'VS Code', level: 95 },
      { name: 'npm / pnpm', level: 88 },
    ],
  },
  {
    id: '04',
    heading: 'Principles',
    short: 'Principles',
    skills: [
      { name: 'Responsive Design', level: 97 },
      { name: 'Accessibility', level: 88 },
      { name: 'Performance', level: 85 },
      { name: 'UI/UX Implementation', level: 90 },
      { name: 'SEO', level: 80 },
    ],
  },
]

function SkillOrb({ name, level, index, animate }) {
  const dashOffset = animate ? CIRC * (1 - level / 100) : CIRC

  return (
    <div
      className="group flex flex-col items-center gap-3"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.45s ease ${index * 65}ms, transform 0.45s ease ${index * 65}ms`,
      }}
    >
      {/* Ring */}
      <div className="relative transition-transform duration-300 group-hover:scale-[1.08]">
        <svg
          width="110"
          height="110"
          viewBox="0 0 100 100"
          style={{ transform: 'rotate(-90deg)' }}
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="var(--color-surface-lighter)"
            strokeWidth={SW}
          />
          {/* Accent fill */}
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={SW}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
            style={{
              transition: animate
                ? `stroke-dashoffset ${1000 + index * 80}ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 65 + 80}ms`
                : 'none',
              filter: 'drop-shadow(0 0 5px rgba(var(--color-accent-rgb), 0.5))',
            }}
          />
        </svg>

        {/* Centre % */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold leading-none text-gradient"
            style={{ fontSize: '1.1rem' }}>
            {level}<span style={{ fontSize: '0.65rem' }}>%</span>
          </span>
        </div>
      </div>

      {/* Skill name */}
      <span className="max-w-[108px] text-center text-xs font-medium leading-tight text-text-secondary transition-colors duration-200 group-hover:text-text-primary">
        {name}
      </span>
    </div>
  )
}

export default function Skills() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [animate, setAnimate] = useState(false)
  const [panelKey, setPanelKey] = useState(0)
  const sectionRef = useRef(null)
  const hasEntered = useRef(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered.current) {
          hasEntered.current = true
          setTimeout(() => setAnimate(true), 150)
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  const selectCategory = useCallback((idx) => {
    if (idx === activeIdx) return
    setAnimate(false)
    setActiveIdx(idx)
    setPanelKey((k) => k + 1)
    setTimeout(() => setAnimate(true), 90)
  }, [activeIdx])

  const active = categories[activeIdx]
  const avgLevel = Math.round(
    active.skills.reduce((s, sk) => s + sk.level, 0) / active.skills.length
  )

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-6 lg:py-36"
      aria-labelledby="skills-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-accent/3 blur-[100px]" />
      <div className="pointer-events-none absolute left-10 bottom-20 h-60 w-60 rounded-full bg-accent/2 blur-[80px]" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Tech Stack
          </p>
          <h2
            id="skills-heading"
            className="animate-fade-up font-display text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-text-secondary">
            The tools and technologies I use daily to build modern, performant web experiences.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="animate-fade-up mb-8 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label="Skill categories"
        >
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              role="tab"
              id={`skills-tab-${cat.id}`}
              aria-selected={i === activeIdx}
              aria-controls="skills-tabpanel"
              onClick={() => selectCategory(i)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                i === activeIdx
                  ? 'border-accent bg-accent text-midnight'
                  : 'border-border text-text-secondary hover:border-accent/40 hover:text-text-primary'
              }`}
              style={i === activeIdx ? {
                boxShadow: '0 4px 20px rgba(var(--color-accent-rgb), 0.3)',
              } : {}}
            >
              <span
                className={`font-mono text-[10px] ${i === activeIdx ? 'opacity-50' : 'text-text-muted'}`}
              >
                {cat.id}
              </span>
              {cat.short}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          id="skills-tabpanel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${active.id}`}
          aria-live="polite"
          className="animate-fade-up glass-light rounded-3xl p-8 lg:p-12"
        >
          {/* Panel header */}
          <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
            <div>
              <span className="font-mono text-[11px] tracking-[0.18em] text-text-muted">
                {active.id} — {active.skills.length} skills
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold text-text-primary">
                {active.heading}
              </h3>
            </div>
            <div className="text-right">
              <span className="block font-mono text-[10px] text-text-muted">avg. proficiency</span>
              <span className="text-gradient font-display text-2xl font-bold">{avgLevel}%</span>
            </div>
          </div>

          {/* Orbs grid */}
          <div
            key={panelKey}
            className="flex flex-wrap justify-center gap-x-8 gap-y-10 sm:gap-x-14"
          >
            {active.skills.map((skill, i) => (
              <SkillOrb
                key={skill.name}
                name={skill.name}
                level={skill.level}
                index={i}
                animate={animate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
