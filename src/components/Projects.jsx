import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons'
import { GlowCard } from '@/components/ui/spotlight-card'

const projects = [
  {
    title: 'Lumina Dashboard',
    desc: 'A real-time analytics dashboard with dynamic charts, dark mode, and responsive data visualisation for SaaS teams.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    gradient: 'from-blue-500/20 via-purple-500/10 to-cyan-500/20',
    accent: 'bg-blue-400/20',
    live: '#',
    github: '#',
  },
  {
    title: 'Meridian Studio',
    desc: 'A premium creative agency landing page featuring smooth scroll animations, parallax effects, and a refined editorial layout.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    gradient: 'from-amber-500/20 via-orange-500/10 to-rose-500/20',
    accent: 'bg-amber-400/20',
    live: '#',
    github: '#',
  },
  {
    title: 'Pulse E-Commerce',
    desc: 'A modern storefront with product filtering, cart functionality, responsive grid, and seamless checkout experience.',
    tags: ['React', 'JavaScript', 'CSS Modules', 'Stripe'],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    accent: 'bg-emerald-400/20',
    live: '#',
    github: '#',
  },
  {
    title: 'DevFolio Pro',
    desc: 'A developer portfolio template with blog integration, project showcase, dark/light themes, and CMS-ready architecture.',
    tags: ['Next.js', 'MDX', 'Tailwind CSS'],
    gradient: 'from-violet-500/20 via-fuchsia-500/10 to-pink-500/20',
    accent: 'bg-violet-400/20',
    live: '#',
    github: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 lg:py-36" aria-labelledby="projects-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute left-0 top-40 h-96 w-96 rounded-full bg-accent/3 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Portfolio
          </p>
          <h2 id="projects-heading" className="animate-fade-up font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-text-secondary">
            A selection of recent work — each built with care for design, performance, and user experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map(({ title, desc, tags, gradient, accent, live, github }, i) => (
            <GlowCard
              key={title}
              className="animate-fade-up group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Decorative thumbnail */}
              <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${gradient}`}>
                {/* Decorative shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`absolute left-8 top-8 h-20 w-20 rounded-2xl ${accent} rotate-12 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110`} />
                  <div className={`absolute right-12 top-12 h-14 w-14 rounded-full ${accent} transition-transform duration-500 group-hover:scale-125`} />
                  <div className={`absolute bottom-8 left-1/3 h-16 w-32 rounded-xl ${accent} -rotate-6 transition-transform duration-500 group-hover:rotate-3`} />
                  <div className="relative z-10 rounded-xl border border-white/10 bg-black/20 px-5 py-3 backdrop-blur-sm">
                    <span className="font-mono text-sm text-white/70">&lt;{title} /&gt;</span>
                  </div>
                </div>

                {/* Hover overlay with action buttons */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-4 right-4 z-20 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo of ${title}`}
                    className="rounded-full bg-accent p-2.5 text-midnight transition-transform hover:scale-110"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repository for ${title}`}
                    className="rounded-full bg-surface-lighter p-2.5 text-text-primary transition-transform hover:scale-110"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-300">{title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">{desc}</p>
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex shrink-0 gap-2 lg:hidden">
                    <a
                      href={live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live demo of ${title}`}
                      className="rounded-full bg-accent p-2 text-midnight transition-transform hover:scale-110"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub repository for ${title}`}
                      className="rounded-full bg-surface-lighter p-2 text-text-primary transition-transform hover:scale-110"
                    >
                      <GithubIcon size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
