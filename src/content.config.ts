import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const feedCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/feed" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(['Engineering', 'Philosophy', 'Gaming', 'Ventures']),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    readTime: z.string().default('5 min read'),
    watchModelSync: z.string().optional(),
    telemetryCode: z.string().default('SYS.LOG.001'),
  }),
});

export const collections = {
  feed: feedCollection,
};
