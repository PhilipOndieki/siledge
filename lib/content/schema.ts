import { z } from "zod";

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase kebab-case");

export const categorySchema = z.object({
  slug: slugSchema,
  name: z.string().min(2),
  order: z.number().int().nonnegative(),
  tagline: z.string().min(4),
  attributes: z.array(z.string().min(2)).min(1).max(4),
  description: z.string().min(20),
  icon: z.string(),
  featured: z.boolean().default(false),
  image: z.string().nullable().default(null),
});

export const productSchema = z.object({
  id: slugSchema,
  name: z.string().min(2),
  categorySlug: slugSchema,
  blurb: z.string().max(160).nullable().default(null),
  image: z.string().nullable().default(null),
  specs: z.record(z.string(), z.string()).default({}),
});

export const serviceSchema = z.object({
  id: slugSchema,
  name: z.string().min(2),
  summary: z.string().min(20),
  icon: z.string(),
});

export const industrySchema = z.object({
  id: slugSchema,
  name: z.string().min(2),
  icon: z.string(),
});

export const companySchema = z.object({
  legalName: z.string(),
  shortName: z.string(),
  tagline: z.string(),
  overview: z.array(z.string()).min(1),
  vision: z.string(),
  mission: z.string(),
  pillars: z
    .array(
      z.object({
        title: z.string(),
        line: z.string(),
        icon: z.string(),
      }),
    )
    .length(3),
  trustPoints: z
    .array(
      z.object({
        title: z.string(),
        icon: z.string(),
      }),
    )
    .length(6),
  contact: z.object({
    physicalAddress: z.array(z.string()),
    postalAddress: z.array(z.string()),
    phones: z.array(z.string().regex(/^\+254\s\d{3}\s\d{3}\s\d{3}$/)).min(1),
    emails: z.array(z.string().email()).min(1),
    website: z.string().url(),
    geo: z.object({ lat: z.number(), lng: z.number() }).nullable(),
  }),
});

export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Industry = z.infer<typeof industrySchema>;
export type Company = z.infer<typeof companySchema>;
export type CategorySlug = Category["slug"];
