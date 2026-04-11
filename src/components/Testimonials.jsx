import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'An exceptional developer who truly understands both design and engineering. The landing page exceeded our expectations — fast, beautiful, and conversion-focused.',
    name: 'Sarah Mitchell',
    role: 'Founder, Meridian Studio',
  },
  {
    quote: 'Working with MCODev was a game-changer for our product. The attention to responsive detail and performance was remarkable. Our bounce rate dropped by 40%.',
    name: 'James Chen',
    role: 'CTO, Pulse Commerce',
  },
  {
    quote: 'Rare to find a front end developer with such a strong eye for design. Delivered ahead of schedule with code quality that impressed our entire engineering team.',
    name: 'Elena Rodriguez',
    role: 'Product Lead, Lumina Analytics',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 px-6 lg:py-36" aria-labelledby="testimonials-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-72 w-72 rounded-full bg-accent/3 blur-[100px]" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Testimonials
          </p>
          <h2 id="testimonials-heading" className="animate-fade-up font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Kind Words From <span className="text-gradient">Clients</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map(({ quote, name, role }, i) => (
            <blockquote
              key={name}
              className="animate-fade-up glass-light group flex flex-col rounded-2xl p-8 transition-all duration-300 hover:border-accent/30"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <Quote size={28} className="text-accent/40" />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-text-secondary italic">
                "{quote}"
              </p>
              <footer className="mt-6 flex items-center gap-3 border-t border-border/50 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-bold text-accent">
                  {name.charAt(0)}
                </div>
                <div>
                  <cite className="block text-sm font-semibold not-italic text-text-primary">{name}</cite>
                  <span className="text-xs text-text-muted">{role}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
