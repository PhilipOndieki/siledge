import type { Company } from "@/lib/content/schema";

export type LocationMapProps = {
  contact: Company["contact"];
};

export function LocationMap({ contact }: LocationMapProps) {
  const address = contact.physicalAddress.join(", ");
  const query = contact.geo ? `${contact.geo.lat},${contact.geo.lng}` : address;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;

  return (
    <div className="aspect-[21/9] w-full overflow-hidden rounded-xl border border-siledge-blue/10">
      <iframe
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
        title={`Map showing ${address}`}
      />
    </div>
  );
}

export default LocationMap;
