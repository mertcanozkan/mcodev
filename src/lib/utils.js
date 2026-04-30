import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function smoothScrollBehavior() {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}

export function scrollToHash(hash) {
  const el = typeof hash === 'string' ? document.querySelector(hash) : hash
  el?.scrollIntoView({ behavior: smoothScrollBehavior() })
}
