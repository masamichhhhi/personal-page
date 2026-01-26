# Research: Personal Page Implementation

**Date**: 2025-01-25
**Feature**: 001-personal-page

## Technology Decisions

### 1. Static Site Generator: Astro 5.x

**Decision**: Use Astro 5.x as the static site generator

**Rationale**:
- Zero JavaScript by default - sends pure HTML, perfect for content-focused sites
- Content Collections provide type-safe Markdown handling with Zod schemas
- Built-in RSS feed support via @astrojs/rss
- First-class Tailwind CSS integration
- Excellent build performance and small bundle sizes
- Active community and regular updates

**Alternatives Considered**:
- Next.js: More complex, includes React runtime overhead unnecessary for static content
- Hugo: Faster builds but Go templating less familiar, harder to extend
- Eleventy: Flexible but less opinionated, requires more configuration

### 2. Hosting: Cloudflare Pages

**Decision**: Deploy to Cloudflare Pages

**Rationale**:
- Free tier sufficient for personal site (unlimited requests, 500 builds/month)
- Global CDN with edge caching for fast content delivery
- Automatic preview deployments on pull requests
- Native Git integration (GitHub/GitLab)
- Supports Astro out of the box with automatic build detection
- Custom domain support with free SSL

**Alternatives Considered**:
- Vercel: Excellent but free tier has bandwidth limits
- Netlify: Good option but Cloudflare's edge network is larger
- GitHub Pages: Limited build customization

### 3. Styling: Tailwind CSS 4.x

**Decision**: Use Tailwind CSS for styling

**Rationale**:
- Utility-first approach enables rapid development
- Built-in responsive design utilities (mobile-first)
- PurgeCSS removes unused styles for minimal CSS bundle
- Typography plugin (@tailwindcss/typography) provides excellent prose styling for blog content
- Print utilities for resume page styling

**Alternatives Considered**:
- Plain CSS: More control but slower development
- CSS Modules: Good isolation but more verbose
- Styled Components: Requires runtime, adds complexity

### 4. Content Management: Astro Content Collections

**Decision**: Use Astro Content Collections for blog posts

**Rationale**:
- Type-safe frontmatter validation with Zod schemas
- Automatic TypeScript types generation
- Built-in Markdown/MDX processing
- Query API for filtering and sorting posts
- Co-located content with source code (no external CMS)

**Alternatives Considered**:
- Raw Markdown files with gray-matter: Works but no type safety
- Headless CMS (Contentful, Sanity): Overkill for personal site, adds complexity
- MDX only: Content Collections provide better DX

### 5. Structured Data: YAML Files

**Decision**: Store resume and external links data in YAML files

**Rationale**:
- Human-readable format easy to edit
- Native YAML support in Node.js ecosystem
- Can be validated with TypeScript types
- No database required, version controlled with Git
- Simpler than JSON for multi-line content

**Alternatives Considered**:
- JSON: Less readable for multi-line strings
- TOML: Less familiar syntax
- Markdown with frontmatter: Better suited for long-form content

### 6. Testing: Vitest + Playwright

**Decision**: Use Vitest for unit tests, Playwright for E2E

**Rationale**:
- Vitest: Fast, Vite-native, excellent TypeScript support
- Playwright: Cross-browser E2E testing, visual comparison
- Both integrate well with Astro projects
- CI-friendly with GitHub Actions support

**Alternatives Considered**:
- Jest: Slower, requires more configuration for ESM
- Cypress: Good but Playwright is faster and supports more browsers

## Best Practices Research

### Astro Content Collections Pattern

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    summary: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

### Cloudflare Pages Deployment

```yaml
# Build configuration (auto-detected)
build_command: npm run build
build_output_directory: dist
node_version: 20
```

### RSS Feed Generation

```typescript
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Blog',
    description: 'Personal blog',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.summary,
      link: `/blog/${post.slug}/`,
    })),
  });
}
```

### Pagination Pattern

```typescript
// src/pages/blog/[...page].astro
export async function getStaticPaths({ paginate }) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
  return paginate(sortedPosts, { pageSize: 10 });
}
```

## Open Questions Resolved

| Question | Resolution |
|----------|------------|
| How to handle blog post URLs? | Use slug from filename: `/blog/[slug]` |
| How to implement tag filtering? | Dynamic routes: `/blog/tag/[tag]` with getStaticPaths |
| How to optimize images? | Use Astro's built-in `<Image />` component with automatic optimization |
| How to handle 404 pages? | Create `src/pages/404.astro` - Cloudflare Pages serves automatically |
| How to implement print styles? | Use Tailwind's `print:` variant and `@media print` in global CSS |

## Performance Optimization Strategies

1. **Image Optimization**: Use Astro's `<Image />` component for automatic WebP conversion and responsive images
2. **Font Loading**: Self-host fonts with `font-display: swap` for fast text rendering
3. **CSS**: Tailwind purges unused styles; final CSS typically <10KB gzipped
4. **JavaScript**: Astro ships zero JS by default; interactive islands only if needed
5. **Caching**: Cloudflare Pages provides automatic edge caching with long TTLs for static assets
