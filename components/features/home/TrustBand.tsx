import { StatBand } from "@/components/patterns/StatBand";
import { Icon } from "@/components/primitives/Icon";
import type { Company } from "@/lib/content/schema";

export type TrustBandProps = {
  trustPoints: Company["trustPoints"];
};

export function TrustBand({ trustPoints }: TrustBandProps) {
  return (
    <StatBand
      items={trustPoints.map((point) => ({
        key: point.title,
        icon: <Icon name={point.icon} className="h-6 w-6 text-white" />,
        label: point.title,
      }))}
    />
  );
}

export default TrustBand;
