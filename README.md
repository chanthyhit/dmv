# DMV React App

Enterprise-ready React + TypeScript web app scaffolded with Vite, TailwindCSS, ESLint, and Prettier. The starter UI shows a driver-training dashboard with reusable layout and card components.

## Stack

- React 19, TypeScript, Vite
- TailwindCSS 3.x, PostCSS, Autoprefixer
- ESLint (flat config) + eslint-config-prettier
- Prettier

## Scripts

- `npm install` – install dependencies
- `npm run dev` – start the Vite dev server
- `npm run build` – type-check then build for production
- `npm run preview` – preview the production build locally
- `npm run lint` / `npm run lint:fix` – lint source files
- `npm run format` – format with Prettier

## Project structure

```
src/
  components/
    cards/         # UI primitives (stat cards, question cards)
    navigation/    # Top navigation
  data/            # Typed data sources for the demo view
  layouts/         # Shared page layouts
  pages/           # Route-level views (HomePage)
  main.tsx         # App entry
  index.css        # Tailwind entry + base styles
```

Vite alias `@` points to `src` (configured in `vite.config.ts` and `tsconfig.app.json`).

## Tailwind setup

- Configured in `tailwind.config.js` with project colors, fonts, and shadows.
- Global styles and `@tailwind` directives live in `src/index.css`.

## Notes for production hardening

- Add unit/feature tests (Vitest + React Testing Library) when ready.
- Wire real data sources and state management as needed (e.g., React Query, Redux Toolkit).
- Enforce CI for `lint` + `format` + `build` before deployment.
