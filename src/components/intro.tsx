"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { quote } from "@/content/site";
import { useIntro } from "./intro-context";
import { Bloom } from "./bloom";
import { EASE, EASE_CURTAIN } from "./ui";

const WORD_DELAY = 0.9;
const WORD_STAGGER = 0.07;

/**
 * Opening moment: petals bloom, the quote writes itself in word by word,
 * holds for a breath, then the whole sheet lifts to reveal the page.
 * Any click, key or scroll lifts it early.
 */
export function Intro() {
  const { done, finish } = useIntro();
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const lifted = useRef(false);

  const words = quote.text.split(" ");
  const writeEnd = WORD_DELAY + words.length * WORD_STAGGER + 0.9;
  const hold = 1.9;

  const lift = () => {
    if (lifted.current) return;
    lifted.current = true;
    finish();
  };

  useEffect(() => {
    if (done) return;
    const t1 = setTimeout(() => setReady(true), writeEnd * 1000);
    const t2 = setTimeout(lift, (writeEnd + hold) * 1000);
    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && ["Shift", "Meta", "Control", "Alt", "Tab"].includes(e.key)) return;
      lift();
    };
    // A short grace period so leftover wheel momentum doesn't skip it.
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
          role="dialog"
          aria-label="Opening quote"
          onClick={lift}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-canvas"
          exit={reduce ? { opacity: 0 } : { y: "-100%", borderBottomLeftRadius: "40% 12%", borderBottomRightRadius: "40% 12%" }}
          transition={{ duration: reduce ? 0.3 : 1.1, ease: EASE_CURTAIN }}
        >
          {/* Ambient washes */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 15% 10%, rgb(216 203 245 / 0.7), transparent 70%), radial-gradient(50% 45% at 90% 90%, rgb(247 205 223 / 0.75), transparent 70%)",
            }}
          />
          <div aria-hidden className="absolute left-1/2 top-1/2 w-[min(78vmin,620px)] -translate-x-1/2 -translate-y-1/2 opacity-45">
            <Bloom delay={0.1} />
          </div>

          <figure className="relative max-w-4xl px-6 text-center">
            <blockquote className="font-display text-[clamp(2.2rem,6vw,5.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: "70%", filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: WORD_DELAY + i * WORD_STAGGER, duration: 0.9, ease: EASE }}
                  >
                    {i === 0 && "“"}
                    {word}
                    {i === words.length - 1 && "”"}
                  </motion.span>
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </blockquote>
            <motion.figcaption
              className="mt-8 text-base text-soft md:text-lg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: WORD_DELAY + words.length * WORD_STAGGER + 0.3, duration: 0.8, ease: EASE }}
            >
              {quote.author}
            </motion.figcaption>
          </figure>

          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            Click anywhere to continue
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
