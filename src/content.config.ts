import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({
  label: z.string(),
  url: z.url(),
});

/** Jobs, newest first. Ordered by `order` ascending. */
const experience = defineCollection({
  loader: file('src/data/experience.yaml'),
  schema: z.object({
    order: z.number(),
    company: z.string(),
    role: z.string(),
    period: z.string(),
    current: z.boolean().default(false),
    highlights: z
      .array(
        z.object({
          text: z.string(),
          link: link.optional(),
        }),
      )
      .default([]),
    tags: z.array(z.string()).default([]),
  }),
});

/** Packages published on pub.dev. The entry id is the package name. */
const packages = defineCollection({
  loader: file('src/data/packages.yaml'),
  schema: z.object({
    order: z.number(),
    description: z.string(),
    repo: z.string(),
    docs: z.url().optional(),
  }),
});

/** GitHub repositories. The entry id is the repository name. */
const projects = defineCollection({
  loader: file('src/data/projects.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    docs: z.url().optional(),
    packages: z.array(reference('packages')).default([]),
  }),
});

export const collections = { experience, packages, projects };
