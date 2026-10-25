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

## Visual direction (decided by Matías, 2026-10-25) — keep it

**"Afiche de festival folclórico."** The site looks like a festival poster made from the Encuentro's own world, in the
line of Lollapalooza AR, Cosquín Rock and Primavera Sound, with the textile *guarda* as its own graphic system. Matías
rejected a quiet, restrained version ("parece hecha por un junior, nada moderna, malos colores"); every future design
change stays inside this direction unless he explicitly asks for a new one. Reference sketch:
`design/boceto-afiche-festival.html` (open it in a browser; screenshots in `design/`).

- **Palette, taken from the photos** (trajes, polleras, banners): `bordo` #7a1c2c, `rojo` #e23b2e, `turquesa` #2fc2bd,
  `amarillo` #f7c531, `magenta` #d63384, `crema` #fff4e4, `tinta` #170d11. Strong color fields per section; the logo's
  celeste does not constrain the palette.
- **Type:** Anton (condensed, uppercase) for display — `font-display`; Bricolage Grotesque for text — `font-sans`.
- **Signature pieces:**
  - Hero: stage photo full-bleed (slow zoom) with a dark scrim, the motto as stacked colored label blocks (`.tag`:
    "ARGENTINA LE CANTA" bordó · "Y BAILA" crema, tilted · "A LATINOAMÉRICA" turquesa), live countdown, yellow pill CTA.
  - `.ticker`: marquee bands with real facts (dates, venue, entrada libre, ballets).
  - `.guarda`: the textile diamond band as separator/frame, slowly sliding.
  - Each edition is its own poster card (own color, photo, "Faltan N días" / "Realizado" sticker).
  - Photos used big and often: collages with solid colored offset shadows, sticker labels, slight rotations; "BAILA"
    with the photo inside the letters is a valid section title. Subtle grain texture is allowed.
- **Motion: "medido pero visible"** — marquees, tag slide-in, photo zoom/float, staggered reveals; always with a
  `prefers-reduced-motion` fallback.
- **Audience and action:** ballet directors; the main action is WhatsApp (Lead). Prices are not shown on the page.

## Styling

Tailwind CSS v4. Tokens live in `src/app/globals.css` under `@theme inline` (palette above as `bordo`, `rojo`,
`turquesa`, `amarillo`, `magenta`, `crema`, `tinta`; fonts as `font-display` / `font-sans`). Reusable pieces live in
`@layer components` so Tailwind utilities can still override them (unlayered CSS beats `@layer utilities` in v4).
Motion: entrances use `data-reveal` (observed by `RevealObserver`); hidden states live under `html.js` and
`prefers-reduced-motion: no-preference`.

**Editions by date** (`src/lib/editions.ts`): the hero, inscription and program feature the next edition automatically;
past ones show as "realizado". `page.tsx` revalidates every hour.

**Meta Pixel**: `TrackedLink` (and the inscription form) fire `Lead` (WhatsApp inscription), `ViewContent`
(link to #inscripcion) and `Contact` (WhatsApp, Telefono, Email).

## Design skills

The direction is already chosen (section above). No skill picks a new aesthetic.

- **`design-taste-frontend` (taste-skill)** no longer deals directions here. Its house rules (no tags, no gradients,
  no rotations, no marquees, two-line headlines…) contradict the chosen poster style: **the direction wins**. Its
  `inspect.mjs` is still useful for overflow, contrast and screenshots; ignore the FAILs that come from the direction's
  own pieces. Its working files land in `.taste-skill/` (gitignored).
- **Finishing passes (impeccable): `animate`, `polish`, `audit`, `optimize`.** Run them inside the direction, never to
  choose a new one. They load impeccable's `frontend-design` first: read it as a list of anti-patterns, not as a
  direction. If it contradicts the direction, the direction wins.
- **Do not use** impeccable's `colorize`, `normalize`, `distill`, `clarify` or `adapt`: they restyle and would fight
  the direction. `critique` is fine as a read-only review.
- **`anatomy`** (user-level) only for an isometric explanatory illustration, if a section needs one.
- The `frontend-design@claude-plugins-official` plugin is disabled for this project (`.claude/settings.local.json`).
- Motion must respect `prefers-reduced-motion`. Never read or edit `.env*` files.
