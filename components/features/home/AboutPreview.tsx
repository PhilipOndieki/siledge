import { SplitSection } from "@/components/patterns/SplitSection";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";
import { ImagePlaceholder } from "@/components/primitives/ImagePlaceholder";

export type AboutPreviewProps = {
  paragraph: string;
  companyName: string;
};

export function AboutPreview({ paragraph, companyName }: AboutPreviewProps) {
  return (
    <SplitSection
      left={
        <div>
          <Heading level={2} tone="blue">
            About {companyName}
          </Heading>
          <p className="mt-4 max-w-prose text-siledge-slate">{paragraph}</p>
          <div className="mt-6">
            <Button href="/about" variant="secondary">
              Learn more about us
            </Button>
          </div>
        </div>
      }
      right={
        <ImagePlaceholder label={`${companyName} at work`} aspect="video" iconName="factory" />
      }
    />
  );
}

export default AboutPreview;
