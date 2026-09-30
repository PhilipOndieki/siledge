import { Reveal } from "@/components/primitives/Reveal";
import { Heading } from "@/components/primitives/Heading";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";
import type { Company } from "@/lib/content/schema";

export type QualityTrustSectionProps = {
  statement: Company["qualityStatement"];
};

export function QualityTrustSection({ statement }: QualityTrustSectionProps) {
  return (
    <div>
      <div className="text-center">
        <Heading level={2} className="text-4xl md:text-5xl">
          {statement.heading}
        </Heading>
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-siledge-blue" aria-hidden="true" />
      </div>
      <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
        <Reveal variants={slideInFromLeft}>
          <p className="text-lg leading-relaxed text-siledge-slate md:text-xl">
            {statement.left}
          </p>
        </Reveal>
        <Reveal variants={slideInFromRight}>
          <p className="text-lg leading-relaxed text-siledge-slate md:text-xl">
            {statement.right}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export default QualityTrustSection;
