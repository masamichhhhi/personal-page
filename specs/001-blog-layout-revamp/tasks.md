# Tasks: Blog Layout Revamp

**Input**: Design documents from `/specs/001-blog-layout-revamp/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: 仕様にテスト要求がないため、テストタスクは作成しない。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 共通のデザイン基盤を整備する

- [x] T001 Add blog design tokens (color, typography, spacing) in src/styles/global.css
- [x] T002 [P] Create section header component in src/components/blog/SectionHeader.astro
- [x] T003 [P] Create featured card component shell in src/components/blog/FeaturedCard.astro
- [x] T004 [P] Create top pick card component shell in src/components/blog/TopPickCard.astro

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: すべてのユーザーストーリーに共通する基盤

- [x] T005 Add optional readingTime to blog schema in src/content/config.ts
- [x] T006 Create highlight selection helpers in src/utils/blogHighlights.ts
- [x] T007 Expand shared blog layout utilities in src/styles/global.css

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 注目コンテンツを素早く発見 (Priority: P1) 🎯 MVP

**Goal**: 注目投稿が最上部で強調表示され、詳細情報が読み取れる

**Independent Test**: `/blog` を開き、注目エリアでタイトル/公開日/要約が確認でき、クリックで該当記事へ遷移できる

### Implementation for User Story 1

- [x] T008 [US1] Implement featured selection in src/pages/blog/index.astro using src/utils/blogHighlights.ts
- [x] T009 [US1] Build featured hero layout in src/pages/blog/index.astro
- [x] T010 [P] [US1] Implement featured card UI in src/components/blog/FeaturedCard.astro
- [x] T011 [P] [US1] Update BlogCard to render optional readingTime and tag styling in src/components/BlogCard.astro

**Checkpoint**: User Story 1 independently functional

---

## Phase 4: User Story 2 - 参照ページを基にした全体デザイン改修 (Priority: P2)

**Goal**: 参照ページに近い配色・余白・タイポグラフィでブログ全体の印象を整える

**Independent Test**: `/blog` を参照ページと見比べ、配色トーン・余白・階層が近い印象であることを確認できる

### Implementation for User Story 2

- [x] T012 [US2] Apply reference-inspired layout structure in src/pages/blog/index.astro
- [x] T013 [P] [US2] Refine BlogCard typography and spacing in src/components/BlogCard.astro
- [x] T014 [US2] Adjust global blog visual styling in src/styles/global.css

**Checkpoint**: User Story 2 independently functional

---

## Phase 5: User Story 3 - 最新・スポットライト投稿の閲覧 (Priority: P3)

**Goal**: 最新投稿とトップピックが明確に表示され、素早く選べる

**Independent Test**: `/blog` で最新一覧とトップピックが表示され、モバイルでも読みやすい

### Implementation for User Story 3

- [x] T015 [US3] Implement top pick selection in src/pages/blog/index.astro using src/utils/blogHighlights.ts
- [x] T016 [P] [US3] Implement top pick card UI in src/components/blog/TopPickCard.astro
- [x] T017 [US3] Update recent posts section layout in src/pages/blog/index.astro

**Checkpoint**: User Story 3 independently functional

---

## Phase 6: User Story 4 - セクション別/全件への導線 (Priority: P4)

**Goal**: 各セクションと全件アーカイブへの導線が明確

**Independent Test**: `/blog` で各セクションの「すべて見る」と「全件アーカイブ」リンクが機能する

### Implementation for User Story 4

- [x] T018 [US4] Add section anchors and “View all” links in src/pages/blog/index.astro
- [x] T019 [US4] Add archive heading and anchor target in src/pages/blog/index.astro

**Checkpoint**: User Story 4 independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 全体品質の最終確認

- [ ] T020 Validate quickstart steps in specs/001-blog-layout-revamp/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - Independent from US1
- **User Story 3 (P3)**: Can start after Foundational - Independent from US1/US2
- **User Story 4 (P4)**: Can start after Foundational - Independent from US1/US2/US3

### Parallel Opportunities

- Phase 1 tasks T002-T004 can run in parallel
- User Story phases can proceed in parallel after Phase 2 if resources allow
- T010 and T011 can run in parallel during US1
- T013 can run in parallel with T012 if the file ownership is coordinated
- T016 can run in parallel with T015 during US3

---

## Parallel Example: User Story 1

```bash
Task: "Implement featured card UI in src/components/blog/FeaturedCard.astro"
Task: "Update BlogCard to render optional readingTime and tag styling in src/components/BlogCard.astro"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate User Story 1 independently

### Incremental Delivery

1. Setup + Foundational
2. User Story 1 → Validate
3. User Story 2 → Validate
4. User Story 3 → Validate
5. User Story 4 → Validate

---

## Notes

- [P] tasks = different files, no dependencies
- Each user story should be independently completable and testable
