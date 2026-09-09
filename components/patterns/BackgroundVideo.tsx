"use client";

import { useEffect, useState } from "react";

export type BackgroundVideoProps = {
  poster: string;
  webmSrc: string;
  mp4Src: string;
  portraitWebmSrc?: string;
  portraitMp4Src?: string;
};

export function BackgroundVideo({
  poster,
  webmSrc,
  mp4Src,
  portraitWebmSrc,
  portraitMp4Src,
}: BackgroundVideoProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Pick portrait vs. landscape ourselves instead of relying on
    // <source media="..."> — Safari has a long history of unreliably
    // evaluating the `media` attribute on <video><source> (unlike
    // <picture><source>, where every browser handles it consistently),
    // which can lead to the wrong orientation loading silently. Doing the
    // check in JS means every browser runs the exact same logic.
    setIsPortrait(window.matchMedia("(max-width: 767px)").matches);

    // Defer the video fetch until the browser is idle so it never competes
    // with the fonts/JS the initial paint depends on. The poster image
    // covers the gap and doubles as the fallback for reduced-motion users.
    const requestIdle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 200);
    const cancelIdle =
      typeof window.cancelIdleCallback === "function"
        ? window.cancelIdleCallback
        : window.clearTimeout;

    const handle = requestIdle(() => setVideoReady(true));
    return () => cancelIdle(handle as number);
  }, []);

  const usePortrait = isPortrait && portraitWebmSrc && portraitMp4Src;
  const activeWebmSrc = usePortrait ? portraitWebmSrc : webmSrc;
  const activeMp4Src = usePortrait ? portraitMp4Src : mp4Src;

  return (
    <>
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden="true"
      />
      {videoReady ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
        >
          <source src={activeWebmSrc} type="video/webm" />
          <source src={activeMp4Src} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}

export default BackgroundVideo;
