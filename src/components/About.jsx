import { Code2, Palette, Zap, Users } from 'lucide-react'

const highlights = [
  { icon: Code2, title: 'Clean Code', desc: 'Semantic, maintainable, and built to last.' },
  { icon: Palette, title: 'Design Eye', desc: 'Pixel-perfect implementation of modern UI.' },
  { icon: Zap, title: 'Performance', desc: 'Fast load times, smooth interactions.' },
  { icon: Users, title: 'User First', desc: 'Accessible, intuitive experiences for everyone.' },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 lg:py-36" aria-labelledby="about-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              About Me
            </p>
            <h2 id="about-heading" className="animate-fade-up font-display text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl">
              Turning ideas into{' '}
              <span className="text-gradient">elegant interfaces</span>
            </h2>
            <p className="animate-fade-up mt-6 text-lg leading-relaxed text-text-secondary">
              I'm a front end developer based in London with a passion for building
              web experiences that are as beautiful as they are functional. I specialise in
              translating design visions into responsive, accessible, and high-performance
              interfaces using modern frameworks and best practices.
            </p>
            <p className="animate-fade-up mt-4 text-lg leading-relaxed text-text-secondary">
              Whether it's a startup landing page, a complex web application, or a
              brand-driven portfolio — I approach every project with care for detail,
              clean architecture, and the user at the centre of every decision.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="animate-fade-up glass-light group rounded-2xl p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent transition-colors duration-300 group-hover:bg-accent/20">
                  <Icon size={22} />
                </div>
                <h3 className="mb-1 text-sm font-bold text-text-primary">{title}</h3>
                <p className="text-xs leading-relaxed text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
