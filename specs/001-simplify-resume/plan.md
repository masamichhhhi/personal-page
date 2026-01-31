# Implementation Plan: Simplify Resume Experience Descriptions

**Branch**: `001-simplify-resume` | **Date**: 2026-01-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-simplify-resume/spec.md`

## Summary

Simplify the resume page by replacing detailed multi-bullet experience descriptions with concise 1-2 line summaries that focus on what was developed and the role played. Add clickable links to company services/websites for additional context.

**Technical Approach**: Modify the WorkExperience type to replace the responsibilities array with a single description string and add an optional companyUrl field. Update the resume data file, TypeScript types, and Astro component to render the simplified format.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 24
**Primary Dependencies**: Astro, @astrojs/rss, astro-icon, Tailwind CSS 4.x
**Storage**: YAML file (src/data/resume.yaml)
**Testing**: npm test && npm run lint
**Target Platform**: Static site (SSG via Astro)
**Project Type**: Web (static site)
**Performance Goals**: No impact expected (content simplification)
**Constraints**: Must maintain print-friendly PDF export functionality
**Scale/Scope**: 5 company experiences to simplify

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Content-First Design ✅ PASS
- **Assessment**: Simplifying descriptions improves content readability and scannability
- **Rationale**: Reducing verbose descriptions aligns with content-first principles by making information more digestible

### Principle II: Performance & SEO ✅ PASS
- **Assessment**: No impact to performance or SEO; content remains semantic and indexable
- **Rationale**: Text simplification doesn't affect Core Web Vitals or metadata structure

### Principle III: Responsive Design ✅ PASS
- **Assessment**: Shorter descriptions improve mobile readability
- **Rationale**: Less text content is easier to scan on smaller screens

### Principle IV: Maintainability ✅ PASS
- **Assessment**: Simplifies data structure by replacing array with string
- **Rationale**: Single description field is easier to maintain than multiple responsibility bullets

### Principle V: Simplicity ✅ PASS
- **Assessment**: Reduces data complexity, no new dependencies
- **Rationale**: Data model simplification aligns with simplicity principle

**Gate Result**: ✅ ALL GATES PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/001-simplify-resume/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output (if needed)
├── data-model.md        # Phase 1 output
└── quickstart.md        # Phase 1 output
```

### Source Code (repository root)

```text
src/
├── components/
│   └── ResumeExperience.astro    # Update to render description instead of responsibilities
├── data/
│   └── resume.yaml               # Update experience data structure
├── types/
│   └── resume.ts                 # Update WorkExperience interface
├── pages/
│   └── resume.astro              # No changes needed (uses component)
└── utils/
    └── loadResume.ts             # No changes needed (just loads YAML)
```

**Structure Decision**: Single project structure (default) - all changes are within the existing src/ directory for data, types, and components.

## Complexity Tracking

No constitutional violations - this table is not needed.

## Phase 0: Research

### Technical Unknowns

No significant technical unknowns. The implementation is straightforward:
1. The data model change is a simplification (array → string)
2. Component rendering logic is simpler (no list mapping)
3. Adding company links is standard HTML anchor usage

### Research Outcomes

**Decision**: No external research needed
**Rationale**: This is a data structure simplification and UI presentation change using existing technologies (TypeScript, Astro, Tailwind). All required knowledge is within the existing codebase patterns.

## Phase 1: Design Artifacts

### Data Model (data-model.md)

See [data-model.md](./data-model.md) for detailed entity definitions.

**Summary**:
- WorkExperience entity modified to replace `responsibilities: string[]` with `description: string`
- Added optional `companyUrl?: string` field
- No new entities required

### API Contracts

N/A - This is a static site with no API endpoints. Changes are purely presentational.

### Quick Start Guide

See [quickstart.md](./quickstart.md) for implementation steps.

## Implementation Notes

### Migration Strategy

1. Update TypeScript interface first
2. Update Astro component to handle new structure
3. Update resume.yaml data last (allows testing with new structure)

### Testing Approach

1. Visual verification: Check resume page renders correctly
2. Print test: Verify PDF export still works
3. Responsive test: Check mobile layout with shorter descriptions
4. Link test: Verify company URLs open in new tabs

### Rollback Plan

If needed, revert changes in reverse order:
1. Restore resume.yaml
2. Restore component
3. Restore TypeScript types
