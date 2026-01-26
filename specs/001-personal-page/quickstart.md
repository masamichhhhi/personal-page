# Quickstart: Personal Page

**Date**: 2025-01-25
**Feature**: 001-personal-page

## Prerequisites

- Node.js 24 or later
- npm or pnpm
- Git
- Cloudflare account (free tier is sufficient)

## Quick Setup

### 1. Initialize Astro Project

```bash
# Create new Astro project with TypeScript
npm create astro@latest . -- --template minimal --typescript strict

# Install dependencies
npm install
```

### 2. Install Required Dependencies

```bash
# Core dependencies
npm install @astrojs/rss @astrojs/sitemap astro-icon yaml

# Tailwind CSS
npm install -D tailwindcss @tailwindcss/typography
npx astro add tailwind

# Testing
npm install -D vitest @vitest/ui playwright @playwright/test

# Development utilities
npm install -D prettier prettier-plugin-astro
```

### 3. Configure Astro

Update `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://your-domain.com', // Update with your domain
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    icon(),
  ],
  output: 'static',
});
```

### 4. Create Content Collection Config

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1).max(100),
    publishedAt: z.date(),
    summary: z.string().min(1).max(200),
    tags: z.array(z.string()).min(1).max(5),
    draft: z.boolean().default(false),
    coverImage: z.string().url().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const collections = { blog };
```

### 5. Create Data Directory Structure

```bash
mkdir -p src/data src/content/blog
```

Create `src/data/resume.yaml`:

```yaml
name: "Your Name"
title: "Your Title"
email: "your@email.com"
location: "City, Country"
summary: "A brief professional summary..."

experiences: []
skills: []
projects: []
```

Create `src/data/links.yaml`:

```yaml
links:
  - platform: "GitHub"
    url: "https://github.com/yourusername"
    description: "Open source projects"
    icon: "mdi:github"
```

### 6. Create First Blog Post

Create `src/content/blog/hello-world.md`:

```markdown
---
title: "Hello World"
publishedAt: 2025-01-25
summary: "Welcome to my blog!"
tags: ["introduction"]
---

This is my first blog post!
```

### 7. Deploy to Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (leave default)
6. Click "Save and Deploy"

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Format code
npm run format
```

## Package.json Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "test": "vitest",
    "test:e2e": "playwright test",
    "format": "prettier --write ."
  }
}
```

## Environment Variables

For local development, create `.env`:

```env
# No required environment variables for basic setup
# Add analytics or other service keys here if needed
```

For Cloudflare Pages:
1. Go to your project settings
2. Navigate to "Environment variables"
3. Add any required variables for production

## Verification Checklist

- [ ] `npm run dev` starts without errors
- [ ] Homepage loads at `http://localhost:4321`
- [ ] Blog list page shows sample post
- [ ] Blog post detail page renders Markdown
- [ ] Resume page displays data from YAML
- [ ] Links page shows external links
- [ ] `npm run build` completes successfully
- [ ] Preview build works locally
- [ ] Cloudflare Pages deployment succeeds

## Troubleshooting

### Content Collection Errors

If you see schema validation errors:
1. Check frontmatter matches the schema in `src/content/config.ts`
2. Ensure dates are in valid format (YYYY-MM-DD)
3. Check tags are arrays with at least 1 item

### Tailwind Styles Not Applied

1. Verify `tailwind.config.mjs` includes content paths
2. Check that `@tailwind` directives are in global CSS
3. Clear the `.astro` cache: `rm -rf .astro`

### Cloudflare Pages Build Fails

1. Check build logs for specific errors
2. Ensure Node.js version is set (Environment: `NODE_VERSION=24`)
3. Verify `astro.config.mjs` has correct `site` URL
