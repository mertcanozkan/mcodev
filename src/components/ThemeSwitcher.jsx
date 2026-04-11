import { useState, useEffect, useRef } from 'react'
import { Palette, Check } from 'lucide-react'
import { themes, applyTheme, getDefaultTheme } from '@/lib/themes'

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(() => getDefaultTheme())
  const panelRef = useRef(null)
  const btnRef = useRef(null)

  // Apply stored theme on mount
  useEffect(() => {
    applyTheme(active)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const selectTheme = (theme) => {
    setActive(theme)
    applyTheme(theme)
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="rounded-full border border-border p-2 text-text-secondary transition-all duration-300 hover:border-accent/50 hover:text-accent"
        aria-label="Change colour theme"
        aria-expanded={open}
      >
        <Palette size={16} />
      </button>

      {/* Theme panel */}
      <div
        ref={panelRef}
        className={`absolute right-0 top-full z-[100] mt-3 w-52 origin-top-right rounded-2xl border border-border bg-surface/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-200 ${
          open
            ? 'scale-100 opacity-100 visible'
            : 'scale-95 opacity-0 invisible pointer-events-none'
        }`}
        role="listbox"
        aria-label="Colour themes"
      >
        <p className="mb-2.5 px-1 text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">
          Theme
        </p>
        <div className="space-y-1">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => selectTheme(theme)}
              role="option"
              aria-selected={active.id === theme.id}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                active.id === theme.id
                  ? 'bg-white/5 text-text-primary'
                  : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
              }`}
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full shadow-inner"
                style={{ backgroundColor: theme.accent }}
              />
              <span className="flex-1">{theme.name}</span>
              {active.id === theme.id && (
                <Check size={14} className="shrink-0" style={{ color: theme.accent }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
