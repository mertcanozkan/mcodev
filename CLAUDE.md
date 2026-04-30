# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Next.js dev server
npm run build     # Production build (static export → out/)
npm run start     # Serve the production build
npm run lint      # ESLint with next/core-web-vitals
```

There is no test suite configured.

## Architecture

Single-page React 19 portfolio site for the MCODev brand, built with Next.js 15 (App Router) and Tailwind CSS v4. `next.config.mjs` sets `output: 'export'` and `images.unoptimized: true` — the site ships as static HTML in `out/`.

**`src/app/layout.jsx`** — Root layout. Loads the three Google fonts via `next/font` (exposes `--font-display`, `--font-body`, `--font-mono`), defines `metadata` + `viewport` (OG, Twitter, robots, canonical `https://mcodev.uk`), and injects a Person + WebSite JSON-LD graph in `<head>`.

**`src/app/page.jsx`** — Client component (`'use client'`). Composes all section components and owns the global scroll-reveal logic: an `IntersectionObserver` watches `.animate-fade-up` elements and adds `.visible` to trigger their entrance animation. A `MutationObserver` re-runs the sweep when new elements enter the DOM. `Contact` is loaded via `next/dynamic` with `ssr: false`.

**Section components** (`src/components/`) — One file per page section: `Navbar`, `Hero`, `About`, `Stats`, `Skills`, `Services`, `Projects`, `WhyMe`, `Testimonials`, `Contact`, `Footer`, `BackToTop`, `Chatbot`, `ThemeSwitcher`. Each is a self-contained default export.

**UI primitives** (`src/components/ui/`) — Low-level reusable components: `card.jsx` (shadcn-style Card family), `spotlight.jsx`, `spotlight-card.jsx`, `splite.jsx` (Spline 3D wrapper).

**Theme system** (`src/lib/themes.js`) — Ten named accent colour themes (default: rose). `applyTheme(theme)` mutates CSS custom properties directly on `document.documentElement` at runtime. The active theme id is persisted to localStorage under the key `mcodev-theme`. `ThemeSwitcher.jsx` is the UI for this and reads stored theme inside `useEffect` to avoid SSR mismatch.

**Design tokens** (`src/app/globals.css`) — All colours, fonts, and spacing are defined as CSS custom properties inside a Tailwind v4 `@theme {}` block. Accent colours (`--color-accent`, `--color-accent-light`, `--color-accent-rgb`, `--color-accent-dim`, `--color-accent-hue`) are the properties mutated at runtime by the theme switcher.

**Utilities** (`src/lib/utils.js`) — Exports `cn(...inputs)` which combines `clsx` and `tailwind-merge`.

**Path alias** — `@` resolves to `./src` (configured in `jsconfig.json`).

## Styling conventions

- Tailwind CSS v4 — config is in `src/app/globals.css` via `@theme {}`, not a `tailwind.config.js` file. PostCSS config in `postcss.config.mjs` uses `@tailwindcss/postcss`.
- Use `cn()` from `@/lib/utils` when conditionally composing class names.
- Colour tokens to use: `bg-midnight`, `bg-surface`, `bg-surface-light`, `text-text-primary`, `text-text-secondary`, `text-accent`, `border-border`, etc.
- Fonts: `font-display` (Space Grotesk headings), `font-body` (Inter, default), `font-mono` (JetBrains Mono).
- Scroll reveal: add `animate-fade-up` to any element that should fade in on scroll — the observer in `src/app/page.jsx` handles the rest.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_CHATBOT_WEBHOOK_URL` | Webhook endpoint for the floating chatbot (`Chatbot.jsx`). Falls back to `''` if unset. |
| `NEXT_PUBLIC_TRANSCRIPT_WEBHOOK_URL` | Webhook endpoint for emailing chat transcripts to the user. |
| `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` | Webhook endpoint for the contact form submission (`Contact.jsx`). |

Prefix any client-side env vars with `NEXT_PUBLIC_` for Next.js to expose them to the browser bundle.
