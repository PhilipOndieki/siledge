"use client";

import { useEffect, useState } from "react";

export type BackgroundVideoProps = {
  poster: string;
  mp4Src: string;
  portraitMp4Src?: string;
};

export function BackgroundVideo({ poster, mp4Src, portraitMp4Src }: BackgroundVideoProps) {
  const [isPortrait, setIsPortrait] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Pick portrait vs. landscape ourselves instead of relying on
    // <source media="..."> — Safari has a long history of unreliably
    // evaluating the `media` attribute on <video><source> (unlike
    // <picture><source>, where every browser handles it consistently),
    // which can lead to the wrong orientation loading silently. Doing the
    // check in JS means every browser runs the exact same logic.
    setIsPortrait(window.matchMedia("(max-width: 767px)").matches);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const activeMp4Src = isPortrait && portraitMp4Src ? portraitMp4Src : mp4Src;

  return (
    <>
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden="true"
      />
      {reducedMotion ? null : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
        >
          <source src={activeMp4Src} type="video/mp4" />
        </video>
      )}
    </>
  );
}

export default BackgroundVideo;
