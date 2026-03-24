# Implementation Plan: Viết Kudo

**Frame**: `520-11602-Viet-Kudo`
**Spec**: `spec.md`
**Created**: 2026-03-23

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|-------------|-------------------|--------|
| TypeScript strict | No `any` types | ✅ Compliant |
| Server Components default | `"use client"` only for hooks/interactivity | ✅ Modal is client component |
| `@/*` import alias | Mapped to `./src/*` | ✅ Compliant |
| Supabase integration | `@/libs/supabase/client` | ✅ Compliant |
| i18n | All text via `useTranslation` | ✅ Compliant |
| Database | `kudos` table with `title`, `is_anonymous` columns | ✅ Schema updated |
| Tailwind CSS | No inline styles except dynamic | ✅ Compliant |

---

## Architecture Decisions

### Frontend
- **Component pattern**: Modal dialog with form sub-components. `WriteKudoModal` is the orchestrator, sub-components handle individual fields
- **State management**: Single `useWriteKudo` hook manages all form state, validation, and submission
- **Rich text**: Use `@tiptap/react` (lightweight, headless) for the rich text editor with Bold/Italic/Strike/OrderedList/Link/Blockquote extensions
- **Image upload**: Supabase Storage bucket `kudo-images`, client-side resize before upload
- **Form validation**: Real-time — "Gửi" button disabled until all required fields valid

### Database
- **No schema changes needed** — `kudos.title` (free text) + `kudos.is_anonymous` already in schema
- **Storage**: Create `kudo-images` bucket in Supabase Storage (public read)

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/components/write-kudo/WriteKudoModal.tsx` | Main modal container + form orchestration |
| `src/components/write-kudo/RecipientSearch.tsx` | Autocomplete search for recipient |
| `src/components/write-kudo/TitleInput.tsx` | Free text input for danh hiệu |
| `src/components/write-kudo/RichTextEditor.tsx` | Tiptap-based rich text editor with toolbar |
| `src/components/write-kudo/EditorToolbar.tsx` | B/I/S/List/Link/Quote toggle buttons |
| `src/components/write-kudo/HashtagPicker.tsx` | "+ Hashtag" button + chip list (max 5) |
| `src/components/write-kudo/ImageUploader.tsx` | "+ Image" button + thumbnail grid (max 5) |
| `src/components/write-kudo/FieldLabel.tsx` | Reusable label with optional required asterisk |
| `src/hooks/useWriteKudo.ts` | Form state, validation, submission logic |
| `src/hooks/useRecipientSearch.ts` | Debounced profile search via Supabase |

### Modified Files

| File | Changes |
|------|---------|
| `src/i18n/vi.ts` | Add `writeKudo.*` keys (~25 keys: title, labels, placeholders, buttons, errors) |
| `src/i18n/en.ts` | Add same keys in English |
| `src/components/sun-kudos/KVBanner.tsx` | Wire `onWriteKudo` click → open modal |
| `src/app/sun-kudos/page.tsx` | Add `WriteKudoModal` with open/close state |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@tiptap/react` | ^2 | Headless rich text editor |
| `@tiptap/starter-kit` | ^2 | Bold, Italic, Strike, Lists, Blockquote |
| `@tiptap/extension-link` | ^2 | Link insertion |
| `@tiptap/pm` | ^2 | ProseMirror peer dependency |

---

## Implementation Approach

### Phase 1: Foundation
1. Install Tiptap dependencies
2. Add i18n keys for Viết Kudo (vi.ts + en.ts)
3. Create `FieldLabel` reusable component
4. Create `useRecipientSearch` hook (debounced Supabase profiles search)
5. Create `useWriteKudo` hook (form state + validation + submission)

### Phase 2: Core UI (US1 + US2)
6. Create `RecipientSearch` — autocomplete dropdown
7. Create `TitleInput` — free text input with helper text
8. Create `EditorToolbar` — 6 toggle buttons + "Tiêu chuẩn cộng đồng" link
9. Create `RichTextEditor` — Tiptap editor with toolbar + @ mention hint
10. Create `WriteKudoModal` — assemble all sub-components in modal layout

### Phase 3: Hashtag + Image (US3 + US4)
11. Create `HashtagPicker` — dropdown + chips (max 5)
12. Create `ImageUploader` — file picker + thumbnails (80×80, max 5) + delete

### Phase 4: Anonymous + Integration (US5)
13. Add anonymous checkbox in modal
14. Wire modal open/close from KVBanner input bar
15. Wire form submission → Supabase insert (kudos + kudo_hashtags + kudo_media)
16. Add success toast + feed refresh after submit

### Phase 5: i18n + Polish (US6)
17. Wire all text to `useTranslation`
18. Add accessibility: focus trap, escape to close, aria-modal
19. Add loading state on submit button
20. Add error handling (network, validation)

---

## Testing Strategy

| Type | Focus | Coverage |
|------|-------|----------|
| Unit | `useWriteKudo` hook — validation, state transitions | 90% |
| Unit | `RecipientSearch` — debounce, selection | 80% |
| Unit | `HashtagPicker` — add/remove/max 5 | 80% |
| Unit | `ImageUploader` — add/remove/max 5 | 80% |
| Integration | Modal open → fill form → submit → close | Key flows |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tiptap bundle size | Medium | Tree-shake — only import needed extensions |
| Image upload large files | Medium | Client-side resize to max 1024px before upload |
| @ mention implementation | Low | Phase 1 MVP: just hint text. Phase 2: actual mention dropdown |
| Rich text XSS | High | Sanitize HTML on server-side before display |

---

## Open Questions
- [x] Danh hiệu = free text `title` (confirmed)
- [x] `is_anonymous` column exists (confirmed)
- [ ] Supabase Storage bucket `kudo-images` — needs manual creation in Supabase Dashboard
