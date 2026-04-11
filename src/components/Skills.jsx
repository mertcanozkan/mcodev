const categories = [
  {
    heading: 'Languages & Core',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Java', 'Python'],
  },
  {
    heading: 'Frameworks & Libraries',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Vite'],
  },
  {
    heading: 'Tools & Workflow',
    skills: ['Git', 'GitHub', 'Figma', 'VS Code', 'npm'],
  },
  {
    heading: 'Principles',
    skills: ['Responsive Design', 'Accessibility', 'Performance', 'UI/UX Implementation', 'SEO'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 lg:py-36" aria-labelledby="skills-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-accent/3 blur-[100px]" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Tech Stack
          </p>
          <h2 id="skills-heading" className="animate-fade-up font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-text-secondary">
            The tools and technologies I use daily to build modern, performant web experiences.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ heading, skills }, ci) => (
            <div
              key={heading}
              className="animate-fade-up glass-light group rounded-2xl p-6 transition-all duration-300 hover:border-accent/30"
              style={{ animationDelay: `${ci * 100}ms` }}
            >
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-accent">
                {heading}
              </h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
