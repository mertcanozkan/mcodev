import { useEffect, useRef } from 'react'

const GLOW_STYLES = `
[data-glow] {
  --border-size: calc(var(--border, 2) * 1px);
  --spotlight-size: calc(var(--size, 200) * 1px);
  --hue: calc(var(--base) + (var(--xp, 0) * var(--spread, 0)));
  position: relative;
  touch-action: none;
  background-color: var(--backdrop, transparent);
  background-image: radial-gradient(
    var(--spotlight-size) var(--spotlight-size) at
    calc(var(--x, 0) * 1px)
    calc(var(--y, 0) * 1px),
    hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)),
    transparent
  );
  background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
  background-position: 50% 50%;
  background-attachment: fixed;
  border: var(--border-size) solid var(--backup-border, hsl(0 0% 60% / 0.12));
  border-radius: calc(var(--radius, 16) * 1px);
}

[data-glow]::before,
[data-glow]::after {
  pointer-events: none;
  content: "";
  position: absolute;
  inset: calc(var(--border-size) * -1);
  border: var(--border-size) solid transparent;
  border-radius: calc(var(--radius, 16) * 1px);
  background-attachment: fixed;
  background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
  background-repeat: no-repeat;
  background-position: 50% 50%;
  mask:
    linear-gradient(transparent, transparent),
    linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  -webkit-mask:
    linear-gradient(transparent, transparent),
    linear-gradient(white, white);
  -webkit-mask-clip: padding-box, border-box;
  -webkit-mask-composite: source-in;
}

[data-glow]::before {
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
    calc(var(--x, 0) * 1px)
    calc(var(--y, 0) * 1px),
    hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)),
    transparent 100%
  );
  filter: brightness(2);
}

[data-glow]::after {
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
    calc(var(--x, 0) * 1px)
    calc(var(--y, 0) * 1px),
    hsl(0 100% 100% / var(--border-light-opacity, 1)),
    transparent 100%
  );
}

[data-glow] > [data-glow-inner] {
  position: absolute;
  inset: 0;
  will-change: filter;
  opacity: var(--outer, 1);
  border-radius: calc(var(--radius, 16) * 1px);
  border-width: calc(var(--border-size) * 20);
  filter: blur(calc(var(--border-size) * 10));
  background: none;
  pointer-events: none;
  border: none;
}

[data-glow] > [data-glow-inner]::before {
  pointer-events: none;
  content: "";
  position: absolute;
  inset: -10px;
  border: 10px solid transparent;
  border-radius: calc(var(--radius, 16) * 1px);
  background-attachment: fixed;
  background-size: calc(100% + 20px) calc(100% + 20px);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  mask:
    linear-gradient(transparent, transparent),
    linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  -webkit-mask:
    linear-gradient(transparent, transparent),
    linear-gradient(white, white);
  -webkit-mask-clip: padding-box, border-box;
  -webkit-mask-composite: source-in;
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
    calc(var(--x, 0) * 1px)
    calc(var(--y, 0) * 1px),
    hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)),
    transparent 100%
  );
  filter: brightness(2);
}
`

let stylesInjected = false

export function GlowCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!stylesInjected) {
      const el = document.createElement('style')
      el.setAttribute('data-glow-styles', '')
      el.textContent = GLOW_STYLES
      document.head.appendChild(el)
      stylesInjected = true
    }
  }, [])

  useEffect(() => {
    const syncPointer = (e) => {
      const { clientX: x, clientY: y } = e
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2))
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2))
        cardRef.current.style.setProperty('--y', y.toFixed(2))
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2))
      }
    }
    document.addEventListener('pointermove', syncPointer)
    return () => document.removeEventListener('pointermove', syncPointer)
  }, [])

  const cardVars = {
    '--base': 'var(--color-accent-hue)',
    '--spread': 200,
    '--radius': 16,
    '--border': 3,
    '--backdrop': 'hsl(0 0% 60% / 0.12)',
    '--backup-border': 'hsl(0 0% 60% / 0.12)',
    '--size': 200,
    '--outer': 1,
    ...style,
  }

  return (
    <div
      ref={cardRef}
      data-glow
      style={cardVars}
      className={`shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px] ${className}`}
    >
      <div data-glow-inner />
      <div className="relative z-[2] overflow-hidden rounded-[calc(var(--radius,16)*1px)]">
        {children}
      </div>
    </div>
  )
}
