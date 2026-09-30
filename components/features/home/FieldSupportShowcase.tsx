import Image from "next/image";
import { SplitSection } from "@/components/patterns/SplitSection";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";
import type { Company } from "@/lib/content/schema";

export type FieldSupportShowcaseProps = {
  fieldSupport: Company["fieldSupport"];
};

export function FieldSupportShowcase({ fieldSupport }: FieldSupportShowcaseProps) {
  return (
    <SplitSection
      left={
        <div className="relative mx-auto aspect-[3/4] h-[min(82vh,42rem)] w-auto overflow-hidden rounded-lg bg-siledge-mist">
          <Image
            src="/images/technicianonsite.jpg"
            alt="Siledge technician on site"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      }
      right={
        <div>
          <Heading level={2} tone="blue" className="text-4xl md:text-5xl">
            {fieldSupport.heading}
          </Heading>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-siledge-slate md:text-xl">
            {fieldSupport.paragraph}
          </p>
          <div className="mt-10">
            <Button href="/contact" variant="secondary">
              {fieldSupport.ctaLabel}
            </Button>
          </div>
        </div>
      }
    />
  );
}

export default FieldSupportShowcase;
