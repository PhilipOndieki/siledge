import { Icon } from "@/components/primitives/Icon";
import type { Service } from "@/lib/content/schema";

export type ServicesStripProps = {
  services: Service[];
};

export function ServicesStrip({ services }: ServicesStripProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="flex items-start gap-3 rounded-lg border border-siledge-blue/10 bg-white p-4"
        >
          <Icon name={service.icon} className="mt-0.5 h-5 w-5 flex-shrink-0 text-siledge-blue" />
          <span className="text-sm font-medium text-siledge-ink">{service.name}</span>
        </div>
      ))}
    </div>
  );
}

export default ServicesStrip;
