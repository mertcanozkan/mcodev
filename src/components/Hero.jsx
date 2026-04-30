import { ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './icons'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'

function CodeTerminal() {
  return (
    <div className="glass group relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-border/60 bg-surface/80 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs text-text-muted font-mono">portfolio.tsx</span>
      </div>

      {/* Code body */}
      <div className="p-5 font-mono text-[13px] leading-relaxed">
        <div className="text-text-muted">
          <span className="text-purple-400">const</span>{' '}
          <span className="text-accent">developer</span>{' '}
          <span className="text-text-muted">=</span>{' '}
          <span className="text-purple-400">{'{'}</span>
        </div>
        <div className="ml-4">
          <span className="text-emerald-400">name</span>
          <span className="text-text-muted">:</span>{' '}
          <span className="text-amber-300">'Mert Ozkan'</span>
          <span className="text-text-muted">,</span>
        </div>
        <div className="ml-4">
          <span className="text-emerald-400">role</span>
          <span className="text-text-muted">:</span>{' '}
          <span className="text-amber-300">'Front End Developer'</span>
          <span className="text-text-muted">,</span>
        </div>
        <div className="ml-4">
          <span className="text-emerald-400">location</span>
          <span className="text-text-muted">:</span>{' '}
          <span className="text-amber-300">'London, UK'</span>
          <span className="text-text-muted">,</span>
        </div>
        <div className="ml-4">
          <span className="text-emerald-400">stack</span>
          <span className="text-text-muted">:</span>{' '}
          <span className="text-text-muted">[</span>
          <span className="text-amber-300">'React'</span>
          <span className="text-text-muted">,</span>{' '}
          <span className="text-amber-300">'Next.js'</span>
          <span className="text-text-muted">,</span>{' '}
          <span className="text-amber-300">'TypeScript'</span>
          <span className="text-text-muted">],</span>
        </div>
        <div className="ml-4">
          <span className="text-emerald-400">passion</span>
          <span className="text-text-muted">:</span>{' '}
          <span className="text-amber-300">'Building beautiful UIs'</span>
          <span className="text-text-muted">,</span>
        </div>
        <div className="ml-4">
          <span className="text-emerald-400">available</span>
          <span className="text-text-muted">:</span>{' '}
          <span className="text-emerald-400">true</span>
          <span className="text-text-muted">,</span>
        </div>
        <div className="text-text-muted">
          <span className="text-purple-400">{'}'}</span>
          <span className="text-text-muted">;</span>
        </div>

        {/* Blinking cursor */}
        <div className="mt-3 flex items-center gap-1">
          <span className="text-text-muted">&gt;</span>
          <span className="inline-block h-4 w-2 animate-pulse bg-accent/80" />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const scrollTo = (e, id) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="grain relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      aria-label="Introduction"
    >
      {/* Spline 3D background — receives mouse events for head tracking */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
        {/* Blend overlay to merge 3D scene with the dark theme */}
        <div className="pointer-events-none absolute inset-0 bg-midnight/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight/80 via-transparent to-midnight" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-midnight/70 via-transparent to-midnight/40" />
      </div>

      {/* Spotlight effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 z-[1] text-accent"
        fill="currentColor"
      />

      {/* Background decorative effects */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
        <div className="absolute left-1/3 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/3 blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute right-10 top-32 h-40 w-40 animate-float rounded-full border border-accent/10 opacity-40 lg:right-1/4" />
        <div className="absolute bottom-40 left-10 h-24 w-24 animate-float-delayed rounded-full border border-accent/5 opacity-30 lg:left-1/6" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--color-accent-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-accent-rgb),0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Text column */}
        <div className="text-center lg:text-left">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2 text-sm text-text-secondary backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            Available for new projects
          </div>

          <h1 className="animate-fade-up font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl" style={{ animationDelay: '100ms' }}>
            Front End Developer{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient glow-text">Crafting Digital</span>{' '}
            <br className="hidden lg:block" />
            Experiences
          </h1>

          <p className="animate-fade-up mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary lg:mx-0" style={{ animationDelay: '200ms' }}>
            Building beautiful, high-performance web interfaces that blend
            meticulous design with clean, accessible code. Based in London,
            working with clients worldwide.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start" style={{ animationDelay: '300ms' }}>
            <a
              href="#projects"
              onClick={(e) => scrollTo(e, '#projects')}
              className="pointer-events-auto group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-8 py-4 text-sm font-semibold text-midnight transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 -translate-x-full bg-accent-light transition-transform duration-300 group-hover:translate-x-0" />
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-text-primary transition-all duration-300 hover:border-accent/50 hover:text-accent"
            >
              Get In Touch
            </a>
          </div>

          <div className="animate-fade-up mt-12 flex items-center justify-center gap-5 lg:justify-start" style={{ animationDelay: '400ms' }}>
            {[
              { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
              { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: TwitterIcon, href: 'https://twitter.com', label: 'X / Twitter' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="pointer-events-auto rounded-full border border-border p-3 text-text-muted transition-all duration-300 hover:border-accent/40 hover:text-accent hover:shadow-lg hover:shadow-accent/10"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Terminal visual column */}
        <div className="pointer-events-auto animate-fade-up hidden lg:flex lg:justify-end" style={{ animationDelay: '500ms' }} aria-hidden="true">
          <CodeTerminal />
        </div>
      </div>

      <a
        href="#about"
        onClick={(e) => scrollTo(e, '#about')}
        aria-label="Scroll to about section"
        className="pointer-events-auto absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-text-muted transition-colors hover:text-accent"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  )
}
