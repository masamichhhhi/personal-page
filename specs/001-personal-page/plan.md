# Implementation Plan: Personal Page

**Branch**: `001-personal-page` | **Date**: 2025-01-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-personal-page/spec.md`

## Summary

Build a personal page with blog, resume, and external links aggregation using Astro as the static site generator and Cloudflare Pages for hosting. The site will be English-only, content-driven, and optimized for performance and SEO. Blog posts are managed as Markdown files with frontmatter, and resume data is stored in structured YAML format.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 24
**Framework**: Astro 5.x (latest stable)
**Primary Dependencies**: @astrojs/rss (RSS feed), astro-icon (icons), Tailwind CSS 4.x (styling)
**Storage**: File-based (Markdown for blog posts, YAML for resume/links data)
**Testing**: Vitest (unit), Playwright (E2E)
**Target Platform**: Cloudflare Pages (static hosting with edge CDN)
**Project Type**: Static site (SSG)
**Performance Goals**: LCP < 2.5s, FID < 100ms, CLS < 0.1 (Core Web Vitals), <3s initial page load
**Constraints**: Static-only (no server functions), <500KB total JS bundle, offline-capable with service worker
**Scale/Scope**: ~50 blog posts, single resume, ~10 external links

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Content-First Design | ✅ PASS | Markdown-based content, minimal JS, semantic HTML |
| II. Performance & SEO | ✅ PASS | Astro SSG produces static HTML, automatic OGP, RSS feed |
| III. Responsive Design | ✅ PASS | Tailwind CSS mobile-first utilities |
| IV. Maintainability | ✅ PASS | Markdown files for blog, YAML for structured data, no CMS |
| V. Simplicity | ✅ PASS | Minimal dependencies, no backend, file-based storage |

**Additional Constitution Alignment:**
- Development Workflow: Cloudflare Pages provides preview deployments on PR
- Content Strategy: RSS/Atom feed via @astrojs/rss, print styles for resume

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (content schemas)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── components/          # Reusable UI components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Navigation.astro
│   ├── BlogCard.astro
│   ├── TagList.astro
│   ├── Pagination.astro
│   ├── ExternalLink.astro
│   └── ResumeSection.astro
├── layouts/             # Page layouts
│   ├── BaseLayout.astro
│   ├── BlogLayout.astro
│   └── PrintLayout.astro
├── pages/               # Route pages
│   ├── index.astro
│   ├── blog/
│   │   ├── index.astro
│   │   ├── [slug].astro
│   │   └── tag/[tag].astro
│   ├── resume.astro
│   ├── links.astro
│   ├── rss.xml.ts
│   └── 404.astro
├── content/             # Content collections (Astro content collections)
│   ├── blog/            # Blog posts (Markdown)
│   │   └── *.md
│   └── config.ts        # Content collection schema
├── data/                # Structured data files
│   ├── resume.yaml      # Resume data
│   └── links.yaml       # External links data
├── styles/              # Global styles
│   └── global.css
└── utils/               # Utility functions
    └── formatDate.ts

public/
├── favicon.ico
├── og-image.png
└── fonts/               # Self-hosted fonts (optional)

tests/
├── unit/                # Vitest unit tests
└── e2e/                 # Playwright E2E tests
```

**Structure Decision**: Single project structure using Astro's content collections for blog posts and YAML files for structured data. This aligns with Astro's recommended patterns and keeps the project simple.

## Complexity Tracking

No violations identified. The architecture adheres to all constitution principles with minimal complexity.
