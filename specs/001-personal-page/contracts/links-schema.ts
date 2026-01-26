/**
 * External Links Data Schema
 *
 * This schema defines the structure of links.yaml data file.
 * Validated at build time for type safety.
 */

import { z } from 'zod';

/**
 * External platform link entry
 */
export const externalLinkSchema = z.object({
  /** Platform name (e.g., "GitHub", "LinkedIn") */
  platform: z.string().min(1).max(50),

  /** Full URL to profile/page */
  url: z.string().url(),

  /** Description of what visitors will find */
  description: z.string().min(1).max(200),

  /**
   * Icon identifier for astro-icon
   * Use iconify format: "mdi:github", "simple-icons:linkedin"
   * @see https://icon-sets.iconify.design/
   */
  icon: z.string().min(1).max(50),
});

/**
 * External links collection
 */
export const linksSchema = z.object({
  /** List of external platform links */
  links: z.array(externalLinkSchema).min(0).max(20),
});

export type ExternalLink = z.infer<typeof externalLinkSchema>;
export type Links = z.infer<typeof linksSchema>;
