"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { hero, person } from "@/content/site";
import { useIntro } from "./intro-context";
import { Emphasis } from "./emphasis";
import { Clock } from "./clock";
import { Container, EASE_OUT, LineReveal } from "./ui";

export function Hero() {
  const { done } = useIntro();
  const ref = useRef<HTMLElement>(null);

  // Parallax out as the visitor scrolls into the story.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // Ember light that drifts toward the cursor.
  const mx = useMotionValue(0.7);
  const my = useMotionValue(0.35);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(600px circle at calc(${sx} * 100%) calc(${sy} * 100%), rgb(255 106 61 / 0.13), transparent 70%)`;

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: done ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.2, delay, ease: EASE_OUT },
  });

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      {/* Faint engineering grid, masked to fade at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(239 233 223 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(239 233 223 / 0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <motion.div style={{ y, opacity, scale }} className="relative flex flex-1 flex-col origin-top">
        <Container className="flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-14">
          <motion.p {...fade(0.2)} className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span className="text-ember">●</span>&nbsp;&nbsp;{person.role} · Portfolio &rsquo;{new Date().getFullYear().toString().slice(2)}
          </motion.p>

          <h1 className="text-[clamp(2.9rem,8.6vw,9.5rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            <LineReveal
              animate={done}
              delay={0.3}
              lines={hero.headline.map((line) => (
                <Emphasis key={line} text={line} className="font-normal tracking-[-0.02em] text-ember" />
              ))}
            />
          </h1>

          <div className="mt-14 grid gap-10 border-t border-line pt-8 md:mt-20 md:grid-cols-12">
            <motion.p {...fade(0.8)} className="max-w-md text-lg leading-relaxed text-ink/75 md:col-span-5">
              {hero.intro}
            </motion.p>

            <motion.dl
              {...fade(0.95)}
              className="grid grid-cols-2 gap-x-8 gap-y-6 font-mono text-xs uppercase tracking-[0.14em] md:col-span-6 md:col-start-7 md:grid-cols-3"
            >
              <div>
                <dt className="mb-2 text-muted">Based in</dt>
                <dd>{person.location}</dd>
              </div>
              <div>
                <dt className="mb-2 text-muted">Local time</dt>
                <dd>
                  <Clock timezone={person.timezone} label={person.timezoneLabel} />
                </dd>
              </div>
              <div className="col-span-2 md:col-span-1">
                <dt className="mb-2 text-muted">Currently</dt>
                <dd className="flex items-center gap-2">
                  {person.available && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400" />}
                  {person.status}
                </dd>
              </div>
            </motion.dl>
          </div>
        </Container>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        {...fade(1.3)}
        className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted md:right-10 md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
