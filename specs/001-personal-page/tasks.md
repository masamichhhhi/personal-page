# Tasks: Personal Page

**Input**: Design documents from `/specs/001-personal-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested in specification. Test tasks omitted.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- All paths relative to repository root

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize Astro project with required dependencies and configuration

- [x] T001 Initialize Astro project with TypeScript strict mode using `npm create astro@latest`
- [x] T002 Install core dependencies: @astrojs/rss, @astrojs/sitemap, astro-icon, yaml
- [x] T003 [P] Install and configure Tailwind CSS with @tailwindcss/typography plugin in tailwind.config.mjs
- [x] T004 [P] Configure astro.config.mjs with site URL, integrations (tailwind, sitemap, icon), and static output
- [x] T005 [P] Create src/styles/global.css with Tailwind directives and base styles
- [x] T006 [P] Configure TypeScript in tsconfig.json with strict mode and path aliases
- [x] T007 [P] Create .prettierrc with Astro plugin configuration
- [x] T008 Create directory structure: src/components/, src/layouts/, src/pages/, src/content/, src/data/, src/utils/

**Checkpoint**: Project builds with `npm run dev` and shows default Astro page

---

## Phase 2: Foundational (Shared Infrastructure)

**Purpose**: Core layouts and components used by ALL user stories - MUST complete before any story work

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Create BaseLayout component with HTML head, meta tags, and body structure in src/layouts/BaseLayout.astro
- [x] T010 [P] Create Header component with site title and navigation placeholder in src/components/Header.astro
- [x] T011 [P] Create Footer component with copyright and social links placeholder in src/components/Footer.astro
- [x] T012 [P] Create Navigation component with responsive menu (mobile hamburger) in src/components/Navigation.astro
- [x] T013 Integrate Header, Navigation, and Footer into BaseLayout in src/layouts/BaseLayout.astro
- [x] T014 [P] Create formatDate utility function in src/utils/formatDate.ts
- [x] T015 [P] Create 404 page with "Page not found" message in src/pages/404.astro
- [x] T016 [P] Add favicon.ico and og-image.png placeholders to public/
- [x] T017 Create homepage placeholder with navigation links in src/pages/index.astro

**Checkpoint**: Foundation ready - navigation works, all pages accessible, responsive layout functional

---

## Phase 3: User Story 1 - Blog Article Viewing (Priority: P1) 🎯 MVP

**Goal**: Visitors can browse blog articles, read full content, and filter by tags

**Independent Test**: Access /blog, see article list with titles/dates/summaries, click article to read full content, click tag to filter

### Content & Data Setup

- [x] T018 [US1] Create blog content collection schema with Zod validation in src/content/config.ts
- [x] T019 [P] [US1] Create sample blog post "hello-world.md" with all frontmatter fields in src/content/blog/hello-world.md
- [x] T020 [P] [US1] Create sample blog post "second-post.md" with different tags in src/content/blog/second-post.md

### Components

- [x] T021 [P] [US1] Create BlogCard component displaying title, date, summary, tags in src/components/BlogCard.astro
- [x] T022 [P] [US1] Create TagList component for displaying clickable tags in src/components/TagList.astro
- [x] T023 [P] [US1] Create Pagination component with prev/next navigation in src/components/Pagination.astro
- [x] T024 [US1] Create BlogLayout extending BaseLayout with article-specific meta tags in src/layouts/BlogLayout.astro

### Pages

- [x] T025 [US1] Create blog list page with getCollection, sorting, and pagination in src/pages/blog/index.astro
- [x] T026 [US1] Create blog detail page with [slug] dynamic route in src/pages/blog/[slug].astro
- [x] T027 [US1] Create tag filter page with [tag] dynamic route in src/pages/blog/tag/[tag].astro
- [x] T028 [US1] Implement RSS feed endpoint using @astrojs/rss in src/pages/rss.xml.ts

### Edge Cases & Polish

- [x] T029 [US1] Add empty state "No articles yet" message to blog list page in src/pages/blog/index.astro
- [x] T030 [US1] Add OGP meta tags for blog posts (title, description, image) in src/layouts/BlogLayout.astro

**Checkpoint**: Blog is fully functional - list, detail, tags, RSS all working. MVP ready for deployment.

---

## Phase 4: User Story 2 - Resume Viewing (Priority: P2)

**Goal**: Visitors can view structured resume with work history, skills, and projects

**Independent Test**: Access /resume, see organized sections (experience, skills, projects), print page cleanly to A4

### Content & Data Setup

- [x] T031 [US2] Create resume.yaml with sample data (name, title, experiences, skills, projects) in src/data/resume.yaml
- [x] T032 [P] [US2] Create TypeScript types for resume data matching resume-schema.ts in src/types/resume.ts
- [x] T033 [P] [US2] Create YAML loader utility to read and validate resume data in src/utils/loadResume.ts

### Components

- [x] T034 [P] [US2] Create ResumeSection component for work experience entries in src/components/ResumeExperience.astro
- [x] T035 [P] [US2] Create ResumeSkills component for categorized skills display in src/components/ResumeSkills.astro
- [x] T036 [P] [US2] Create ResumeProjects component for project achievements in src/components/ResumeProjects.astro
- [x] T037 [US2] Create PrintLayout with print-optimized styles in src/layouts/PrintLayout.astro

### Pages

- [x] T038 [US2] Create resume page loading YAML data and rendering all sections in src/pages/resume.astro
- [x] T039 [US2] Add print styles with @media print for A4 formatting in src/styles/global.css

### Edge Cases & Polish

- [x] T040 [US2] Add OGP meta tags for resume page in src/pages/resume.astro

**Checkpoint**: Resume is fully functional - all sections display correctly, prints cleanly

---

## Phase 5: User Story 3 - External Links & Profile (Priority: P3)

**Goal**: Visitors can find and access external platform links with icons

**Independent Test**: Access /links or profile section, see platform icons and descriptions, click to open in new tab

### Content & Data Setup

- [x] T041 [US3] Create links.yaml with sample external links (GitHub, LinkedIn, etc.) in src/data/links.yaml
- [x] T042 [P] [US3] Create TypeScript types for links data matching links-schema.ts in src/types/links.ts
- [x] T043 [P] [US3] Create YAML loader utility to read links data in src/utils/loadLinks.ts

### Components

- [x] T044 [US3] Create ExternalLink component with icon, platform name, description, and target="_blank" in src/components/ExternalLink.astro
- [x] T045 [US3] Create ExternalLinkList component rendering all links in src/components/ExternalLinkList.astro

### Pages

- [x] T046 [US3] Create links page displaying all external links with icons in src/pages/links.astro

### Integration

- [x] T047 [US3] Add external links to Footer component in src/components/Footer.astro

### Edge Cases & Polish

- [x] T048 [US3] Add OGP meta tags for links page in src/pages/links.astro

**Checkpoint**: External links fully functional - icons display, links open in new tabs

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple user stories

### Homepage

- [x] T049 Update homepage with hero section, recent blog posts, and quick links in src/pages/index.astro
- [x] T050 [P] Add OGP meta tags for homepage in src/pages/index.astro

### Navigation

- [x] T051 Update Navigation with final links: Home, Blog, Resume, Links in src/components/Navigation.astro

### SEO & Performance

- [x] T052 [P] Generate sitemap.xml via @astrojs/sitemap integration in astro.config.mjs
- [x] T053 [P] Add robots.txt to public/ directory in public/robots.txt
- [x] T054 Verify all pages have proper title, description, and OGP tags

### Deployment

- [x] T055 Create wrangler.toml or verify Cloudflare Pages auto-detection works
- [x] T056 Verify production build with `npm run build` completes successfully
- [x] T057 Run quickstart.md verification checklist

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) → Phase 2 (Foundational) → Phases 3-5 (User Stories) → Phase 6 (Polish)
                                          ↓
                              [Can run in parallel if staffed]
```

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phases 3-5)**: All depend on Foundational completion
  - Can proceed in parallel (if staffed) or sequentially (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

| Story | Depends On | Can Start After |
|-------|------------|-----------------|
| US1 (Blog) | Foundational only | T017 complete |
| US2 (Resume) | Foundational only | T017 complete |
| US3 (Links) | Foundational only | T017 complete |

**Note**: All user stories are independent and can be implemented/tested separately.

### Within Each User Story

1. Content/Data setup first (schemas, sample data)
2. Components (can parallelize with [P] marker)
3. Pages (depend on components)
4. Edge cases and polish (depend on pages)

---

## Parallel Execution Examples

### Phase 1 - Setup (After T001, T002)

```
Can run in parallel:
- T003: Configure Tailwind CSS
- T004: Configure astro.config.mjs
- T005: Create global.css
- T006: Configure TypeScript
- T007: Create .prettierrc
```

### Phase 2 - Foundational (After T009)

```
Can run in parallel:
- T010: Header component
- T011: Footer component
- T012: Navigation component
- T014: formatDate utility
- T015: 404 page
- T016: Static assets
```

### Phase 3 - User Story 1 (After T018)

```
Can run in parallel:
- T019: Sample blog post 1
- T020: Sample blog post 2
- T021: BlogCard component
- T022: TagList component
- T023: Pagination component
```

### Multiple User Stories (After Phase 2)

```
Developer A: User Story 1 (T018-T030)
Developer B: User Story 2 (T031-T040)
Developer C: User Story 3 (T041-T048)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T008)
2. Complete Phase 2: Foundational (T009-T017)
3. Complete Phase 3: User Story 1 (T018-T030)
4. **STOP and VALIDATE**: Blog works end-to-end
5. Deploy MVP to Cloudflare Pages

### Incremental Delivery

```
Setup → Foundational → US1 (Blog) → Deploy MVP!
                              ↓
                       US2 (Resume) → Deploy!
                              ↓
                       US3 (Links) → Deploy!
                              ↓
                         Polish → Final Deploy!
```

### Time Estimates (Removed per guidelines)

Each task is designed to be completable in a single focused session.

---

## Notes

- [P] tasks can run in parallel (different files, no dependencies)
- [USx] labels map tasks to user stories for traceability
- Each user story is independently completable and deployable
- Commit after each task or logical group
- Stop at any checkpoint to validate independently
- Avoid modifying the same file in parallel tasks
