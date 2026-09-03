import type { Metadata } from "next";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { ProductsBrowser } from "@/components/features/products/ProductsBrowser";
import { getCategories, getProducts } from "@/lib/content/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Browse Siledge Industrial Solutions' full catalogue of bearings, seals, power transmission components, and automation systems.",
  path: "/products",
});

export default function ProductsPage() {
  const categories = getCategories();
  const products = getProducts();

  return (
    <>
      <PageHero
        heading="Our Products"
        supportingLine="Genuine industrial components, organised by category and ready to specify."
      />
      <Section tone="mist">
        <Container>
          <ProductsBrowser categories={categories} products={products} />
        </Container>
      </Section>
    </>
  );
}
