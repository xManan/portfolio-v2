"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useIntro } from "./intro-context";

let lenis: Lenis | null = null;

/** Scroll to an element or y position through Lenis when it's running. */
export function scrollTo(target: string | number) {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
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
