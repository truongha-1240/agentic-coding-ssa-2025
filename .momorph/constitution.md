<!--
=== Sync Impact Report ===
Version change: N/A → 1.0.0 (initial ratification)
Modified principles: N/A (first version)
Added sections:
  - Core Principles (5 principles)
  - Technology Stack & Constraints
  - Development Workflow
  - Governance
Removed sections: N/A
Templates requiring updates:
  - .momorph/templates/plan-template.md ✅ aligned
    (Constitution Compliance Check gate present, covers coding conventions,
     approved libraries, folder structure, security, testing)
  - .momorph/templates/spec-template.md ✅ aligned
    (Dependencies section references constitution.md)
  - .momorph/templates/tasks-template.md ✅ aligned
    (TDD enforcement: "Tests MUST be written and FAIL before implementation")
Follow-up TODOs: None
=== End Sync Impact Report ===
-->

# Agentic Coding Hands-on Constitution

## Core Principles

### I. Clean Code & Source Organization

All source code MUST be clean, readable, and concisely organized:

- File and folder naming MUST follow Next.js App Router conventions
  (`kebab-case` for route segments, `PascalCase` for components).
- Each file MUST have a single, clear responsibility.
- Functions MUST be small and focused — extract when logic exceeds
  approximately 30 lines.
- Avoid code duplication; extract shared logic into `src/libs/` or
  co-located utilities only when reused.
- TypeScript strict mode is mandatory — no `any` types unless
  explicitly justified with an inline comment.
- Import paths MUST use the `@/*` alias (mapped to `./src/*`).
- ESLint (`next/core-web-vitals` + `next/typescript`) MUST pass
  with zero warnings before merge.

### II. Framework Best Practices (Next.js + Supabase + Cloudflare)

All code MUST follow established patterns for the project stack:

- **Next.js 15 (App Router)**: Use Server Components by default.
  Add `"use client"` only when React hooks or browser APIs are
  required. Leverage `loading.tsx`, `error.tsx`, and
  `not-found.tsx` for each route segment. Use `next/image` for
  optimized images and `next/link` for client-side navigation.
- **Supabase**: Use the pre-configured clients in
  `src/libs/supabase/` — `server.ts` for Server Components /
  Server Actions, `client.ts` for Client Components,
  `middleware.ts` for auth session refresh. NEVER instantiate
  Supabase clients outside these modules.
- **Cloudflare Workers**: Keep edge-compatible code — avoid
  Node.js-only APIs (`fs`, `path`, etc.). Use
  `@opennextjs/cloudflare` adapter conventions. Be mindful of
  Worker size limits and cold start optimization.
- **TailwindCSS v4**: Use utility classes directly in JSX. Avoid
  `@apply` in CSS files. Keep `globals.css` minimal — only for
  Tailwind directives and truly global resets.

### II-B. Internationalization (i18n) — MANDATORY

All user-facing text MUST support Vietnamese (VN) and English (EN):

- **NEVER hardcode user-facing strings** directly in JSX. All text
  MUST come from translation files.
- **Translation files**: Store in `src/i18n/` directory:
  - `src/i18n/vi.ts` — Vietnamese translations (default)
  - `src/i18n/en.ts` — English translations
  - `src/i18n/index.ts` — `useTranslation()` hook and `TranslationProvider`
- **Hook pattern**: Use `const { t } = useTranslation()` in
  components. Access keys via `t("section.key")`.
- **Language storage**: `localStorage` key `"lang"`, default `"VN"`.
  The `LanguageSelector` component in Header controls switching.
- **New features**: Every new feature specification MUST include
  translation keys for all user-facing text in both VN and EN.
- **Existing features**: Migrate to i18n incrementally — new code
  MUST use translations, existing code should be migrated when touched.

### III. Responsive Design

The application MUST render correctly across all target viewports:

- Every page and component MUST support mobile (≥320px),
  tablet (≥768px), and desktop (≥1024px) breakpoints.
- Use TailwindCSS responsive utilities (`sm:`, `md:`, `lg:`) —
  avoid custom media queries unless Tailwind cannot express the
  requirement.
- Interactive elements MUST have appropriate touch targets
  (minimum 44×44px on mobile).
- Layout MUST use flexible containers (flex / grid) that adapt
  fluidly between breakpoints. Avoid fixed pixel widths for
  content containers.
- Images MUST use responsive sizing (`next/image` with appropriate
  `sizes` attribute).

### III-B. Database Schema — MANDATORY

Every new feature that introduces data persistence MUST include:

- **Schema update**: Add tables/columns to `.momorph/contexts/database-schema.sql`
- **Seed data**: Add seed inserts to `.momorph/contexts/database-seed.sql`
- **ERD update**: Update `.momorph/contexts/DATABASE_DESIGN.mmd`
- **Analysis update**: Update `.momorph/contexts/DATABASE_ANALYSIS.md`
- **Supabase conventions**: Use `uuid` for PKs (Supabase default),
  `auth.users` for auth, RLS policies on all tables.

### IV. Security-First (OWASP Compliance)

All code MUST follow OWASP secure coding practices:

- User input MUST be validated and sanitized at system boundaries
  (API routes, form handlers, Server Actions).
- Authentication MUST use Supabase Auth — NEVER implement custom
  token logic.
- API routes MUST verify user session via Supabase middleware
  before accessing protected resources.
- Sensitive data (API keys, secrets) MUST NEVER be committed to
  the repository; use environment variables via `.env` files.
- Server Components and Server Actions MUST NOT expose sensitive
  data to the client bundle.
- HTTP security headers (CSP, X-Frame-Options, etc.) MUST be
  configured via Next.js middleware or Cloudflare Workers.
- Database access through Supabase MUST use parameterized queries
  or the Supabase client SDK — NEVER concatenate user input.
- Row Level Security (RLS) policies MUST be enabled on all
  Supabase tables that store user data.

### V. Test-First Development (NON-NEGOTIABLE)

TDD is mandatory for all feature development:

- Tests MUST be written before implementation code.
- Red-Green-Refactor cycle MUST be followed: write failing test →
  implement minimal code to pass → refactor.
- Every user story MUST have at least one integration test
  verifying its acceptance criteria.
- Unit tests MUST cover business logic, utility functions, and
  data transformations.
- Test files MUST be co-located or placed in a mirrored `tests/`
  directory.
- Tests MUST be independently runnable — no shared mutable state
  between test cases.
- CI pipeline MUST block merge on test failure.

## Technology Stack & Constraints

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| UI Library | React | 19.x |
| Language | TypeScript (strict) | 5.x |
| Styling | TailwindCSS + PostCSS | 4.x |
| Backend / Auth | Supabase (Auth + PostgreSQL) | Latest SDK |
| Hosting | Cloudflare Workers | via @opennextjs/cloudflare |
| Package Manager | Yarn | 1.22.22 |
| Linting | ESLint | 9.x |

**Approved Libraries**: Only dependencies listed in `package.json`
are approved. Adding a new dependency MUST be justified in the
implementation plan with rationale for why existing tools are
insufficient.

**Folder Structure**:

```text
src/
├── app/              # Next.js App Router (pages, layouts, routes)
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Tailwind directives + global resets
├── components/       # Reusable UI components
├── libs/             # Shared libraries (e.g., supabase/)
│   └── supabase/     # Supabase client instances
├── hooks/            # Custom React hooks
├── services/         # API service layers
├── types/            # Shared TypeScript type definitions
└── utils/            # Pure utility functions
```

New features MUST follow this structure. Feature-specific components
MAY be co-located within `app/[route]/` when not reused elsewhere.

## Development Workflow

1. **Specification First**: Every feature MUST have a `spec.md`
   before implementation begins. Use `/momorph.specify` to generate
   from Figma designs.
2. **Plan Before Code**: An implementation `plan.md` MUST be
   reviewed before writing code. Use `/momorph.plan` to generate.
3. **Task Breakdown**: Plans MUST be decomposed into tasks via
   `/momorph.tasks` before coding starts.
4. **TDD Execution**: For each task, write tests first (RED),
   implement (GREEN), then refactor. Mark tasks complete in
   `tasks.md` as you go.
5. **Incremental Commits**: Commit after each completed task or
   logical group. Use conventional commit messages (`feat:`,
   `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).
6. **Constitution Compliance**: Every implementation plan MUST
   include a Constitution Compliance Check confirming adherence
   to all five principles before implementation begins.

## Governance

- This constitution is the **single source of truth** for all
  development decisions in this project.
- All code reviews and PR approvals MUST verify compliance with
  the principles defined herein.
- **Amendments** require: (1) documented rationale, (2) team
  review, and (3) version bump following semver — MAJOR for
  principle removals/redefinitions, MINOR for additions/expansions,
  PATCH for clarifications.
- **Complexity justification**: Any deviation from these principles
  MUST be documented in the implementation plan's "Violations"
  table with rationale and rejected alternatives.
- Runtime development guidance is maintained in `AGENTS.md` and
  `.momorph/guidelines/`.

**Version**: 1.0.0 | **Ratified**: 2026-03-09 | **Last Amended**: 2026-03-09
