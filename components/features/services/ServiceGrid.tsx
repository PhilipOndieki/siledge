import { CardGrid } from "@/components/patterns/CardGrid";
import type { Service } from "@/lib/content/schema";
import { ServiceCard } from "./ServiceCard";

export type ServiceGridProps = {
  services: Service[];
};

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <CardGrid columns={4}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </CardGrid>
  );
}

export default ServiceGrid;
