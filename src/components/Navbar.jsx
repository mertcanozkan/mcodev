import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3 shadow-lg shadow-black/20' : 'py-5 bg-transparent'
      }`}
      role="banner"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Primary navigation">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="font-display text-xl font-bold tracking-wide text-text-primary transition-colors hover:text-accent"
        >
          MCO<span className="text-accent">Dev</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === href.slice(1)
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {label}
                {activeSection === href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 h-px w-6 -translate-x-1/2 bg-accent" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeSwitcher />
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="rounded-full border border-accent bg-accent/10 px-6 py-2.5 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-midnight"
          >
            Let's Talk
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 rounded-lg p-2 text-text-secondary transition-colors hover:text-text-primary md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-midnight/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col items-center gap-6" role="list">
            {navLinks.map(({ label, href }, i) => (
              <li
                key={href}
                className={mobileOpen ? 'animate-slide-in' : 'opacity-0'}
                style={{ animationDelay: `${i * 60 + 100}ms` }}
              >
                <a
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  className={`font-display text-2xl font-medium transition-colors hover:text-accent ${
                    activeSection === href.slice(1) ? 'text-accent' : 'text-text-primary'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
            <li
              className={mobileOpen ? 'animate-slide-in' : 'opacity-0'}
              style={{ animationDelay: `${navLinks.length * 60 + 100}ms` }}
            >
              <a
                href="#contact"
                onClick={(e) => handleClick(e, '#contact')}
                className="mt-4 inline-block rounded-full border border-accent bg-accent/10 px-8 py-3 text-base font-semibold text-accent transition-all hover:bg-accent hover:text-midnight"
              >
                Let's Talk
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
