"use client";

import { motion, useReducedMotion, type MotionValue } from "motion/react";
import { EASE } from "./ui";

// Translucent so overlaps deepen softly under multiply instead of going muddy.
const OUTER = [
  "linear-gradient(to top, rgb(247 205 223 / 0.75), rgb(216 203 245 / 0.55))",
  "linear-gradient(to top, rgb(216 203 245 / 0.75), rgb(204 217 246 / 0.5))",
];
const INNER = [
  "linear-gradient(to top, rgb(247 235 192 / 0.85), rgb(247 205 223 / 0.6))",
  "linear-gradient(to top, rgb(247 205 223 / 0.8), rgb(216 203 245 / 0.55))",
];

/**
 * The site's one memorable visual: a grainy pastel flower drawn from CSS
 * petals. It blooms in petal by petal, drifts slowly, and leans toward the
 * cursor when given a `tilt` value.
 */
export function Bloom({
  play = true,
  delay = 0,
  tilt,
  portrait,
  className = "",
}: {
  play?: boolean;
  delay?: number;
  tilt?: MotionValue<number>;
  portrait?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const petal = (i: number, ring: "outer" | "inner") => {
    const outer = ring === "outer";
    const count = 6;
    const start = delay + (outer ? 0 : 0.35) + i * 0.06;
    return (
      <motion.span
        key={`${ring}-${i}`}
        className="grainy absolute left-1/2 top-0 block mix-blend-multiply"
        style={{
          height: outer ? "50%" : "34%",
          top: outer ? "0%" : "16%",
          width: outer ? "36%" : "26%",
          x: "-50%",
          rotate: (360 / count) * i + (outer ? 0 : 30),
          originX: 0.5,
          originY: 1,
          borderRadius: "50% 50% 50% 50% / 64% 64% 36% 36%",
          background: (outer ? OUTER : INNER)[i % 2],
        }}
        initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
        animate={play ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.2, delay: start, ease: EASE }}
      />
    );
  };

  return (
    <motion.div className={`relative aspect-square ${className}`} style={tilt ? { rotate: tilt } : undefined} aria-hidden={!portrait}>
      <div className="drift absolute inset-0">
        {Array.from({ length: 6 }, (_, i) => petal(i, "outer"))}
        {Array.from({ length: 6 }, (_, i) => petal(i, "inner"))}
      </div>
      <motion.div
        className={`grainy absolute left-1/2 top-1/2 aspect-square ${portrait ? "w-[44%]" : "w-[24%]"} overflow-hidden rounded-full shadow-[0_8px_30px_-8px_rgb(122_79_181/0.35)]`}
        style={{ x: "-50%", y: "-50%", background: "radial-gradient(circle at 35% 30%, #fffaf0, #f7ebc0 55%, #f3d9a8)" }}
        initial={{ scale: reduce ? 1 : 0 }}
        animate={play ? { scale: 1 } : undefined}
        transition={{ duration: 0.9, delay: delay + 0.7, ease: EASE }}
      >
        {portrait && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={portrait} alt="Portrait of Manan" className="h-full w-full object-cover" />
        )}
      </motion.div>
    </motion.div>
  );
}
