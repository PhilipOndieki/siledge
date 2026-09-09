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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

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
          preload="none"
          poster={poster}
          aria-hidden="true"
        >
          {portraitWebmSrc ? (
            <source media="(max-width: 767px)" src={portraitWebmSrc} type="video/webm" />
          ) : null}
          {portraitMp4Src ? (
            <source media="(max-width: 767px)" src={portraitMp4Src} type="video/mp4" />
          ) : null}
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}

export default BackgroundVideo;
