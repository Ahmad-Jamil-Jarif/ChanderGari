# ChanderGari — Design Document

> **Your journey, perfectly mapped out.**
>
> An AI-powered travel planning application with an interactive 3D experience, multi-mode AI assistance, and comprehensive offline fallback.

---

## 1. Product Overview

ChanderGari is a web-based travel planning assistant that combines a Gemini-powered AI backend with a 3D interactive landing experience. The app targets travelers who want a single place to:

- Plan multi-day itineraries with budget awareness.
- Chat with an AI tour guide that can use Google Search and Maps grounding.
- Generate and edit travel-themed images and videos in a creative studio.
- Analyze uploaded travel media for context, location hints, and inspiration.
- Track plans, expenses, and journeys over time.

The product is engineered to **degrade gracefully**: when a Gemini API key is absent or quotas are exhausted, every feature seamlessly falls back to a local simulation dataset that produces realistic, on-brand results.

---

## 2. Core Functional Requirements

### 2.1 Travel Itinerary Planner
- Generate a day-by-day itinerary for any destination.
- Inputs: destination, duration (days), budget type (`budget` | `standard` | `luxury`), optional max budget.
- Optional grounding: enable Google Search and Google Maps for live references.
- Outputs: per-day title, ordered activity list, optional grounding links, and Maps URLs.
- Plans can be saved to the Journey Tracker.

### 2.2 AI Tour Guide (Chat)
- Free-form chat with the assistant about travel topics.
- Three reasoning modes selectable by the user:
  - **Fast** — lowest latency, brief responses.
  - **Balanced** — default; depth vs. speed tradeoff.
  - **Thinking** — extended reasoning trace with `thinking` text returned alongside the answer.
- Optional grounding: web search and Maps for location-aware answers.
- Latency is measured and shown per message; message history supports user/assistant roles with timestamps.

### 2.3 Creative Studio
- **Image generation** with configurable aspect ratio, size, and a `studioQuality` flag.
- **Video generation** with two aspect ratios (`16:9`, `9:16`) and optional starting image.
  - Asynchronous long-running operation polled to completion; result served through a server proxy.
- **Edit** existing generated media via text prompt.
- Gallery of past generations per medium.

### 2.4 Media Analyzer
- Upload a travel photo or short video.
- Receive a structured analysis (location cues, scene description, suggested captions, travel tips).
- Results are stored alongside the uploaded media preview.

### 2.5 Budget Advisor
- Submit a budget scenario (destination, duration, total budget, budget type).
- Receive a category-wise allocation recommendation (accommodation, transport, food, activities, shopping, other) with per-item tips.
- Export recommendations into an Expense list attached to a Travel Plan.

### 2.6 Journey Tracker
- Persistent list of saved Travel Plans with destination, duration, budget type, total spend, and created date.
- Each plan exposes its itinerary, expense ledger, notes, and grounding links.
- Edit / delete plans; ledger updates reflect in real time.

### 2.7 Authentication
- Email + password sign-in / sign-up with client-side validation.
- Errors surface inline (e.g. invalid credentials, validation messages).
- Authenticated session unlocks the planner workspace; the landing page is the public surface.

### 2.8 Offline / Simulation Mode
- Every AI-backed feature (itinerary, chat, image gen, video gen, media analysis, budget) has a matching simulation entry in `src/simulationData.ts`.
- Server returns simulation responses when `GEMINI_API_KEY` is missing or upstream calls fail.
- User experience must be indistinguishable from the live path other than the absence of grounding URLs and slower streaming cadence.

---

## 3. Technical Architecture

### 3.1 Stack
- **Frontend**: React 19 + TypeScript, Vite 6, Tailwind CSS 4, Motion.js (animations), Lucide icons.
- **Backend**: Node.js + Express 4 (TypeScript) with Vite middleware in dev.
- **AI**: `@google/genai` SDK for Gemini, Search, and Maps grounding.
- **Persistence**: Firebase (auth + Firestore) — see `firebase` dependency.
- **Bundling**: Vite for client, `esbuild` for the server bundle to `dist/server.cjs`.

### 3.2 Project Layout
```
ChanderGari/
├── server.ts                # Express server, Vite middleware, AI proxy routes
├── index.html               # Vite entry
├── vite.config.ts           # Vite + Tailwind config
├── tsconfig.json            # TS project settings
├── metadata.json            # App metadata + capabilities
├── .env.example / .env.local# GEMINI_API_KEY, APP_URL
└── src/
    ├── main.tsx             # React entry
    ├── App.tsx              # Main app shell, routing, state
    ├── index.css            # Tailwind layers + globals
    ├── types.ts             # Shared TypeScript types
    ├── simulationData.ts    # Offline fallback datasets
    └── components/
        └── LandingPage.tsx  # Public 3D landing experience
```

### 3.3 Server Responsibilities (`server.ts`)
- Vite dev middleware + static serving of `dist/` in production.
- Proxy endpoints for Gemini calls (chat, itinerary, image, video, media analysis) so the API key never leaves the server.
- Simulation fallback for each endpoint when AI is unavailable.
- Firebase admin / token verification hooks for auth-protected routes.

### 3.4 Data Model (`src/types.ts`)
- `GroundingChunk` — web / maps citation fragment.
- `ExpenseItem` — id, description, category, amount, date.
- `TravelDestination` — id, name, description, image.
- `ItineraryItem` — day, title, activities[].
- `TravelPlan` — id, destination, durationDays, budgetType, maxBudget?, expenses?, itinerary, notes?, groundingUrls?, mapsUrls?, createdAt.
- `GeneratedImage` — id, prompt, imageUrl, ratio, size, studioQuality, createdAt.
- `GeneratedVideo` — id, operationName, prompt, aspectRatio, videoUrl?, status, createdAt, hasStartingImage.
- `MediaAnalysisResult` — id, mediaType, mediaName, previewUrl, analysis, createdAt.
- `ChatMessage` — id, sender, text, timestamp, thinking?, latencyMs?, groundingUrls?.

---

## 4. User Experience Design

### 4.1 Landing Page (`LandingPage.tsx`)
The landing page is the public face of ChanderGari. It contains the authentication flow and a 3D hero canvas that communicates the travel brand.

**Goals**
- Establish the "perfectly mapped out journey" brand promise in under five seconds.
- Allow the user to sign in or sign up without leaving the page.
- Showcase the product's value through interactive visuals.

**Information Architecture**
- **Top bar**: brand mark, theme toggle (sun/moon), quick "Get Started" anchor.
- **Hero section**: 3D globe with flight arcs + headline + auth card overlay.
- **Feature highlights**: Itinerary, AI Guide, Creative Studio, Media Analyzer, Budget Advisor, Journey Tracker — each with icon, headline, one-line benefit.
- **Footer**: secondary links, contact mailto, social placeholders.

### 4.2 3D Background Canvas
A self-contained `<canvas>` rendered behind the landing page, implemented in pure 2D math for performance.

**Elements**
- **Wireframe globe** — `latLines × lngLines` mesh of points projected from 3D to 2D each frame.
- **Flight arcs** — 5 procedurally generated great-circle-ish paths with animated progress and trailing glow.
- **Star field** — subtle ambient particles for depth.
- **Mouse parallax** — mouse position biases the camera around the globe's center for a tactile feel.

**Behavior**
- Responds to window resize (radius and dimensions recompute).
- Animation loop pauses via `requestAnimationFrame` and is teardown-safe.
- Adapts to dark / light theme by switching color tokens.
- Performance budget: ≤ 1 ms per frame on mid-range laptops; degrades by reducing `latLines`/`lngLines` if needed.

### 4.3 Auth Card
- Email + password inputs with show/hide toggle.
- Submit button with loading state and disabled-while-submitting.
- Inline error banner above the form; field-level validation messages below inputs.
- Tabs or toggle to switch between Sign In and Sign Up without leaving the card.

### 4.4 Theme
- Light and Dark variants with a single `darkMode` boolean lifted to the top of the app.
- Theme affects: background gradient, card surfaces, text contrast, and 3D canvas palette.
- Sun / moon icon button in the top bar.

### 4.5 Planner Workspace
After authentication, the user lands in a multi-tab workspace:
- **Plan**: itinerary form + generated plan view.
- **Chat**: AI tour guide with mode selector and grounding toggles.
- **Studio**: image + video generation panels.
- **Analyze**: upload + result pane.
- **Budget**: scenario form + recommendation breakdown.
- **Tracker**: saved plans list + plan detail drawer.

### 4.6 Motion & Feedback
- Page transitions use Motion.js fade + slight Y translate.
- Loading states use skeleton blocks (no spinners where avoidable).
- Error states use a single inline alert with optional retry.
- Chat responses stream or render with a typed-text effect for `Balanced` / `Thinking` modes.

---

## 5. API Design (Server Proxy)

All AI calls live behind Express routes so the API key stays server-side and Firebase auth tokens can be verified per request.

| Method | Path                              | Purpose                                  |
|--------|-----------------------------------|------------------------------------------|
| POST   | `/api/itinerary`                  | Generate a travel itinerary              |
| POST   | `/api/chat`                       | Tour guide chat (with mode + grounding)  |
| POST   | `/api/image`                      | Generate an image                        |
| POST   | `/api/image/edit`                 | Edit a generated/uploaded image          |
| POST   | `/api/video`                      | Start a video generation operation       |
| GET    | `/api/video/:operationName`       | Poll a video operation                   |
| GET    | `/api/video/:operationName/file`  | Stream the finished video                |
| POST   | `/api/analyze`                    | Analyze uploaded media                   |
| POST   | `/api/budget`                     | Generate a budget recommendation         |

Every route:
1. Verifies the request body against the shared TypeScript types.
2. Tries the live Gemini call.
3. On failure (missing key, quota, network) returns the matching simulation payload with a 200 + an `X-Source: simulation` header.

---

## 6. Visual Design System

### 6.1 Tokens
- **Color**: sky-blue primary, sunset orange accent, neutral surface, semantic success / warning / error.
- **Typography**: a single sans-serif family with three sizes for display / heading / body. Numeric tabular for budget tables.
- **Spacing**: Tailwind default scale (4 px base).
- **Radius**: `rounded-2xl` for cards, `rounded-full` for chips and toggle buttons.
- **Shadow**: soft elevation for cards, stronger elevation for modals and the auth card.

### 6.2 Iconography
- Lucide React across the entire app for a consistent stroke style.
- Each top-level feature gets a single hero icon: `Plane`, `MapPin`, `DollarSign`, `Sparkles`, `Calendar`, `Shield`, `Compass`, `TrendingUp`, `Sliders`, `Users`.

### 6.3 Empty, Loading, Error
- **Empty**: friendly illustration + one-line description + primary CTA.
- **Loading**: skeletons sized to the eventual content; no spinners.
- **Error**: red-tinted surface, two-line message, retry button.

---

## 7. Accessibility

- All interactive controls reachable by keyboard with visible focus rings.
- Form fields paired with labels and `aria-describedby` for help text.
- Color contrast ≥ WCAG AA in both light and dark themes.
- `prefers-reduced-motion` respected — disable 3D canvas orbit / parallax and replace with a static gradient.
- Icon-only buttons have `aria-label`.

---

## 8. Performance Targets

- **Landing page** First Contentful Paint ≤ 1.5 s on cable connection.
- **3D canvas** holds 60 fps on a 2020 MacBook Air, ≥ 30 fps on integrated graphics.
- **Itinerary / chat responses** begin streaming ≤ 800 ms after submit in `Balanced` mode.
- **Video generation** operations return a polling handle ≤ 1 s; UI handles minute-long polls without blocking.

---

## 9. Security & Privacy

- `GEMINI_API_KEY` is read from `.env.local` and used **only** on the server.
- Client never receives the API key; all AI calls go through Express.
- Firebase tokens are verified server-side before accessing user-scoped endpoints.
- Uploaded media is processed transiently; only analysis metadata and the preview URL are stored.
- No third-party trackers; analytics opt-in only.

---

## 10. Configuration

Environment variables (see `.env.example`):
- `GEMINI_API_KEY` — Optional. Enables live AI; absent → offline simulation.
- `APP_URL` — Optional. Public URL of the deployment, used for callbacks.

`metadata.json` declares:
- `name`: `ChanderGari`
- `description`: `Your journey, perfectly mapped out.`
- `requestFramePermissions`: `geolocation` (used by Maps grounding)
- `majorCapabilities`: `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`

---

## 11. Roadmap

| Phase | Scope                                                                       |
|-------|-----------------------------------------------------------------------------|
| v0.1  | Landing page + 3D canvas + auth shell. *(current)*                          |
| v0.2  | Itinerary planner + Journey Tracker (Firestore persistence).               |
| v0.3  | AI Tour Guide chat with mode selector + grounding.                          |
| v0.4  | Creative Studio: image gen + edit, video gen with async poll.              |
| v0.5  | Media Analyzer + Budget Advisor.                                            |
| v0.6  | Polish: a11y audit, perf pass, dark mode refinements, PWA install prompt.   |
| v0.7  | Social: shareable plan links, collaborative editing, export to PDF.         |

---

## 12. Open Questions

- Should the 3D canvas be replaced with a Three.js globe for higher fidelity, or kept in 2D for performance?
- Do we want a mobile-first design pass for the planner workspace, or is desktop the primary surface?
- Should Journey Tracker plans sync to the user's Google account (Calendar + Drive export)?

---

*Maintained alongside `src/App.tsx` and `src/components/LandingPage.tsx`. Update this document whenever the user-facing surface, data model, or server contract changes.*
