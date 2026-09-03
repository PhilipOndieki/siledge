import { Card } from "@/components/primitives/Card";
import { Icon } from "@/components/primitives/Icon";
import type { Service } from "@/lib/content/schema";

export type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-siledge-mist text-siledge-blue">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-siledge-ink">{service.name}</h3>
      <p className="mt-2 text-sm text-siledge-slate">{service.summary}</p>
    </Card>
  );
}

export default ServiceCard;
