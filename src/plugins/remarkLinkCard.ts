/**
 * remark plugin: remarkLinkCard
 *
 * Converts standalone bare URLs in paragraphs into OGP link-preview cards.
 * A "bare URL" paragraph is one whose only child is a link node where the
 * link text equals the href (i.e. not [label](url) syntax).
 *
 * Fetches OGP metadata at build time using native fetch (Node >= 24).
 */

import { visit } from 'unist-util-visit';
import type { Root, Paragraph, Link } from 'mdast';

interface OgpData {
  title: string;
  description: string;
  image: string;
  favicon: string;
  siteName: string;
  url: string;
}

async function fetchOgp(url: string): Promise<OgpData | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; LinkPreviewBot/1.0; +https://example.com)',
      },
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    const html = await res.text();

    /** Extract content from a <meta> tag by property or name */
    const getMeta = (key: string): string => {
      const byProperty = html.match(
        new RegExp(
          `<meta[^>]*property=["']${key}["'][^>]*content=["']([^"']*)["']`,
          'i'
        )
      );
      if (byProperty) return byProperty[1];

      const byPropertyReversed = html.match(
        new RegExp(
          `<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${key}["']`,
          'i'
        )
      );
      if (byPropertyReversed) return byPropertyReversed[1];

      const byName = html.match(
        new RegExp(
          `<meta[^>]*name=["']${key}["'][^>]*content=["']([^"']*)["']`,
          'i'
        )
      );
      if (byName) return byName[1];

      const byNameReversed = html.match(
        new RegExp(
          `<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${key}["']`,
          'i'
        )
      );
      return byNameReversed ? byNameReversed[1] : '';
    };

    const rawTitle =
      getMeta('og:title') ||
      html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ||
      url;
    const description =
      getMeta('og:description') || getMeta('description') || '';
    const image = getMeta('og:image') || '';
    const siteName = getMeta('og:site_name') || '';

    const domain = new URL(url).hostname;
    const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

    // Decode HTML entities in title
    const title = rawTitle
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

    return {
      title,
      description: description.replace(/&amp;/g, '&').replace(/&#39;/g, "'").trim(),
      image,
      favicon,
      siteName: siteName || domain,
      url,
    };
  } catch {
    return null;
  }
}

function escape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateCardHtml(ogp: OgpData): string {
  const imageHtml = ogp.image
    ? `<div class="lc-image">
        <img src="${escape(ogp.image)}" alt="" loading="lazy" />
      </div>`
    : '';

  const descriptionHtml = ogp.description
    ? `<p class="lc-description">${escape(ogp.description)}</p>`
    : '';

  return `<a href="${escape(ogp.url)}" target="_blank" rel="noopener noreferrer" class="link-card" aria-label="${escape(ogp.title)}">
  <div class="lc-body">
    <div class="lc-text">
      <p class="lc-title">${escape(ogp.title)}</p>
      ${descriptionHtml}
      <div class="lc-meta">
        <img src="${escape(ogp.favicon)}" alt="" class="lc-favicon" width="16" height="16" />
        <span class="lc-site">${escape(ogp.siteName)}</span>
      </div>
    </div>
    ${imageHtml}
  </div>
</a>`;
}

export function remarkLinkCard() {
  return async function transformer(tree: Root): Promise<void> {
    const tasks: Array<{ index: number; parent: Root['children'][number] & { children: Root['children'] }; url: string }> = [];

    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.children.length !== 1) return;

      const child = node.children[0];
      if (child.type !== 'link') return;

      const link = child as Link;
      const linkText = link.children
        .map((c) => ('value' in c ? (c as { value: string }).value : ''))
        .join('');

      // Only process bare URLs (where visible text equals the href)
      if (linkText !== link.url) return;
      if (!link.url.startsWith('http')) return;

      tasks.push({
        index,
        parent: parent as Root['children'][number] & { children: Root['children'] },
        url: link.url,
      });
    });

    await Promise.all(
      tasks.map(async ({ index, parent, url }) => {
        console.log(`[remarkLinkCard] Fetching OGP: ${url}`);
        const ogp = await fetchOgp(url);

        if (!ogp) {
          console.warn(`[remarkLinkCard] Failed to fetch OGP for: ${url}`);
          return;
        }

        (parent.children as unknown[])[index] = {
          type: 'html',
          value: generateCardHtml(ogp),
        };
      })
    );
  };
}
