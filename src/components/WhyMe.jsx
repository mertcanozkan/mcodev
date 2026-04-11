import { CheckCircle2 } from 'lucide-react'

const reasons = [
  {
    title: 'Modern Design Standards',
    desc: 'Every project follows current design trends and UI patterns that feel fresh, polished, and purposeful.',
  },
  {
    title: 'Clean & Maintainable Code',
    desc: 'Well-structured, documented code that your team can confidently extend and maintain long-term.',
  },
  {
    title: 'Responsive Across All Devices',
    desc: 'Flawless layouts from mobile to ultrawide — tested rigorously on real devices and browsers.',
  },
  {
    title: 'User-Focused Thinking',
    desc: 'Every interaction, transition, and layout decision starts with the end-user experience in mind.',
  },
  {
    title: 'Strong Attention to Detail',
    desc: 'Pixel-level precision in spacing, typography, alignment, and visual consistency throughout.',
  },
  {
    title: 'Performance & Accessibility',
    desc: 'Built for speed and inclusion — optimised assets, semantic markup, and WCAG-aware development.',
  },
]

export default function WhyMe() {
  return (
    <section id="why-me" className="relative py-28 px-6 lg:py-36" aria-labelledby="why-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Why Work With Me
            </p>
            <h2 id="why-heading" className="animate-fade-up font-display text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl">
              Built different,{' '}
              <span className="text-gradient">by design</span>
            </h2>
            <p className="animate-fade-up mt-6 text-lg leading-relaxed text-text-secondary">
              I don't just write code — I craft experiences. Every project is an opportunity
              to deliver something that genuinely stands out and serves its audience well.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map(({ title, desc }, i) => (
              <div
                key={title}
                className="animate-fade-up group flex gap-3 rounded-xl border border-border/50 bg-surface/40 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-surface-light/60"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <h3 className="mb-1 text-sm font-bold text-text-primary">{title}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
