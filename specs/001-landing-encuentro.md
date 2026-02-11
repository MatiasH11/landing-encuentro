# Spec: Official Website for Encuentro Latinoamericano del Canto y las Danzas Folclóricas

## 1. Summary

Create the **official, evergreen website** for the "Encuentro Latinoamericano del Canto y las Danzas Folclóricas" (Latin American Folklore Song and Dance Gathering) - a recurring cultural event with 19 editions of history. This is NOT a temporary landing for 2026 events, but the **permanent digital home** of the Encuentro brand.

The site must establish credibility and trust by showcasing the event's rich 19-year trajectory, highlighting upcoming 2026 editions (Paso de la Patria in October, Mar del Plata in November), featuring a **functional gallery with real photos and videos** from past editions, and providing registration information for delegations. The architecture must support easy updates for future editions (2027, 2028...).

This is a greenfield Next.js project using shadcn/ui components with a warm, folkloric color palette (reds, terracotta, golds, creams) that reflects Argentine and Latin American cultural heritage.

## 2. Technical Context

### Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 3+
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Language**: TypeScript
- **Package Manager**: npm or pnpm
- **Media Handling**: Next.js Image optimization, video embeds (YouTube/Vimeo or native HTML5)
- **Lightbox**: Consider yet-another-react-lightbox or similar for gallery modal viewing

### Project Structure (To Be Created)
```
landing-encuentro/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO
│   │   ├── page.tsx            # Home page (main site)
│   │   └── globals.css         # Global styles & Tailwind imports
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── sections/           # Site sections
│   │   ├── layout/             # Header, Footer, Navigation
│   │   └── gallery/            # Gallery-specific components (Grid, Lightbox, VideoEmbed)
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn, etc.)
│   ├── constants/
│   │   ├── event-data.ts       # Event info (dates, costs, contacts)
│   │   ├── history-data.ts     # Historical data (past editions, stats)
│   │   └── gallery-data.ts     # Photo & video metadata (URLs, captions, years)
│   └── types/
│       └── index.ts            # TypeScript types (Event, GalleryItem, etc.)
├── public/
│   ├── images/
│   │   ├── gallery/            # Gallery photos from past editions
│   │   └── branding/           # Logos, hero backgrounds
│   └── videos/                 # Optional: local videos (or use embeds)
├── specs/
│   └── 001-landing-encuentro.md # This spec
├── components.json             # shadcn/ui config
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Design Tokens
- **Primary Colors**: Terracotta (#D2691E, #E07A5F), Red (#C1121F, #780000)
- **Accent Colors**: Gold (#F4A261, #E9C46A), Cream (#F8F4E3, #FAF3DD)
- **Neutral**: Warm grays (#6B5B50, #8B7E74) for text and backgrounds
- **Fonts**: Playfair Display (headings) + Inter or Open Sans (body)

### Key shadcn/ui Components to Use
- Button, Card, Badge, Separator
- Accordion (for schedules/FAQ)
- Dialog (for lightbox/modal viewing in gallery)
- Tabs (optional: for switching between editions or event locations)
- Navigation Menu (for header navigation)

### Third-Party Libraries (Optional)
- **yet-another-react-lightbox** or **react-image-lightbox**: For gallery photo viewing
- **Framer Motion** (if approved): For scroll animations and transitions

## 3. Functional Requirements

### Core Setup
- [ ] **RF-01**: Initialize Next.js 14+ project with TypeScript, Tailwind CSS, and App Router configured
- [ ] **RF-02**: Install and configure shadcn/ui with custom theme matching folkloric color palette

### Hero Section (Evergreen Brand Identity)
- [ ] **RF-03**: Create Hero section showcasing the Encuentro as a brand/institution (NOT tied to 2026), featuring:
  - Main title: "Encuentro Latinoamericano del Canto y las Danzas Folclóricas"
  - Tagline: "Argentina le canta y baila a Latinoamérica"
  - Visual: Folkloric pattern, gradient, or hero image from past editions
  - Prominent stats: "19 ediciones", "600+ participantes", "Múltiples países"
  - Primary CTA: "Próximas Ediciones 2026" (scroll to upcoming events)

### History & Credibility Section
- [ ] **RF-04**: Create "Historia y Trayectoria" section to build trust, including:
  - Brief narrative of the event's 19-year history
  - Mission and cultural objectives (integration, folklore preservation, cultural tourism)
  - Key stats displayed prominently (19 editions, 600+ participants annually, countries represented, non-competitive nature)
  - Organizer credits: Ballet Folclórico "Embajada Folklórica Argentina", "Las 3 Marías" Eventos, directors (Prof. Mirtha Torres, Tec. Pedro Oscar Bernachea, Lic. María de los Ángeles Bernachea)
  - Optional: Timeline or visual representation of past editions (years/locations)

### Upcoming 2026 Editions Section
- [ ] **RF-05**: Create "Próximas Ediciones 2026" section with two event cards:
  - **19º Encuentro - Paso de la Patria**: Oct 9-12, 2026, Anfiteatro Pinin Palma, Corrientes
  - **20º Encuentro - Mar del Plata**: Nov 19-22, 2026, Teatro Enrique Carreras, Buenos Aires
  - Each card: Date, location, venue, participant capacity (600+ for Paso, 30+ delegations for Mar del Plata), free public admission
  - CTA: "Ver Programa Completo" (scroll to program) and "Inscribirse" (scroll to registration)

### Program/Schedule Section
- [ ] **RF-06**: Create detailed "Programa" section for Paso de la Patria 2026 (Oct 9-12) using Accordion:
  - **Thursday Oct 9**: Reception 10am, free beach day, festival 7:30pm, expo-encuentro, peña 12:30am
  - **Friday Oct 10**: Dance workshops 11am, lunch 1pm, festival 8pm, expo + peña
  - **Saturday Oct 11**: Free morning, photo session/parade 6pm, opening ceremony 7:30pm, festival 8pm, closing music 1am
  - **Sunday Oct 12**: Free morning, final festival night 7pm, closing 12:30am
  - Each day collapsible with timestamps and activity descriptions
  - Optional: Similar accordion or summary for Mar del Plata program (if details available)

### Functional Gallery Section (Real Photos & Videos)
- [ ] **RF-07**: Create fully functional "Galería" section with real media from past editions:
  - **Photo Grid**: Responsive masonry or standard grid layout displaying photos from previous editions
  - **Lightbox**: Clicking a photo opens a modal/lightbox for full-size viewing with navigation (prev/next)
  - **Video Embeds**: Embed videos (YouTube/Vimeo links or native HTML5 video) showcasing performances
  - **Captions**: Each photo/video labeled with edition year and brief description (e.g., "Ballet de Salta, 2024")
  - **Categories/Filters** (optional): Filter by year or type (photos/videos) if gallery grows large
  - Gallery data stored in `gallery-data.ts` with metadata (URL, year, caption, type: photo/video)

### Registration & Costs Section
- [ ] **RF-08**: Create "Inscripción y Costos" section with:
  - Pricing: $280,000 per person for each event, $60,000 deposit
  - Inclusions for Paso de la Patria: 4 nights lodging (cabañas), 1 lunch, digital photos, certificate, insurance, festival performance, dance workshops
  - Inclusions for Mar del Plata: 4 nights hotel with breakfast, photos, certificate, credentials, insurance, performance
  - Participant requirements: Min 15 members per ballet, max 30 ballets + 2 music groups, 15min max performance time, 2 nights guaranteed per group
  - Payment deadline: Nov 10, 2026
  - Special notes: Children 4+ full price, bus/combi driver discounts
  - CTA: "Consultar e Inscribirse" (WhatsApp link)

### Contact Section
- [ ] **RF-09**: Create "Contacto" section with:
  - Contact cards for Angeles Bernachea (+54 9 379 4771606, aangelesber@hotmail.com) and Cacho Bernachea (+54 9 379 4676554, las3marias1@hotmail.com)
  - WhatsApp CTA buttons with pre-filled messages in Spanish
  - Facebook page link: "Encuentro Latinoamericano del Canto y las Danzas Folclóricas"
  - General inquiry information

### Layout & Navigation
- [ ] **RF-10**: Create responsive Header with:
  - Event logo/branding
  - Smooth scroll navigation to: Inicio, Historia, Próximas Ediciones, Programa, Galería, Inscripción, Contacto
  - Sticky header on scroll
- [ ] **RF-11**: Create Footer with:
  - Organizer info, contact summary, social media links, copyright
  - Optional: Quick links to sections

### Technical Features
- [ ] **RF-12**: Implement WhatsApp deep links with pre-filled messages (e.g., "Hola! Me interesa participar en el Encuentro Latinoamericano 2026. Quisiera más información.")
- [ ] **RF-13**: Ensure full responsive design across mobile (320px+), tablet (768px+), and desktop (1024px+) breakpoints
- [ ] **RF-14**: Optimize images with Next.js Image component for performance
- [ ] **RF-15**: Structure data layer to easily update for future editions (2027, 2028...) by updating constants files

## 4. Non-Functional Requirements

- [ ] **RNF-01**: Page must load and be interactive within 3 seconds on standard broadband (optimize images, lazy-load gallery)
- [ ] **RNF-02**: Gallery images must be optimized (WebP format, responsive sizes) to avoid performance degradation
- [ ] **RNF-03**: Design must be accessible (WCAG 2.1 AA): semantic HTML, sufficient color contrast, keyboard navigation, alt text for all images
- [ ] **RNF-04**: All text content must be in Spanish (UI language of the target audience)
- [ ] **RNF-05**: Mobile-first responsive design: content fully readable and CTAs easily tappable on mobile devices
- [ ] **RNF-06**: SEO-optimized: appropriate meta tags, semantic structure, Open Graph tags for social sharing, descriptive alt text
- [ ] **RNF-07**: Gallery lightbox must support keyboard navigation (arrow keys, Esc to close) for accessibility

## 5. Solution Design

### Chosen Approach

**Single-page application (SPA) with smooth scroll navigation** using Next.js App Router and shadcn/ui components. The site is structured as an evergreen brand page with modular sections that can be easily updated annually.

**Component Architecture:**

1. **Layout Components** (`src/components/layout/`):
   - `Header.tsx`: Sticky navigation with smooth scroll links to all sections
   - `Footer.tsx`: Contact info, social links, copyright, quick links

2. **Section Components** (`src/components/sections/`):
   - `HeroSection.tsx`: Brand identity, tagline, key stats (19 editions, 600+ participants, countries), primary CTA
   - `HistorySection.tsx`: Narrative of 19-year trajectory, mission, objectives, organizers, credibility builders
   - `UpcomingEditionsSection.tsx`: Cards for 2026 events (Paso de la Patria Oct, Mar del Plata Nov) with details and CTAs
   - `ProgramSection.tsx`: Detailed daily schedule for Paso de la Patria using Accordion
   - `GallerySection.tsx`: Photo grid + video embeds with lightbox functionality
   - `RegistrationSection.tsx`: Pricing, inclusions, requirements, payment terms, CTA to WhatsApp
   - `ContactSection.tsx`: Contact cards for organizers with WhatsApp CTAs

3. **Gallery Components** (`src/components/gallery/`):
   - `PhotoGrid.tsx`: Responsive grid displaying gallery photos
   - `VideoGrid.tsx`: Embedded videos (YouTube/Vimeo or native HTML5)
   - `Lightbox.tsx`: Modal for full-size photo viewing with navigation (using library like yet-another-react-lightbox)
   - `GalleryFilters.tsx` (optional): Filter by year or media type

4. **Data Layer**:
   - `src/constants/event-data.ts`: Dates, venues, costs, schedules, contacts for 2026 events
   - `src/constants/history-data.ts`: Historical stats, past editions, mission text, organizer info
   - `src/constants/gallery-data.ts`: Array of gallery items with metadata:
     ```typescript
     {
       id: string,
       type: 'photo' | 'video',
       url: string,
       thumbnailUrl?: string,
       year: number,
       caption: string,
       altText: string
     }
     ```
   - `src/types/index.ts`: TypeScript interfaces (Event, GalleryItem, ContactPerson, etc.)

**Gallery Implementation:**
- Photo files stored in `public/images/gallery/` (optimized WebP format)
- Videos: Embed YouTube/Vimeo URLs or host locally in `public/videos/`
- Lightbox library (yet-another-react-lightbox or similar) integrated with Dialog component
- Lazy-load images as user scrolls to improve performance
- Responsive grid: 1 column mobile, 2-3 tablet, 3-4 desktop

**Styling Strategy:**
- Extend Tailwind config with custom folkloric color palette
- Configure shadcn/ui theme variables in `globals.css` to match custom palette
- Use Tailwind utility classes for spacing, layout, and responsive design
- Create CSS variables for brand colors in `globals.css`

**WhatsApp Integration:**
- Use `https://wa.me/5493794771606?text=` URL scheme with pre-encoded Spanish message
- Separate links for Angeles and Cacho with their respective numbers

**Content Strategy:**
- **Evergreen first**: Hero and History sections establish the brand's credibility and permanence
- **Timely second**: Upcoming 2026 events prominently featured but clearly dated
- **Proof third**: Gallery provides visual evidence of past success
- **Action last**: Registration and contact as final conversion points
- Data architecture supports easy annual updates by editing constant files

**Update Strategy for Future Editions:**
- To update for 2027: Edit `event-data.ts` with new dates/venues, update hero stats if needed
- Archive 2026 details in `history-data.ts` once events conclude
- Add new gallery items from 2026 to `gallery-data.ts`
- No code changes required for annual updates, only data file edits

### Alternatives Considered

1. **Multi-page site (separate pages per edition)**: Rejected. Content fits well in single scrolling experience. Would fragment brand narrative and make navigation more complex.

2. **CMS integration (Contentful, Sanity)**: Considered for easy content updates but rejected to reduce complexity and external dependencies. Editing constant files is sufficient for annual updates and keeps the stack simple.

3. **External gallery service (Flickr, Google Photos embed)**: Rejected in favor of self-hosted gallery for brand control, better UX, and no third-party dependencies.

4. **Backend for registration form**: Rejected per requirements. WhatsApp links are simpler and preferred by organizers for direct communication.

5. **Separate sections per edition**: Considered splitting Paso de la Patria and Mar del Plata into separate sections, but combining into one "Upcoming Editions" section is cleaner and emphasizes they're both part of the same brand.

### File Structure

**New Files to Create:**
```
src/app/layout.tsx
src/app/page.tsx
src/app/globals.css
src/app/favicon.ico
src/components/layout/Header.tsx
src/components/layout/Footer.tsx
src/components/sections/HeroSection.tsx
src/components/sections/HistorySection.tsx
src/components/sections/UpcomingEditionsSection.tsx
src/components/sections/ProgramSection.tsx
src/components/sections/GallerySection.tsx
src/components/sections/RegistrationSection.tsx
src/components/sections/ContactSection.tsx
src/components/gallery/PhotoGrid.tsx
src/components/gallery/VideoGrid.tsx
src/components/gallery/Lightbox.tsx
src/components/ui/*  (shadcn components: button, card, badge, separator, accordion, dialog, tabs)
src/lib/utils.ts
src/constants/event-data.ts
src/constants/history-data.ts
src/constants/gallery-data.ts
src/types/index.ts
public/images/gallery/*  (gallery photos from past editions)
public/images/branding/*  (logos, hero backgrounds)
tailwind.config.ts
components.json
tsconfig.json
next.config.js
package.json
.gitignore
```

**Modified Files:**
- None (greenfield project)

**Deleted Files:**
- None

## 6. Edge Cases and Risks

### Edge Cases

1. **Large gallery**: If gallery grows to hundreds of images, implement pagination or lazy-loading. Current plan: Load initial grid, lazy-load images as user scrolls.

2. **Video loading performance**: Embedded videos (especially YouTube) can slow page load. Use lazy iframe loading (`loading="lazy"`) and thumbnail previews that load full video on click.

3. **WhatsApp link not opening on desktop**: Desktop browsers sometimes don't handle `wa.me` links well. Provide fallback text: "Si el enlace no funciona, agrega este número a tu WhatsApp: +54 9 379 4771606"

4. **Gallery images missing or broken URLs**: Implement error handling with fallback placeholder image. Add validation to `gallery-data.ts` to catch broken URLs during development.

5. **Screen reader navigation in gallery**: Ensure lightbox modal is keyboard-accessible (Esc to close, arrow keys to navigate). Provide meaningful alt text for all images.

6. **Updating for future editions**: Document the process for updating `event-data.ts` for future years. Consider adding a "last updated" timestamp in footer.

7. **Long Spanish text on mobile**: Spanish can be verbose. Test all button labels, card headings, and accordion titles at small viewports. Use responsive text sizing and truncation where needed.

### Risks

1. **Color contrast compliance**: Warm, saturated colors (reds, golds) may fail WCAG contrast ratios on text. Must validate all text/background combinations and adjust if needed (e.g., darker text shades, lighter backgrounds).

2. **Gallery performance**: Many high-res images can degrade performance. Mitigate with:
   - Next.js Image optimization (automatic WebP conversion, responsive sizes)
   - Lazy loading images below the fold
   - Thumbnail images in grid, full-res only in lightbox
   - Set max image dimensions (e.g., 1200px wide for lightbox)

3. **Lightbox library dependency**: Third-party lightbox library could have compatibility issues or breaking changes. Mitigation: Choose well-maintained library (yet-another-react-lightbox) or build simple custom lightbox with shadcn Dialog if needed.

4. **Content updates by non-technical users**: Organizers may need to update event info but lack coding skills. Mitigation: Provide clear documentation for editing `event-data.ts` and `gallery-data.ts`. Consider simple UI for content editing in future spec if needed.

5. **Mobile performance on slower connections**: Gallery and hero images could be heavy on 3G/4G. Mitigation: Optimize all images, use responsive srcsets, lazy-load, consider blur placeholders.

6. **Browser compatibility**: Lightbox, smooth scroll, and modern CSS may not work on older browsers. Mitigation: Test on major browsers (Chrome, Firefox, Safari, Edge). Provide graceful degradation (e.g., standard links instead of smooth scroll on old browsers).

## 7. Boundaries

### Allowed (Implementing agent can do freely)

- Choose specific shadcn/ui components that fit the design (Button, Card, Accordion, Badge, Dialog, Tabs, etc.)
- Select a lightbox library for gallery (yet-another-react-lightbox, react-image-lightbox, or build custom with Dialog)
- Adjust spacing, padding, font sizes, and responsive breakpoints for visual balance
- Create additional micro-components (e.g., EventCard, ContactCard, StatsBadge, GalleryItem) for code reusability
- Add subtle animations or transitions (fade-in on scroll, hover effects, smooth scroll) to enhance UX
- Select Google Fonts or similar for headings and body text that match folkloric aesthetic
- Structure data files (`event-data.ts`, `history-data.ts`, `gallery-data.ts`) with logical groupings and TypeScript types
- Add sensible alt text for all images
- Configure ESLint and Prettier for code quality
- Optimize images (convert to WebP, resize for web)
- Choose video embed strategy (YouTube/Vimeo vs. native HTML5)
- Implement gallery filters (year, type) if it improves UX

### Ask First (Requires user approval)

- Adding analytics (Google Analytics, Vercel Analytics, etc.)
- Adding any third-party scripts or tracking beyond gallery/video libraries
- Adding animations libraries (Framer Motion, GSAP) if built-in CSS/Tailwind animations aren't sufficient
- Implementing a backend contact form instead of WhatsApp links
- Adding a CMS (Contentful, Sanity) for content management
- Adding authentication or admin panel for content updates
- Changing the fundamental layout structure (e.g., multi-page instead of single-page)
- Adding a language switcher (English/Spanish) - currently Spanish-only
- Deploying to production (Vercel, Netlify, etc.)
- Adding e-commerce or payment functionality

### Forbidden (Must never do)

- Create a backend, database, or API endpoints (out of scope)
- Implement payment processing or e-commerce functionality
- Modify the `.claude/settings.local.json` file
- Add test suites (per global CLAUDE.md rules: "Nunca ejecutes test")
- Make git commits without permission (per global rules)
- Generate additional documentation files beyond this spec (per global rules)
- Change event information (dates, costs, contacts) without user confirmation - always use exact data provided
- Modify or delete existing informacion/ directory contents (source documents)

## 8. Task Plan

### Task 1: Initialize Next.js Project and Install Dependencies
- Run `npx create-next-app@latest` with TypeScript, Tailwind CSS, App Router
- Initialize shadcn/ui: `npx shadcn-ui@latest init`
- Configure `components.json` with custom theme path and alias
- Install shadcn components: button, card, badge, separator, accordion, dialog, tabs
- Install lightbox library: `npm install yet-another-react-lightbox` (or chosen alternative)
- Verify dev server runs successfully

### Task 2: Configure Custom Theme, Design Tokens, and Project Structure
- Extend `tailwind.config.ts` with custom folkloric color palette (terracotta, red, gold, cream, warm grays)
- Update `src/app/globals.css` with CSS variables for shadcn/ui theme (primary, accent, background, text)
- Select and configure Google Fonts (Playfair Display for headings, Inter for body)
- Create directory structure: `components/sections/`, `components/gallery/`, `components/layout/`, `constants/`, `types/`
- Create TypeScript types in `src/types/index.ts` (Event, GalleryItem, ContactPerson, HistoricalEdition, etc.)

### Task 3: Create Data Layer (Constants Files)
- Create `src/constants/event-data.ts` with 2026 event details:
  - Paso de la Patria: dates, venue, schedule, costs, inclusions
  - Mar del Plata: dates, venue, costs, inclusions
  - Contacts (Angeles, Cacho)
  - Participant requirements
- Create `src/constants/history-data.ts` with:
  - Event history narrative
  - Key stats (19 editions, 600+ participants, countries)
  - Mission/objectives
  - Organizer information
- Create `src/constants/gallery-data.ts` with:
  - Array of gallery items (photos and videos from past editions)
  - Metadata: id, type, url, thumbnailUrl, year, caption, altText
- Ensure all data is typed according to `src/types/index.ts`

### Task 4: Build Layout Components (Header, Footer) and Root Layout
- Create `Header.tsx`: Sticky header with event branding and smooth scroll navigation to: Inicio, Historia, Próximas Ediciones, Programa, Galería, Inscripción, Contacto
- Create `Footer.tsx`: Organizer info, contact summary, social media links (Facebook), copyright, quick links
- Create `src/app/layout.tsx`: Root layout with Header, Footer, SEO meta tags (title, description, Open Graph), font configuration
- Create placeholder `src/app/page.tsx` that imports and renders section components (to be built in next tasks)

### Task 5: Build Hero and History Sections
- Create `HeroSection.tsx`:
  - Event title: "Encuentro Latinoamericano del Canto y las Danzas Folclóricas"
  - Tagline: "Argentina le canta y baila a Latinoamérica"
  - Visual: Folkloric gradient or hero image
  - Key stats badges: "19 Ediciones", "600+ Participantes", "Múltiples Países"
  - Primary CTA: "Próximas Ediciones 2026"
- Create `HistorySection.tsx`:
  - Section title: "Historia y Trayectoria"
  - Narrative text from `history-data.ts`
  - Visual stats display (19 editions, participants, non-competitive nature)
  - Organizer credits
  - Optional: Timeline of past editions (years/locations)
- Import and render both sections in `page.tsx`

### Task 6: Build Upcoming Editions, Program, and Registration Sections
- Create `UpcomingEditionsSection.tsx`:
  - Section title: "Próximas Ediciones 2026"
  - Two event cards (using shadcn Card):
    - 19º Encuentro - Paso de la Patria: Oct 9-12, venue, details
    - 20º Encuentro - Mar del Plata: Nov 19-22, venue, details
  - CTAs: "Ver Programa" and "Inscribirse"
- Create `ProgramSection.tsx`:
  - Section title: "Programa Paso de la Patria 2026"
  - Accordion with 4 items (Oct 9, 10, 11, 12), each showing daily schedule with timestamps
- Create `RegistrationSection.tsx`:
  - Section title: "Inscripción y Costos"
  - Pricing table: $280,000/person, $60,000 deposit
  - Inclusions lists for Paso de la Patria and Mar del Plata
  - Participant requirements (min 15 members, max 30 ballets, etc.)
  - Payment deadline: Nov 10, 2026
  - CTA: "Consultar e Inscribirse" (WhatsApp link)
- Import and render in `page.tsx`

### Task 7: Build Functional Gallery Section with Photos and Videos
- Create `PhotoGrid.tsx`:
  - Responsive grid layout (1 col mobile, 2-3 tablet, 3-4 desktop)
  - Map over photo items from `gallery-data.ts`
  - Use Next.js Image component for optimization
  - Lazy-load images
  - Click handler to open lightbox
- Create `VideoGrid.tsx`:
  - Responsive grid for video embeds
  - Embed YouTube/Vimeo videos or native HTML5 video
  - Lazy-load iframes
- Create `Lightbox.tsx`:
  - Integrate yet-another-react-lightbox (or chosen library)
  - Support keyboard navigation (arrow keys, Esc)
  - Display captions and metadata
- Create `GallerySection.tsx`:
  - Section title: "Galería"
  - Render PhotoGrid and VideoGrid components
  - Optional: Tabs to switch between Photos and Videos
  - Optional: Filters by year
- Import and render in `page.tsx`

### Task 8: Build Contact Section and WhatsApp Integration
- Create `ContactSection.tsx`:
  - Section title: "Contacto"
  - Two contact cards (shadcn Card):
    - Angeles Bernachea: +54 9 379 4771606, aangelesber@hotmail.com
    - Cacho Bernachea: +54 9 379 4676554, las3marias1@hotmail.com
  - WhatsApp CTA buttons with pre-filled messages:
    - URL: `https://wa.me/5493794771606?text=Hola!%20Me%20interesa%20participar%20en%20el%20Encuentro%20Latinoamericano%202026.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.`
  - Fallback text: "Si el enlace no funciona, agrega este número: ..."
  - Facebook link: "Encuentro Latinoamericano del Canto y las Danzas Folclóricas"
- Import and render in `page.tsx`

### Task 9: Implement Responsive Design, Accessibility, and Performance Optimization
- Test responsive behavior at mobile (320px+), tablet (768px+), desktop (1024px+)
- Verify color contrast ratios meet WCAG AA standards (adjust colors if needed)
- Add semantic HTML landmarks (`<nav>`, `<main>`, `<section>`, `<article>`) and proper heading hierarchy (h1 → h2 → h3)
- Ensure keyboard navigation works for all interactive elements (smooth scroll, gallery, lightbox)
- Add meaningful alt text to all images (especially gallery)
- Optimize images: convert to WebP, generate responsive srcsets with Next.js Image
- Lazy-load gallery images and video embeds
- Test WhatsApp links on mobile and desktop browsers

### Task 10: Final Polish, SEO, and Verification
- Add comprehensive SEO meta tags in `layout.tsx`:
  - Title: "Encuentro Latinoamericano del Canto y las Danzas Folclóricas"
  - Description: "Evento cultural de 19 ediciones que reúne a 600+ participantes de Argentina y Latinoamérica en celebración del canto y las danzas folclóricas."
  - Open Graph tags for social sharing (og:title, og:description, og:image)
- Add favicon and branding assets to `public/images/branding/`
- Verify all event data accuracy against source documents (informacion/ directory)
- Perform final visual QA: spacing consistency, typography hierarchy, color harmony
- Verify smooth scroll navigation works correctly between all sections
- Test on multiple devices and browsers (Chrome, Firefox, Safari, mobile browsers)
- Verify gallery lightbox keyboard accessibility
- Document update process for future editions in README or comments
