import { useState, useCallback, useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './icons'

const projects = [
  {
    id: '01',
    title: 'Lattice',
    category: 'Education / Bootcamp',
    year: '2024',
    desc: 'A typography-led marketing site for Lattice — a twelve-week atelier teaching the craft of software across six engineering tracks. Editorial layout, restrained motion, and an emphasis on readable code as a teaching philosophy.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    bar: '#bef264',
    previewBg: 'linear-gradient(145deg, #0a0a08 0%, #020202 100%)',
    preview: 'agency',
    thumbnail: '/projects/lattice.jpg',
    live: 'https://lattice-gilt.vercel.app',
    github: '#',
  },
  {
    id: '02',
    title: 'Mariyam Driving School',
    category: 'Local Service',
    year: '2024',
    desc: 'A DVSA-approved driving school site for the London market — built around an editorial hero, theme switching, transparent course pricing, and a Google Maps-powered booking flow designed for nervous first-time learners.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Google Maps API'],
    bar: '#f5b842',
    previewBg: 'linear-gradient(145deg, #0d1729 0%, #060b14 100%)',
    preview: 'agency',
    thumbnail: '/projects/mariyam.jpg',
    live: 'https://mariyamds.vercel.app',
    github: '#',
  },
  {
    id: '03',
    title: 'Cunda Batı Balık',
    category: 'Hospitality / Restaurant',
    year: '2024',
    desc: 'A bilingual (EN/TR) editorial site for a heritage Aegean fish restaurant on Alibey Island — large display typography over underwater motion, day-boat menu, and a reservation flow woven into the narrative rather than bolted on.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'i18n'],
    bar: '#e76d4a',
    previewBg: 'linear-gradient(145deg, #0a1419 0%, #050a0e 100%)',
    preview: 'agency',
    thumbnail: '/projects/cunda.jpg',
    live: 'https://cunda-bati-balik.vercel.app',
    github: '#',
  },
  {
    id: '04',
    title: 'MCO Store',
    category: 'E-Commerce / Lifestyle',
    year: '2026',
    status: 'Still Under Development',
    desc: 'A small-batch e-commerce concept for considered home and desk objects — editorial product narrative, three intent-led collections (Desk, Home, Ritual), and a Journal that documents process. Built around restraint, large display serif, and a warm neutral palette.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'next/image'],
    bar: '#c89668',
    previewBg: 'linear-gradient(145deg, #f3ede2 0%, #e8ddc9 100%)',
    preview: 'ecommerce',
    thumbnail: '/projects/mcostore.jpg',
    live: 'https://mco-store.vercel.app',
    github: '#',
  },
  {
    id: '05',
    title: 'Project 05',
    category: 'Coming Soon',
    year: '2026',
    desc: 'A new build is taking shape — full case study landing soon.',
    tags: ['TBA'],
    bar: '#60a5fa',
    previewBg: 'linear-gradient(145deg, #0c1829 0%, #070d18 100%)',
    preview: 'dashboard',
    live: '#',
    github: '#',
  },
  {
    id: '06',
    title: 'Project 06',
    category: 'Coming Soon',
    year: '2026',
    desc: 'A new build is taking shape — full case study landing soon.',
    tags: ['TBA'],
    bar: '#a78bfa',
    previewBg: 'linear-gradient(145deg, #110820 0%, #080410 100%)',
    preview: 'portfolio',
    live: '#',
    github: '#',
  },
  {
    id: '07',
    title: 'Project 07',
    category: 'Coming Soon',
    year: '2026',
    desc: 'A new build is taking shape — full case study landing soon.',
    tags: ['TBA'],
    bar: '#34d399',
    previewBg: 'linear-gradient(145deg, #051a10 0%, #020d08 100%)',
    preview: 'ecommerce',
    live: '#',
    github: '#',
  },
  {
    id: '08',
    title: 'Project 08',
    category: 'Coming Soon',
    year: '2026',
    desc: 'A new build is taking shape — full case study landing soon.',
    tags: ['TBA'],
    bar: '#fb923c',
    previewBg: 'linear-gradient(145deg, #1f0d04 0%, #100600 100%)',
    preview: 'agency',
    live: '#',
    github: '#',
  },
]

function PreviewShapes({ type, color }) {
  const c = (alpha) => {
    const hex = Math.round(alpha * 255).toString(16).padStart(2, '0')
    return `${color}${hex}`
  }

  if (type === 'dashboard') {
    return (
      <div className="absolute inset-0 flex gap-2 p-3">
        <div className="w-[20%] flex flex-col gap-1.5 rounded-xl p-2" style={{ background: c(0.07), border: `1px solid ${c(0.12)}` }}>
          <div className="h-2 w-8 rounded-full" style={{ background: c(0.55) }} />
          <div className="mt-1 space-y-1.5">
            {[80, 60, 70, 55, 65].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: i === 0 ? c(0.6) : c(0.2) }} />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl p-2" style={{ background: c(0.1), border: `1px solid ${c(0.16)}` }}>
                <div className="mb-1.5 h-1.5 w-6 rounded-full" style={{ background: c(0.35) }} />
                <div className="h-3 w-8 rounded-sm" style={{ background: c(0.55) }} />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-xl p-2.5" style={{ background: c(0.07), border: `1px solid ${c(0.11)}` }}>
            <div className="mb-2 h-1.5 w-12 rounded-full" style={{ background: c(0.3) }} />
            <div className="flex h-[4.5rem] items-end gap-0.5">
              {[38, 62, 48, 82, 55, 74, 42, 90, 58, 70, 78, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{ height: `${h}%`, background: i % 4 === 2 ? c(0.72) : c(0.3) }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'agency') {
    return (
      <div className="absolute inset-0 flex items-center">
        <div className="flex w-[55%] flex-col gap-3 p-6">
          <div className="h-1.5 w-14 rounded-full" style={{ background: c(0.6) }} />
          <div className="space-y-1.5">
            <div className="h-5 w-48 rounded-sm" style={{ background: c(0.5) }} />
            <div className="h-5 w-36 rounded-sm" style={{ background: c(0.35) }} />
          </div>
          <div className="space-y-1">
            {[100, 82, 64].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: c(0.2) }} />
            ))}
          </div>
          <div className="flex gap-2">
            <div className="h-7 w-24 rounded-full" style={{ background: c(0.38), border: `1px solid ${c(0.5)}` }} />
            <div className="h-7 w-16 rounded-full" style={{ background: c(0.1), border: `1px solid ${c(0.25)}` }} />
          </div>
        </div>
        <div className="h-full w-[45%] p-3 pl-0">
          <div className="relative h-full overflow-hidden rounded-xl" style={{ background: `linear-gradient(135deg, ${c(0.22)}, ${c(0.08)})`, border: `1px solid ${c(0.18)}` }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-14 w-14 rotate-12 rounded-2xl" style={{ background: c(0.32) }} />
              <div className="absolute bottom-3 right-3 h-5 w-5 rounded-lg" style={{ background: c(0.45) }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'ecommerce') {
    return (
      <div className="absolute inset-0 p-3">
        <div className="mb-2 flex items-center gap-2 px-1">
          <div className="h-2 w-8 rounded-full" style={{ background: c(0.55) }} />
          <div className="ml-auto flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-1.5 w-5 rounded-full" style={{ background: c(0.22) }} />
            ))}
          </div>
        </div>
        <div className="grid h-[calc(100%-24px)] grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-xl"
              style={{ background: c(0.09), border: `1px solid ${c(0.16)}` }}
            >
              <div className="flex flex-1 items-center justify-center" style={{ background: `linear-gradient(135deg, ${c(0.22)}, ${c(0.1)})` }}>
                <div className="h-6 w-6 rounded-lg" style={{ background: c(0.42) }} />
              </div>
              <div className="space-y-1 p-1.5">
                <div className="h-1.5 w-full rounded-full" style={{ background: c(0.28) }} />
                <div className="h-1.5 w-10 rounded-full" style={{ background: c(0.5) }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'portfolio') {
    return (
      <div className="absolute inset-0 flex">
        <div className="flex w-1/2 flex-col justify-center gap-3 p-5">
          <div className="h-1.5 w-12 rounded-full" style={{ background: c(0.55) }} />
          <div className="space-y-1.5">
            <div className="h-6 w-full rounded-sm" style={{ background: c(0.45) }} />
            <div className="h-6 w-4/5 rounded-sm" style={{ background: c(0.3) }} />
          </div>
          <div className="space-y-1">
            {[100, 85].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: c(0.18) }} />
            ))}
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-20 rounded-full" style={{ background: c(0.4) }} />
            <div className="h-6 w-14 rounded-full" style={{ background: c(0.12), border: `1px solid ${c(0.28)}` }} />
          </div>
        </div>
        <div className="flex w-1/2 flex-col justify-center gap-2 p-3 pl-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: c(i === 0 ? 0.18 : 0.08), border: `1px solid ${c(i === 0 ? 0.28 : 0.12)}`, opacity: 1 - i * 0.18 }}
            >
              <div className="h-5 w-5 shrink-0 rounded-md" style={{ background: c(0.4) }} />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-full rounded-full" style={{ background: c(0.32) }} />
                <div className="h-1 w-3/4 rounded-full" style={{ background: c(0.18) }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const timeoutRef = useRef(null)

  const select = useCallback((idx) => {
    if (idx === activeIdx) return
    setVisible(false)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setActiveIdx(idx)
      setVisible(true)
    }, 165)
  }, [activeIdx])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') select((activeIdx + 1) % projects.length)
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') select((activeIdx - 1 + projects.length) % projects.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIdx, select])

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const active = projects[activeIdx]

  return (
    <section
      id="projects"
      className="relative py-28 px-6 lg:py-36"
      aria-labelledby="projects-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-accent/3 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Portfolio
          </p>
          <h2
            id="projects-heading"
            className="animate-fade-up font-display text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-text-secondary">
            A selection of recent work — each built with care for design, performance, and user experience.
          </p>
        </div>

        {/* Split layout */}
        <div className="animate-fade-up flex flex-col gap-4 lg:flex-row lg:gap-6">

          {/* Left: project rail */}
          <div className="glass-light overflow-hidden rounded-2xl lg:w-[38%]">
            {projects.map((p, i) => {
              const isActive = i === activeIdx
              return (
                <button
                  key={p.id}
                  onClick={() => select(i)}
                  className={`group relative flex w-full items-center gap-4 border-b border-border px-6 py-5 text-left transition-all duration-200 last:border-0 ${isActive ? 'bg-accent/8' : 'hover:bg-surface-light'}`}
                >
                  {isActive && (
                    <span className="absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-accent" />
                  )}

                  <span
                    className={`w-7 shrink-0 font-mono text-[11px] transition-colors ${isActive ? 'text-accent' : 'text-text-muted'}`}
                  >
                    {p.id}
                  </span>

                  <span
                    className="h-2 w-2 shrink-0 rounded-full transition-all duration-300"
                    style={{
                      background: isActive ? p.bar : 'var(--color-surface-lighter)',
                      boxShadow: isActive ? `0 0 8px ${p.bar}90` : 'none',
                    }}
                  />

                  <div className="min-w-0 flex-1">
                    <span
                      className={`flex items-center gap-2 truncate text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}
                    >
                      <span className="truncate">{p.title}</span>
                      {p.status && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 motion-safe:animate-pulse"
                          title={p.status}
                        />
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-text-muted">
                      {p.category} · {p.year}
                    </span>
                  </div>

                  {/* Mini preview swatch */}
                  <div
                    className="hidden h-9 w-14 shrink-0 overflow-hidden rounded-lg sm:block"
                    style={{ background: p.previewBg }}
                  >
                    {p.thumbnail ? (
                      <img
                        src={p.thumbnail}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-opacity duration-200"
                        style={{ opacity: isActive ? 1 : 0.6 }}
                      />
                    ) : (
                      <div
                        className="h-full w-full transition-opacity duration-200"
                        style={{
                          background: `radial-gradient(circle at 60% 40%, ${p.bar}55, transparent 72%)`,
                          opacity: isActive ? 1 : 0.6,
                        }}
                      />
                    )}
                  </div>

                  {isActive && (
                    <svg
                      className="ml-1 shrink-0 text-accent"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>

          {/* Right: detail panel */}
          <div className="lg:w-[62%]">
            <div
              className="glass-light overflow-hidden rounded-2xl"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0) scale(1)' : 'translateX(10px) scale(0.995)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-3 border-b border-border/50 bg-surface/50 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
                </div>
                <div className="flex flex-1 items-center gap-1.5 rounded-md border border-border/40 bg-surface/80 px-3 py-1">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-text-muted"
                    aria-hidden="true"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <span className="truncate font-mono text-[10px] text-text-muted">
                    {(() => {
                      const live = active.live
                      if (live && /^https?:\/\//i.test(live)) {
                        return live.replace(/^https?:\/\//i, '').replace(/\/$/, '')
                      }
                      const slug = live && live !== '#'
                        ? live.replace('/index.html', '').replace(/^\//, '')
                        : active.title.toLowerCase().replace(/\s+/g, '-')
                      return `mcodev.uk/${slug}`
                    })()}
                  </span>
                </div>
                <div className="flex gap-1">
                  {['M15 18l-6-6 6-6', 'M9 18l6-6-6-6'].map((d, i) => (
                    <div
                      key={i}
                      className="flex h-4 w-4 items-center justify-center rounded border border-border/40 bg-surface"
                    >
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-text-muted" aria-hidden="true">
                        <path d={d} />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview viewport */}
              <div
                className="relative h-52 overflow-hidden"
                style={{ background: active.previewBg }}
              >
                {active.thumbnail ? (
                  <img
                    src={active.thumbnail}
                    alt={`${active.title} — site preview`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at 70% 30%, ${active.bar}22, transparent 65%)` }}
                    />
                    <PreviewShapes type={active.preview} color={active.bar} />
                  </>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-7 lg:p-8">
                {/* Decorative backdrop number */}
                <span
                  className="pointer-events-none absolute -bottom-3 -right-1 select-none font-display font-bold leading-none"
                  style={{ fontSize: 'clamp(5rem, 12vw, 8.5rem)', color: `${active.bar}14` }}
                  aria-hidden="true"
                >
                  {active.id}
                </span>

                <div className="relative">
                  {/* Category badge + year + status */}
                  <div className="mb-3 flex flex-wrap items-center gap-2.5">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
                      style={{ background: `${active.bar}1a`, color: active.bar }}
                    >
                      {active.category}
                    </span>
                    <span className="font-mono text-[10px] text-text-muted">· {active.year}</span>
                    {active.status && (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300"
                        role="status"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-amber-300 motion-safe:animate-pulse"
                        />
                        {active.status}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-text-primary lg:text-[1.75rem]">
                    {active.title}
                  </h3>

                  <p className="mb-6 mt-3 max-w-[44ch] text-sm leading-relaxed text-text-secondary">
                    {active.desc}
                  </p>

                  {/* Tags */}
                  <div className="mb-7 flex flex-wrap gap-2">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3">
                    {active.live && active.live !== '#' ? (
                      <a
                        href={active.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-midnight transition-all duration-300"
                        style={{ background: active.bar }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 28px ${active.bar}45` }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                      >
                        Live Demo <ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <span
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-2.5 text-sm font-medium text-text-muted"
                        aria-label="Live demo coming soon"
                      >
                        Coming Soon
                      </span>
                    )}
                    {active.github && active.github !== '#' && (
                      <a
                        href={active.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-text-primary"
                      >
                        <GithubIcon size={15} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress dots + counter */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-1.5" aria-label="Project navigation">
            {projects.map((_, i) => (
              <button
                key={i}
                aria-label={`Show project ${i + 1} of ${projects.length}`}
                aria-current={i === activeIdx ? 'true' : undefined}
                onClick={() => select(i)}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === activeIdx ? '2rem' : '0.5rem',
                  background: i === activeIdx ? 'var(--color-accent)' : 'var(--color-border)',
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[11px] text-text-muted" aria-hidden="true">
            {activeIdx + 1} / {projects.length}
          </span>
        </div>
      </div>
    </section>
  )
}
