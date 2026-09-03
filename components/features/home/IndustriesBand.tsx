import { Icon } from "@/components/primitives/Icon";
import type { Industry } from "@/lib/content/schema";

export type IndustriesBandProps = {
  industries: Industry[];
};

export function IndustriesBand({ industries }: IndustriesBandProps) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {industries.map((industry) => (
        <div
          key={industry.id}
          className="flex flex-col items-center gap-3 rounded-lg border border-siledge-blue/10 bg-white p-6 text-center shadow-card"
        >
          <Icon name={industry.icon} className="h-7 w-7 text-siledge-blue" />
          <p className="text-sm font-medium text-siledge-ink">{industry.name}</p>
        </div>
      ))}
    </div>
  );
}

export default IndustriesBand;
