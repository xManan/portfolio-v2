"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownIcon } from "@phosphor-icons/react";
import type { Site } from "@/lib/content";
import { useIntro } from "./intro-context";
import { Mesh } from "./mesh";
import { scrollTo } from "./smooth-scroll";
import { ConnectButton } from "./connect";
import { Container, EASE, Heading, PillContent, PillLink, pillClass } from "./ui";

export function Hero({ hero }: { hero: Site["hero"] }) {
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
    <section ref={ref} id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden pb-14 md:pb-20">
      {/* Stripe-style slanted band. In normal flow and growing to fill the space
          above the text, so its lowest edge can never reach the headline. */}
      <motion.div
        aria-hidden
        style={{ y: bandY }}
        className="relative min-h-[clamp(150px,26vh,320px)] flex-1 [clip-path:polygon(0_0,100%_0,100%_100%,0_75%)] md:[clip-path:polygon(0_0,100%_0,100%_100%,0_72%)]"
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : undefined}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <Mesh preset="brand" />
      </motion.div>

      <Container className="relative pt-3 md:pt-2">
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
            <ConnectButton className={pillClass("ghost")} align="end">
              <PillContent variant="ghost">Connect with me</PillContent>
            </ConnectButton>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
