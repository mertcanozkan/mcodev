import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import WhyMe from './components/WhyMe'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Chatbot from './components/Chatbot'

export default function App() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    const observeAll = () => {
      document.querySelectorAll('.animate-fade-up:not(.visible)').forEach((el) => {
        io.observe(el)
      })
    }

    observeAll()

    // Watch for dynamically added elements
    const mo = new MutationObserver(() => observeAll())
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-midnight">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Services />
        <Projects />
        <WhyMe />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Chatbot />
    </div>
  )
}
