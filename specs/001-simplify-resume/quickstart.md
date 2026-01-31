# Quick Start Guide: Simplify Resume Experience Descriptions

**Feature**: 001-simplify-resume | **Last Updated**: 2026-01-31

## Overview

This guide provides step-by-step instructions to implement simplified resume experience descriptions with company links.

## Prerequisites

- Feature branch `001-simplify-resume` checked out
- Node.js 24+ installed
- Dependencies installed (`npm install`)

## Implementation Steps

### Step 1: Update TypeScript Interface

**File**: `src/types/resume.ts`

**Change**:
```typescript
// BEFORE
export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  location?: string;
  responsibilities: string[];  // REMOVE THIS
}

// AFTER
export interface WorkExperience {
  company: string;
  companyUrl?: string;         // ADD THIS
  role: string;
  startDate: string;
  endDate: string | null;
  location?: string;
  description: string;         // ADD THIS (replaces responsibilities)
}
```

**Why first**: TypeScript interface changes provide type safety for subsequent changes.

### Step 2: Update Astro Component

**File**: `src/components/ResumeExperience.astro`

**Changes**:

1. Update company name to be a link (if URL exists):
```astro
<!-- BEFORE -->
<span class="font-medium">{exp.company}</span>

<!-- AFTER -->
{exp.companyUrl ? (
  <a
    href={exp.companyUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="font-medium hover:text-blue-600 transition-colors"
  >
    {exp.company}
  </a>
) : (
  <span class="font-medium">{exp.company}</span>
)}
```

2. Replace responsibilities list with description:
```astro
<!-- BEFORE -->
<ul class="list-disc list-outside ml-4 space-y-1 text-gray-700">
  {exp.responsibilities.map((item) => (
    <li>{item}</li>
  ))}
</ul>

<!-- AFTER -->
<p class="text-gray-700 leading-relaxed">{exp.description}</p>
```

**Full updated component**:
```astro
---
import { formatDateRange } from '@utils/formatDate';
import type { WorkExperience } from '@/types/resume';

interface Props {
  experiences: WorkExperience[];
}

const { experiences } = Astro.props;
---

<section class="mb-12">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Work Experience
  </h2>
  <div class="space-y-8">
    {experiences.map((exp) => (
      <div class="relative pl-6 border-l-2 border-gray-200">
        <div class="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full" />
        <div class="mb-2">
          <h3 class="text-xl font-semibold text-gray-900">{exp.role}</h3>
          <div class="flex flex-wrap items-center gap-2 text-gray-600">
            {exp.companyUrl ? (
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium hover:text-blue-600 transition-colors"
              >
                {exp.company}
              </a>
            ) : (
              <span class="font-medium">{exp.company}</span>
            )}
            {exp.location && (
              <>
                <span class="text-gray-400">•</span>
                <span>{exp.location}</span>
              </>
            )}
          </div>
          <p class="text-sm text-gray-500 mt-1">
            {formatDateRange(exp.startDate, exp.endDate)}
          </p>
        </div>
        <p class="text-gray-700 leading-relaxed">{exp.description}</p>
      </div>
    ))}
  </div>
</section>
```

### Step 3: Update Resume Data

**File**: `src/data/resume.yaml`

Update each experience entry following this template:

```yaml
- company: "[Company Name]"
  companyUrl: "[https://company-website.com]"  # Optional, omit if N/A
  role: "[Role Title]"
  startDate: "YYYY-MM"
  endDate: "YYYY-MM"  # or null for current
  location: "[Location]"  # Optional
  description: "[1-2 sentence summary focusing on what was developed and the role played]"
```

**Example**:
```yaml
# VideoStep Inc - Tech Lead
- company: "VideoStep Inc"
  companyUrl: "https://videostep.io"
  role: "Tech Lead"
  startDate: "2024-08"
  endDate: null
  location: "Japan"
  description: "Led end-to-end development of AI-powered automated manual generation tool for BtoB SaaS video platform as Tech Lead, securing major enterprise contracts."

# VideoStep Inc - Fullstack Engineer
- company: "VideoStep Inc"
  companyUrl: "https://videostep.io"
  role: "Fullstack Engineer"
  startDate: "2023-12"
  endDate: "2024-07"
  location: "Japan"
  description: "Optimized video editing tool performance and led Scrum process improvements as Fullstack Engineer, reducing wait times by 50% and improving UX satisfaction by 70%."

# Raksul Inc
- company: "Raksul Inc"
  companyUrl: "https://raksul.com"
  role: "Backend Engineer"
  startDate: "2022-04"
  endDate: "2023-11"
  location: "Japan"
  description: "Architected fault-tolerant webhook synchronization platform using AWS SNS/SQS/Lambda as Backend Engineer, achieving 100% event delivery reliability."

# ANIFTY Inc
- company: "ANIFTY Inc"
  role: "Full-Stack Engineer (Founding Member)"
  startDate: "2021-06"
  endDate: "2022-08"
  location: "Remote"
  description: "Co-founded engineering team and built Anime/Illustration NFT marketplace from scratch using Next.js and Node.js, acquiring 500+ users in under 2 months."

# Nexceed Inc
- company: "Nexceed Inc"
  role: "Full-Stack Engineer"
  startDate: "2019-08"
  endDate: "2021-08"
  location: "Japan"
  description: "Led backend migration from legacy monolith to modular Nest.js architecture and developed construction management tool POC approved for commercial development."
```

### Step 4: Verify Changes

Run the development server:
```bash
npm run dev
```

Visit `http://localhost:4321/resume` and verify:

1. ✅ Each experience shows 1-2 line description (not bullet list)
2. ✅ Company names with URLs are clickable and styled
3. ✅ Company links open in new tab (`target="_blank"`)
4. ✅ Companies without URLs display as plain text
5. ✅ Description format is consistent across all experiences
6. ✅ Content is readable on mobile and desktop

### Step 5: Test Print Functionality

1. Visit resume page
2. Click "Print / Save as PDF" button
3. Verify PDF output looks correct with simplified descriptions

### Step 6: Run Tests & Linting

```bash
npm test && npm run lint
```

## Rollback Instructions

If issues occur, rollback in reverse order:

1. Restore `src/data/resume.yaml` from git:
   ```bash
   git checkout main -- src/data/resume.yaml
   ```

2. Restore component:
   ```bash
   git checkout main -- src/components/ResumeExperience.astro
   ```

3. Restore types:
   ```bash
   git checkout main -- src/types/resume.ts
   ```

## Common Issues

### Issue: TypeScript errors after Step 1
**Solution**: Run `npm run build` to regenerate type declarations

### Issue: Resume page shows empty descriptions
**Solution**: Ensure all experiences in resume.yaml have `description` field (not `responsibilities`)

### Issue: Company links not clickable
**Solution**: Verify `companyUrl` field is present and is valid URL format

### Issue: PDF print layout broken
**Solution**: Check that print CSS classes (`.print:*`) are still applied correctly

## Next Steps

After successful implementation:
1. Create commit with changes
2. Run `/speckit.tasks` to generate task breakdown if needed
3. Open PR for review
