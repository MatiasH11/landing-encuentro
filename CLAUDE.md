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
`Header → Hero → History → UpcomingEditions → Program → Gallery → Registration → Contact → Footer`, plus `MobileActionBar` (fixed WhatsApp CTAs on phones)

Each section has a matching `id` attribute used for smooth-scroll navigation (`#inicio`, `#historia`, `#ediciones`, `#programa`, `#galeria`, `#inscripcion`, `#contacto`).

**Data layer** (`src/constants/`):
- `event-data.ts` — `EDITIONS_2026` (two upcoming events), `SCHEDULE_PASO_2026`, `SCHEDULE_MDP_2026`, `CONTACTS`, `NAV_LINKS`
- `gallery-data.ts` — `GALLERY_ITEMS` (photos + YouTube video). Add new items here and drop files in `public/images/gallery/`
- `history-data.ts` — `EVENT_TAGLINE`, `STATS`, organizer/history content

**Types** (`src/types/index.ts`): `EventEdition`, `ScheduleDay`, `GalleryItem`, `ContactPerson`, `NavLink`, etc. All data constants are typed here.

**Components**:
- `src/components/sections/` — one file per page section
- `src/components/layout/` — `Header.tsx`, `Footer.tsx`, `MobileActionBar.tsx`
- `src/components/gallery/` — `Lightbox.tsx` (uses `yet-another-react-lightbox`, loaded on demand from `GallerySection`)
- `src/components/ui/` — shadcn components (Button, Card, Badge, Dialog, Tabs, Accordion, Separator)

## Styling

Tailwind CSS v4. Direction dealt by taste-skill: *sentence-as-layout* ("el lema es la página": the hero headline is the
motto, with a photo strip in place of the word "baila"). Tokens live in `src/app/globals.css` under `@theme inline`:
- Colors: `bg`, `surface`, `ink`, `muted`, `accent` (only on the action), `accent-strong`, and two fields: `celeste`
  (+ `celeste-ink`) and `night` (+ `night-ink`, `night-muted`). Form tokens: `field-line`, `danger`.
- Five type sizes: `text-small`, `text-body`, `text-lead`, `text-head`, `text-display`. One family: Schibsted Grotesk
  (`--font-schibsted`, weights 400/600/800); `.display` sets the 800 weight and tight tracking.
- Components (in `@layer components`): `.button`, `.button-quiet`, `.link`, `.tabular`, `.lines`.
- Motion: entrances use `data-reveal` (observed by `RevealObserver`), `data-load`, `data-line`, `.shutter`, `.drift`; all
  hidden states live under `html.js` and `prefers-reduced-motion: no-preference`.

**Editions by date** (`src/lib/editions.ts`): the hero, inscription and program feature the next edition automatically;
past ones show as "realizado". `page.tsx` revalidates every hour.

**Meta Pixel**: `TrackedLink` (and the inscription form) fire `Lead` (WhatsApp inscription), `ViewContent`
(link to #inscripcion) and `Contact` (WhatsApp, Telefono, Email).

## Design skills

One skill sets the visual direction; the others work inside it. Never let two of them pick an aesthetic.

- **Direction: `design-taste-frontend` (taste-skill).** Use it for any design, redesign or restyle of a section or the
  whole page. Run its scripts from the repo root; its working files land in `.taste-skill/` (gitignored).
- **Finishing passes (impeccable): `animate`, `polish`, `audit`, `optimize`.** Run them only on a direction taste already
  set, never to choose a new one. They load impeccable's `frontend-design` first: read it as a list of anti-patterns,
  not as a direction. If it contradicts taste's house rules, taste wins.
- **Do not use** impeccable's `colorize`, `normalize`, `distill`, `clarify` or `adapt`: they restyle and would fight
  taste. `critique` is fine as a read-only review.
- **`anatomy`** (user-level) only for an isometric explanatory illustration, if a section needs one.
- The `frontend-design@claude-plugins-official` plugin is disabled for this project (`.claude/settings.local.json`).
- Motion must respect `prefers-reduced-motion`. Never read or edit `.env*` files.
