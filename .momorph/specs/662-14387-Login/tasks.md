# Tasks: Login

**Frame**: `662:14387-Login`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Download assets, install dependencies, configure test framework, update global styles and fonts

- [x] T001 Download media assets from MoMorph using `get_media_files` tool: SAA Logo (`I662:14391;178:1033;178:1030`) → `public/images/login/saa-logo.png`, ROOT FURTHER (`2939:9548`) → `public/images/login/root-further.png`, Background Image (`662:14388`) → `public/images/login/bg-keyvisual.webp`. Download SVG assets: Google Icon (`I662:14426;186:1766`), VN Flag (`I662:14391;186:1696;186:1821;186:1709`), Chevron Down (`I662:14391;186:1696;186:1821;186:1441`) | public/images/login/
- [x] T002 [P] Create GoogleIcon SVG component — accepts `className` prop, 24x24 default | src/components/icons/GoogleIcon.tsx
- [x] T003 [P] Create VnFlagIcon SVG component — accepts `className` prop, 24x24 default | src/components/icons/VnFlagIcon.tsx
- [x] T004 [P] Create ChevronDownIcon SVG component — accepts `className` prop, 24x24 default | src/components/icons/ChevronDownIcon.tsx
- [x] T005 Install test dependencies: `yarn add -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom @vitejs/plugin-react jsdom` | package.json
- [x] T006 Create Vitest config with jsdom environment, `@/*` path alias (`resolve.alias: { '@': path.resolve('./src') }`), `plugins: [react()]`, `globals: true`, `setupFiles: ['./vitest.setup.ts']` | vitest.config.ts
- [x] T007 [P] Create Vitest setup file — `import '@testing-library/jest-dom'` to extend expect with DOM matchers | vitest.setup.ts
- [x] T008 [P] Add test scripts to package.json: `"test": "vitest"`, `"test:run": "vitest run"`, `"test:watch": "vitest --watch"` | package.json
- [x] T009 Update globals.css — remove Geist CSS variables (`--font-sans`, `--font-mono`, `--background`, `--foreground`), add login design tokens from design-style.md (11 colors, shadow `--shadow-btn-hover`) | src/app/globals.css
- [x] T010 Update root layout — replace Geist fonts with `Montserrat({ weight: ['500', '700'], subsets: ['latin', 'vietnamese'], variable: '--font-montserrat' })` and `Montserrat_Alternates({ weight: ['700'], subsets: ['latin', 'vietnamese'], variable: '--font-montserrat-alternates' })`. Update body className. Update metadata: title "SAA 2025", description for Sun Annual Awards | src/app/layout.tsx
- [x] T011 Update root page.tsx — replace default Next.js template with simple homepage placeholder (authenticated users land here) | src/app/page.tsx
- [x] T012 Create auth-related TypeScript types: `LoginState` (`{ isLoading: boolean; error: string | null }`), `AuthCallbackParams` (`{ code?: string; next?: string; error?: string; error_description?: string }`) | src/types/auth.ts

**Checkpoint**: Project configured — test framework works (`yarn test:run` passes with 0 tests), fonts loaded, design tokens available, assets in place

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Auth infrastructure — middleware for route protection, OAuth callback handler

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests First (TDD — RED)

- [x] T013 Write middleware tests — test: unauthenticated user on `/` redirects to `/login?redirectTo=/`, test: unauthenticated user on `/dashboard` redirects to `/login?redirectTo=/dashboard`, test: authenticated user on `/login` redirects to `/`, test: `/api/auth/callback` is NOT protected, test: static files excluded from middleware | src/__tests__/middleware.test.ts
- [x] T014 [P] Write OAuth callback route tests — test: valid `code` exchanges for session and redirects to `next` param (default `/`), test: missing `code` (cancelled OAuth) redirects to `/login` without error, test: invalid `code` redirects to `/login?error=...&error_description=...`, test: `next` param with `//` (open redirect attempt) falls back to `/`, test: `next` param starting with `/` is accepted | src/app/api/auth/callback/__tests__/route.test.ts

### Implementation (GREEN)

- [x] T015 Create root middleware.ts — call `createClient(request)` from `@/libs/supabase/middleware`, call `supabase.auth.getUser()`, redirect unauthenticated to `/login?redirectTo={originalPath}` (except `/login` and `/api/auth/callback`), redirect authenticated away from `/login` to `/`. Configure `matcher` to exclude `/_next/`, `/images/`, `/favicon.svg` | src/middleware.ts
- [x] T016 Create OAuth callback route handler — extract `code` and `next` params from URL. If no `code`: redirect to `/login`. If `code`: call `supabase.auth.exchangeCodeForSession(code)` using server client with cookies. On success: redirect to `next` (validate starts with `/` and no `//` for OWASP). On error: redirect to `/login?error=auth_error&error_description={encodeURIComponent(message)}` | src/app/api/auth/callback/route.ts

**Checkpoint**: Auth infrastructure ready — middleware redirects correctly, callback handles all OAuth outcomes (success, cancel, error, open redirect)

---

## Phase 3: User Story 1 + 3 — Google OAuth Login + View Login Page (Priority: P1) 🎯 MVP

**Goal**: Users can see the login page with full SAA 2025 branding and log in via Google OAuth

**Independent Test**: Navigate to `/login` → see all visual elements (background, gradients, header, hero, button, footer) → click "LOGIN With Google" → OAuth flow completes → redirected to homepage

### Tests First (TDD — RED)

- [x] T017 Write useAuth hook tests — test: parses `error` and `error_description` from URL search params, test: parses `redirectTo` from URL (defaults to `/`), test: `clearError` sets error to null, test: `setIsLoading` toggles loading state | src/hooks/__tests__/useAuth.test.ts
- [x] T018 [P] [US1] Write LoginButton tests — test: renders "LOGIN With Google" text + GoogleIcon, test: has `aria-label="Login with Google"`, test: click calls `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '${origin}/api/auth/callback?next=${redirectTo}' } })`, test: loading state shows "Logging in..." + spinner + disabled + opacity 0.7, test: displays error with `role="alert"` and `#EF4444` color when error prop set, test: error dismisses on new click (clearError called), test: button has `pointer-events: none` when loading | src/app/login/__tests__/LoginButton.test.tsx
- [x] T019 [P] [US3] Write Header tests — test: renders SAA logo image (52x48px), test: renders LanguageSelector child with "VN" text, test: has semi-transparent bg `rgba(11,15,18,0.8)`, height 80px, flex justify-between | src/components/__tests__/Header.test.tsx
- [x] T020 [P] [US3] Write Footer tests — test: renders "Bản quyền thuộc về Sun* © 2025", test: has Montserrat Alternates font class, test: has top border `1px solid #2E3940` | src/components/__tests__/Footer.test.tsx
- [x] T021 [P] [US3] Write LoginClient tests — test: renders background image with `next/image` fill + priority, test: renders left gradient overlay (z-index 1), test: renders bottom gradient overlay (z-index 2), test: renders Header (z-index 10), test: renders hero section with key visual + text + LoginButton (z-index 5), test: renders Footer (z-index 5), test: passes error/redirectTo from useAuth to LoginButton | src/app/login/__tests__/LoginClient.test.tsx

### Implementation (GREEN)

- [x] T022 [US1] Implement useAuth hook — parse `error`, `error_description`, `redirectTo` from `useSearchParams()`, manage `isLoading` state with `visibilitychange` listener for page return, return `{ isLoading, error, redirectTo, setIsLoading, clearError }` | src/hooks/useAuth.ts
- [x] T023 [P] [US1] Implement LoginButton component ("use client") — render button with GoogleIcon + "LOGIN With Google" text (Montserrat 22/28 bold, `#00101A`). Props: `error`, `redirectTo`, `isLoading`, `onLogin`, `onClearError`. 6 states per design-style.md B.3_Login: default (`#FFEA9E`), hover (`#FFE070` + shadow + translateY(-1px)), focus (outline), active (`#FFD740`), disabled (opacity 0.5), loading (opacity 0.7 + spinner + "Logging in..."). Error message below button: `role="alert"`, `#EF4444`, 14px, max-width 305px. `aria-label="Login with Google"` | src/app/login/LoginButton.tsx
- [x] T024 [P] [US3] Implement Header component (Server Component) — flex justify-between, items-center, h-20, px-36, py-3, bg `rgba(11,15,18,0.8)`, relative z-10. Renders SAA logo (52x48, `next/image`) on left, `<LanguageSelector>` on right | src/components/Header.tsx
- [x] T025 [P] [US3] Implement Footer component (Server Component) — flex items-center justify-between, px-[90px] py-10, border-top `1px solid #2E3940`, relative z-5. Copyright text "Bản quyền thuộc về Sun* © 2025" in Montserrat Alternates 16/24 bold white | src/components/Footer.tsx
- [x] T026 [P] [US3] Create login loading.tsx — dark background `#00101A` full-screen (seamless transition) | src/app/login/loading.tsx
- [x] T027 [P] [US3] Create login error.tsx — "use client" error boundary with retry button, dark theme | src/app/login/error.tsx
- [x] T028 [US3] Implement LoginClient component ("use client") — full page layout: background image (`next/image` fill + priority + `object-cover`, z-0), left gradient overlay (`linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent)`, z-1), bottom gradient overlay (`linear-gradient(0deg, #00101A 22.48%, transparent 51.74%)`, z-2), `<Header>` (z-10), hero section (z-5, px-36 py-24, flex-col, gap-80px between key visual and content): ROOT FURTHER image (451x200), content block (pl-16, gap-24px): hero text ("Bắt đầu hành trình...") Montserrat 20/40 bold white + `<LoginButton>` + error message. `<Footer>` (z-5). Use `useAuth` hook. Page bg: `#00101A` | src/app/login/LoginClient.tsx
- [x] T029 [US1] [US3] Implement login page.tsx (Server Component) — check session via `createClient()` + `supabase.auth.getUser()`, if authenticated `redirect('/')`. Wrap `<LoginClient />` in `<Suspense fallback={<loading skeleton>}>` (required for useSearchParams in Next.js 15) | src/app/login/page.tsx

**Checkpoint**: US1 + US3 complete — login page renders pixel-perfect, OAuth flow works end-to-end (button click → Google → callback → redirect). Run `yarn test:run` — all tests pass.

---

## Phase 4: User Story 2 — Language Selection Trigger (Priority: P2)

**Goal**: Language selector button renders correctly and responds to clicks/keyboard with aria-expanded state

**Independent Test**: Click language selector → aria-expanded toggles. Press Enter/Space → same. Press Escape → closes. Dropdown panel rendering deferred to frame `721:4942`.

### Tests First (TDD — RED)

- [x] T030 [US2] Write LanguageSelector tests — test: renders VnFlagIcon (24x24) + "VN" text (Montserrat 16/24 bold white) + ChevronDownIcon (24x24), test: has `aria-label="Select language"`, test: has `aria-expanded="false"` by default, test: click toggles `aria-expanded` to "true", test: second click toggles back to "false", test: Enter key toggles `aria-expanded`, test: Space key toggles `aria-expanded`, test: Escape key sets `aria-expanded="false"`, test: hover shows `rgba(255,255,255,0.1)` background, test: focus shows outline `2px solid rgba(255,255,255,0.5)` | src/components/__tests__/LanguageSelector.test.tsx

### Implementation (GREEN)

- [x] T031 [US2] Implement LanguageSelector component ("use client") — button with flex items-center gap-0.5 p-4 rounded cursor-pointer. Children: VnFlagIcon + "VN" text + ChevronDownIcon. Local state `isOpen` for `aria-expanded`. Click handler toggles `isOpen`. Keyboard: Enter/Space toggles, Escape closes. Hover: `bg-white/10`. Focus: `outline-2 outline-white/50 outline-offset-2`. `aria-label="Select language"` | src/components/LanguageSelector.tsx

**Checkpoint**: US2 trigger complete — language selector renders, toggles aria-expanded on click/keyboard. Dropdown panel deferred.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Responsive layout, accessibility, transitions, performance optimization

- [x] T032 [P] Add responsive styles for Mobile (<768px) — Header: px-6, height auto. Logo: w-10. B_Bìa: px-6 py-12. Key Visual: w-[280px]. Hero text: text-base leading-7 max-w-full. Login button: w-full max-w-[305px]. Footer: p-6 text-sm. Gap B.1→content: 40px | src/app/login/LoginClient.tsx
- [x] T033 [P] Add responsive styles for Tablet (768-1023px) — Header: px-12. B_Bìa: px-12 py-16. Key Visual: w-[360px]. Gap B.1→content: 60px. Footer: py-8 px-12 | src/app/login/LoginClient.tsx
- [x] T034 [P] Add background image fallback — set `bg-[#00101A]` on page container so if `next/image` fails to load, solid dark background shows. Verify `next/image` has `priority` prop for LCP | src/app/login/LoginClient.tsx
- [x] T035 [P] Add button hover/active transitions — `transition-all duration-150 ease-in-out` on LoginButton for background-color, box-shadow, transform. Loading/disabled: `transition-opacity duration-150` | src/app/login/LoginButton.tsx
- [x] T036 [P] Add error message animation — opacity transition 200ms ease-in on appear/disappear | src/app/login/LoginButton.tsx
- [x] T037 [P] Add language selector hover transition — `transition-colors duration-150 ease-in-out` on background-color | src/components/LanguageSelector.tsx
- [x] T038 Verify keyboard navigation — Tab order: Header logo (skip, non-interactive) → Language selector → Login button. Focus visible on all interactive elements (outline styles per design-style.md) | src/app/login/LoginClient.tsx
- [x] T039 Verify WCAG AA color contrast — white (#FFFFFF) on dark (#00101A) background, button text (#00101A) on gold (#FFEA9E), error text (#EF4444) on dark (#00101A). All exceed 4.5:1 ratio | Manual verification

**Checkpoint**: All polish complete — responsive on mobile/tablet/desktop, animations smooth, keyboard navigable, WCAG AA compliant

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on T005-T008 (test framework) and T012 (types) from Phase 1
- **US1+US3 (Phase 3)**: Depends on Phase 2 completion (middleware + callback must exist)
- **US2 (Phase 4)**: Depends on T002-T004 (icon components from Phase 1). Can run in parallel with Phase 3.
- **Polish (Phase 5)**: Depends on Phase 3 + Phase 4 completion

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD — RED)
- Implementation makes tests pass (GREEN)
- Refactor after green
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 1**: T002, T003, T004 (icon components) in parallel. T007, T008 in parallel. T009, T010, T011 in parallel after T005.

**Phase 2**: T013, T014 (tests) in parallel. T015, T016 (implementation) — T015 independent, T016 independent.

**Phase 3**: T018, T019, T020, T021 (tests) ALL in parallel. T023, T024, T025, T026, T027 (implementations) ALL in parallel. T028 depends on T022-T025. T029 depends on T028.

**Phase 4**: Independent from Phase 3 — can run in parallel if team capacity allows.

**Phase 5**: T032, T033, T034, T035, T036, T037 ALL in parallel.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (Foundation)
2. Complete Phase 3 (US1 + US3 — Login + View)
3. **STOP and VALIDATE**: Full login flow works end-to-end
4. Deploy if ready — users can log in

### Incremental Delivery

1. Phase 1 + 2 → Auth infrastructure ready
2. Phase 3 (US1+US3) → Login works → Test → Deploy
3. Phase 4 (US2) → Language trigger → Test → Deploy
4. Phase 5 (Polish) → Responsive + a11y → Test → Deploy

---

## Notes

- Constitution mandates TDD — every implementation task has a preceding test task
- Commit after each completed task or logical group (conventional commits: `feat:`, `test:`, `chore:`)
- Run `yarn test:run` before moving to next phase
- Mark tasks complete as you go: `[x]`
- Icon components (T002-T004) use inline SVG — NOT `<img>` tags per design-style-template.md
- LanguageSelector dropdown panel is OUT OF SCOPE — only trigger button (frame `721:4942` spec)
- Background image MUST use WebP format + `next/image` with `priority` for LCP (TR-003, TR-004)
