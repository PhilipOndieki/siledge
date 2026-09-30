import { MapPin } from "lucide-react";

export type MapPlaceholderProps = {
  addressLabel: string;
};

export function MapPlaceholder({ addressLabel }: MapPlaceholderProps) {
  return (
    <div className="flex aspect-[21/9] w-full flex-col items-center justify-center gap-2 rounded-xl border border-siledge-blue/10 bg-siledge-mist text-center">
      {/*
        Swap this box for a real embed once a Maps API key is available:
        <iframe src={mapsEmbedUrl} loading="lazy" className="h-full w-full rounded-xl" title="Siledge location" />
      */}
      <MapPin className="h-8 w-8 text-siledge-blue/40" aria-hidden="true" />
      <p className="px-4 text-sm font-medium text-siledge-slate">{addressLabel}</p>
    </div>
  );
}

export default MapPlaceholder;
