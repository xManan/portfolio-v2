"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { principles } from "@/content/site";
import { Mesh, type MeshPreset } from "./mesh";
import { Container, Heading } from "./ui";

// Each card gets its own gradient; text colour follows for contrast.
const CARDS: { preset: MeshPreset; fg: string; body: string }[] = [
  { preset: "brand", fg: "text-white", body: "text-white/85" },
  { preset: "sun", fg: "text-ink", body: "text-ink/80" },
  { preset: "violet", fg: "text-white", body: "text-white/80" },
  { preset: "ember", fg: "text-ink", body: "text-ink/80" },
  { preset: "dusk", fg: "text-white", body: "text-white/80" },
];

/** One stacked card. It settles back slightly as the next one slides over it. */
function Card({
  index,
  total,
  progress,
  title,
  body,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  body: string;
}) {
  const reduce = useReducedMotion();
  const target = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(progress, [index / total, 1], [1, reduce ? 1 : target]);

  return (
    <div className="sticky" style={{ top: `calc(6.5rem + ${index * 1.1}rem)` }}>
      <motion.article
        style={{ scale }}
        className="relative mb-6 flex min-h-[340px] origin-top flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-8 shadow-[var(--shadow-soft)] md:min-h-[400px] md:p-14"
      >
        <Mesh preset={CARDS[index % CARDS.length].preset} />
        <h3 className={`relative z-[2] max-w-[18ch] ${CARDS[index % CARDS.length].fg} font-display text-[clamp(2rem,4.2vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.04em]`}>
          {title}
        </h3>
        <p className={`relative z-[2] mt-10 max-w-[44ch] text-lg leading-relaxed md:text-xl ${CARDS[index % CARDS.length].body}`}>{body}</p>
      </motion.article>
    </div>
  );
}

export function Principles() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const items = principles.items;

  return (
    <section id="principles" className="relative py-28 md:py-40">
      <Container>
        <Heading className="mb-12 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05] md:mb-16">{principles.heading}</Heading>
        <div ref={ref} className="relative">
          {items.map((p, i) => (
            <Card key={p.title} index={i} total={items.length} progress={scrollYProgress} title={p.title} body={p.body} />
          ))}
        </div>
      </Container>
    </section>
  );
}
