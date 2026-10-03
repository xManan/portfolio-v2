"use client";

import { motion, useReducedMotion } from "motion/react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}

/** Each line slides up from behind a mask — the classic editorial headline reveal. */
export function LineReveal({
  lines,
  className,
  lineClassName = "",
  delay = 0,
  animate,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** When provided, animation is controlled by this flag instead of viewport. */
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  // The viewport trigger sits on the (unclipped) wrapper: the lines themselves
  // start outside their overflow mask, so they'd never register as in view.
  const trigger =
    animate === undefined
      ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
      : { animate: animate ? "show" : "hidden" };
  return (
    <motion.span className={`block ${className ?? ""}`} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{
              hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
              show: { y: 0, opacity: 1, transition: { duration: 1.2, delay: delay + i * 0.09, ease: EASE_OUT } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** "( 01 )  The person ———" chapter marker used at the top of every section. */
export function Chapter({ index, label }: { index: string; label: string }) {
  return (
    <Reveal className="mb-14 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted md:mb-20">
      <span className="text-ember">( {index} )</span>
      <span>{label}</span>
      <span className="h-px flex-1 bg-line" />
    </Reveal>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-10 ${className}`}>{children}</div>;
}
