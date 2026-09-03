import { CardGrid } from "@/components/patterns/CardGrid";
import { Card } from "@/components/primitives/Card";
import { Icon } from "@/components/primitives/Icon";
import type { Company } from "@/lib/content/schema";

export type PillarBandProps = {
  pillars: Company["pillars"];
};

export function PillarBand({ pillars }: PillarBandProps) {
  return (
    <CardGrid columns={3}>
      {pillars.map((pillar) => (
        <Card key={pillar.title}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-siledge-mist text-siledge-blue">
            <Icon name={pillar.icon} className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-xl font-semibold text-siledge-ink">
            {pillar.title}
          </h2>
          <p className="mt-1 text-sm text-siledge-slate">{pillar.line}</p>
        </Card>
      ))}
    </CardGrid>
  );
}

export default PillarBand;
