import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1).max(100),
    publishedAt: z.date(),
    summary: z.string().min(1).max(200),
    readingTime: z.string().max(20).optional(),
    tags: z
      .array(
        z
          .string()
          .min(1)
          .max(30)
          .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Tags must be lowercase kebab-case')
      )
      .min(1)
      .max(5),
    draft: z.boolean().default(false),
    coverImage: z.string().url().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const collections = { blog };
