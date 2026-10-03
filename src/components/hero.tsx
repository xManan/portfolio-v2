"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownIcon, MapPinIcon } from "@phosphor-icons/react";
import type { Site } from "@/lib/content";
import { useIntro } from "./intro-context";
import { Mesh } from "./mesh";
import { scrollTo } from "./smooth-scroll";
import { ConnectButton } from "./connect";
import { Container, EASE, Heading, PillContent, PillLink, pillClass } from "./ui";

type Person = Site["person"];

/** The photo itself, or a gradient stand-in with a soft silhouette until one is uploaded. */
function Photo({ person, sizes }: { person: Person; sizes: string }) {
  if (person.portrait)
    return <Image src={person.portrait.src} alt={person.portrait.alt} fill sizes={sizes} quality={90} priority className="object-cover" />;
  return (
    <>
      <Mesh preset="dusk" className="absolute inset-0" />
      <svg aria-hidden viewBox="0 0 100 125" className="absolute inset-x-0 bottom-0 z-[2] w-full text-white/35">
        <circle cx="50" cy="52" r="19" fill="currentColor" />
        <path d="M10 125c0-25 18-40 40-40s40 15 40 40z" fill="currentColor" />
      </svg>
    </>
  );
}

/** Desktop: a tilted, floating portrait beside the headline, kept above the page grain. */
function Portrait({ person, show }: { person: Person; show: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="relative hidden w-[clamp(220px,19vw,300px)] shrink-0 lg:block"
      initial={{ opacity: 0, y: reduce ? 0 : 24, rotate: reduce ? 0 : -4 }}
      animate={show ? { opacity: 1, y: 0, rotate: 0 } : undefined}
      transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
    >
      {/* A warm glow behind the card */}
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-orange/25 blur-3xl" />
      <div className="float-tilt" style={{ "--float-d": "8s", "--tilt": "1.4deg" } as React.CSSProperties}>
        <div className="relative z-[45] aspect-[4/5] rotate-[3deg] overflow-hidden rounded-[28px] bg-mist shadow-[0_40px_70px_-30px_rgb(58_31_157/0.55)] ring-[6px] ring-surface">
          <Photo person={person} sizes="300px" />
        </div>
        {person.location && (
          <span className="absolute -bottom-4 -left-6 z-[46] inline-flex -rotate-[4deg] items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[13px] font-medium text-canvas shadow-[0_12px_30px_-12px_rgb(26_21_48/0.6)]">
            <MapPinIcon size={14} weight="fill" className="text-sun" />
            {person.location}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function Hero({ hero, person }: { hero: Site["hero"]; person: Person }) {
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
    <section ref={ref} id="top" className="relative grid min-h-[100dvh] grid-rows-[1fr_auto_1fr] overflow-hidden">
      {/* Stripe-style slanted band. It fills the top row of a 1fr / text / 1fr
          grid: the text sits in the vertical middle of the screen and the band's
          lowest edge can never reach it. */}
      <motion.div
        aria-hidden
        style={{ y: bandY }}
        className="relative min-h-[120px] [clip-path:polygon(0_0,100%_0,100%_100%,0_70%)] md:[clip-path:polygon(0_0,100%_0,100%_100%,0_66%)]"
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : undefined}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <Mesh preset="brand" />
      </motion.div>

      <Container className="relative w-full py-8 md:py-10">
        <div className="flex items-center justify-between gap-12">
          <div className="min-w-0">
            <motion.div {...enter(0.15)} className="mb-5 flex items-center gap-3 text-lg text-soft md:text-xl">
              {/* Phones and tablets: the photo as a small avatar beside the greeting */}
              <span className="relative z-[45] block h-12 w-12 shrink-0 overflow-hidden rounded-full bg-mist ring-2 ring-surface shadow-[0_8px_20px_-8px_rgb(58_31_157/0.5)] lg:hidden">
                <Photo person={person} sizes="48px" />
              </span>
              <p>{hero.greeting}</p>
            </motion.div>
            <Heading
              as="h1"
              play={done}
              delay={0.25}
              className="max-w-[14ch] text-[clamp(3rem,8.4vw,7.75rem)] leading-[0.95] tracking-[-0.05em]"
            >
              {hero.headline}
            </Heading>
          </div>
          <Portrait person={person} show={done} />
        </div>
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

      {/* Matches the band's row so the text stays centred */}
      <div aria-hidden />
    </section>
  );
}
