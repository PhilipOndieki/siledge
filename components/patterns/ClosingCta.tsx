import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";
import type { Company } from "@/lib/content/schema";

export type ClosingCtaProps = {
  closingCta: Company["closingCta"];
};

export function ClosingCta({ closingCta }: ClosingCtaProps) {
  return (
    <Container className="flex flex-col items-center gap-6 text-center">
      <Heading level={2} tone="white" className="text-4xl md:text-5xl">
        {closingCta.heading}
      </Heading>
      <div className="h-px w-24 bg-white/40" aria-hidden="true" />
      <Button href={closingCta.href} variant="secondary" withArrow>
        {closingCta.ctaLabel}
      </Button>
    </Container>
  );
}

export default ClosingCta;
