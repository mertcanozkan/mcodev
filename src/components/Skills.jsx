import { useEffect, useRef, useState } from 'react'

const categories = [
  {
    id: '01',
    heading: 'Languages & Core',
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
    skills: [
      { name: 'Responsive Design', level: 97 },
      { name: 'Accessibility', level: 88 },
      { name: 'Performance', level: 85 },
      { name: 'UI/UX Implementation', level: 90 },
      { name: 'SEO', level: 80 },
    ],
  },
]

function SkillBar({ name, level, index, triggered }) {
  return (
    <div className="group/skill">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm text-text-secondary transition-colors duration-200 group-hover/skill:text-text-primary">
          {name}
        </span>
        <span
          className="font-mono text-[11px] text-text-muted transition-all duration-500"
          style={{
            opacity: triggered ? 1 : 0,
            transitionDelay: triggered ? `${index * 55 + 420}ms` : '0ms',
          }}
        >
          {level}%
        </span>
      </div>
      <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))',
            width: triggered ? `${level}%` : '0%',
            boxShadow: triggered ? '0 0 8px rgba(var(--color-accent-rgb), 0.45)' : 'none',
            transition: triggered
              ? `width ${680 + index * 55}ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 55}ms`
              : 'none',
          }}
        />
      </div>
    </div>
  )
}

function CategoryCard({ id, heading, skills, cardIndex }) {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="animate-fade-up glass-light rounded-2xl p-6 transition-colors duration-500 hover:border-accent/25 lg:p-7"
      style={{ animationDelay: `${cardIndex * 100}ms` }}
    >
      <div className="mb-5 flex items-end justify-between border-b border-border pb-4">
        <div>
          <span className="font-mono text-[11px] tracking-widest text-text-muted">{id}</span>
          <h3 className="mt-0.5 font-display text-base font-semibold text-text-primary">{heading}</h3>
        </div>
        <span className="font-mono text-[11px] text-text-muted">{skills.length}&nbsp;skills</span>
      </div>
      <div className="space-y-3.5">
        {skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            index={i}
            triggered={triggered}
          />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 lg:py-36" aria-labelledby="skills-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-accent/3 blur-[100px]" />
      <div className="pointer-events-none absolute left-10 bottom-20 h-60 w-60 rounded-full bg-accent/2 blur-[80px]" />

      <div className="mx-auto max-w-6xl">
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

        <div className="grid gap-5 sm:grid-cols-2">
          {categories.map(({ id, heading, skills }, i) => (
            <CategoryCard
              key={id}
              id={id}
              heading={heading}
              skills={skills}
              cardIndex={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
