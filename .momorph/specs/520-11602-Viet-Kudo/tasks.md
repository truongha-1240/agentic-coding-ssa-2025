# Tasks: Viết Kudo

**Feature**: Viết Kudo (Write Kudo Modal)
**Spec**: `spec.md` | **Plan**: `plan.md` | **Design**: `design-style.md`
**Generated**: 2026-03-23

---

## Phase 1: Setup

- [x] T001 Install Tiptap dependencies: `yarn add @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/pm`
- [x] T002 [P] Add i18n keys for writeKudo in `src/i18n/vi.ts` — add `writeKudo.title`, `writeKudo.recipient`, `writeKudo.titleField`, `writeKudo.titlePlaceholder`, `writeKudo.titleHelper`, `writeKudo.contentPlaceholder`, `writeKudo.mentionHint`, `writeKudo.communityStandards`, `writeKudo.hashtag`, `writeKudo.hashtagMax`, `writeKudo.addHashtag`, `writeKudo.image`, `writeKudo.imageMax`, `writeKudo.addImage`, `writeKudo.anonymous`, `writeKudo.cancel`, `writeKudo.submit`, `writeKudo.submitting`, `writeKudo.success`, `writeKudo.searchPlaceholder`, `writeKudo.noResults`, `writeKudo.required`
- [x] T003 [P] Add same i18n keys in English in `src/i18n/en.ts`
- [x] T004 [P] Create `src/components/write-kudo/FieldLabel.tsx` — reusable label component accepting `label: string`, `required?: boolean`, renders Montserrat 22px Bold #00101A + red asterisk (#CF1322) when required

## Phase 2: Foundational (hooks)

- [x] T005 [P] Create `src/hooks/useRecipientSearch.ts` — debounced (300ms) search of `profiles` table via Supabase, accepts query string, returns `{ results: Array<{id, name, email, avatar_url, department}>, isSearching }`, min 1 char to trigger
- [x] T006 [P] Create `src/hooks/useWriteKudo.ts` — manages form state (`recipientId`, `title`, `content`, `selectedHashtags[]`, `images[]`, `isAnonymous`, `isSubmitting`, `errors`), provides `setField()`, `validate()`, `submit()`, `reset()`, `isValid` computed. Submit inserts into `kudos` + `kudo_hashtags` + uploads to Supabase Storage + `kudo_media`

## Phase 3: US1 — Gửi Kudo cơ bản [P1]

**Goal**: Modal with recipient search + title input + submit flow
**Test criteria**: Open modal, select recipient, enter title + content, submit → kudo saved to DB, modal closes

- [x] T007 [US1] Create `src/components/write-kudo/RecipientSearch.tsx` — autocomplete dropdown: input (bg white, border #998C5F, px-6 py-4, placeholder "Tìm kiếm") + dropdown icon 24x24, on type shows filtered profiles list, on select fills recipient, show "Không tìm thấy" when empty
- [x] T008 [US1] Create `src/components/write-kudo/TitleInput.tsx` — text input (bg white, border #998C5F, px-6 py-4, 514px wide) with FieldLabel "Danh hiệu *", placeholder "Dành tặng một danh hiệu cho đồng đội", helper text below (16px #999)
- [x] T009 [US1] Create `src/components/write-kudo/WriteKudoModal.tsx` — modal container: backdrop rgba(0,16,26,0.8), modal bg #FFF8E1 rounded-3xl p-10 w-[752px] max-h-[90vh] overflow-y-auto, title centered 32px Bold, assemble RecipientSearch + TitleInput + placeholder for editor/hashtag/image + cancel/submit buttons (Hủy: border #998C5F px-10 py-4 | Gửi: bg #FFEA9E rounded-lg flex-1 22px Bold, disabled when !isValid)
- [x] T010 [US1] Wire modal in `src/app/sun-kudos/page.tsx` — add `isModalOpen` state, pass to `<WriteKudoModal />`, trigger from KVBanner input click
- [x] T011 [US1] Update `src/components/sun-kudos/KVBanner.tsx` — change input bar from static to clickable, call `onWriteKudo` prop to open modal

## Phase 4: US2 — Rich Text Editor [P1]

**Goal**: Tiptap-based editor with 6 toolbar buttons + @ mention hint
**Test criteria**: Type text, apply bold/italic/strike/list/link/quote, text formats correctly

- [x] T012 [P] [US2] Create `src/components/write-kudo/EditorToolbar.tsx` — row of 6 toggle buttons (B, I, S, List, Link, Quote) ~40x40px each, transparent bg, active state rgba(0,0,0,0.1), + "Tiêu chuẩn cộng đồng" link (16px 700 #FFEA9E)
- [x] T013 [US2] Create `src/components/write-kudo/RichTextEditor.tsx` — Tiptap editor with StarterKit (bold, italic, strike, orderedList, blockquote) + Link extension, white bg, border #998C5F, h-[200px], placeholder "Hãy gửi gắm lời cám ơn...", below hint: "Bạn có thể '@ + tên' để nhắc tới đồng nghiệp khác" (16px 700 #00101A)
- [x] T014 [US2] Integrate RichTextEditor into WriteKudoModal below TitleInput section, wire content to `useWriteKudo.setField('content', html)`

## Phase 5: US3 — Chọn Hashtag [P1]

**Goal**: Hashtag picker with chips (max 5)
**Test criteria**: Click "+ Hashtag" → dropdown, select → chip appears, max 5, remove chip works

- [x] T015 [US3] Create `src/components/write-kudo/HashtagPicker.tsx` — FieldLabel "Hashtag *" + "+ Hashtag" button (border #998C5F, 4px 8px padding) with "Tối đa 5" note, clicking opens dropdown of hashtags from DB, selected shows as chips (gap 8px), chip has "x" to remove, button hidden when 5 selected
- [x] T016 [US3] Integrate HashtagPicker into WriteKudoModal below RichTextEditor, wire to `useWriteKudo.setField('selectedHashtags', [...])`

## Phase 6: US4 — Đính kèm ảnh [P2]

**Goal**: Image upload with thumbnails (max 5)
**Test criteria**: Click "+ Image" → file picker, thumbnails show 80x80, delete works, max 5

- [x] T017 [US4] Create `src/components/write-kudo/ImageUploader.tsx` — label "Image" + row of thumbnails (80x80px, border #FFEA9E) with red delete button (20x20 #D4271D rounded-full, top-right), "+ Image" button (border #998C5F) with "Tối đa 5", hidden when 5 images, accepts jpg/png/gif ≤5MB
- [x] T018 [US4] Integrate ImageUploader into WriteKudoModal below HashtagPicker, wire to `useWriteKudo` images state

## Phase 7: US5 — Gửi ẩn danh [P2]

**Goal**: Anonymous checkbox
**Test criteria**: Check → isAnonymous true, uncheck → false

- [x] T019 [US5] Add anonymous checkbox in WriteKudoModal — checkbox 24x24 (border, white bg) + label "Gửi lời cám ơn và ghi nhận ẩn danh" (22px 700 #999), gap 16px, wire to `useWriteKudo.setField('isAnonymous', checked)`

## Phase 8: US6 — i18n [P2]

**Goal**: All modal text translates
**Test criteria**: Switch language → all labels/placeholders/buttons change

- [x] T020 [US6] Wire all text in WriteKudoModal, RecipientSearch, TitleInput, RichTextEditor, HashtagPicker, ImageUploader to `useTranslation().t('writeKudo.*')` keys

## Phase 9: Polish & Accessibility

- [x] T021 Add `role="dialog"` + `aria-modal="true"` + `aria-labelledby` to WriteKudoModal, focus trap (trap focus within modal), Escape key to close
- [x] T022 Add loading state to "Gửi" button — show spinner + "Đang gửi..." when `isSubmitting`, disable double-click
- [x] T023 Add success toast after submit — "Gửi thành công!" / "Kudo sent successfully!", refresh kudos feed
- [x] T024 Add responsive styles — tablet: modal 90vw, padding 32px | mobile: full-screen, padding 24px

---

## Dependencies

```
T001 → T012, T013 (Tiptap must be installed)
T002, T003 → T020 (i18n keys must exist)
T004 → T007, T008, T015 (FieldLabel used in multiple components)
T005 → T007 (search hook → RecipientSearch)
T006 → T009, T010 (form hook → modal + page)
T007, T008 → T009 (sub-components → modal container)
T009 → T010, T011 (modal → page + KVBanner wiring)
T012 → T013 (toolbar → editor)
T013 → T014 (editor → integrate into modal)
T015 → T016 (hashtag → integrate)
T017 → T018 (image → integrate)
```

## Parallel Execution

**Round 1** (independent): T001, T002, T003, T004, T005, T006
**Round 2** (after Round 1): T007, T008, T012
**Round 3** (after Round 2): T009, T013, T015, T017
**Round 4** (after Round 3): T010, T011, T014, T016, T018, T019
**Round 5** (after Round 4): T020, T021, T022, T023, T024

## Implementation Strategy

- **MVP**: T001-T011 → modal opens, select recipient, enter title, submit basic kudo
- **Core**: + T012-T016 → rich text + hashtags
- **Full**: + T017-T024 → images, anonymous, i18n, polish
- Estimated: 24 tasks total, ~6 parallelizable in Round 1
