"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeUp, heroStagger } from "@/lib/motion";
import { Container } from "@/components/primitives/Container";
import { BackgroundVideo } from "@/components/patterns/BackgroundVideo";

export type PageHeroProps = {
  heading: ReactNode;
  supportingLine?: string;
  className?: string;
  videoPoster?: string;
  videoWebmSrc?: string;
  videoMp4Src?: string;
  videoPortraitWebmSrc?: string;
  videoPortraitMp4Src?: string;
};

export function PageHero({
  heading,
  supportingLine,
  className,
  videoPoster,
  videoWebmSrc,
  videoMp4Src,
  videoPortraitWebmSrc,
  videoPortraitMp4Src,
}: PageHeroProps) {
  const hasVideo = videoPoster && videoWebmSrc && videoMp4Src;

  return (
    <div
      className={cn(
        "relative flex items-center overflow-hidden bg-gradient-to-br from-siledge-ink to-siledge-blueDeep",
        hasVideo ? "min-h-[60vh]" : "min-h-[40vh]",
        className,
      )}
    >
      {hasVideo ? (
        <BackgroundVideo
          poster={videoPoster}
          webmSrc={videoWebmSrc}
          mp4Src={videoMp4Src}
          portraitWebmSrc={videoPortraitWebmSrc}
          portraitMp4Src={videoPortraitMp4Src}
        />
      ) : null}
      <div
        className={cn("absolute inset-0 bg-siledge-blue/20", hasVideo && "bg-siledge-blue/40")}
        aria-hidden="true"
      />
      <Container className="relative z-10 py-16">
        <m.div initial="hidden" animate="visible" variants={heroStagger}>
          <m.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold text-white md:text-5xl"
          >
            {heading}
          </m.h1>
          {supportingLine ? (
            <m.p variants={fadeUp} className="mt-4 max-w-prose text-lg text-white/80">
              {supportingLine}
            </m.p>
          ) : null}
        </m.div>
      </Container>
    </div>
  );
}

export default PageHero;
