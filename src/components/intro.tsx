"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { person, quote } from "@/content/site";
import { Emphasis } from "./emphasis";
import { useIntro } from "./intro-context";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

const WORD_STAGGER = 0.11;
const WORD_DELAY = 0.5;

/**
 * Full-screen opening: the quote writes itself in word by word, holds for a
 * breath, then the whole curtain lifts to reveal the page. Any click, key or
 * scroll lifts it early.
 */
export function Intro() {
  const { done, finish } = useIntro();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"writing" | "holding">("writing");
  const finished = useRef(false);

  const words = quote.text.split(" ");
  const writeTime = WORD_DELAY + words.length * WORD_STAGGER + 0.9;

  const lift = () => {
    if (finished.current) return;
    finished.current = true;
    finish();
  };

  useEffect(() => {
    if (done) return;
    const t1 = setTimeout(() => setPhase("holding"), writeTime * 1000);
    const t2 = setTimeout(lift, (writeTime + 1.8) * 1000);
    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && ["Shift", "Meta", "Control", "Alt", "Tab"].includes(e.key)) return;
      lift();
    };
    // Give people a beat before accidental wheel momentum can skip it.
    const t3 = setTimeout(() => {
      window.addEventListener("wheel", skip, { passive: true });
      window.addEventListener("touchmove", skip, { passive: true });
    }, 900);
    window.addEventListener("keydown", skip);
    return () => {
      [t1, t2, t3].forEach(clearTimeout);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("keydown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          data-intro-overlay
          onClick={lift}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col bg-canvas"
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduce ? 0.4 : 1.15, ease: EASE_CURTAIN }}
        >
          {/* A soft ember glow that breathes behind the words */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/20 blur-[120px]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, ease: EASE_OUT }}
          />

          <div className="flex items-center justify-between px-6 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:px-10 md:pt-8">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
              A note before we begin
            </motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
              ( 00 )
            </motion.span>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-6">
            <figure className="max-w-5xl text-center">
              <blockquote className="font-serif text-[clamp(2.4rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.02em] text-ink">
                <motion.span
                  className="mr-[0.15em] inline-block text-ember"
                  initial={{ opacity: 0, y: "0.3em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: WORD_DELAY - 0.2, duration: 1, ease: EASE_OUT }}
                >
                  &ldquo;
                </motion.span>
                {words.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: "100%", filter: "blur(10px)", rotate: 4 }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: 0 }}
                      transition={{ delay: WORD_DELAY + i * WORD_STAGGER, duration: 1.1, ease: EASE_OUT }}
                    >
                      <Emphasis text={word} />
                    </motion.span>
                    {i < words.length - 1 && " "}
                  </span>
                ))}
                <motion.span
                  className="ml-[0.05em] inline-block text-ember"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: WORD_DELAY + words.length * WORD_STAGGER, duration: 0.8 }}
                >
                  &rdquo;
                </motion.span>
              </blockquote>

              <figcaption className="mt-10 flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                <motion.span
                  className="h-px w-12 origin-left bg-muted/60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: WORD_DELAY + words.length * WORD_STAGGER + 0.3, duration: 1, ease: EASE_OUT }}
                />
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: WORD_DELAY + words.length * WORD_STAGGER + 0.5, duration: 1, ease: EASE_OUT }}
                >
                  {quote.author}
                </motion.span>
              </figcaption>
            </figure>
          </div>

          <div className="relative px-6 pb-6 md:px-10 md:pb-8">
            <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "holding" ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                Click or scroll to continue
              </motion.span>
              <span className="hidden md:inline">{person.name}</span>
            </div>
            {/* Hairline progress that fills while the quote plays */}
            <div className="mt-4 h-px w-full bg-line">
              <motion.div
                className="h-px origin-left bg-ink/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: writeTime + 1.8, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
