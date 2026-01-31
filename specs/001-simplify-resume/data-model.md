# Data Model: Simplify Resume Experience Descriptions

**Feature**: 001-simplify-resume | **Date**: 2026-01-31

## Entity Changes

### WorkExperience (MODIFIED)

Represents a job/role at a company with simplified description format.

**Changes from current schema**:
- REMOVE `responsibilities: string[]` (array of detailed bullet points)
- ADD `description: string` (single 1-2 line summary)
- ADD `companyUrl?: string` (optional link to company service/website)

**Updated Schema**:

```typescript
interface WorkExperience {
  company: string;              // Company name (unchanged)
  companyUrl?: string;          // NEW: Optional URL to company service/website
  role: string;                 // Job title (unchanged)
  startDate: string;            // Employment start date (unchanged)
  endDate: string | null;       // Employment end date or null for current (unchanged)
  location?: string;            // Optional work location (unchanged)
  description: string;          // NEW: Concise 1-2 line summary (replaces responsibilities)
}
```

**Field Specifications**:

| Field | Type | Required | Format | Description |
|-------|------|----------|--------|-------------|
| company | string | Yes | Plain text | Company name (e.g., "VideoStep Inc") |
| companyUrl | string | No | Valid URL | Link to company service/website (e.g., "https://videostep.io") |
| role | string | Yes | Plain text | Job title (e.g., "Tech Lead") |
| startDate | string | Yes | YYYY-MM | Start date (e.g., "2024-08") |
| endDate | string \| null | Yes | YYYY-MM or null | End date or null for current role |
| location | string | No | Plain text | Work location (e.g., "Tokyo, Japan") |
| description | string | Yes | 1-2 sentences | Concise summary focusing on what was developed and the role played |

**Validation Rules**:

1. `description` must be 1-2 sentences (roughly 100-200 characters)
2. `description` should include:
   - What was developed (product type, system, feature)
   - Role played (leadership, technical focus, etc.)
3. `companyUrl` must be a valid URL if provided
4. `companyUrl` should use https:// protocol when possible

**Example Data**:

```yaml
# BEFORE (current structure)
- company: "VideoStep Inc"
  role: "Tech Lead"
  startDate: "2024-08"
  endDate: null
  location: "Japan"
  responsibilities:
    - "**AI Product Leadership**: Spearheaded the end-to-end development..."
    - "**End-to-End Delivery Acceleration**: Eliminated QA bottlenecks..."
    - "**Strategic Product Planning**: Balanced rapid feature expansion..."

# AFTER (simplified structure)
- company: "VideoStep Inc"
  companyUrl: "https://videostep.io"
  role: "Tech Lead"
  startDate: "2024-08"
  endDate: null
  location: "Japan"
  description: "Led end-to-end development of AI-powered automated manual generation tool for BtoB SaaS video platform as Tech Lead, securing major enterprise contracts."
```

## Data Migration

### Migration Steps

1. For each experience in `src/data/resume.yaml`:
   - Extract key points from `responsibilities` array
   - Condense into single `description` string (1-2 sentences)
   - Add `companyUrl` field with company website
   - Remove `responsibilities` field

2. Guidelines for condensing responsibilities:
   - Focus on highest-impact achievements
   - Emphasize what was built (product/system)
   - Clarify the role (Tech Lead, Backend Engineer, etc.)
   - Keep technical but concise

### Example Condensation

```yaml
# Original (4 bullet points)
responsibilities:
  - "**AI Product Leadership**: Spearheaded the end-to-end development of an automated manual generation tool using OpenAI API..."
  - "**End-to-End Delivery Acceleration**: Eliminated QA bottlenecks..."
  - "**Strategic Product Planning**: Balanced rapid feature expansion..."
  - "**Agile Team Leadership**: Revitalized the engineering culture..."

# Condensed (1-2 lines)
description: "Led end-to-end development of AI-powered automated manual generation tool for BtoB SaaS video platform as Tech Lead, securing major enterprise contracts."
```

## Relationships

No changes to relationships. WorkExperience remains a child entity of Resume with no relationships to other entities.

## State Transitions

N/A - WorkExperience is a static data entity with no state transitions.
