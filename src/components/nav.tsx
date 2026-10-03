"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { person } from "@/content/site";
import { useIntro } from "./intro-context";
import { scrollTo } from "./smooth-scroll";
import { EASE_OUT } from "./ui";

const links = [
  { id: "person", label: "About" },
  { id: "craft", label: "Craft" },
  { id: "work", label: "Work" },
  { id: "notes", label: "Notes" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const { done } = useIntro();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  const go = (e: React.MouseEvent, id: string) => {
    setOpen(false);
    if (!onHome) return;
    e.preventDefault();
    scrollTo(`#${id}`);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -40, opacity: 0 }}
        animate={done ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 0.6, ease: EASE_OUT }}
      >
        {/* Soft fade so the bar stays legible over big headlines */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-canvas via-canvas/70 to-transparent" />
        <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
          <Link
            href="/"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollTo(0);
              }
            }}
            className="group flex items-center gap-2 text-sm font-medium tracking-tight"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            <span>{person.name}</span>
            <span className="hidden text-muted transition-colors group-hover:text-ink sm:inline">— {person.role}</span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-line bg-canvas/60 p-1 backdrop-blur-xl md:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`/#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className="rounded-full px-4 py-1.5 text-[13px] text-muted transition-colors hover:bg-ink/[0.06] hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-line bg-canvas/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] backdrop-blur-xl md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-canvas px-6 pb-12 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`/#${l.id}`}
                    onClick={(e) => go(e, l.id)}
                    className="flex items-baseline gap-4 font-serif text-6xl leading-tight"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.9, ease: EASE_OUT }}
                  >
                    <span className="font-mono text-xs text-ember">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{person.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
