import type { Industry } from "@/lib/content/schema";

export type IndustriesBandProps = {
  industries: Industry[];
};

export function IndustriesBand({ industries }: IndustriesBandProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-8">
      {industries.map((industry) => (
        <div key={industry.id} className="flex w-24 flex-col items-center gap-3 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/icons/${industry.id}.svg`} alt="" aria-hidden="true" className="h-14 w-14" />
          <p className="text-sm font-semibold leading-tight text-siledge-blue">{industry.name}</p>
        </div>
      ))}
    </div>
  );
}

export default IndustriesBand;
