"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlusIcon, StarFourIcon } from "@phosphor-icons/react";
import { craft } from "@/content/site";
import { Container, EASE, Heading } from "./ui";

export function Craft() {
  const [open, setOpen] = useState(0);

  return (
    <section id="craft" className="relative py-28 md:py-40">
      <Container className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Heading className="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]">{craft.heading}</Heading>
            <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-soft md:text-xl">{craft.statement}</p>
          </div>
        </div>

        <ul className="md:col-span-7">
          {craft.capabilities.map((c, i) => {
            const isOpen = open === i;
            return (
              <li key={c.title} className={`border-b border-line ${i === 0 ? "border-t" : ""}`}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`cap-${i}`}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-8"
                >
                  <span className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.03em] transition-colors duration-200 group-hover:text-purple">
                    {c.title}
                  </span>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-300 ease-[var(--ease-bloom)] ${
                      isOpen ? "rotate-45 bg-ink text-canvas" : "bg-mist"
                    }`}
                  >
                    <PlusIcon size={16} weight="bold" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`cap-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.25 } }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8">
                        <p className="max-w-[48ch] text-lg leading-relaxed text-soft">{c.body}</p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {c.items.map((item) => (
                            <li key={item} className="rounded-full bg-surface px-4 py-1.5 text-sm shadow-[var(--shadow-soft)]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>

      {/* The everyday toolbox. The page's only marquee. */}
      <div className="marquee-mask mt-24 overflow-hidden py-6 md:mt-32" aria-label={`Tools I use: ${craft.stack.join(", ")}`}>
        <div className="marquee flex w-max items-center gap-10" aria-hidden>
          {[...craft.stack, ...craft.stack].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-4xl font-medium tracking-[-0.03em] text-ink/80 md:text-6xl">
              {t}
              <StarFourIcon size={26} weight="fill" className="text-orange" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
