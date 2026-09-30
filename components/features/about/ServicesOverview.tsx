import { Reveal } from "@/components/primitives/Reveal";
import { Heading } from "@/components/primitives/Heading";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";
import type { Company } from "@/lib/content/schema";

export type ServicesOverviewProps = {
  servicesOverview: Company["servicesOverview"];
};

export function ServicesOverview({ servicesOverview }: ServicesOverviewProps) {
  return (
    <div>
      <div className="text-center">
        <Heading level={2} className="text-4xl md:text-5xl">
          {servicesOverview.heading}
        </Heading>
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-siledge-blue" aria-hidden="true" />
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2 md:gap-10">
        <Reveal variants={slideInFromLeft}>
          <div className="h-full rounded-lg bg-siledge-mist p-8 md:p-10">
            <p className="text-lg leading-relaxed text-siledge-slate">{servicesOverview.left}</p>
          </div>
        </Reveal>
        <Reveal variants={slideInFromRight}>
          <div className="h-full rounded-lg bg-siledge-mist p-8 md:p-10">
            <p className="text-lg leading-relaxed text-siledge-slate">{servicesOverview.right}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default ServicesOverview;
