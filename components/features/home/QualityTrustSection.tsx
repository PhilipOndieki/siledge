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
        <Heading level={2}>{statement.heading}</Heading>
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-siledge-blue" aria-hidden="true" />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <Reveal variants={slideInFromLeft}>
          <p className="text-siledge-slate">{statement.left}</p>
        </Reveal>
        <Reveal variants={slideInFromRight}>
          <p className="text-siledge-slate">{statement.right}</p>
        </Reveal>
      </div>
    </div>
  );
}

export default QualityTrustSection;
