# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` - starts Vite development server with HMR
- **Build**: `npm run build` - builds production bundle to `dist/`
- **Preview**: `npm run preview` - previews production build locally
- **Lint**: `npm run lint` - runs ESLint on all JS/JSX files

## Architecture

This is a React portfolio website using Vite, Tailwind CSS v4, and Framer Motion.

### Context Providers (wrap the app in main.jsx)

Three providers wrap the app in this order:
1. **LanguageProvider** - toggles between English (`true`) and French (`false`), persisted to localStorage
2. **ThemeProvider** - manages dark/light mode via `useDarkMode` hook, adds `.dark` class to document
3. **DataProvider** - loads content from `src/data/data.json`

Access via hooks: `useLanguage()`, `useTheme()`, `useData()`

### Content Data

All text content lives in `src/data/data.json` with English/French variants (e.g., `title` / `titleFrench`). Components read from this file via `useData()` and conditionally render based on `useLanguage()`.

### Styling

- Tailwind v4 with `@tailwindcss/vite` plugin
- CSS variables defined in `src/index.css` under `:root` (light) and `.dark` (dark mode)
- Key colors: `--gold` (#b09a68), `--background`, `--foreground`, `--backgroundCard`
- Use Tailwind classes like `bg-background`, `text-foreground`, `text-gold`

### Section Components

All page sections are in `src/components/sections/`: Navbar, Hero, About, Skills, Portfolio, Contact, Footer. Each section fetches content via `useData()` and switches language via `useLanguage()`.

### Contact Form

Uses EmailJS (`emailjs-com`) for sending emails. Requires environment variables in `.env`:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
