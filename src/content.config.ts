import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const sharedSchema = z.object({
  title: z.string(),
  summary: z.string(),
  year: z.number().int().optional(),
  tags: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  externalUrl: z.url().optional(),
  githubUrl: z.url().optional(),
  image: z.string().optional()
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: sharedSchema.extend({
    status: z.enum(['active', 'complete', 'archived']).default('complete'),
    paperUrl: z.url().optional(),
    videoUrl: z.url().optional()
  })
});

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: sharedSchema.extend({
    venue: z.string().optional(),
    authors: z.array(z.string()).default([]),
    pdfUrl: z.url().optional()
  })
});

const opensource = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/opensource' }),
  schema: sharedSchema.extend({
    language: z.string().optional()
  })
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: sharedSchema.extend({
    channel: z.string().optional(),
    videoUrl: z.url()
  })
});

export const collections = { projects, papers, opensource, videos };
