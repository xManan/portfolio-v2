"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { HomeContent } from "@/lib/content";
import { Container, EASE, Heading } from "./ui";

const SPINES = [
  { bg: "#6a3df0", fg: "text-white", h: "h-[300px]" },
  { bg: "#ff6a1f", fg: "text-ink", h: "h-[260px]" },
  { bg: "#ffc22e", fg: "text-ink", h: "h-[320px]" },
  { bg: "#3a1f9d", fg: "text-white", h: "h-[280px]" },
  { bg: "#1a1530", fg: "text-white", h: "h-[300px]" },
];

export function Now({ now, shelf }: { now: HomeContent["now"]; shelf: HomeContent["shelf"] }) {
  const [active, setActive] = useState(0);
  const book = shelf[active];

  return (
    <section id="now" className="relative py-28 md:py-40">
      <Container className="grid gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <Heading className="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]">Now</Heading>
          <p className="mt-3 text-soft">What has my attention, as of {now.updated}.</p>
          <dl className="mt-10 rounded-[var(--radius-card)] bg-surface p-3 shadow-[var(--shadow-soft)]">
            {now.items.map((item) => (
              <div key={item.label} className="grid gap-1 rounded-[var(--radius-inner)] px-5 py-5 transition-colors duration-200 hover:bg-mist/70 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-purple">{item.label}</dt>
                <dd className="leading-relaxed sm:col-span-2">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-6">
          <Heading className="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]">Bookshelf</Heading>
          <p className="mt-3 text-soft">Books that rearranged something in my head.</p>

          {/* Spines stand on a shelf; hovering or focusing one pulls it out. */}
          <div className="mt-10 flex h-[340px] items-end gap-3 border-b-[6px] border-ink/85 px-2" role="list">
            {shelf.map((b, i) => {
              const isActive = i === active;
              return (
                <button
                  key={b.title}
                  role="listitem"
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  aria-label={`${b.title} by ${b.author}`}
                  className={`grainy relative w-16 shrink-0 overflow-hidden rounded-t-[10px] rounded-b-[4px] px-2 py-4 text-left shadow-[inset_-6px_0_10px_-6px_rgb(43_34_56/0.25)] transition-transform duration-300 ease-[var(--ease-bloom)] md:w-[72px] ${SPINES[i % SPINES.length].h} ${
                    isActive ? "-translate-y-5" : "hover:-translate-y-2"
                  }`}
                  style={{ background: SPINES[i % SPINES.length].bg }}
                >
                  <span className={`relative z-[2] block h-full ${SPINES[i % SPINES.length].fg} font-display text-[15px] font-semibold leading-tight tracking-[-0.01em] [writing-mode:vertical-rl]`}>
                    {b.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-8 min-h-[110px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className="font-display text-2xl font-semibold tracking-[-0.025em]">{book.title}</p>
                <p className="mt-1 text-soft">{book.author}</p>
                <p className="mt-3 text-lg">{book.note}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
