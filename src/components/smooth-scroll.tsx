"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useIntro } from "./intro-context";

let lenis: Lenis | null = null;

// Slow at both ends, so long jumps glide in and settle instead of snapping.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Longer trips take longer, so the speed stays calm over any distance. */
function durationFor(target: string | number) {
  const y = typeof target === "number" ? target : (document.querySelector(target)?.getBoundingClientRect().top ?? 0) + window.scrollY;
  const distance = Math.abs(y - window.scrollY);
  return Math.min(3.2, 1.1 + distance / 5000);
}

/** Scroll to an element or y position through Lenis when it's running. */
export function scrollTo(target: string | number) {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: durationFor(target), easing: easeInOutCubic });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { done } = useIntro();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Freeze the page while the intro is on screen.
  useEffect(() => {
    if (!lenis) return;
    if (done) lenis.start();
    else lenis.stop();
  }, [done]);

  return <>{children}</>;
}
