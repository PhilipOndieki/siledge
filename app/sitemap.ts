import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/content/queries";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: siteUrl("/products"), changeFrequency: "weekly", priority: 0.9 },
    { url: siteUrl("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: siteUrl("/contact"), changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map((category) => ({
    url: siteUrl(`/products#${category.slug}`),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
