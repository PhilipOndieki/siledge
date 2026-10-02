import type { Metadata } from "next";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitSection } from "@/components/patterns/SplitSection";
import { ClosingCta } from "@/components/patterns/ClosingCta";
import { VisionMissionCards } from "@/components/features/about/VisionMissionCards";
import { ServicesOverview } from "@/components/features/about/ServicesOverview";
import { WhyChooseUsOverview } from "@/components/features/about/WhyChooseUsOverview";
import { getCompany } from "@/lib/content/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Siledge Industrial Solutions Ltd: our vision, mission, services, and why manufacturing, agricultural, and transport operators trust us.",
  path: "/about",
});

export default function AboutPage() {
  const company = getCompany();

  return (
    <>
      <link rel="preload" as="video" type="video/mp4" href="/videos/about.mp4" />
      <PageHero
        heading="About Siledge"
        supportingLine={company.tagline}
        videoPoster="/images/about-poster.jpg"
        videoMp4Src="/videos/about.mp4"
        videoPortraitMp4Src="/videos/about-portrait.mp4"
      />

      <Section tone="white" size="xl">
        <Container>
          <Reveal>
            <SplitSection
              left={
                <div>
                  <Heading level={2} tone="blue" className="text-4xl md:text-5xl">
                    Who We Are
                  </Heading>
                  <div className="mt-6 space-y-4 text-lg leading-relaxed text-siledge-slate md:text-xl">
                    {company.overview.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              }
              right={
                <div className="relative mx-auto aspect-[3/4] h-[min(82vh,42rem)] w-auto overflow-hidden rounded-lg bg-siledge-mist">
                  <Image
                    src="/images/aboutsiledge.jpg"
                    alt="Siledge bearing and lubricant, representing our product quality"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
              }
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist" size="xl">
        <Container>
          <Reveal stagger>
            <VisionMissionCards vision={company.vision} mission={company.mission} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" size="xl">
        <Container>
          <Reveal>
            <ServicesOverview servicesOverview={company.servicesOverview} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist" size="xl">
        <Container>
          <Reveal>
            <WhyChooseUsOverview whyChooseUs={company.whyChooseUs} />
          </Reveal>
        </Container>
      </Section>

      <Section size="lg" className="bg-siledge-blue">
        <Reveal>
          <ClosingCta closingCta={company.aboutClosingCta} />
        </Reveal>
      </Section>
    </>
  );
}
