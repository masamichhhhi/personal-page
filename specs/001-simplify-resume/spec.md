# Feature Specification: Simplify Resume Experience Descriptions

**Feature Branch**: `001-simplify-resume`
**Created**: 2026-01-31
**Status**: Draft
**Input**: resumeのページの各会社でやったことはをもっと簡素に表現したい。各会社でやったことは1,2行の説明にとどめ、どういうものを開発してきたかとどういう役割をになっているかの2つの説明くらいでいい。また会社のサービスへのリンクを貼るようにしたい

## User Scenarios & Testing

### User Story 1 - Simplified Experience Descriptions (Priority: P1)

Resume page shows concise 1-2 line experience descriptions for each company, focusing on what was developed and the role played.

**Why this priority**: The current resume has long, detailed bullet points that make it hard to quickly scan and understand. Simplifying to 1-2 lines improves readability and allows visitors to quickly grasp key information.

**Independent Test**: Can be fully tested by viewing the resume page and verifying each company experience has only 1-2 concise description lines instead of multiple detailed bullets.

**Acceptance Scenarios**:

1. **Given** a visitor views the resume page, **When** they look at any company experience, **Then** they see 1-2 concise lines describing what was developed and the role
2. **Given** a visitor reads the experience description, **When** they want to understand the key contribution, **Then** the description clearly states both the development work and the role played

---

### User Story 2 - Company Service Links (Priority: P2)

Each company on the resume includes a clickable link to the company's service or website.

**Why this priority**: Adding company links helps visitors learn more about the companies and provides context about the work environment. This is valuable but secondary to the readability improvement.

**Independent Test**: Can be tested independently by clicking on company names or icons to verify they link to the correct company websites.

**Acceptance Scenarios**:

1. **Given** a visitor views a company on the resume, **When** they want to learn more about the company, **Then** they can click a link to visit the company's service or website
2. **Given** a visitor clicks a company link, **When** the link opens, **Then** it opens in a new tab and goes to the correct company website

---

### Edge Cases

- What happens when a company doesn't have a public website/service URL?
- How does the link display for companies that are no longer operating?
- How do we ensure the concise descriptions still capture the essential value of the work?

## Requirements

### Functional Requirements

- **FR-001**: System MUST display only 1-2 lines of description for each work experience instead of multiple bullet points
- **FR-002**: Each experience description MUST include what was developed (product/system type)
- **FR-003**: Each experience description MUST include the role played (Tech Lead, Backend Engineer, etc.)
- **FR-004**: Company names MUST include clickable links to company services/websites
- **FR-005**: Company links MUST open in a new tab when clicked
- **FR-006**: System MUST support optional company URLs (some companies may not have public URLs)

### Key Entities

- **WorkExperience**: Represents a job/role at a company
  - company: Company name
  - companyUrl: Optional link to company service/website (NEW)
  - role: Job title
  - startDate/endDate: Employment period
  - description: Simplified 1-2 line description (REPLACES responsibilities array)

## Success Criteria

### Measurable Outcomes

- **SC-001**: Each company experience displays exactly 1-2 lines of description (no more than 2 sentences)
- **SC-002**: All companies with public services have clickable links that open in new tabs
- **SC-003**: Resume page is more scannable - visitors can understand all experiences in under 30 seconds
- **SC-004**: Description format is consistent across all experiences (development work + role)
