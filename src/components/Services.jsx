import { Globe, Layout, Smartphone, RefreshCw, Gauge, PenTool } from 'lucide-react'

const services = [
  {
    icon: Layout,
    title: 'Landing Pages',
    desc: 'High-converting, visually striking landing pages designed to captivate visitors and drive action from the first scroll.',
  },
  {
    icon: Globe,
    title: 'Business Websites',
    desc: 'Professional, brand-aligned websites that establish credibility and deliver a seamless experience across every device.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    desc: 'Fluid layouts that adapt beautifully from mobile to ultrawide, ensuring every user gets a premium experience.',
  },
  {
    icon: PenTool,
    title: 'UI Implementation',
    desc: 'Pixel-perfect translation of design files into clean, interactive front end code with meticulous attention to detail.',
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    desc: 'Modernising outdated websites with fresh aesthetics, improved UX, and current best practices under the hood.',
  },
  {
    icon: Gauge,
    title: 'Performance Optimisation',
    desc: 'Auditing and improving Core Web Vitals, load times, and runtime performance for faster, smoother sites.',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6 lg:py-36" aria-labelledby="services-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            What I Do
          </p>
          <h2 id="services-heading" className="animate-fade-up font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Services & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-text-secondary">
            From concept to deployment — I deliver end-to-end front end solutions
            tailored to your goals and audience.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <article
              key={title}
              className="animate-fade-up glass-light group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/5 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-5 inline-flex rounded-xl bg-accent/10 p-3.5 text-accent transition-colors duration-300 group-hover:bg-accent/20">
                  <Icon size={24} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-text-primary">{title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
