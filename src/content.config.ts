import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const projectSchema = z.object({
  title: z.string(),
  summary: z.string().default(''),
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
  schema: projectSchema.extend({
    status: z.enum(['active', 'complete', 'archived']).default('complete'),
    paperUrl: z.url().optional(),
    videoUrl: z.url().optional()
  })
});

export const collections = { projects };
