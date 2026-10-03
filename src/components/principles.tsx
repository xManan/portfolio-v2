"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { principles } from "@/content/site";
import { Bloom } from "./bloom";
import { Container, Heading } from "./ui";

const WASHES = [
  "linear-gradient(140deg, #f7cddf 0%, #f3dcef 60%, #efe6fb 100%)",
  "linear-gradient(140deg, #d8cbf5 0%, #e4dafa 60%, #f4e9fb 100%)",
  "linear-gradient(140deg, #f7ebc0 0%, #f9e3d3 60%, #f7d9e6 100%)",
  "linear-gradient(140deg, #ccd9f6 0%, #dcdcf8 60%, #ece3fb 100%)",
  "linear-gradient(140deg, #efd5f0 0%, #f6d4e3 60%, #f9e8d9 100%)",
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
        style={{ scale, background: WASHES[index % WASHES.length] }}
        className="grainy mb-6 flex min-h-[340px] origin-top flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-8 shadow-[var(--shadow-soft)] md:min-h-[400px] md:p-14"
      >
        <div aria-hidden className="absolute -bottom-[18%] -right-[6%] w-[46%] max-w-[420px] opacity-60 md:w-[34%]" style={{ rotate: `${index * 23}deg` }}>
          <Bloom />
        </div>
        <h3 className="relative z-[2] max-w-[18ch] font-display text-[clamp(2rem,4.2vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
          {title}
        </h3>
        <p className="relative z-[2] mt-10 max-w-[44ch] text-lg leading-relaxed text-ink/75 md:text-xl">{body}</p>
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
