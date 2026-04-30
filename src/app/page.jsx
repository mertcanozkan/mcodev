'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Skills from '@/components/Skills'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import WhyMe from '@/components/WhyMe'
import Testimonials from '@/components/Testimonials'
import dynamic from 'next/dynamic'
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false })
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import Chatbot from '@/components/Chatbot'

export default function Home() {
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

    const mo = new MutationObserver(() => observeAll())
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-midnight">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[9999] -translate-y-20 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-midnight transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
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
