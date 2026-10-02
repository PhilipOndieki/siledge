import type { Metadata } from "next";
import { HomeHero } from "@/components/features/home/HomeHero";
import { CategoryGrid } from "@/components/features/categories/CategoryGrid";
import { IndustriesBand } from "@/components/features/home/IndustriesBand";
import { AboutPreview } from "@/components/features/home/AboutPreview";
import { FieldSupportShowcase } from "@/components/features/home/FieldSupportShowcase";
import { QualityTrustSection } from "@/components/features/home/QualityTrustSection";
import { ClosingCta } from "@/components/patterns/ClosingCta";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Reveal } from "@/components/primitives/Reveal";
import { slideUpAttach } from "@/lib/motion";
import { getCategories, getCompany, getIndustries, getUiCopy } from "@/lib/content/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  description:
    "Siledge Industrial Solutions Ltd supplies bearings, seals, power transmission components, and automation systems to manufacturing, agricultural, and transport operators across East Africa.",
  path: "/",
});

export default function HomePage() {
  const company = getCompany();
  const categories = getCategories();
  const industries = getIndustries();
  const ui = getUiCopy();

  return (
    <>
      <link rel="preload" as="video" type="video/mp4" href="/videos/hero.mp4" />
      <HomeHero ctaLabel={ui.hero.ctaLabel} />

      <Reveal
        className="relative z-10 -mt-10 sm:-mt-14 md:-mt-20"
        variants={slideUpAttach}
        amount={0.15}
      >
        <Container>
          <div className="bg-siledge-mist px-6 py-10 shadow-cardHover md:px-12 md:py-14">
            <Heading level={2} className="mb-10 text-center">
              Industries We Serve
            </Heading>
            <Reveal stagger>
              <IndustriesBand industries={industries} />
            </Reveal>
          </div>
        </Container>
      </Reveal>

      <Section tone="white" size="xl">
        <Container>
          <QualityTrustSection statement={company.qualityStatement} />
        </Container>
      </Section>

      <Section tone="mist" size="xl">
        <Container>
          <Reveal className="mb-24 text-center flex flex-col items-center">
            <Heading
              level={2}
              className="inline-block border-b-[3px] border-blue-800 pb-3 text-4xl md:text-5xl"
            >
              Product Categories
            </Heading>
            <p className="mx-auto mt-8 max-w-prose text-lg leading-relaxed text-siledge-slate md:text-xl">
              Eight core categories, stocked and specified for industrial duty.
            </p>
          </Reveal>
          <Reveal stagger>
            <CategoryGrid categories={categories} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" size="xl">
        <Container>
          <Reveal>
            <AboutPreview paragraph={company.overview[0] ?? ""} companyName={company.shortName} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist" size="xl">
        <Container>
          <Reveal>
            <FieldSupportShowcase fieldSupport={company.fieldSupport} />
          </Reveal>
        </Container>
      </Section>

      <Section size="lg" className="bg-siledge-blue">
        <Reveal>
          <ClosingCta closingCta={company.closingCta} />
        </Reveal>
      </Section>
    </>
  );
}
