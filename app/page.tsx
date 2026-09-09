import type { Metadata } from "next";
import { HomeHero } from "@/components/features/home/HomeHero";
import { CategoryGrid } from "@/components/features/categories/CategoryGrid";
import { IndustriesBand } from "@/components/features/home/IndustriesBand";
import { AboutPreview } from "@/components/features/home/AboutPreview";
import { ServicesStrip } from "@/components/features/home/ServicesStrip";
import { QualityTrustSection } from "@/components/features/home/QualityTrustSection";
import { ClosingCta } from "@/components/features/home/ClosingCta";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Reveal } from "@/components/primitives/Reveal";
import { slideUpAttach } from "@/lib/motion";
import {
  getCategories,
  getCompany,
  getIndustries,
  getServices,
  getUiCopy,
} from "@/lib/content/queries";
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
  const services = getServices();
  const ui = getUiCopy();

  return (
    <>
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

      <Section tone="mist">
        <Container>
          <QualityTrustSection statement={company.qualityStatement} />
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal className="mb-10 text-center">
            <Heading level={2}>Product Categories</Heading>
            <p className="mx-auto mt-3 max-w-prose text-siledge-slate">
              Eight core categories, stocked and specified for industrial duty.
            </p>
          </Reveal>
          <Reveal stagger>
            <CategoryGrid categories={categories} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <Reveal>
            <AboutPreview paragraph={company.overview[0] ?? ""} companyName={company.shortName} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal className="mb-10 text-center">
            <Heading level={2}>Our Services</Heading>
          </Reveal>
          <Reveal stagger>
            <ServicesStrip services={services} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist">
        <Reveal>
          <ClosingCta phones={company.contact.phones} />
        </Reveal>
      </Section>
    </>
  );
}
