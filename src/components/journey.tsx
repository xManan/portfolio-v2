"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { journey } from "@/content/site";
import { Chapter, Container, LineReveal, Reveal } from "./ui";

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section id="journey" className="relative border-t border-line py-32 md:py-48">
      <Container>
        <Chapter index="04" label="The path so far" />

        <h2 className="mb-20 max-w-4xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.04em] md:mb-28">
          <LineReveal
            lines={[
              "Every system I\u2019ve built",
              <>
                taught me something about <em className="font-serif font-normal italic text-ember">people.</em>
              </>,
            ]}
          />
        </h2>

        <ol ref={ref} className="relative">
          {/* Rail that fills as you read down the timeline */}
          <span className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-[calc(25%+7px)]" aria-hidden />
          <motion.span
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-ember md:left-[calc(25%+7px)]"
            style={{ scaleY: fill }}
            aria-hidden
          />

          {journey.map((j) => (
            <Reveal as="li" key={j.period + j.role} className="group relative grid gap-4 pb-20 pl-10 last:pb-0 md:grid-cols-4 md:gap-0 md:pl-0">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted md:pr-12 md:pt-2 md:text-right">
                {j.period}
              </div>
              <span
                className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border border-line bg-canvas transition-colors duration-500 group-hover:border-ember md:left-[25%] md:top-2"
                aria-hidden
              >
                <span className="absolute inset-[4px] rounded-full bg-faint transition-colors duration-500 group-hover:bg-ember" />
              </span>
              <div className="md:col-span-3 md:pl-16">
                <h3 className="font-serif text-[clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.01em]">{j.role}</h3>
                <p className="mt-3 text-sm text-muted">{j.org}</p>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">{j.summary}</p>
                {j.highlights.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {j.highlights.map((h) => (
                      <li key={h} className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-ink/75">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
