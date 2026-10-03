"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownIcon } from "@phosphor-icons/react";
import type { Site } from "@/lib/content";
import { useIntro } from "./intro-context";
import { Mesh } from "./mesh";
import { scrollTo } from "./smooth-scroll";
import { Container, EASE, Heading, PillLink } from "./ui";

export function Hero({ hero, email }: { hero: Site["hero"]; email: string }) {
  const { done } = useIntro();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // The gradient band drifts up a little slower than the page.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bandY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: done ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100dvh] items-end overflow-hidden pb-16 pt-28 md:pb-24">
      {/* Stripe-style slanted gradient band across the top */}
      <motion.div
        aria-hidden
        style={{ y: bandY }}
        className="absolute inset-x-0 top-0 h-[46%] [clip-path:polygon(0_0,100%_0,100%_100%,0_62%)] md:h-[54%] md:[clip-path:polygon(0_0,100%_0,100%_100%,0_36%)]"
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : undefined}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <Mesh preset="brand" />
      </motion.div>

      <Container className="relative">
        <motion.p {...enter(0.15)} className="mb-5 text-lg text-soft md:text-xl">
          {hero.greeting}
        </motion.p>
        <Heading
          as="h1"
          play={done}
          delay={0.25}
          className="max-w-[14ch] text-[clamp(3rem,8.4vw,7.75rem)] leading-[0.95] tracking-[-0.05em]"
        >
          {hero.headline}
        </Heading>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <motion.p {...enter(0.55)} className="max-w-[36ch] text-lg leading-relaxed text-soft md:col-span-6 md:text-xl">
            {hero.intro}
          </motion.p>
          <motion.div {...enter(0.7)} className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end">
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
            <PillLink href={`mailto:${email}`} variant="ghost">
              Email me
            </PillLink>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
