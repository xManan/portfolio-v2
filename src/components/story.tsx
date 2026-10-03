"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { HomeContent } from "@/lib/content";
import { Container, EASE, Heading } from "./ui";

type Story = HomeContent["story"];
type Obj = Story["objects"][number];

/**
 * Where each object sits in its row, cycled in order. The image takes one side
 * (`side`), nudged by `shift` (% of its half) so the column never lines up; the
 * text takes the free columns on the other side. `r` is the resting tilt and
 * `d` the parallax depth.
 */
const PLACES = [
  { side: "left", shift: 18, text: "md:col-start-7 md:col-end-12", r: -5, d: 1 },
  { side: "right", shift: 30, text: "md:col-start-2 md:col-end-7", r: 6, d: 0.7 },
  { side: "left", shift: 4, text: "md:col-start-8 md:col-end-13", r: 4, d: 0.85 },
  { side: "right", shift: 10, text: "md:col-start-1 md:col-end-6", r: -4, d: 1 },
  { side: "left", shift: 28, text: "md:col-start-7 md:col-end-12", r: -7, d: 0.75 },
  { side: "right", shift: 20, text: "md:col-start-2 md:col-end-7", r: 5, d: 0.9 },
  { side: "left", shift: 10, text: "md:col-start-8 md:col-end-13", r: -3, d: 0.8 },
] as const;

const WIDTH = {
  small: "w-[46%] md:w-[clamp(170px,17vw,250px)]",
  medium: "w-[60%] md:w-[clamp(230px,24vw,350px)]",
  large: "w-[72%] md:w-[clamp(280px,30vw,440px)]",
};

/** Smooth curve (Catmull-Rom as cubic Béziers) through the given points. */
function curve(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/** Words that come into focus one after another, like a thought forming. */
function Focus({ text, className, delay = 0, as: Tag = "p" }: { text: string; className?: string; delay?: number; as?: "p" | "h3" }) {
  const reduce = useReducedMotion();
  const MotionTag = Tag === "h3" ? motion.h3 : motion.p;
  if (reduce) return <Tag className={className}>{text}</Tag>;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6, margin: "0px 0px -12% 0px" }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
      aria-label={text}
    >
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="mr-[0.25em] inline-block"
          variants={{
            hidden: { opacity: 0, filter: "blur(14px)", y: 10 },
            shown: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.9, ease: EASE } },
          }}
        >
          {w}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/** A word that darkens as the reader's scroll passes over it, pacing the paragraph. */
function Word({ children, progress, range }: { children: string; progress: ReturnType<typeof useScroll>["scrollYProgress"]; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

function LitParagraph({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {reduce
        ? text
        : words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
    </p>
  );
}

/** One row: the floating object on one side, its words on the other. */
function Chapter({ obj, index, anchor }: { obj: Obj; index: number; anchor: (el: HTMLElement | null) => void }) {
  const reduce = useReducedMotion();
  const place = PLACES[index % PLACES.length];
  const row = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: row, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70 * place.d, -70 * place.d]);
  const left = place.side === "left";

  return (
    <li
      ref={row}
      className="relative grid items-center gap-y-8 py-12 md:min-h-[clamp(480px,68vh,700px)] md:grid-cols-12 md:gap-x-8 md:py-0"
    >
      {/* The object. Lifted above the page grain so the photo stays crisp. */}
      <div
        className={`relative flex md:row-start-1 ${left ? "md:col-start-1 md:col-end-7" : "md:col-start-7 md:col-end-13 md:justify-end"} ${
          left ? "justify-start" : "justify-end"
        }`}
        style={{ [left ? "paddingLeft" : "paddingRight"]: `${place.shift}%` } as React.CSSProperties}
      >
        <motion.div
          className={`relative z-[45] ${WIDTH[obj.size]}`}
          style={{ y }}
          initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {/* The thread is drawn through this point. */}
          <span ref={anchor} aria-hidden className="absolute left-1/2 top-1/2 h-px w-px" />
          {/* Contact shadow stays put while the object bobs above it */}
          <span aria-hidden className="absolute -bottom-5 left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-full bg-ink/20 blur-xl" />
          <span className="float group block" style={{ "--float-d": `${6 + (index % 3)}s`, "--float-delay": `${-index * 1.1}s` } as React.CSSProperties}>
            <Image
              src={obj.src}
              width={obj.width}
              height={obj.height}
              alt={obj.label}
              quality={90}
              sizes="(min-width: 768px) 32vw, 72vw"
              draggable={false}
              className="block h-auto w-full select-none drop-shadow-[0_30px_30px_rgb(26_21_48/0.18)] transition-[rotate,scale] duration-700 ease-[var(--ease-bloom)] [rotate:var(--r)] group-hover:scale-[1.04] group-hover:[rotate:0deg]"
              style={{ "--r": `${place.r}deg` } as React.CSSProperties}
            />
          </span>
        </motion.div>
      </div>

      {/* Its words, in the empty space beside it */}
      <div className={`relative z-[46] md:row-start-1 ${place.text} ${left ? "" : "md:text-right"}`}>
        <span className="mb-4 block font-mono text-sm text-purple">{String(index + 1).padStart(2, "0")}</span>
        <Focus
          as="h3"
          text={obj.caption}
          className="font-display text-[clamp(1.85rem,3.1vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
        />
        {obj.story && (
          <Focus
            text={obj.story}
            delay={0.25}
            className={`mt-5 max-w-[42ch] text-lg leading-relaxed text-soft md:text-xl ${left ? "" : "md:ml-auto"}`}
          />
        )}
        {obj.credit && <p className="mt-4 text-xs text-soft/70">{obj.credit}</p>}
      </div>
    </li>
  );
}

export function Story({ story }: { story: Story }) {
  const reduce = useReducedMotion();
  const trail = useRef<HTMLDivElement>(null);
  const anchors = useRef<(HTMLElement | null)[]>([]);
  const pathEl = useRef<SVGPathElement>(null);
  const objects = story.objects;

  // The thread: measured from the real image positions, in real pixels.
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [path, setPath] = useState("");
  const measure = useCallback(() => {
    const box = trail.current?.getBoundingClientRect();
    if (!box) return;
    const pts = anchors.current
      .filter((a): a is HTMLElement => Boolean(a))
      .map((a) => {
        const r = a.getBoundingClientRect();
        // Measured without the parallax offset, so the line stays put.
        const t = a.parentElement?.style.transform.match(/translateY\(([-\d.]+)px\)/);
        return { x: r.left - box.left, y: r.top - box.top - (t ? Number(t[1]) : 0) };
      });
    if (!pts.length) return;
    setSize({ w: box.width, h: box.height });
    setPath(curve([{ x: box.width / 2, y: 0 }, ...pts, { x: box.width / 2, y: box.height }]));
  }, []);
  useEffect(() => {
    const el = trail.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // Lookup from depth (y) to distance along the path, so the tip of the line
  // tracks the middle of the screen however the curve winds.
  const table = useRef<{ len: number; y: number }[]>([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const p = pathEl.current;
    if (!p || !path) return;
    const L = p.getTotalLength();
    const rows: { len: number; y: number }[] = [];
    let maxY = 0;
    for (let i = 0; i <= 300; i++) {
      const len = (L * i) / 300;
      maxY = Math.max(maxY, p.getPointAtLength(len).y);
      rows.push({ len, y: maxY });
    }
    table.current = rows;
    setTotal(L);
  }, [path]);

  const drawn = useMotionValue(0);
  const smooth = useSpring(drawn, { stiffness: 70, damping: 22, mass: 0.6 });
  const tipX = useMotionValue(0);
  const tipY = useMotionValue(0);
  const { scrollY } = useScroll();
  const update = useCallback(() => {
    const el = trail.current;
    if (!el || !table.current.length) return;
    const target = window.innerHeight * 0.55 - el.getBoundingClientRect().top;
    const rows = table.current;
    let lo = 0;
    let hi = rows.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (rows[mid].y < target) lo = mid + 1;
      else hi = mid;
    }
    drawn.set(target <= 0 ? 0 : rows[lo].len);
  }, [drawn]);
  useMotionValueEvent(scrollY, "change", update);
  useEffect(update, [update, total]);
  useMotionValueEvent(smooth, "change", (len) => {
    const p = pathEl.current;
    if (!p || !total) return;
    const pt = p.getPointAtLength(Math.min(len, total));
    tipX.set(pt.x);
    tipY.set(pt.y);
  });
  const pathLength = useTransform(smooth, (l) => (total ? l / total : 0));
  const tipOpacity = useTransform(smooth, [0, 8], [0, 1]);

  return (
    <section id="about" className="relative overflow-x-clip pb-20 pt-28 md:pb-28 md:pt-36">
      <Container>
        <Heading className="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]">{story.heading}</Heading>
        <LitParagraph
          text={story.lead}
          className="mt-10 max-w-[30ch] font-display text-[clamp(1.5rem,2.6vw,2.5rem)] font-medium leading-[1.25] tracking-[-0.03em] md:mt-14"
        />
      </Container>

      {objects.length > 0 && (
        <div ref={trail} className="relative mx-auto mt-16 max-w-[1320px] px-6 md:mt-24 md:px-10">
          {/* Desktop only: on phones the text spans the width and the line would cross it. */}
          <svg aria-hidden viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block">
            {/* Where the line is going */}
            <path d={path} fill="none" stroke="var(--color-ink)" strokeOpacity={0.12} strokeWidth={1.5} strokeDasharray="2 8" strokeLinecap="round" />
            {/* Where it has been */}
            <motion.path
              ref={pathEl}
              d={path}
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth={1.75}
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : pathLength }}
            />
            {!reduce && (
              <motion.g style={{ x: tipX, y: tipY, opacity: tipOpacity }}>
                <circle r={14} fill="var(--color-purple)" opacity={0.18} />
                <circle r={5} fill="var(--color-purple)" />
              </motion.g>
            )}
          </svg>

          <ol className="relative">
            {objects.map((obj, i) => (
              <Chapter
                key={obj.src + i}
                obj={obj}
                index={i}
                anchor={(el) => {
                  anchors.current[i] = el;
                }}
              />
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
