import { SplitSection } from "@/components/patterns/SplitSection";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";

export type AboutPreviewProps = {
  paragraph: string;
  companyName: string;
};

export function AboutPreview({ paragraph, companyName }: AboutPreviewProps) {
  return (
    <SplitSection
      left={
        <div>
          <Heading level={2} tone="blue" className="text-4xl md:text-5xl">
            About {companyName}
          </Heading>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-siledge-slate md:text-xl">
            {paragraph}
          </p>
          <div className="mt-10">
            <Button href="/about" variant="secondary">
              Learn more about us
            </Button>
          </div>
        </div>
      }
      right={
        <div className="mx-auto aspect-[3/4] h-[min(88vh,48rem)] w-auto overflow-hidden rounded-lg bg-siledge-mist">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${companyName} at work`}
          >
            <source src="/videos/siledgeaboutwork.mp4" type="video/mp4" />
          </video>
        </div>
      }
    />
  );
}

export default AboutPreview;
