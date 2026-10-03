"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { HomeContent } from "@/lib/content";
import { Container, Heading } from "./ui";

const TINTS = [
  { bg: "#6a3df0", fg: "text-white" },
  { bg: "#ff6a1f", fg: "text-ink" },
  { bg: "#ffc22e", fg: "text-ink" },
  { bg: "#3a1f9d", fg: "text-white" },
  { bg: "#ff8a3d", fg: "text-ink" },
];

/**
 * A real sequence, so it reads left to right: vertical scroll pans the track
 * while the section is pinned. Small screens and reduced motion get a stack.
 */
export function Thinking({ thinking }: { thinking: HomeContent["thinking"] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -distance]);

  const card = (s: HomeContent["thinking"]["steps"][number], i: number) => (
    <article
      key={s.title}
      className="flex h-full w-full shrink-0 flex-col justify-between rounded-[var(--radius-card)] bg-surface p-8 shadow-[var(--shadow-soft)] md:w-[min(28rem,70vw)] md:p-10"
    >
      <span
        className={`grainy grid h-16 w-16 place-items-center rounded-full font-display text-3xl font-semibold ${TINTS[i % TINTS.length].fg}`}
        style={{ background: TINTS[i % TINTS.length].bg }}
      >
        <span className="relative z-[2]">{i + 1}</span>
      </span>
      <div className="mt-14">
        <h3 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.03em] md:text-[32px]">{s.title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-soft">{s.body}</p>
      </div>
    </article>
  );

  const pinned = !reduce;

  return (
    <section ref={section} id="thinking" className={`relative ${pinned ? "md:h-[300vh]" : ""}`}>
      <div className={pinned ? "md:sticky md:top-0 md:flex md:h-[100dvh] md:flex-col md:justify-center md:overflow-hidden" : ""}>
        <Container className="pt-28 md:pt-0">
          <Heading className="mb-12 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05] md:mb-14">{thinking.heading}</Heading>
        </Container>

        {pinned && (
          <motion.div ref={track} style={{ x }} className="hidden h-[min(25rem,50dvh)] gap-5 pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] pr-10 md:flex">
            {thinking.steps.map(card)}
          </motion.div>
        )}

        <Container className={`grid gap-4 pb-28 ${pinned ? "md:hidden" : "md:grid-cols-2"}`}>{thinking.steps.map(card)}</Container>
      </div>
    </section>
  );
}
