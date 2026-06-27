# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` - starts Vite development server with HMR
- **Build**: `npm run build` - builds production bundle to `dist/`
- **Preview**: `npm run preview` - previews production build locally
- **Lint**: `npm run lint` - runs ESLint on all JS/JSX files

## Architecture

Single-page React 19 portfolio website using Vite 7, Tailwind CSS v4, and Framer Motion. No routing — sections render sequentially in `src/App.jsx`.

### Entry Point

`src/main.jsx` renders `<App />` wrapped in three context providers (order matters):
1. **LanguageProvider** — toggles between English (`true`) and French (`false`), persisted to localStorage
2. **ThemeProvider** — manages dark/light mode via `useDarkMode` hook (`src/hooks/usedarkMode.jsx`), adds `.dark` class to `<html>`
3. **DataProvider** — loads content from `src/data/data.json`

Access via hooks: `useLanguage()`, `useTheme()`, `useData()`

`index.html` includes an inline script to apply `.dark` class before React hydrates to prevent flash of wrong theme.

### Section Components

All in `src/components/sections/`, rendered in this order by `App.jsx`:

| Component | Purpose |
|-----------|---------|
| `Navbar.jsx` | Fixed nav with desktop/mobile menus, theme toggle, language switcher, smooth scroll links |
| `Hero.jsx` | Full-screen intro with background image overlay, staggered fade-in animations, TypedText typing effect with HTML-styled strings (white prefix + gold keyword), shine-sweep CTA buttons, scroll indicator that fades on scroll and links to #about |
| `About.jsx` | Bio, education/experience cards, CV download link, portrait image |
| `Skills.jsx` | 3 skill categories (Frontend/Backend/Other) with dynamic icon mapping from react-icons + lucide-react |
| `Portfolio.jsx` | Project cards with images, tech tags, live demo and source code links |
| `Contact.jsx` | EmailJS-powered form with validation, contact info cards, react-hot-toast notifications |
| `Footer.jsx` | Copyright with dynamic year, tech stack attribution |

### Small Components

- `src/components/smallComponents/TypedText.jsx` — Reusable Typed.js wrapper. Accepts `strings` (array) and `className` props. Supports HTML content in strings via `contentType: 'html'` (used for dual-color typed text in Hero). Config: typeSpeed 75, backSpeed 50, loop true, no cursor.

### Content Data

All text content lives in `src/data/data.json` with English/French variants (e.g., `title` / `titleFrench`). Components read from this file via `useData()` and conditionally render based on `useLanguage()`.

Data sections: `hero`, `about`, `skills` (with nested `skillCategories` array), `portfolio` (with nested `projects` array), `contact`, `footer`.

The `hero` section includes `typedRoles` / `typedRolesFrench` arrays with HTML-formatted strings (e.g., `<span class='text-white/80 font-normal'>I am </span>a full stack web developer`) used by the TypedText component for dual-color typing effects. French text is not a direct translation of English — it is written to sound natural in French.

### Styling

- Tailwind v4 with `@tailwindcss/vite` plugin (configured in `vite.config.js`)
- CSS variables defined in `src/index.css` under `:root` (light) and `.dark` (dark mode)
- Variables exposed to Tailwind via `@theme` block in `index.css`
- Key colors: `--gold` (#b09a68), `--background`, `--foreground`, `--backgroundCard`
- Use Tailwind classes like `bg-background`, `text-foreground`, `text-gold`
- Font: Poppins (Google Fonts import)
- Custom scrollbar, card hover effects, and divider styles in `index.css`
- Framer Motion `whileInView` for viewport-triggered animations across all sections

### Skills Icon Mapping

`Skills.jsx` uses an `iconMap` object to dynamically resolve icon name strings from `data.json` (e.g., `"SiReact"`) to actual icon components from `react-icons` (SI, FA, MD, RI families) and `lucide-react`.

### Contact Form

Uses EmailJS (`emailjs-com`) for sending emails. Requires environment variables in `.env`:
- `VITE_SERVICE_ID`
- `VITE_TEMPLATE_ID`
- `VITE_PUBLIC_KEY`

Form fields sent: `from_name`, `email`, `message`. Success/error feedback via `react-hot-toast`.

### Key Dependencies

- **react** / **react-dom** 19.1.0 — UI framework
- **framer-motion** 12.19.1 — animations
- **react-icons** 5.5.0 + **lucide-react** 0.525.0 — icons
- **typed.js** 2.1.0 — typing animation
- **emailjs-com** 3.2.0 — contact form emails
- **react-hot-toast** 2.5.2 — toast notifications
- **react-anchor-link-smooth-scroll** 1.0.12 — smooth scroll navigation
- **axios** 1.11.0 — HTTP client
