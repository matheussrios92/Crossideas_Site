import { defineCollection, z } from 'astro:content';

const categories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(), // string livre — gerenciado via relation no CMS
    description: z.string(),
    material: z.string(),
    image: z.string(),
    featured: z.boolean().default(false),
  }),
});

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    body: z.string(),
    rating: z.number().min(1).max(5),
  }),
});

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
  }),
});

export const collections = { categories, products, reviews, faq };
