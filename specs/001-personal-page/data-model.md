# Data Model: Personal Page

**Date**: 2025-01-25
**Feature**: 001-personal-page

## Overview

This document defines the data structures used in the personal page. All data is file-based with no database required.

## Entities

### 1. BlogPost (Content Collection)

Represents a blog article stored as a Markdown file with frontmatter.

**Storage**: `src/content/blog/*.md`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Article title (max 100 chars) |
| publishedAt | Date | Yes | Publication date (ISO 8601) |
| summary | string | Yes | Brief description for list view (max 200 chars) |
| tags | string[] | Yes | Category tags (1-5 tags per post) |
| slug | string | Auto | Derived from filename (e.g., `my-post.md` → `my-post`) |
| draft | boolean | No | If true, excluded from production build (default: false) |
| body | Markdown | Yes | Article content (in file body, not frontmatter) |

**Validation Rules**:
- `title`: Non-empty, max 100 characters
- `summary`: Non-empty, max 200 characters
- `tags`: Array with 1-5 items, each tag lowercase kebab-case
- `publishedAt`: Valid date, not in future
- `slug`: Lowercase, alphanumeric with hyphens only

**Example** (`src/content/blog/hello-world.md`):
```markdown
---
title: "Hello World"
publishedAt: 2025-01-25
summary: "My first blog post introducing myself and this site."
tags: ["introduction", "personal"]
draft: false
---

Welcome to my blog! This is my first post...
```

### 2. Tag (Derived)

Tags are derived from BlogPost entries, not stored separately.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Tag display name (title case from slug) |
| slug | string | URL-safe identifier |
| count | number | Number of posts with this tag |

**Derivation Logic**:
```typescript
// Computed at build time from all blog posts
const tags = posts.flatMap(p => p.data.tags)
  .reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
```

### 3. WorkExperience (YAML Data)

Represents a work history entry.

**Storage**: `src/data/resume.yaml` → `experiences[]`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| company | string | Yes | Company name |
| role | string | Yes | Job title/position |
| startDate | string | Yes | Start date (YYYY-MM format) |
| endDate | string | No | End date (YYYY-MM) or null for current |
| responsibilities | string[] | Yes | List of responsibilities/achievements |
| location | string | No | Work location (city, country) |

**Example**:
```yaml
experiences:
  - company: "Acme Corp"
    role: "Senior Software Engineer"
    startDate: "2022-01"
    endDate: null  # Current position
    location: "Tokyo, Japan"
    responsibilities:
      - "Led development of microservices architecture"
      - "Mentored junior developers"
```

### 4. Skill (YAML Data)

Represents a skill organized by category.

**Storage**: `src/data/resume.yaml` → `skills[]`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| category | string | Yes | Skill category (e.g., "Languages", "Frameworks") |
| items | string[] | Yes | List of skills in this category |

**Example**:
```yaml
skills:
  - category: "Languages"
    items: ["TypeScript", "Python", "Go"]
  - category: "Frameworks"
    items: ["React", "Astro", "FastAPI"]
```

### 5. Project (YAML Data)

Represents a project achievement.

**Storage**: `src/data/resume.yaml` → `projects[]`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Project name |
| summary | string | Yes | Brief project description |
| role | string | Yes | Your role in the project |
| technologies | string[] | Yes | Technologies used |
| period | string | Yes | Project duration (e.g., "2023-01 - 2023-06") |
| url | string | No | Project URL if public |

**Example**:
```yaml
projects:
  - name: "E-commerce Platform"
    summary: "Built a scalable e-commerce platform handling 10k daily orders"
    role: "Tech Lead"
    technologies: ["TypeScript", "Next.js", "PostgreSQL"]
    period: "2023-01 - 2023-06"
    url: "https://example.com"
```

### 6. ExternalLink (YAML Data)

Represents an external platform link.

**Storage**: `src/data/links.yaml` → `links[]`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| platform | string | Yes | Platform name (e.g., "GitHub") |
| url | string | Yes | Full URL to profile |
| description | string | Yes | What visitors will find there |
| icon | string | Yes | Icon identifier for astro-icon |

**Example**:
```yaml
links:
  - platform: "GitHub"
    url: "https://github.com/username"
    description: "Open source projects and contributions"
    icon: "mdi:github"
  - platform: "LinkedIn"
    url: "https://linkedin.com/in/username"
    description: "Professional profile and network"
    icon: "mdi:linkedin"
```

## Data File Structures

### resume.yaml

```yaml
# src/data/resume.yaml
name: "John Doe"
title: "Software Engineer"
email: "john@example.com"
location: "Tokyo, Japan"
summary: "Experienced software engineer with focus on web technologies..."

experiences:
  - company: "..."
    # ... (see WorkExperience)

skills:
  - category: "..."
    # ... (see Skill)

projects:
  - name: "..."
    # ... (see Project)
```

### links.yaml

```yaml
# src/data/links.yaml
links:
  - platform: "..."
    # ... (see ExternalLink)
```

## Relationships

```
BlogPost *--* Tag (many-to-many, derived)
Resume 1--* WorkExperience
Resume 1--* Skill
Resume 1--* Project
Site 1--* ExternalLink
```

## State Transitions

### BlogPost Lifecycle

```
Draft → Published → (Updated) → Published
  ↓
Archived (deleted from filesystem)
```

- **Draft**: `draft: true` in frontmatter, not included in production build
- **Published**: `draft: false` or omitted, visible on site
- **Updated**: Content modified, `publishedAt` unchanged (can add `updatedAt` if needed)
- **Archived**: File deleted from `src/content/blog/`
