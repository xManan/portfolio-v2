import type { CSSProperties } from "react";

type Blob = { c: string; x: string; y: string; size?: string; tx?: string; ty?: string; s?: number; d?: string; delay?: string };

/** Colour recipes. Purple, orange and sun yellow, after Stripe's gradient. */
const PRESETS: Record<string, { base: string; blobs: Blob[] }> = {
  brand: {
    base: "#6a3df0",
    blobs: [
      { c: "#ff6a1f", x: "-15%", y: "-35%", tx: "16%", ty: "12%", d: "17s" },
      { c: "#ffc22e", x: "40%", y: "-45%", size: "65%", tx: "-14%", ty: "16%", d: "21s", delay: "-4s" },
      { c: "#3a1f9d", x: "55%", y: "35%", tx: "-10%", ty: "-12%", d: "19s", delay: "-8s" },
      { c: "#9b7bff", x: "-20%", y: "40%", size: "70%", tx: "14%", ty: "-8%", d: "23s", delay: "-2s" },
      { c: "#ff8a3d", x: "25%", y: "15%", size: "40%", tx: "18%", ty: "-14%", s: 1.3, d: "15s", delay: "-6s" },
    ],
  },
  dusk: {
    base: "#2a1577",
    blobs: [
      { c: "#6a3df0", x: "-20%", y: "-30%", size: "90%", tx: "12%", ty: "10%", d: "20s" },
      { c: "#ff6a1f", x: "60%", y: "50%", size: "60%", tx: "-14%", ty: "-10%", d: "18s", delay: "-5s" },
      { c: "#ffc22e", x: "75%", y: "-25%", size: "40%", tx: "-12%", ty: "14%", d: "22s", delay: "-9s" },
      { c: "#3a1f9d", x: "10%", y: "45%", size: "80%", tx: "10%", ty: "-12%", d: "24s", delay: "-3s" },
    ],
  },
  sun: {
    base: "#ffc22e",
    blobs: [
      { c: "#ff6a1f", x: "45%", y: "35%", tx: "-12%", ty: "-10%", d: "18s" },
      { c: "#ffe08a", x: "-25%", y: "-30%", tx: "14%", ty: "12%", d: "21s", delay: "-6s" },
      { c: "#9b7bff", x: "70%", y: "-40%", size: "45%", tx: "-10%", ty: "14%", d: "20s", delay: "-3s" },
    ],
  },
  ember: {
    base: "#ff6a1f",
    blobs: [
      { c: "#ffc22e", x: "-20%", y: "-35%", tx: "14%", ty: "12%", d: "19s" },
      { c: "#6a3df0", x: "60%", y: "45%", size: "60%", tx: "-12%", ty: "-12%", d: "22s", delay: "-5s" },
      { c: "#ff8a3d", x: "30%", y: "0%", size: "50%", tx: "12%", ty: "10%", d: "16s", delay: "-2s" },
    ],
  },
  violet: {
    base: "#3a1f9d",
    blobs: [
      { c: "#6a3df0", x: "-15%", y: "-25%", size: "85%", tx: "12%", ty: "10%", d: "20s" },
      { c: "#ff6a1f", x: "65%", y: "55%", size: "50%", tx: "-12%", ty: "-12%", d: "18s", delay: "-4s" },
      { c: "#9b7bff", x: "40%", y: "-40%", size: "55%", tx: "-8%", ty: "14%", d: "23s", delay: "-7s" },
    ],
  },
};

export type MeshPreset = keyof typeof PRESETS;

/**
 * A grainy, slowly drifting mesh gradient. Fills its positioned parent.
 * Drift is CSS-only and switches off under prefers-reduced-motion.
 */
export function Mesh({ preset = "brand", className = "", still = false }: { preset?: MeshPreset; className?: string; still?: boolean }) {
  const p = PRESETS[preset];
  return (
    <div aria-hidden className={`mesh grainy ${className}`} style={{ "--mesh-base": p.base } as CSSProperties}>
      {p.blobs.map((b, i) => (
        <span
          key={i}
          style={
            {
              left: b.x,
              top: b.y,
              width: b.size ?? "75%",
              background: `radial-gradient(closest-side, ${b.c}, ${b.c}00)`,
              "--tx": b.tx,
              "--ty": b.ty,
              "--s": b.s,
              "--d": b.d,
              "--delay": b.delay,
              ...(still ? { animation: "none" } : {}),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
