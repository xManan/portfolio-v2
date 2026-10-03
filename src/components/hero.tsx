"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownIcon } from "@phosphor-icons/react";
import { hero, person } from "@/content/site";
import { useIntro } from "./intro-context";
import { Bloom } from "./bloom";
import { scrollTo } from "./smooth-scroll";
import { Container, EASE, Heading, PillLink } from "./ui";

export function Hero() {
  const { done } = useIntro();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // The flower leans gently toward the cursor.
  const pointer = useMotionValue(0);
  const tilt = useSpring(useTransform(pointer, [-1, 1], [-8, 8]), { stiffness: 60, damping: 20 });

  // As the visitor scrolls on, the bloom sinks and softens.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bloomY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: done ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pb-16 pt-28 md:pt-24"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        pointer.set(((e.clientX - r.left) / r.width) * 2 - 1);
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 8% 12%, rgb(216 203 245 / 0.65), transparent 70%), radial-gradient(40% 50% at 92% 85%, rgb(247 205 223 / 0.7), transparent 70%), radial-gradient(25% 30% at 70% 10%, rgb(247 235 192 / 0.5), transparent 70%)",
        }}
      />

      <Container className="relative grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <motion.p {...enter(0.15)} className="mb-6 text-lg text-soft">
            {hero.greeting}
          </motion.p>
          <Heading as="h1" play={done} delay={0.25} className="text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.02]">
            {hero.headline}
          </Heading>
          <motion.p {...enter(0.55)} className="mt-7 max-w-[34ch] text-lg leading-relaxed text-soft md:text-xl">
            {hero.intro}
          </motion.p>
          <motion.div {...enter(0.7)} className="mt-10 flex flex-wrap items-center gap-3">
            <PillLink
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#work");
              }}
              icon={<ArrowDownIcon size={16} weight="bold" />}
            >
              See my work
            </PillLink>
            <PillLink href={`mailto:${person.email}`} variant="ghost">
              Email me
            </PillLink>
          </motion.div>
        </div>

        <motion.div style={{ y: bloomY, opacity: fadeOut }} className="relative mx-auto w-[min(86vw,520px)] md:col-span-5 md:w-full">
          <Bloom play={done} delay={0.2} tilt={tilt} portrait={person.portrait || undefined} />
        </motion.div>
      </Container>
    </section>
  );
}
