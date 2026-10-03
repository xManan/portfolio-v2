"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { story } from "@/content/site";
import { Container, Heading } from "./ui";

/** A word that darkens as the reader's scroll passes over it, pacing the paragraph. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

const TILES = [
  { span: "md:col-span-4", bg: "linear-gradient(135deg, #6a3df0, #3a1f9d)", fg: "text-white", sub: "text-white/70" },
  { span: "md:col-span-2", bg: "linear-gradient(135deg, #ffc22e, #ffb01f)", fg: "text-ink", sub: "text-ink/65" },
  { span: "md:col-span-2", bg: "linear-gradient(135deg, #ff6a1f, #ff8a3d)", fg: "text-ink", sub: "text-ink/70" },
  { span: "md:col-span-4", bg: "linear-gradient(135deg, #1a1530, #3a1f9d)", fg: "text-white", sub: "text-white/65" },
];

export function Story() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = story.lead.split(" ");

  return (
    <section id="about" className="relative py-28 md:py-40">
      <Container>
        <Heading className="mb-12 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05] md:mb-16">{story.heading}</Heading>

        <p
          ref={ref}
          className="max-w-[30ch] font-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.025em] md:max-w-[36ch]"
        >
          {reduce
            ? story.lead
            : words.map((word, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {word}
                </Word>
              ))}
        </p>

        <ul className="mt-24 grid gap-4 md:mt-32 md:grid-cols-6">
          {story.facts.map((fact, i) => (
            <li
              key={fact.label}
              className={`grainy flex min-h-[200px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-7 md:min-h-[240px] md:p-9 ${TILES[i % 4].span}`}
              style={{ background: TILES[i % 4].bg }}
            >
              <span className={`relative z-[2] text-sm font-medium ${TILES[i % 4].sub}`}>{fact.label}</span>
              <p className={`relative z-[2] mt-10 max-w-[28ch] font-display text-[22px] font-semibold leading-snug tracking-[-0.02em] md:text-[26px] ${TILES[i % 4].fg}`}>
                {fact.value}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
