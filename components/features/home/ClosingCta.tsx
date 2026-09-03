import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";

export type ClosingCtaProps = {
  phones: string[];
};

export function ClosingCta({ phones }: ClosingCtaProps) {
  return (
    <Container className="flex flex-col items-center gap-6 text-center">
      <Heading level={2}>Ready to talk about your next order?</Heading>
      <p className="max-w-prose text-siledge-slate">
        Reach our team directly, or send us a message and we will get back to you promptly.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/contact">Get in touch</Button>
        {phones.map((phone) => (
          <Button key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} variant="secondary">
            {phone}
          </Button>
        ))}
      </div>
    </Container>
  );
}

export default ClosingCta;
