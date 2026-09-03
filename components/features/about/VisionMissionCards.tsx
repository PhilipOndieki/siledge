import { CardGrid } from "@/components/patterns/CardGrid";
import { Card } from "@/components/primitives/Card";
import { Icon } from "@/components/primitives/Icon";

export type VisionMissionCardsProps = {
  vision: string;
  mission: string;
};

export function VisionMissionCards({ vision, mission }: VisionMissionCardsProps) {
  return (
    <CardGrid columns={2}>
      <Card>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-siledge-mist text-siledge-blue">
          <Icon name="gauge" className="h-6 w-6" />
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold text-siledge-ink">Our Vision</h2>
        <p className="mt-2 text-siledge-slate">{vision}</p>
      </Card>
      <Card>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-siledge-mist text-siledge-blue">
          <Icon name="shield-check" className="h-6 w-6" />
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold text-siledge-ink">Our Mission</h2>
        <p className="mt-2 text-siledge-slate">{mission}</p>
      </Card>
    </CardGrid>
  );
}

export default VisionMissionCards;
