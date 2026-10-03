"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import type { HomeContent } from "@/lib/content";
import { Container, Heading } from "./ui";

export function Journey({ journey }: { journey: HomeContent["journey"] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="journey" className="relative py-28 md:py-40">
      <Container>
        <Heading className="mb-16 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05] md:mb-24">{journey.heading}</Heading>

        <ol ref={ref} className="relative">
          {/* Rail that fills as you read down the timeline */}
          <span aria-hidden className="absolute bottom-2 left-[9px] top-2 w-[2px] rounded bg-mist md:left-[calc(25%+9px)]" />
          <motion.span
            aria-hidden
            className="absolute bottom-2 left-[9px] top-2 w-[2px] origin-top rounded md:left-[calc(25%+9px)]"
            style={{ scaleY: fill, background: "linear-gradient(to bottom, #6a3df0, #ff6a1f, #ffc22e)" }}
          />

          {journey.items.map((j) => (
            <li key={j.period + j.role} className="relative grid gap-3 pb-20 pl-12 last:pb-0 md:grid-cols-4 md:gap-0 md:pl-0">
              <p className="text-base font-medium text-soft md:pr-14 md:pt-3 md:text-right">{j.period}</p>
              <span
                aria-hidden
                className="absolute left-0 top-1 h-5 w-5 rounded-full bg-canvas ring-2 ring-purple md:left-[25%] md:top-3"
              >
                <span className="absolute inset-[5px] rounded-full bg-sun" />
              </span>
              <div className="md:col-span-3 md:pl-16">
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em]">{j.role}</h3>
                <p className="mt-1 text-base text-soft">{j.org}</p>
                <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-ink/80">{j.summary}</p>
                {j.highlights.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {j.highlights.map((h) => (
                      <li key={h} className="rounded-full bg-surface px-4 py-2 text-sm shadow-[var(--shadow-soft)]">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
