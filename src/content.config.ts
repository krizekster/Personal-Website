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

const researchCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    authors: z.array(z.string()).default(['Krishna Soni']),
    venue: z.string(),
    venueDetail: z.string().optional(),
    status: z.enum(['peer-reviewed', 'preprint', 'working-paper']),
    date: z.coerce.date().optional(),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    abstract: z.string(),
    contribution: z.string(),
    keywords: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = {
  feed: feedCollection,
  research: researchCollection,
};
