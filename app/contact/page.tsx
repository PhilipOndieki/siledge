import type { Metadata } from "next";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SplitSection } from "@/components/patterns/SplitSection";
import { Reveal } from "@/components/primitives/Reveal";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { ContactInfoCard } from "@/components/features/contact/ContactInfoCard";
import { MapPlaceholder } from "@/components/features/contact/MapPlaceholder";
import { getCompany } from "@/lib/content/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Siledge Industrial Solutions Ltd for quotes, technical support, and orders on industrial spares and equipment.",
  path: "/contact",
});

export default function ContactPage() {
  const company = getCompany();

  return (
    <>
      <PageHero
        heading="Contact Us"
        supportingLine="Send us a message or reach our team directly using the details below."
      />

      <Section tone="mist">
        <Container>
          <Reveal>
            <SplitSection
              left={<ContactForm />}
              right={<ContactInfoCard contact={company.contact} />}
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal>
            <MapPlaceholder addressLabel={company.contact.physicalAddress.join(", ")} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
