import type { Metadata } from "next";
import { HomeHero } from "@/components/features/home/HomeHero";
import { PillarBand } from "@/components/features/home/PillarBand";
import { CategoryGrid } from "@/components/features/categories/CategoryGrid";
import { IndustriesBand } from "@/components/features/home/IndustriesBand";
import { AboutPreview } from "@/components/features/home/AboutPreview";
import { ServicesStrip } from "@/components/features/home/ServicesStrip";
import { TrustBand } from "@/components/features/home/TrustBand";
import { ClosingCta } from "@/components/features/home/ClosingCta";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Reveal } from "@/components/primitives/Reveal";
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

      <Section tone="mist">
        <Container>
          <Reveal stagger>
            <PillarBand pillars={company.pillars} />
          </Reveal>
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
          <Reveal className="mb-10 text-center">
            <Heading level={2}>Industries We Serve</Heading>
          </Reveal>
          <Reveal stagger>
            <IndustriesBand industries={industries} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal>
            <AboutPreview paragraph={company.overview[0] ?? ""} companyName={company.shortName} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <Reveal className="mb-10 text-center">
            <Heading level={2}>Our Services</Heading>
          </Reveal>
          <Reveal stagger>
            <ServicesStrip services={services} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <Reveal stagger>
            <TrustBand trustPoints={company.trustPoints} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Reveal>
          <ClosingCta phones={company.contact.phones} />
        </Reveal>
      </Section>
    </>
  );
}
