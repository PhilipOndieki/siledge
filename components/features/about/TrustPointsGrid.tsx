import { CardGrid } from "@/components/patterns/CardGrid";
import { Card } from "@/components/primitives/Card";
import { Icon } from "@/components/primitives/Icon";
import type { Company } from "@/lib/content/schema";

export type TrustPointsGridProps = {
  trustPoints: Company["trustPoints"];
};

export function TrustPointsGrid({ trustPoints }: TrustPointsGridProps) {
  return (
    <CardGrid columns={3}>
      {trustPoints.map((point) => (
        <Card key={point.title} className="flex flex-col items-center text-center">
          <Icon name={point.icon} className="h-7 w-7 text-siledge-blue" />
          <p className="mt-3 font-medium text-siledge-ink">{point.title}</p>
        </Card>
      ))}
    </CardGrid>
  );
}

export default TrustPointsGrid;
