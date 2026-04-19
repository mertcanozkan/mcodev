import { useState } from 'react'
import { Globe, Layout, Smartphone, RefreshCw, Gauge, PenTool } from 'lucide-react'

const services = [
  {
    id: '01',
    icon: Layout,
    title: 'Landing Pages',
    desc: 'High-converting, visually striking landing pages designed to captivate visitors and drive action from the very first scroll.',
    deliverables: [
      'Conversion-focused layout',
      'Above-the-fold impact design',
      'CTA strategy & placement',
      'Analytics-ready structure',
    ],
  },
  {
    id: '02',
    icon: Globe,
    title: 'Business Websites',
    desc: 'Professional, brand-aligned websites that establish credibility and deliver a seamless experience across every device and screen.',
    deliverables: [
      'Multi-page architecture',
      'Brand-consistent UI system',
      'Contact & lead capture forms',
      'SEO-ready markup',
    ],
  },
  {
    id: '03',
    icon: Smartphone,
    title: 'Responsive Design',
    desc: 'Fluid layouts that adapt beautifully from mobile to ultrawide — every user gets a premium, uncompromised experience.',
    deliverables: [
      'Mobile-first build approach',
      'Breakpoint-precise layouts',
      'Touch-optimised interactions',
      'Cross-browser testing',
    ],
  },
  {
    id: '04',
    icon: PenTool,
    title: 'UI Implementation',
    desc: 'Pixel-perfect translation of Figma or design files into clean, interactive front end code with meticulous attention to every detail.',
    deliverables: [
      'Figma-to-code fidelity',
      'Component-based structure',
      'Micro-interaction polish',
      'Design token integration',
    ],
  },
  {
    id: '05',
    icon: RefreshCw,
    title: 'Website Redesign',
    desc: 'Modernising outdated websites with fresh aesthetics, improved UX flows, and current best practices woven throughout the codebase.',
    deliverables: [
      'UX audit & gap analysis',
      'Visual refresh & rebrand',
      'Performance baseline lift',
      'Content migration support',
    ],
  },
  {
    id: '06',
    icon: Gauge,
    title: 'Performance Optimisation',
    desc: 'Auditing and improving Core Web Vitals, load times, and runtime performance — for faster, smoother, higher-ranking sites.',
    deliverables: [
      'Lighthouse score audit',
      'Bundle & asset optimisation',
      'Core Web Vitals tuning',
      'Lazy loading & code splitting',
    ],
  },
]

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  const select = (idx) => {
    if (idx === activeIdx) return
    setVisible(false)
    setTimeout(() => {
      setActiveIdx(idx)
      setVisible(true)
    }, 180)
  }

  const active = services[activeIdx]
  const ServiceIcon = active.icon

  return (
    <section
      id="services"
      className="relative py-28 px-6 lg:py-36"
      aria-labelledby="services-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute left-0 top-40 h-96 w-96 rounded-full bg-accent/3 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            What I Do
          </p>
          <h2
            id="services-heading"
            className="animate-fade-up font-display text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            Services & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-text-secondary">
            From concept to deployment — end-to-end front end solutions tailored
            to your goals and audience.
          </p>
        </div>

        {/* Split layout */}
        <div className="animate-fade-up flex flex-col gap-4 lg:flex-row lg:gap-6">

          {/* Left — service rail */}
          <div className="glass-light overflow-hidden rounded-2xl lg:w-[38%]">
            {services.map((s, i) => {
              const Icon = s.icon
              const isActive = i === activeIdx
              return (
                <button
                  key={s.id}
                  onClick={() => select(i)}
                  className={`group relative flex w-full items-center gap-4 border-b border-border px-6 py-4 text-left transition-all duration-200 last:border-0 ${
                    isActive
                      ? 'bg-accent/8'
                      : 'hover:bg-surface-light'
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-accent" />
                  )}

                  <span
                    className={`w-7 shrink-0 font-mono text-[11px] transition-colors ${
                      isActive ? 'text-accent' : 'text-text-muted'
                    }`}
                  >
                    {s.id}
                  </span>

                  <span
                    className={`shrink-0 rounded-lg p-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-accent/15 text-accent'
                        : 'bg-surface text-text-muted group-hover:text-text-secondary'
                    }`}
                  >
                    <Icon size={15} />
                  </span>

                  <span
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-secondary group-hover:text-text-primary'
                    }`}
                  >
                    {s.title}
                  </span>

                  {isActive && (
                    <svg
                      className="ml-auto shrink-0 text-accent"
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

          {/* Right — detail panel */}
          <div className="lg:w-[62%]">
            <div
              className="glass-light relative h-full overflow-hidden rounded-2xl p-8 lg:p-10"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0) scale(1)' : 'translateX(8px) scale(0.995)',
                transition: 'opacity 0.22s ease, transform 0.22s ease',
              }}
            >
              {/* Large decorative backdrop number */}
              <span
                className="pointer-events-none absolute -right-2 -top-4 select-none font-display font-bold leading-none text-border/20"
                style={{ fontSize: 'clamp(6rem, 14vw, 10rem)' }}
                aria-hidden="true"
              >
                {active.id}
              </span>

              {/* Accent glow blob */}
              <div className="pointer-events-none absolute right-16 top-8 h-40 w-40 rounded-full bg-accent/6 blur-[60px]" />

              {/* Icon */}
              <div className="relative mb-7 inline-flex rounded-2xl p-5 text-accent"
                style={{ background: 'rgba(var(--color-accent-rgb), 0.12)' }}>
                <ServiceIcon size={30} />
              </div>

              {/* Title */}
              <h3 className="relative mb-4 font-display text-2xl font-bold text-text-primary lg:text-[1.75rem]">
                {active.title}
              </h3>

              {/* Description */}
              <p className="relative mb-9 max-w-lg text-base leading-relaxed text-text-secondary">
                {active.desc}
              </p>

              {/* Deliverables */}
              <div className="relative">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
                  What's included
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {active.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-text-secondary"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: 'var(--color-accent)' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service counter */}
              <div className="absolute bottom-8 right-10 font-mono text-[11px] text-text-muted">
                {activeIdx + 1} / {services.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
