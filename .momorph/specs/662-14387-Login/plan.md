# Implementation Plan: Login

**Frame**: `662:14387-Login`
**Date**: 2026-03-09
**Spec**: `specs/662-14387-Login/spec.md`

---

## Summary

Implement the Login page for the SAA 2025 application — the sole entry point for unauthenticated users. The page features a dark-themed hero layout with full-screen background image, gradient overlays, "ROOT FURTHER" branding, and a single Google OAuth login button via Supabase Auth (redirect-based flow). Includes a shared Header component with language selector, a Footer with copyright, and responsive support across mobile/tablet/desktop breakpoints.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS v4, @supabase/ssr, @supabase/supabase-js
**Database**: Supabase (PostgreSQL) — no schema changes needed for login
**Testing**: Vitest + React Testing Library (to be added)
**State Management**: React local state (`useState`) — no global state library needed
**API Style**: Supabase SDK (signInWithOAuth) + Next.js route handler for callback

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions — `kebab-case` routes, `PascalCase` components, single responsibility, `@/*` imports
- [x] Uses approved libraries and patterns — Supabase Auth, Next.js App Router, TailwindCSS utilities, `next/image`, `next/font/google`
- [x] Adheres to folder structure guidelines — `src/app/`, `src/components/`, `src/libs/supabase/`
- [x] Meets security requirements — Supabase Auth (no custom tokens), no secrets in client bundle, OWASP compliance
- [x] Follows testing standards — TDD (Red-Green-Refactor), integration tests for each user story

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| Add `vitest` + `@testing-library/react` | Constitution requires TDD; no test framework currently exists in project | Jest — Vitest is faster, ESM-native, better Next.js integration |
| Add `@testing-library/user-event` | Required for simulating user interactions in component tests | Manual DOM event dispatching — less maintainable |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — Login-specific components co-located in `src/app/login/`, shared components (Header, Footer) in `src/components/`
- **Styling Strategy**: TailwindCSS v4 utility classes directly in JSX. Custom CSS variables in `globals.css` for design tokens (colors, fonts). No `@apply`.
- **Data Fetching**: Server Component for session check (redirect if authenticated), Client Component for login button interaction
- **Font Loading**: Replace Geist fonts with Montserrat (weights: 500, 700) and Montserrat Alternates (weight: 700) via `next/font/google` in root layout. Weight 500 is required for error message text (`--text-error`). Include `subsets: ['latin', 'vietnamese']` for Vietnamese content.
- **Image Optimization**: `next/image` with `fill` + `priority` for background (LCP), standard `next/image` for logos/icons

### Backend Approach

- **Auth Flow**: Supabase `signInWithOAuth({ provider: 'google' })` with redirect (not popup)
- **Callback Handler**: `/api/auth/callback` route handler to exchange auth code for session via `supabase.auth.exchangeCodeForSession()`
- **Middleware**: Root `middleware.ts` using `src/libs/supabase/middleware.ts` to refresh sessions on every request and protect routes

### Integration Points

- **Existing Services**: `src/libs/supabase/client.ts` (browser client for OAuth), `src/libs/supabase/server.ts` (session check), `src/libs/supabase/middleware.ts` (session refresh)
- **Shared Components**: `<Header>` — reusable across pages (instance `186:1602`). `<Footer>` — reusable across pages.
- **External**: Supabase Auth (Google OAuth provider), Google OAuth consent screen

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/662-14387-Login/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── assets/              # Reference screenshots
```

### Source Code (affected areas)

```text
src/
├── app/
│   ├── layout.tsx                    # MODIFY — Replace Geist with Montserrat fonts, update metadata title/description
│   ├── globals.css                   # MODIFY — Remove Geist CSS vars, add login design tokens (colors, shadows)
│   ├── page.tsx                      # MODIFY — Replace default Next.js template with homepage placeholder (authenticated users land here; unauthenticated users are redirected to /login by middleware)
│   ├── login/
│   │   ├── page.tsx                  # NEW — Login page Server Component (session check + redirect if authenticated, wraps LoginClient in Suspense)
│   │   ├── loading.tsx               # NEW — Login route loading UI (per constitution Principle II)
│   │   ├── error.tsx                 # NEW — Login route error boundary (per constitution Principle II)
│   │   ├── LoginClient.tsx           # NEW — Login page Client Component ("use client" — renders full layout, handles OAuth state)
│   │   └── LoginButton.tsx           # NEW — Google OAuth login button with 6 states (co-located: login-specific, not reused)
│   └── api/
│       └── auth/
│           └── callback/
│               └── route.ts          # NEW — OAuth callback: exchange code for session, redirect to `next` param or `/`
├── components/
│   ├── Header.tsx                    # NEW — Shared header: Server Component shell (logo + LanguageSelector slot, reused across pages)
│   ├── Footer.tsx                    # NEW — Shared footer: Server Component (copyright text, no interactivity)
│   └── LanguageSelector.tsx          # NEW — "use client" — Language dropdown trigger with click/keyboard handlers and aria-expanded state
├── components/icons/
│   ├── GoogleIcon.tsx                # NEW — Google logo SVG component (24x24)
│   ├── VnFlagIcon.tsx                # NEW — Vietnam flag SVG component (24x24)
│   └── ChevronDownIcon.tsx           # NEW — Chevron down SVG component (24x24)
├── libs/
│   └── supabase/
│       ├── client.ts                 # EXISTS — No changes
│       ├── server.ts                 # EXISTS — No changes
│       └── middleware.ts             # EXISTS — No changes
├── hooks/
│   └── useAuth.ts                    # NEW — Hook for auth error parsing from URL search params
├── types/
│   └── auth.ts                       # NEW — Auth-related types (AuthError, LoginState)
└── middleware.ts                      # NEW — Root middleware: session refresh + route protection (/login ↔ protected routes)

# Test files (co-located with source per constitution)
src/app/login/__tests__/
├── LoginButton.test.tsx              # NEW — LoginButton unit tests
├── LoginClient.test.tsx              # NEW — LoginClient integration tests
└── page.test.tsx                     # NEW — Login page server component tests
src/app/api/auth/callback/__tests__/
└── route.test.ts                     # NEW — OAuth callback route unit tests (code exchange, missing code, open redirect prevention)
src/components/__tests__/
├── Header.test.tsx                   # NEW — Header unit tests
├── Footer.test.tsx                   # NEW — Footer unit tests
└── LanguageSelector.test.tsx         # NEW — LanguageSelector unit tests
src/hooks/__tests__/
└── useAuth.test.ts                   # NEW — useAuth hook tests (error parsing, redirectTo extraction, loading state)
src/__tests__/
└── middleware.test.ts                # NEW — Root middleware tests (auth redirect, session refresh, route protection)

# Config
vitest.config.ts                      # NEW — Vitest config (jsdom, @/* alias, setup file)
vitest.setup.ts                       # NEW — Test setup: imports @testing-library/jest-dom
package.json                          # MODIFY — Add test scripts ("test", "test:run", "test:watch")

public/
└── images/
    └── login/
        ├── saa-logo.png              # NEW — Header logo (52x48)
        ├── root-further.png          # NEW — Hero key visual (451x200)
        └── bg-keyvisual.webp         # NEW — Background image (full-screen)
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vitest` | ^3.x | Unit/integration test runner (TDD requirement) |
| `@testing-library/react` | ^16.x | React component testing utilities |
| `@testing-library/user-event` | ^14.x | User interaction simulation |
| `@vitejs/plugin-react` | ^4.x | React support for Vitest |
| `@testing-library/jest-dom` | ^6.x | DOM matchers (toBeInTheDocument, toHaveAttribute, etc.) |
| `jsdom` | ^26.x | DOM environment for Vitest |

---

## Implementation Strategy

### Phase 0: Asset Preparation & Project Setup

1. Download all media assets from MoMorph using `get_media_files` tool:
   - SAA Logo (`I662:14391;178:1033;178:1030`) → `public/images/login/saa-logo.png`
   - ROOT FURTHER (`2939:9548`) → `public/images/login/root-further.png`
   - Google Icon (`I662:14426;186:1766`) → inline SVG component
   - VN Flag (`I662:14391;186:1696;186:1821;186:1709`) → inline SVG component
   - Chevron Down (`I662:14391;186:1696;186:1821;186:1441`) → inline SVG component
   - Background Image (`662:14388`) → `public/images/login/bg-keyvisual.webp`
2. Create SVG icon components in `src/components/icons/`:
   - `GoogleIcon.tsx` — extracted from downloaded SVG asset
   - `VnFlagIcon.tsx` — extracted from downloaded SVG asset
   - `ChevronDownIcon.tsx` — extracted from downloaded SVG asset
   - Each component accepts `className` prop for sizing via Tailwind (`w-6 h-6`)
3. Install test dependencies: `yarn add -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom @vitejs/plugin-react jsdom`
4. Create `vitest.config.ts`:
   - `environment: 'jsdom'`
   - `resolve.alias: { '@': path.resolve('./src') }` (match tsconfig `@/*`)
   - `plugins: [react()]` for JSX support
   - `globals: true` for describe/it/expect without imports
   - `setupFiles: ['./vitest.setup.ts']` — setup file imports `@testing-library/jest-dom` for DOM matchers
5. Create `vitest.setup.ts`:
   - `import '@testing-library/jest-dom'` — extends expect with DOM matchers
6. Add test scripts to `package.json`: `"test": "vitest"`, `"test:run": "vitest run"`, `"test:watch": "vitest --watch"`
7. Update `globals.css` — remove Geist CSS variables, add login design tokens (colors, shadows from design-style.md)
8. Update `layout.tsx`:
   - Replace Geist fonts with `Montserrat({ weight: ['500', '700'], subsets: ['latin', 'vietnamese'] })` and `Montserrat_Alternates({ weight: ['700'], subsets: ['latin', 'vietnamese'] })`
   - Apply CSS variables `--font-montserrat` and `--font-montserrat-alternates` to body
   - Update metadata: title "SAA 2025", description for Sun Annual Awards

### Phase 1: Foundation (Infrastructure)

1. Create root `middleware.ts`:
   - Call `createClient(request)` from `src/libs/supabase/middleware.ts` to refresh session
   - Call `supabase.auth.getUser()` to check authentication
   - If user is NOT authenticated AND path is NOT `/login` or `/api/auth/callback` → redirect to `/login?redirectTo={originalPath}` (CREATE the `redirectTo` param from the requested path so the user returns there after login)
   - If user IS authenticated AND path IS `/login` → redirect to `/`
   - Configure `matcher` to exclude static files (`/_next/`, `/images/`, `/favicon.svg`)
2. Create `/api/auth/callback/route.ts`:
   - Extract `code` param from URL search params
   - Extract `next` param (defaults to `/`) for post-login redirect destination
   - If `code` is missing (user cancelled OAuth): redirect to `/login` without error params (US1 Scenario 2)
   - If `code` exists: call `supabase.auth.exchangeCodeForSession(code)` using server client created with cookies from the request
   - On success: redirect to `next` URL (validate it starts with `/` and does not contain `//` to prevent open redirect — OWASP compliance)
   - On error: redirect to `/login?error=auth_error&error_description={encodeURIComponent(message)}`
3. Create TypeScript types (`src/types/auth.ts`):
   - `LoginState`: `{ isLoading: boolean; error: string | null }`
   - `AuthCallbackParams`: `{ code?: string; next?: string; error?: string; error_description?: string }`

### Phase 2: Core Features — US1 Google OAuth Login (P1) + US3 View Login Page (P1)

**TDD approach: Write tests first → implement → refactor**

1. Create `<LoginButton>` component (`src/app/login/LoginButton.tsx`):
   - Test: renders button text "LOGIN With Google" + GoogleIcon SVG
   - Test: button has `aria-label="Login with Google"`
   - Test: calls `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '${origin}/api/auth/callback?next=${redirectTo}' } })` on click — `redirectTo` is read from URL search params (defaults to `/`), `origin` is `window.location.origin` (Supabase requires absolute URL)
   - Test: shows loading state ("Logging in..." + spinner 16px + disabled + opacity 0.7)
   - Test: displays error message when `error` prop is set
   - Test: error message has `role="alert"` and uses `#EF4444` color
   - Test: error dismisses when button is clicked again (new attempt clears error)
   - Test: button is disabled (`pointer-events: none`) during loading
   - Implement with all 6 states (default, hover, focus, active, disabled, loading) per design-style.md B.3_Login

2. Create `<Header>` component (`src/components/Header.tsx` — Server Component):
   - Test: renders logo image (SAA logo, 52x48px)
   - Test: renders `<LanguageSelector>` child with "VN" text
   - Test: has correct styling (semi-transparent bg `rgba(11,15,18,0.8)`, h-20, px-36, flex justify-between)
   - Implement as Server Component shell — only `<LanguageSelector>` is "use client" (interactive child)

3. Create `<Footer>` component:
   - Test: renders copyright text "Bản quyền thuộc về Sun* © 2025"
   - Test: uses Montserrat Alternates font
   - Test: has top border
   - Implement with correct typography

4. Create `<LanguageSelector>` component (`src/components/LanguageSelector.tsx` — `"use client"`):
   - Test: renders VnFlagIcon (24x24) + "VN" text + ChevronDownIcon (24x24)
   - Test: has `aria-label="Select language"`
   - Test: has `aria-expanded="false"` by default
   - Test: keyboard accessible (Enter/Space toggles `aria-expanded`)
   - Test: click toggles `aria-expanded` state
   - Implement as "use client" trigger button (has click/keyboard handlers + local state for `isOpen`/`aria-expanded`). Dropdown panel deferred to frame `721:4942`.

5. Create Login page and route files:
   - `src/app/login/loading.tsx`: Minimal loading skeleton — dark background (`#00101A`) full screen (matches page bg so transition is seamless)
   - `src/app/login/error.tsx`: Error boundary with "use client" — displays generic error message with retry button, dark theme
   - `src/app/login/page.tsx` (Server Component): Check session via `createClient()` from `src/libs/supabase/server.ts`, call `supabase.auth.getUser()`, if authenticated `redirect('/')`. Wrap `<LoginClient>` in `<Suspense fallback={...}>` (required for `useSearchParams()` in Next.js 15). Pass search params to client component.
   - `src/app/login/LoginClient.tsx` (Client Component, `"use client"`): Renders full page layout — background image + gradient overlays (z-index 0, 1, 2) + `<Header>` (z-index 10) + hero section (z-index 5) with key visual + text + `<LoginButton>` + error message + `<Footer>` (z-index 5). Uses `useAuth` hook which reads `error`/`error_description`/`redirectTo` from URL search params via `useSearchParams()`. **IMPORTANT**: Must be wrapped in `<Suspense>` boundary in page.tsx because `useSearchParams()` requires it in Next.js 15.

6. Create `useAuth` hook (`src/hooks/useAuth.ts`):
   - Parse `error`, `error_description`, and `redirectTo` from URL search params via `useSearchParams()`
   - Manage `isLoading` state (set true on button click, false on page focus/return via `visibilitychange` event)
   - Return `{ isLoading, error, redirectTo, setIsLoading, clearError }`
   - `clearError`: sets error to null (called before each login attempt per FR-009)
   - `redirectTo`: passed to LoginButton for OAuth redirect destination (defaults to `/`)

### Phase 3: Extended Features — US2 Language Selection (P2)

1. Language selector trigger button (already created in Phase 2 via `<LanguageSelector>`)
   - Ensure `aria-expanded` state toggles correctly
   - Ensure keyboard support: Enter/Space toggles, Escape closes
   - Dropdown panel rendering and language switching logic is **deferred** to frame `721:4942` spec
2. **Deferred to `721:4942` spec**: Dropdown panel, language switching, cookie-based language persistence
   - This phase only validates the trigger button works correctly in isolation

### Phase 4: Polish & Accessibility

1. Responsive layout:
   - Mobile (<768px): reduced padding, smaller logo/key visual, full-width button
   - Tablet (768-1023px): medium padding, scaled key visual
   - Desktop (>=1024px): Figma values as-is
2. Background image fallback (`#00101A` solid color)
3. Keyboard navigation: Tab through header → login button
4. Focus states on all interactive elements
5. Button hover/active transitions (150ms ease-in-out)
6. Error message animation (200ms ease-in opacity)
7. `next/image` with `priority` for background (LCP)
8. Verify WCAG AA color contrast

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Background image too large for 3G (TR-003) | Medium | High | WebP format, `next/image` optimization, progressive loading |
| Supabase OAuth callback mismatch in dev/prod | Medium | High | Configure redirect URLs in Supabase dashboard: local `http://localhost:3000/api/auth/callback`, prod `https://{domain}/api/auth/callback`. Also in `supabase/config.toml` `additional_redirect_urls` |
| Montserrat font load blocking render | Low | Medium | `next/font/google` with `display: swap` and `subsets: ['latin', 'vietnamese']` |
| Language selector dropdown scope creep | Medium | Low | Strictly defer to frame `721:4942` spec — implement trigger only |
| No test framework in project yet | High | High | Add Vitest + Testing Library as first task in Phase 0 |

### Estimated Complexity

- **Frontend**: Medium — Multiple components, responsive layout, gradient overlays, font changes
- **Backend**: Low — OAuth callback route + middleware only
- **Testing**: Medium — TDD requires test infrastructure setup from scratch

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: LoginButton ↔ Supabase client, Header ↔ LanguageSelector, Login page ↔ all components
- [x] **External dependencies**: Supabase Auth (Google OAuth flow)
- [ ] **Data layer**: N/A — no database operations for login
- [x] **User workflows**: Complete login flow (button click → OAuth → callback → redirect)

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Login button triggers OAuth, error display from URL params, loading state management |
| Service ↔ Service | Yes | Supabase middleware session refresh, auth callback code exchange |
| App ↔ External API | Yes | Google OAuth redirect flow, Supabase Auth SDK |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Responsive layout (mobile/tablet/desktop) |

### Test Environment

- **Environment type**: Local (jsdom for unit/integration, browser for E2E)
- **Test data strategy**: Mocked Supabase client responses, fixture error messages
- **Isolation approach**: Fresh component mounts per test, mocked modules

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth client | Mock | Cannot run real OAuth in unit tests |
| `next/navigation` (redirect, useSearchParams) | Mock | Server-side functions not available in test env |
| `next/image` | Mock | Image optimization not needed in tests |
| `next/headers` (cookies) | Mock | Server functions not available in jsdom |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Login page renders all visual elements (header, hero, button, footer)
   - [x] Login button click calls `signInWithOAuth({ provider: 'google' })`
   - [x] OAuth callback exchanges code and redirects to homepage
   - [x] Authenticated user visiting `/login` is redirected away

2. **Error Handling**
   - [x] Login failure shows error message below button
   - [x] OAuth callback error params displayed on login page
   - [x] Error message dismissed on new login attempt
   - [x] Supabase unavailable shows service error

3. **Edge Cases**
   - [x] Button disabled during loading (prevents double-click)
   - [x] Background image fallback on load failure
   - [x] OAuth cancel returns to login page without error
   - [x] `redirectTo` param preserved through OAuth flow

### Tooling & Framework

- **Test framework**: Vitest (fast, ESM-native, Next.js compatible)
- **Supporting tools**: @testing-library/react, @testing-library/user-event, jsdom
- **CI integration**: `vitest run` in PR checks pipeline (`.github/workflows/pr-checks.yaml`)

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Core login flow (US1) | 90%+ | High |
| Component rendering (US3) | 85%+ | High |
| Language selector trigger (US2) | 80%+ | Medium |
| Error handling & edge cases | 75%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (3 review passes completed)
- [x] `design-style.md` approved (3 review passes completed)
- [ ] Supabase project configured with Google OAuth provider
- [ ] Environment variables set (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)

### External Dependencies

- Supabase Auth service (Google OAuth provider must be enabled)
- Google Cloud Console (OAuth client ID + redirect URIs configured)
- MoMorph media files API (for asset download)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (TDD: Red → Green → Refactor)

---

## Notes

- **Font migration**: The existing project uses Geist fonts — these must be replaced with Montserrat (weights 500, 700) + Montserrat Alternates (weight 700) globally. Weight 500 is needed for error message text. This is a breaking change for the default homepage, but since the homepage will also be replaced with SAA content, this is acceptable.
- **Root page strategy**: The login page is at `/login`. The root `/` should redirect to `/login` for unauthenticated users or to the homepage for authenticated users. This is handled by middleware.
- **Language dropdown**: Only the trigger button is implemented here. The dropdown panel is specified in frame `721:4942` and will be a separate spec/implementation.
- **SVG icons**: Per `design-style-template.md` guidelines, all icons MUST be React SVG components (not `<img>` tags). Google icon, VN flag, and chevron will be inline SVG components.
- **No `BACKEND_API_TESTCASES.md`**: This file does not exist yet. The login feature relies solely on Supabase Auth SDK — no custom backend API endpoints are needed beyond the callback handler.
- **Supabase local dev**: The project has `supabase/config.toml` with Google OAuth already configured using env vars. Use `make up` to start local Supabase for development.
