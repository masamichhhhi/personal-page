---

description: "Task list for simplifying resume experience descriptions"
---

# Tasks: Simplify Resume Experience Descriptions

**Input**: Design documents from `/specs/001-simplify-resume/`
**Prerequisites**: plan.md, spec.md, data-model.md, quickstart.md

**Tests**: No explicit tests requested in specification. Manual validation only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

Single project structure:
- `src/` - Source code
- `src/types/` - TypeScript type definitions
- `src/components/` - Astro components
- `src/data/` - YAML data files

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project is ready for implementation

- [X] T001 Verify project structure and dependencies are installed per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core type changes that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Update WorkExperience interface in src/types/resume.ts to replace responsibilities array with description string field

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Simplified Experience Descriptions (Priority: P1) 🎯 MVP

**Goal**: Resume page shows concise 1-2 line experience descriptions for each company, focusing on what was developed and the role played

**Independent Test**: View resume page and verify each company experience has only 1-2 concise description lines instead of multiple detailed bullets

### Implementation for User Story 1

- [X] T003 [US1] Update ResumeExperience.astro component in src/components/ResumeExperience.astro to render description paragraph instead of responsibilities list
- [X] T004 [US1] Update resume.yaml in src/data/resume.yaml with simplified descriptions for all 5 companies (VideoStep Tech Lead, VideoStep Fullstack, Raksul, ANIFTY, Nexceed)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Company Service Links (Priority: P2)

**Goal**: Each company on the resume includes a clickable link to the company's service or website

**Independent Test**: Click on company names to verify they link to the correct company websites and open in new tabs

### Implementation for User Story 2

- [X] T005 [US2] Add optional companyUrl field to WorkExperience interface in src/types/resume.ts
- [X] T006 [US2] Update ResumeExperience.astro component in src/components/ResumeExperience.astro to render company name as clickable link with hover styles when companyUrl exists
- [X] T007 [US2] Add company URLs to resume.yaml in src/data/resume.yaml for all applicable companies (VideoStep, Raksul, etc.)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 5: Validation & Testing

**Purpose**: Verify all changes work correctly across different scenarios

- [X] T008 [P] Visual verification: Start dev server and verify resume page at http://localhost:4321/resume shows simplified descriptions and clickable company links
- [X] T009 [P] PDF export test: Click "Print / Save as PDF" button and verify PDF output is correct
- [X] T010 [P] Responsive test: Check mobile and desktop layouts render correctly with shorter descriptions
- [X] T011 Verify all company links with URLs open in new tabs with target="_blank" and rel="noopener noreferrer"
- [X] T012 Run linting and type checking with npm test && npm run lint

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-4)**: All depend on Foundational phase completion
  - User Story 1 (P1): Can start after Foundational (Phase 2) - No dependencies on other stories
  - User Story 2 (P2): Can start after Foundational (Phase 2) - Extends US1 but doesn't block it
- **Validation (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories - Independently testable
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Adds company links without affecting US1 descriptions - Independently testable

### Within Each User Story

**User Story 1:**
- T003 (component update) can be done before or after T004 (data update)
- Both must be complete for story to work

**User Story 2:**
- T005 (type update) must complete before T006 (component update)
- T007 (data update) can happen in parallel with T006

### Parallel Opportunities

- **Phase 1**: Single task (no parallelization)
- **Phase 2**: Single task (no parallelization)
- **Phase 3 (US1)**: T003 and T004 are independent and can run in parallel if desired
- **Phase 4 (US2)**: T006 and T007 can run in parallel after T005 completes
- **Phase 5 (Validation)**: T008, T009, T010 are independent and can run in parallel

---

## Parallel Example: User Story 1

```bash
# After T002 (Foundational) completes, launch US1 tasks in parallel:
Task: "Update ResumeExperience.astro component to render description"
Task: "Update resume.yaml with simplified descriptions for all 5 companies"
```

## Parallel Example: User Story 2

```bash
# After T005 completes, launch in parallel:
Task: "Update ResumeExperience.astro to render company links"
Task: "Add company URLs to resume.yaml"
```

## Parallel Example: Validation

```bash
# After US1 and US2 complete, launch all validation tasks in parallel:
Task: "Visual verification of resume page"
Task: "PDF export test"
Task: "Responsive layout test"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready - Resume now has simplified, scannable descriptions

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP! - Simplified descriptions improve readability)
3. Add User Story 2 → Test independently → Deploy/Demo (Company links add context)
4. Each story adds value without breaking previous stories

### Sequential Implementation (Recommended for Solo Developer)

With a single developer:

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: Foundational (T002) - BLOCKS everything
3. Complete Phase 3: User Story 1 (T003, T004) - Can work in parallel or sequentially
4. **Validate US1**: Ensure descriptions look good before adding links
5. Complete Phase 4: User Story 2 (T005, T006, T007)
6. Complete Phase 5: Validation (T008-T012) - Run all checks

---

## File Change Summary

### Files Modified (3 files):

1. **src/types/resume.ts** (T002, T005)
   - Remove: `responsibilities: string[]`
   - Add: `description: string`
   - Add: `companyUrl?: string`

2. **src/components/ResumeExperience.astro** (T003, T006)
   - Replace: `<ul>` list of responsibilities
   - With: `<p>` paragraph for description
   - Add: Conditional link rendering for company name

3. **src/data/resume.yaml** (T004, T007)
   - Replace: `responsibilities: [...]` arrays with `description: "..."`
   - Add: `companyUrl: "..."` for each company

### Files NOT Modified:

- `src/pages/resume.astro` - No changes needed (uses component)
- `src/utils/loadResume.ts` - No changes needed (just loads YAML)

---

## Task Completion Checklist

After completing each phase, verify:

**After Phase 2 (Foundational):**
- [ ] TypeScript compiles without errors
- [ ] WorkExperience interface has `description: string` field
- [ ] responsibilities field is removed

**After Phase 3 (US1):**
- [ ] Resume page shows 1-2 line descriptions (not bullet lists)
- [ ] All 5 companies have simplified descriptions
- [ ] Descriptions mention both what was developed and the role
- [ ] TypeScript/linting passes

**After Phase 4 (US2):**
- [ ] Companies with URLs are clickable
- [ ] Hover state shows blue color transition
- [ ] Links open in new tabs
- [ ] Companies without URLs display as plain text
- [ ] TypeScript/linting passes

**After Phase 5 (Validation):**
- [ ] All visual tests pass
- [ ] PDF export works correctly
- [ ] Mobile layout looks good
- [ ] All links work properly
- [ ] npm test && npm run lint passes

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- User Story 1 (descriptions) is MVP - can ship without User Story 2
- User Story 2 (links) is enhancement - adds context without breaking US1
- Each user story should be independently completable and testable
- Migration follows type → component → data pattern per quickstart.md
- Commit after each phase for easy rollback
- Avoid: Making all changes at once (hard to debug), skipping validation steps
