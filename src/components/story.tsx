"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { HomeContent } from "@/lib/content";
import { Container, EASE, Heading } from "./ui";

type Story = HomeContent["story"];
type Obj = Story["objects"][number];

/**
 * Where objects sit around the story, as centre points in % of the stage, in
 * the order the thread visits them: a loop around the paragraph. `d` is depth
 * (how strongly it reacts to scroll and cursor), `r` its resting tilt.
 */
const SLOTS = [
  { x: 11, y: 17, r: -8, d: 0.9 },
  { x: 50, y: 7, r: 5, d: 0.5 },
  { x: 88, y: 16, r: 7, d: 0.8 },
  { x: 92, y: 53, r: -6, d: 1 },
  { x: 83, y: 88, r: 4, d: 0.7 },
  { x: 50, y: 94, r: -4, d: 0.6 },
  { x: 15, y: 86, r: 6, d: 0.85 },
  { x: 7, y: 52, r: -5, d: 0.75 },
];

const WIDTH = {
  small: "clamp(84px, 8vw, 124px)",
  medium: "clamp(108px, 10.5vw, 164px)",
  large: "clamp(136px, 13vw, 206px)",
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

/** Types its text out like a message being written. */
function Typed({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) return setN(text.length);
    setN(0);
    const id = setInterval(() => setN((c) => (c >= text.length ? (clearInterval(id), c) : c + 1)), 28);
    return () => clearInterval(id);
  }, [text, reduce]);
  return (
    <>
      {text.slice(0, n)}
      <span className={`ml-px inline-block w-[1px] bg-white/80 ${n >= text.length ? "animate-pulse" : ""}`}>&nbsp;</span>
    </>
  );
}

function Bubble({ text }: { text: string }) {
  return (
    <motion.span
      role="status"
      className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 block whitespace-nowrap rounded-[18px] rounded-bl-[6px] bg-purple px-4 py-2 text-[15px] font-medium text-white shadow-[0_12px_30px_-10px_rgb(58_31_157/0.6)]"
      style={{ x: "-50%" }}
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <Typed text={text} />
    </motion.span>
  );
}

/** One object: parallax wrapper > static shadow + bobbing image. */
function Floating({
  obj,
  slot,
  index,
  active,
  onActive,
  scroll,
  mx,
  my,
}: {
  obj: Obj;
  slot: (typeof SLOTS)[number];
  index: number;
  active: boolean;
  onActive: (i: number | null) => void;
  scroll: MotionValue<number>;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : slot.d;
  const x = useTransform(mx, (v) => v * d * 18);
  const y = useTransform([scroll, my] as MotionValue<number>[], ([s, m]: number[]) => (0.5 - s) * d * 140 + m * d * 14);

  return (
    <motion.div
      className="absolute z-10"
      style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: WIDTH[obj.size], marginLeft: `calc(${WIDTH[obj.size]} / -2)`, x, y }}
      initial={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: index * 0.07 }}
    >
      <button
        type="button"
        aria-label={`${obj.label}: ${obj.caption}`}
        onPointerEnter={() => onActive(index)}
        onPointerLeave={() => onActive(null)}
        onFocus={() => onActive(index)}
        onBlur={() => onActive(null)}
        onClick={() => onActive(active ? null : index)}
        className="group relative block w-full -translate-y-1/2 cursor-default"
      >
        <AnimatePresence>{active && <Bubble key="b" text={obj.caption} />}</AnimatePresence>
        {/* Contact shadow stays put while the object bobs above it */}
        <span aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-[64%] -translate-x-1/2 rounded-full bg-violet/25 blur-md" />
        <span className="float block" style={{ "--float-d": `${5.5 + (index % 3)}s`, "--float-delay": `${-index * 0.9}s` } as React.CSSProperties}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={obj.src}
            width={obj.width}
            height={obj.height}
            alt=""
            draggable={false}
            loading="lazy"
            className="block h-auto w-full select-none drop-shadow-[0_18px_22px_rgb(58_31_157/0.16)] transition-[rotate,scale] duration-500 ease-[var(--ease-bloom)] [rotate:var(--r)] group-hover:scale-[1.07] group-hover:[rotate:0deg] group-focus-visible:scale-[1.07]"
            style={{ "--r": `${slot.r}deg` } as React.CSSProperties}
          />
        </span>
      </button>
    </motion.div>
  );
}

/** A word that darkens as the reader's scroll passes over it, pacing the paragraph. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
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

export function Story({ story }: { story: Story }) {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const objects = story.objects.slice(0, SLOTS.length);

  // Cursor position over the stage, -1..1, smoothed.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 50, damping: 18 });
  const my = useSpring(rawY, { stiffness: 50, damping: 18 });

  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] });
  const { scrollYProgress: drawProgress } = useScroll({ target: stage, offset: ["start 0.75", "end 0.65"] });
  const pathLength = useSpring(drawProgress, { stiffness: 60, damping: 20 });

  // Show the first caption once as a hint that objects talk, until someone interacts.
  const [active, setActive] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const inView = useInView(stage, { once: true, margin: "0px 0px -35% 0px" });
  useEffect(() => {
    if (!inView || touched || !objects.length) return;
    const t = setTimeout(() => setActive(0), 1400);
    return () => clearTimeout(t);
  }, [inView, touched, objects.length]);
  const onActive = (i: number | null) => {
    setTouched(true);
    setActive(i);
  };

  // Draw the thread in real pixels: a stretched viewBox would distort the
  // stroke and break the scroll-driven line drawing.
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const px = (x: number, y: number) => ({ x: (x / 100) * size.w, y: (y / 100) * size.h });
  const path = size.w ? curve([px(-4, 36), ...objects.map((_, i) => px(SLOTS[i].x, SLOTS[i].y))]) : "";

  const paragraphClass =
    "font-display text-[clamp(1.4rem,2.05vw,2.05rem)] font-medium leading-[1.3] tracking-[-0.025em]";

  return (
    <section id="about" className="relative overflow-x-clip pb-16 pt-28 md:pb-20 md:pt-36">
      <Container>
        <Heading className="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]">{story.heading}</Heading>
      </Container>

      {/* Desktop: the scattered desk */}
      <div
        ref={stage}
        className="relative mx-auto mt-6 hidden h-[clamp(720px,54vw,860px)] max-w-[1320px] md:block"
        onPointerMove={(e) => {
          if (reduce) return;
          const r = e.currentTarget.getBoundingClientRect();
          rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
          rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          rawX.set(0);
          rawY.set(0);
        }}
      >
        {objects.length > 0 && (
          <svg aria-hidden viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} className="absolute inset-0 h-full w-full overflow-visible">
            <motion.path
              d={path}
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth={1.75}
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : pathLength }}
            />
          </svg>
        )}

        <div className="absolute inset-x-[20%] inset-y-[21%] z-20 flex items-center justify-center text-center">
          <LitParagraph text={story.lead} className={`max-w-[34ch] ${paragraphClass}`} />
        </div>

        {objects.map((obj, i) => (
          <Floating
            key={obj.src + i}
            obj={obj}
            slot={SLOTS[i]}
            index={i}
            active={active === i}
            onActive={onActive}
            scroll={scrollYProgress}
            mx={mx}
            my={my}
          />
        ))}
      </div>

      {/* Mobile: story first, then the objects with their captions */}
      <Container className="md:hidden">
        <LitParagraph text={story.lead} className={`mt-10 ${paragraphClass}`} />
        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10">
          {objects.map((obj, i) => (
            <li key={obj.src + i} className={`flex flex-col items-center text-center ${i % 2 ? "translate-y-8" : ""}`}>
              <span className="float block w-[58%]" style={{ "--float-d": `${5.5 + (i % 3)}s`, "--float-delay": `${-i * 0.9}s` } as React.CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={obj.src} width={obj.width} height={obj.height} alt={obj.label} loading="lazy" className="mx-auto h-auto max-h-[120px] w-auto drop-shadow-[0_14px_18px_rgb(58_31_157/0.16)]" style={{ rotate: `${SLOTS[i].r}deg` }} />
              </span>
              <span className="mt-4 text-[15px] leading-snug text-soft">{obj.caption}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
