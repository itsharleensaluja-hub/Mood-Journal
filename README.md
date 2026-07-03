# MindPulse — The Living Archive

> Your emotional journal as a physical writer's study — no cards, no graphs, no dashboards. Notebooks, pressed flowers, ink vials, and a growing terrarium.

**Live:** [mood-journal-e07b03q74-harleen.vercel.app](https://mood-journal-e07b03q74-harleen.vercel.app)

---

## The Experience

**3 routes, 3 spaces:**

| Route | Space | Experience |
|---|---|---|
| `/dashboard` | **Notebook** | Two-page spread — press a flower for your mood, write by hand, watch your ink vial rise and your streak ribbon grow |
| `/analytics` | **Archive** | Cabinet of artifacts — pressed flower calendar, SVG emotional landscape (topographical terrain of your moods, no charts) |
| `/reflection` | **Desk** | Write a letter, receive AI marginalia in reply, breathe with a candle, set tomorrow's intention + generative ambient soundscape |

**Signature interactions:**
- **The Unveiling** — landing page shows a closed leather journal that opens ceremonially on click (CSS 3D rotateY)
- **Voice journaling** — mic button on journal page, speech-to-text via Web Speech API (Chrome)
- **Generative soundscapes** — vintage gramophone on the desk that plays ambient audio generated from your mood via Web Audio API
- **Emotional Landscape** — pure SVG terrain replaces bar/line/doughnut charts entirely
- **The Unbound Frame** — custom brand logo (broken-corner rectangle, 5 sizes, 4 variants)

---

## Why this isn't a mood tracker

Every element treats emotions as physical artifacts, not data points:
- Pressed flowers instead of mood selector chips
- Ribbon bookmarks instead of nav bars
- Ink vial instead of balance score
- Specimen cabinet instead of analytics dashboard
- Deckled-edge paper dividers instead of separators
- Handwriting font (Caveat) + typewriter font (Courier Prime)
- Desk lamp + terrarium + candle + gramophone as ambient decoration

**Zero Chart.js, zero data visualization libraries** — all visuals are hand-crafted SVG and CSS.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Routing | react-router-dom v7 |
| Animation | framer-motion |
| Styling | Tailwind CSS v4 |
| Build | Vite 8 |
| Lint | Oxlint |
| Fonts | Caveat (handwriting), Courier Prime (typewriter) |
| Audio | Web Audio API (soundscapes) |
| Speech | Web Speech API (voice journaling) |
| Storage | localStorage only |
| AI | Template-based with offline fallback |

---

## Getting Started

```bash
# install
npm install

# dev
npm run dev

# build
npm run build

# preview production build
npm run preview

# lint
npm run lint
```

---

## Project Structure

```
src/
├── components/
│   ├── archive/        Notebook, PageSpread, PressedFlower, DeskLamp,
│   │                   ArtifactCard, RibbonMarker, LeatherTabNav
│   ├── landing/        Hero, ClosedJournalCover, FountainPen, Features
│   ├── layout/         Layout, Navbar, MobileNav, HeroGreeting
│   ├── ui/             JournalPage, EntryPages, RibbonStreak, InkVial,
│   │   │               ArchiveFlowerSelector, RibbonTimeline, DeskTerrarium,
│   │   │               MarginaliaInsight, SoundscapePhonograph, analytics/
│   │   └── reflection/ ReflectionEntry, AiResponse, BreathingExercise, GoalInput
│   └── common/         GlassCard, Button, Modal
├── pages/              HomePage, AnalyticsPage, ReflectionPage, LandingPage
├── context/            JournalContext, ThemeContext
├── data/               moods, affirmations, constants
├── hooks/              useLocalStorage, useAnimatedCounter
├── utils/              statsCalculators, aiEngine, animations
└── index.css           Design tokens, animations, utility classes
```

---

## Routes

| Path | Page | What it is |
|---|---|---|
| `/` | Landing | Desk scene with closed journal + unveiling, features as specimen artifacts, AI marginalia flow |
| `/dashboard` | Notebook | Two-page spread — mood selector (flowers), journal (with voice), streak, ink vial, timeline, past entries |
| `/analytics` | Archive | Stat cards, pressed flower calendar, emotional landscape (SVG terrain), emotion tags, monthly score |
| `/reflection` | Desk | Reflection entry (letter), AI marginalia response, breathing candle, intention card, quote, soundscape |
