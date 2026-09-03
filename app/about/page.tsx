import type { Metadata } from "next";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";
import { Reveal } from "@/components/primitives/Reveal";
import { VisionMissionCards } from "@/components/features/about/VisionMissionCards";
import { TrustPointsGrid } from "@/components/features/about/TrustPointsGrid";
import { ServiceGrid } from "@/components/features/services/ServiceGrid";
import { getCompany, getServices } from "@/lib/content/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Siledge Industrial Solutions Ltd: our vision, mission, services, and why manufacturing, agricultural, and transport operators trust us.",
  path: "/about",
});

export default function AboutPage() {
  const company = getCompany();
  const services = getServices();

  return (
    <>
      <PageHero heading="About Siledge" supportingLine={company.tagline} />

      <Section tone="white">
        <Container>
          <Reveal className="mx-auto max-w-prose space-y-4 text-siledge-slate">
            {company.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <Reveal stagger>
            <VisionMissionCards vision={company.vision} mission={company.mission} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal className="mb-10 text-center">
            <Heading level={2}>Our Services</Heading>
          </Reveal>
          <Reveal stagger>
            <ServiceGrid services={services} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <Reveal className="mb-10 text-center">
            <Heading level={2}>Why Choose Us</Heading>
          </Reveal>
          <Reveal stagger>
            <TrustPointsGrid trustPoints={company.trustPoints} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal className="flex flex-col items-center gap-6">
            <Heading level={2}>Have a project in mind?</Heading>
            <p className="max-w-prose text-siledge-slate">
              Tell us what you need and our team will help you specify the right components.
            </p>
            <Button href="/contact">Contact us</Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
