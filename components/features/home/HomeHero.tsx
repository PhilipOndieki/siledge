"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { fadeUp, heroStagger } from "@/lib/motion";

const HERO_POSTER = "/images/hero-poster.jpg";

export type HomeHeroProps = {
  ctaLabel: string;
};

const gearAngles = [0, 45, 90, 135, 180, 225, 270, 315];

function HeroPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hero-industrial-pattern"
          width="140"
          height="140"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="30" cy="30" r="22" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="30" cy="30" r="10" fill="none" stroke="white" strokeWidth="2" />
          {gearAngles.map((angle) => (
            <rect
              key={angle}
              x="27"
              y="4"
              width="6"
              height="10"
              fill="white"
              transform={`rotate(${angle} 30 30)`}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-industrial-pattern)" />
    </svg>
  );
}

export function HomeHero({ ctaLabel }: HomeHeroProps) {
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
    <section className="relative flex min-h-[max(560px,78vh)] items-center overflow-hidden bg-gradient-to-br from-siledge-ink to-siledge-blueDeep py-24 md:min-h-[max(560px,82vh)]">
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
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
          poster={HERO_POSTER}
          aria-hidden="true"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : null}
      <HeroPattern />
      <div className="absolute inset-0 bg-siledge-blue/40" aria-hidden="true" />
      <Container className="relative z-10">
        <m.div
          initial="hidden"
          animate="visible"
          variants={heroStagger}
          className="mx-auto max-w-prose text-center"
        >
          <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            <m.span variants={fadeUp} className="block">
              Your partner in <span className="font-extrabold">industrial excellence</span>
            </m.span>
            <m.span variants={fadeUp} className="block">
              across East Africa
            </m.span>
          </h1>
          <m.p variants={fadeUp} className="mt-6 text-lg text-white/85 md:text-xl">
            We supply bearings, seals, power transmission components, and automation systems to
            manufacturing, agricultural, and transport operators.
          </m.p>
          <m.div variants={fadeUp} className="mt-10">
            <Button href="/products" withArrow>
              {ctaLabel}
            </Button>
          </m.div>
        </m.div>
      </Container>
    </section>
  );
}

export default HomeHero;
