"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { thinking } from "@/content/site";
import { Chapter, Container, LineReveal } from "./ui";

/**
 * Pinned, horizontally-scrolling walk through how I approach a problem.
 * Vertical scroll drives the horizontal track; on small screens it's a stack.
 */
export function Thinking() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  const cards = thinking.map((t, i) => (
    <article
      key={t.title}
      className="group relative flex h-full w-full shrink-0 flex-col justify-between rounded-3xl border border-line bg-raised/50 p-8 transition-colors duration-500 hover:border-ember/40 md:w-[min(30rem,72vw)] md:p-10"
    >
      <div className="flex items-center justify-between">
        <span className="font-serif text-7xl italic leading-none text-ember/90 md:text-8xl">{i + 1}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          step {String(i + 1).padStart(2, "0")} / {String(thinking.length).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-16 md:mt-0">
        <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{t.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-ink/65">{t.body}</p>
      </div>
    </article>
  ));

  return (
    <section ref={section} id="thinking" className="relative border-t border-line md:h-[320vh]">
      <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden">
        <Container className="pt-32 md:pt-0">
          <Chapter index="06" label="How I think" />
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.04em]">
              <LineReveal
                lines={[
                  "Calm systems start",
                  <>
                    with <em className="font-serif font-normal italic text-ember">clear thinking.</em>
                  </>,
                ]}
              />
            </h2>
            <div className="hidden w-48 md:block">
              <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <span>Process</span>
                <span>→</span>
              </div>
              <div className="h-px w-full bg-line">
                <motion.div className="h-px origin-left bg-ember" style={{ scaleX: progress }} />
              </div>
            </div>
          </div>
        </Container>

        {/* Desktop: pinned horizontal track */}
        <motion.div
          ref={track}
          style={{ x }}
          className="hidden h-[min(26rem,52vh)] gap-6 pl-10 pr-10 md:flex"
        >
          {cards}
          <div className="flex w-[min(24rem,60vw)] shrink-0 items-center px-6">
            <p className="font-serif text-4xl italic leading-tight text-muted">
              …and then, <span className="text-ink">do it again.</span>
            </p>
          </div>
        </motion.div>

        {/* Mobile: simple stack */}
        <Container className="grid gap-4 pb-32 md:hidden">{cards}</Container>
      </div>
    </section>
  );
}
