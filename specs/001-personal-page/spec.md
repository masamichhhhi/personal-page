# Feature Specification: Personal Page

**Feature Branch**: `001-personal-page`
**Created**: 2025-01-24
**Status**: Draft
**Input**: User description: "パーソナルページの作成（ブログ公開、レジュメ表示、外部リンク集約）"

## Clarifications

### Session 2025-01-24

- Q: デフォルト言語はどちらか？ → A: 英語（ヘッダーで日本語切替可能）
- Q: ブログ記事の言語管理方式は？ → A: 日本語のみで執筆、UIのみ多言語対応
- Q: レジュメの言語管理方式は？ → A: 日本語のみで執筆、UIのみ多言語対応
- Q: 言語切替のURL構造は？ → A: クエリパラメータ方式（例: `/blog?lang=ja`）

### Session 2025-01-25

- Q: 多言語対応は必要か？ → A: 不要。英語の記事とUIのみで公開する

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Blog Article Viewing (Priority: P1)

As a visitor, I want to read blog articles written by the site owner. I can select articles of interest from the article list and read the full content. Articles are tagged to help find related content.

**Why this priority**: The blog is the primary content of the personal page with dynamic, continuously updated content. It's the most frequently accessed feature for visitors, so it should be implemented first.

**Independent Test**: Access the blog list page, click an article, and read the full content on the detail page. This alone provides MVP-level value.

**Acceptance Scenarios**:

1. **Given** a visitor accesses the site, **When** viewing the blog list page, **Then** article titles, publication dates, and summaries are displayed in a list
2. **Given** viewing the blog list page, **When** clicking an article title, **Then** navigates to the article detail page showing the full content
3. **Given** viewing an article detail page, **When** clicking a tag, **Then** displays a list of articles with the same tag
4. **Given** viewing the blog list page, **When** there are many articles, **Then** pagination is provided

---

### User Story 2 - Resume Viewing (Priority: P2)

As a visitor, I want to review the site owner's work history, skills, and project achievements. Hiring managers and potential collaborators can view systematically organized information.

**Why this priority**: The resume is core static content for personal branding. It's the next information visitors check after becoming interested through the blog, making it the second priority.

**Independent Test**: Access the resume page and view structured work history, skills, and project information. Printing and PDF export are also available.

**Acceptance Scenarios**:

1. **Given** a visitor accesses the site, **When** viewing the resume page, **Then** work history, skills, and project achievements are displayed in separate sections
2. **Given** viewing the resume page, **When** reviewing each section, **Then** information is organized in reverse chronological order (newest first)

---

### User Story 3 - External Links & Profile (Priority: P3)

As a visitor, I want to find links to the site owner's external platforms (GitHub, LinkedIn, etc.). I can directly access platforms of interest.

**Why this priority**: External links redirect to existing content elsewhere and don't add new content to this site. It's a complementary feature to implement after blog and resume are complete.

**Independent Test**: View the external link list from the profile page or sidebar and click links to navigate to external sites.

**Acceptance Scenarios**:

1. **Given** a visitor accesses the site, **When** viewing the profile section, **Then** external links (GitHub, LinkedIn, etc.) are displayed with icons
2. **Given** viewing the external link list, **When** clicking a link, **Then** the external site opens in a new tab
3. **Given** viewing the external link list, **When** reviewing each link, **Then** platform name and brief description are displayed

---

### Edge Cases

- When there are no blog articles, display "No articles yet" message
- When accessing a non-existent article URL, display a 404 page
- When an image fails to load, display alt text or placeholder
- When an external link target is invalid, the site itself should not error (treat as external site issue)

## Requirements *(mandatory)*

### Functional Requirements

**Blog Features**

- **FR-001**: The system must display the article list in reverse chronological order (newest first)
- **FR-002**: The system must support articles with title, publication date, summary, body content, and tags
- **FR-003**: The system must provide article filtering by tags
- **FR-004**: The system must provide pagination when article count exceeds 10
- **FR-005**: The system must provide RSS/Atom feed

**Resume Features**

- **FR-006**: The system must display a work history section (company, role, period, responsibilities)
- **FR-007**: The system must display a skills section (skills organized by category)
- **FR-008**: The system must display a projects section (project name, summary, role)
- **FR-009**: The system must apply print-friendly styles

**External Links Features**

- **FR-010**: The system must display a list of links to external platforms
- **FR-011**: The system must support links with platform name, URL, and description
- **FR-012**: The system must open external links in a new tab

**Common Features**

- **FR-013**: The system must provide a navigation menu on all pages
- **FR-014**: The system must set appropriate metadata (title, description, OGP) for each page
- **FR-015**: The system must display properly on both mobile and desktop devices

### Key Entities

- **BlogPost**: Represents a blog article. Has title, publication date, summary, body content (Markdown), tags (multiple), and slug (for URL)
- **Tag**: Used for categorizing articles. Has name and slug. Can be associated with multiple articles
- **WorkExperience**: Represents work history. Has company name, role, start date, end date (or "present"), and responsibilities
- **Skill**: Represents a skill. Has name and category (language, framework, tool, etc.)
- **Project**: Represents a project achievement. Has project name, summary, role, related technologies, and period
- **ExternalLink**: Represents an external link. Has platform name, URL, description, and icon type

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can reach article detail pages from the blog list within 3 clicks
- **SC-002**: Initial page load completes within 3 seconds (on standard mobile connection)
- **SC-003**: All pages are viewable without horizontal scrolling on mobile devices (width 320px+)
- **SC-004**: Resume page prints cleanly on A4 paper with all information readable
- **SC-005**: Search engines can directly access each blog article (individual URLs exist)
- **SC-006**: Site owner can publish new blog articles by simply adding Markdown files
- **SC-007**: Site owner can update resume information by editing configuration files

## Assumptions

The following assumptions underpin this specification:

- Site is published as a static site with no authentication required (no admin panel, content managed via files)
- Comment functionality is not included in initial scope
- Site is English-only (both UI and content)
- Search functionality is not included in initial scope (tag filtering is the alternative)
- Analytics will use external services (e.g., Google Analytics)
