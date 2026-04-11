export const themes = [
  {
    id: 'rose',
    name: 'Rose',
    accent: '#f43f5e',
    accentLight: '#fb7185',
    accentRgb: '244, 63, 94',
    accentHue: 350,
    swatch: 'bg-rose-500',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    accent: '#6366f1',
    accentLight: '#818cf8',
    accentRgb: '99, 102, 241',
    accentHue: 239,
    swatch: 'bg-indigo-500',
  },
  {
    id: 'violet',
    name: 'Violet',
    accent: '#a855f7',
    accentLight: '#c084fc',
    accentRgb: '168, 85, 247',
    accentHue: 270,
    swatch: 'bg-violet-500',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    accent: '#10b981',
    accentLight: '#34d399',
    accentRgb: '16, 185, 129',
    accentHue: 160,
    swatch: 'bg-emerald-500',
  },
  {
    id: 'sky',
    name: 'Sky',
    accent: '#3b82f6',
    accentLight: '#60a5fa',
    accentRgb: '59, 130, 246',
    accentHue: 217,
    swatch: 'bg-blue-500',
  },
  {
    id: 'amber',
    name: 'Amber',
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    accentRgb: '245, 158, 11',
    accentHue: 38,
    swatch: 'bg-amber-500',
  },
]

const STORAGE_KEY = 'mcodev-theme'

export function getStoredThemeId() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function applyTheme(theme) {
  const root = document.documentElement
  root.style.setProperty('--color-accent', theme.accent)
  root.style.setProperty('--color-accent-light', theme.accentLight)
  root.style.setProperty('--color-accent-rgb', theme.accentRgb)
  root.style.setProperty('--color-accent-dim', `rgba(${theme.accentRgb}, 0.15)`)
  root.style.setProperty('--color-accent-hue', String(theme.accentHue))

  try {
    localStorage.setItem(STORAGE_KEY, theme.id)
  } catch {
    // ignore
  }
}

export function getDefaultTheme() {
  const storedId = getStoredThemeId()
  return themes.find((t) => t.id === storedId) || themes[0]
}
