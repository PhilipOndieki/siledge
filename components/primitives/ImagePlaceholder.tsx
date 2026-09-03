import Image from "next/image";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export type ImagePlaceholderProps = {
  label: string;
  image?: string | null;
  aspect?: "square" | "video" | "wide";
  iconName?: string;
  className?: string;
  sizes?: string;
};

const aspectClass = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[16/9]",
} as const;

export function ImagePlaceholder({
  label,
  image = null,
  aspect = "square",
  iconName = "package",
  className,
  sizes,
}: ImagePlaceholderProps) {
  if (image) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-siledge-mist",
          aspectClass[aspect],
          className,
        )}
      >
        <Image
          src={image}
          alt={label}
          fill
          sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-siledge-blue/10 bg-siledge-mist text-center",
        aspectClass[aspect],
        className,
      )}
    >
      <Icon name={iconName} className="h-8 w-8 text-siledge-blue/40" />
      <span className="px-2 text-xs font-medium text-siledge-slate">{label}</span>
    </div>
  );
}

export default ImagePlaceholder;
