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

export type PillVariant = "solid" | "ghost";

/** Shared look for pill buttons and links, with the icon nested in its own circle. */
export const pillClass = (variant: PillVariant = "solid") =>
  `group inline-flex cursor-pointer items-center gap-1.5 rounded-full py-1.5 pl-3.5 pr-1.5 text-[13.5px] font-medium transition-[transform,background-color,box-shadow] duration-200 ease-[var(--ease-bloom)] active:scale-[0.98] sm:gap-3 sm:py-2 sm:pl-6 sm:pr-2 sm:text-[15px] ${
    variant === "solid"
      ? "bg-ink text-canvas shadow-[0_10px_30px_-10px_rgb(43_34_56/0.5)] hover:bg-purple"
      : "bg-surface/70 text-ink ring-1 ring-line backdrop-blur hover:bg-surface"
  }`;

/** Which way the arrow points, and so which way it leaves on hover. */
export type PillDir = "diagonal" | "down";

/**
 * Label plus an arrow in a circle. On hover the circle stays exactly where it
 * is; the arrow slides out the way it points and a fresh one slides in from
 * the opposite side, so the pill keeps its symmetry.
 */
export function PillContent({
  children,
  icon,
  variant = "solid",
  dir = "diagonal",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: PillVariant;
  dir?: PillDir;
}) {
  const glyph = icon ?? <ArrowUpRightIcon size={16} weight="bold" />;
  return (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <span
        data-dir={dir}
        className={`pill-icon grid h-8 w-8 place-items-center rounded-full transition-colors duration-300 sm:h-9 sm:w-9 ${
          variant === "solid" ? "bg-canvas/15 group-hover:bg-canvas/25" : "bg-mist group-hover:bg-purple group-hover:text-canvas"
        }`}
      >
        <span className="pill-icon-now">{glyph}</span>
        <span aria-hidden className="pill-icon-next">
          {glyph}
        </span>
      </span>
    </>
  );
}

/** Pill-shaped link. */
export function PillLink({
  href,
  children,
  variant = "solid",
  external,
  onClick,
  icon,
  dir,
}: {
  href: string;
  children: React.ReactNode;
  variant?: PillVariant;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  icon?: React.ReactNode;
  dir?: PillDir;
}) {
  return (
    <a href={href} onClick={onClick} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className={pillClass(variant)}>
      <PillContent variant={variant} icon={icon} dir={dir}>
        {children}
      </PillContent>
    </a>
  );
}
