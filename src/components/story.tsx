"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { person, story } from "@/content/site";
import { Chapter, Container, Reveal } from "./ui";

/** A word that brightens as the reader's scroll position passes over it. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

export function Story() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = story.lead.split(" ");

  return (
    <section id="person" className="relative py-32 md:py-48">
      <Container>
        <Chapter index="01" label="The person" />

        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="font-serif text-3xl italic leading-tight text-muted md:sticky md:top-32">
              Hi, I&rsquo;m {person.firstName}.
              <br />
              <span className="text-ink">Nice to meet you.</span>
            </p>
          </Reveal>

          <p
            ref={ref}
            className="text-[clamp(1.6rem,3.3vw,3.1rem)] font-medium leading-[1.22] tracking-[-0.025em] md:col-span-9"
          >
            {words.map((word, i) => {
              const start = i / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>

        <ul className="mt-28 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 md:mt-40">
          {story.facts.map((fact, i) => (
            <Reveal as="li" key={fact.label} delay={i * 0.08} className="group relative bg-canvas p-7 md:p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{fact.label}</span>
              <p className="mt-10 text-lg leading-snug text-ink/85 transition-colors group-hover:text-ink">{fact.value}</p>
              <span className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-faint transition-colors duration-500 group-hover:bg-ember" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
