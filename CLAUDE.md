# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
npm start        # Start production server
```

## Architecture

Single-page Next.js 16 (App Router) landing site for the *Encuentro Latinoamericano del Canto y las Danzas Folclóricas* — a recurring folk dance/singing festival in Argentina.

**Page structure** (`src/app/page.tsx`): one vertical page composed of section components in this order:
`Header → Hero → History → UpcomingEditions → Program → Gallery → Registration → Contact → Footer`

Each section has a matching `id` attribute used for smooth-scroll navigation (`#inicio`, `#historia`, `#ediciones`, `#programa`, `#galeria`, `#inscripcion`, `#contacto`).

**Data layer** (`src/constants/`):
- `event-data.ts` — `EDITIONS_2026` (two upcoming events), `SCHEDULE_PASO_2026`, `SCHEDULE_MDP_2026`, `CONTACTS`, `NAV_LINKS`
- `gallery-data.ts` — `GALLERY_ITEMS` (photos + YouTube video). Add new items here and drop files in `public/images/gallery/`
- `history-data.ts` — `EVENT_TAGLINE`, `STATS`, organizer/history content

**Types** (`src/types/index.ts`): `EventEdition`, `ScheduleDay`, `GalleryItem`, `ContactPerson`, `NavLink`, etc. All data constants are typed here.

**Components**:
- `src/components/sections/` — one file per page section
- `src/components/layout/` — `Header.tsx`, `Footer.tsx`
- `src/components/gallery/` — `PhotoGrid.tsx`, `VideoGrid.tsx`, `Lightbox.tsx` (uses `yet-another-react-lightbox`)
- `src/components/ui/` — shadcn components (Button, Card, Badge, Dialog, Tabs, Accordion, Separator)

## Styling

Tailwind CSS v4. Brand palette is defined in `src/app/globals.css` under `@theme inline`:
- Primary color token: `tierra` / `tierra-light` / `tierra-dark` (blue `#5B9BD5`, not earthy — name is legacy)
- Also available: `celeste`, `celeste-light`, `celeste-dark`, `navy`, `cream`, `slate`
- Semantic tokens: `whatsapp`, `warning`
- Utility classes: `.glass`, `.glass-dark` (frosted glass), `.animate-float` (scroll indicator bounce)
- Fonts: `font-sans` → Inter (`--font-inter`), `font-heading` → Merriweather (`--font-merriweather`)
