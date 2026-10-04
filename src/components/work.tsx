"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import type { HomeContent } from "@/lib/content";
import { Cover } from "./cover";
import { Container, EASE, Heading } from "./ui";

const W = 300;
const H = 200;
const GAP = 14;
/** Room the floating nav takes at the top of the screen. */
const NAV = 88;

/**
 * Project rows. On desktop a cover follows the cursor sideways and sits just
 * above the hovered row, or just below it when there isn't room above, so it
 * never covers the row being read.
 */
export function Work({ projects }: { projects: HomeContent["projects"] }) {
  const list = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [below, setBelow] = useState(false);
  // Whether the cover is already on screen: if not, it appears in place
  // instead of springing over from wherever it was last time.
  const placed = useRef(false);
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
            const row = (e.target as HTMLElement).closest("li");
            if (!row || !list.current) return;
            const l = list.current.getBoundingClientRect();
            const r = row.getBoundingClientRect();
            // Above the row if it fits under the nav, otherwise below it.
            const under = r.top - GAP - H < NAV && r.bottom + GAP + H <= window.innerHeight;
            setBelow(under);
            const nx = Math.min(Math.max(e.clientX - l.left - W / 2, 0), l.width - W);
            const ny = under ? r.bottom - l.top + GAP : r.top - l.top - GAP - H;
            x.set(nx);
            y.set(ny);
            if (!placed.current) {
              sx.jump(nx);
              sy.jump(ny);
              placed.current = true;
            }
          }}
          onPointerLeave={() => {
            setActive(null);
            placed.current = false;
          }}
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
                className="pointer-events-none absolute left-0 top-0 z-10 hidden rounded-[var(--radius-card)] bg-surface p-1.5 shadow-[0_30px_60px_-20px_rgb(43_34_56/0.35)] md:block"
                style={{ x: sx, y: sy, width: W, height: H, transformOrigin: below ? "50% 0%" : "50% 100%" }}
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
