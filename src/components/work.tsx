"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import type { HomeContent } from "@/lib/content";
import { Cover } from "./cover";
import { Container, EASE, Heading } from "./ui";

/** Project rows. On desktop a cover follows the cursor over the hovered row. */
export function Work({ projects }: { projects: HomeContent["projects"] }) {
  const list = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });

  return (
    <section id="work" className="relative py-28 md:py-40">
      <Container>
        <Heading className="mb-12 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05] md:mb-16">{projects.heading}</Heading>

        <ul
          ref={list}
          className="relative"
          onPointerMove={(e) => {
            const r = list.current!.getBoundingClientRect();
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setActive(null)}
        >
          {projects.items.map((p, i) => (
            <li key={p.title} className={`border-b border-line ${i === 0 ? "border-t" : ""}`}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group grid gap-5 py-9 md:grid-cols-12 md:items-center md:gap-6 md:py-12"
              >
                {/* Mobile: covers inline */}
                <div className="aspect-[16/10] md:hidden">
                  <Cover index={i} image={p.image || undefined} title={p.title} />
                </div>
                <h3 className="font-display text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] transition-[color,transform] duration-300 ease-[var(--ease-bloom)] group-hover:translate-x-2 group-hover:text-purple md:col-span-5">
                  {p.title}
                </h3>
                <div className="md:col-span-5">
                  <p className="text-sm font-medium text-purple">{p.kind}</p>
                  <p className="mt-2 max-w-[44ch] leading-relaxed text-soft">{p.summary}</p>
                  <p className="mt-3 text-sm text-ink/70">{p.stack.join(", ")}</p>
                </div>
                <div className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                  <span className="text-sm text-soft">{p.year}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-mist transition-[transform,background-color,color] duration-300 ease-[var(--ease-bloom)] group-hover:rotate-45 group-hover:bg-ink group-hover:text-canvas">
                    <ArrowUpRightIcon size={18} weight="bold" />
                  </span>
                </div>
              </a>
            </li>
          ))}

          <AnimatePresence>
            {active !== null && !reduce && (
              <motion.div
                key="cover"
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-10 -mt-[100px] ml-8 hidden h-[200px] w-[300px] rounded-[var(--radius-card)] bg-surface p-1.5 shadow-[0_30px_60px_-20px_rgb(43_34_56/0.35)] md:block"
                style={{ x: sx, y: sy }}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    className="h-full w-full"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <Cover index={active} image={projects.items[active].image || undefined} title={projects.items[active].title} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </ul>
      </Container>
    </section>
  );
}
