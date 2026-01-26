/**
 * Blog Post Content Collection Schema
 *
 * This schema defines the structure of blog post frontmatter.
 * Used by Astro Content Collections for type-safe content handling.
 */

import { z } from 'astro:content';

export const blogSchema = z.object({
  /**
   * Article title displayed in list and detail views
   * @maxLength 100
   */
  title: z.string().min(1).max(100),

  /**
   * Publication date in ISO 8601 format
   * Used for sorting and display
   */
  publishedAt: z.date(),

  /**
   * Brief description shown in article list
   * @maxLength 200
   */
  summary: z.string().min(1).max(200),

  /**
   * Category tags for filtering
   * Each tag should be lowercase kebab-case
   * @minItems 1
   * @maxItems 5
   */
  tags: z.array(
    z.string()
      .min(1)
      .max(30)
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Tags must be lowercase kebab-case')
  ).min(1).max(5),

  /**
   * If true, post is excluded from production build
   * @default false
   */
  draft: z.boolean().default(false),

  /**
   * Optional cover image for OGP and article header
   */
  coverImage: z.string().url().optional(),

  /**
   * Optional last updated date
   * If provided, shown on article page
   */
  updatedAt: z.date().optional(),
});

export type BlogPost = z.infer<typeof blogSchema>;
