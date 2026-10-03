"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

/** Signature easing (decelerate in). See design/DESIGN.md. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 md:px-10 ${className}`}>{children}</div>;
}

/**
 * Section heading whose lines rise from behind a mask when scrolled into view.
 * The viewport trigger sits on the unclipped wrapper, because the lines start
 * outside their mask and would never register as visible themselves.
 */
export function Heading({
  children,
  as: Tag = "h2",
  className = "",
  play,
  delay = 0,
}: {
  children: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
  /** Controls the animation directly instead of using the viewport. */
  play?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const lines = Array.isArray(children) ? children : [children];
  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } }
      : { animate: play ? "show" : "hidden" };

  return (
    <Tag className={`font-display font-semibold tracking-[-0.04em] ${/\btext-white\b/.test(className) ? "" : "text-ink"} ${className}`}>
      <motion.span className="block" initial="hidden" {...trigger}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block"
              variants={{
                hidden: { y: reduce ? 0 : "105%" },
                show: { y: 0, transition: { duration: 0.9, delay: delay + i * 0.08, ease: EASE } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Gentle lift-in for supporting content. Used sparingly, not on every card. */
export function Rise({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Pill button with its icon nested in its own circle (button-in-button). */
export function PillLink({
  href,
  children,
  variant = "solid",
  external,
  onClick,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  icon?: React.ReactNode;
}) {
  const solid = variant === "solid";
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-[15px] font-medium transition-[transform,background-color,box-shadow] duration-200 ease-[var(--ease-bloom)] active:scale-[0.98] ${
        solid
          ? "bg-ink text-canvas shadow-[0_10px_30px_-10px_rgb(43_34_56/0.5)] hover:bg-purple"
          : "bg-surface/70 text-ink ring-1 ring-line backdrop-blur hover:bg-surface"
      }`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={`grid h-9 w-9 place-items-center rounded-full transition-transform duration-300 ease-[var(--ease-bloom)] group-hover:translate-x-0.5 group-hover:-translate-y-px ${
          solid ? "bg-canvas/15" : "bg-mist"
        }`}
      >
        {icon ?? <ArrowUpRightIcon size={16} weight="bold" />}
      </span>
    </a>
  );
}
