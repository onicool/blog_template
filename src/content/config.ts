import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()),
  }),
});

const about = defineCollection({
  type: 'data',
  schema: z.object({
    profile: z.object({
      name: z.string(),
      handle: z.string(),
      image: z.string(),
      description: z.string(),
    }),
    stats: z.object({
      level: z.number(),
      exp: z.number(),
      nextExp: z.number(),
      attributes: z.array(z.object({
        name: z.string(),
        value: z.number(),
        description: z.string(),
      })),
    }),
    skills: z.array(z.object({
      category: z.string(),
      items: z.array(z.string()),
    })),
    social: z.array(z.object({
      platform: z.string(),
      url: z.string(),
    })),
  }),
});

export const collections = { blog, about };