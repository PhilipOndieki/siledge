import { Reveal } from "@/components/primitives/Reveal";
import { Heading } from "@/components/primitives/Heading";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";
import type { Company } from "@/lib/content/schema";

export type WhyChooseUsOverviewProps = {
  whyChooseUs: Company["whyChooseUs"];
};

export function WhyChooseUsOverview({ whyChooseUs }: WhyChooseUsOverviewProps) {
  return (
    <div>
      <div className="text-center">
        <Heading level={2} className="text-4xl md:text-5xl">
          {whyChooseUs.heading}
        </Heading>
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-siledge-blue" aria-hidden="true" />
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2 md:gap-10">
        <Reveal variants={slideInFromLeft}>
          <div className="h-full rounded-lg bg-white p-8 shadow-card md:p-10">
            <p className="text-lg leading-relaxed text-siledge-slate">{whyChooseUs.left}</p>
          </div>
        </Reveal>
        <Reveal variants={slideInFromRight}>
          <div className="h-full rounded-lg bg-white p-8 shadow-card md:p-10">
            <p className="text-lg leading-relaxed text-siledge-slate">{whyChooseUs.right}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default WhyChooseUsOverview;
