# Personal Page

A personal website with blog, resume, and external links built with Astro and deployed on Cloudflare Pages.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) 5.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.x
- **Icons**: [astro-icon](https://github.com/natemoo-re/astro-icon) with MDI icons
- **Language**: TypeScript
- **Runtime**: Node.js 24
- **Hosting**: Cloudflare Pages

## Features

- Blog with Markdown content, tags, and RSS feed
- Resume page with print-friendly styles
- External links section on homepage
- SEO optimized with OGP meta tags and sitemap
- Responsive design (mobile-first)
- Static site generation for optimal performance

## Getting Started

### Prerequisites

- Node.js 24 or later
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/masamichhhhi/personal-page.git
cd personal-page

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── content/
│   └── blog/         # Blog posts (Markdown)
├── data/
│   ├── links.yaml    # External links data
│   └── resume.yaml   # Resume data
├── layouts/          # Page layouts
├── pages/            # Route pages
├── styles/           # Global styles
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## Content Management

### Blog Posts

Create Markdown files in `src/content/blog/`:

```markdown
---
title: "Post Title"
publishedAt: 2025-01-26
summary: "Brief description"
tags: ["tag1", "tag2"]
draft: false
---

Your content here...
```

### Resume

Edit `src/data/resume.yaml` to update your resume information.

### External Links

Edit `src/data/links.yaml` to manage your external platform links:

```yaml
links:
  - platform: "GitHub"
    url: "https://github.com/username"
    description: "Open source projects"
    icon: "mdi:github"
```

## Deployment

### Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `24`
6. Click "Save and Deploy"

## License

MIT
