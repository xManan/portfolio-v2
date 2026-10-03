"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react";

import { useIntro } from "./intro-context";
import { scrollTo } from "./smooth-scroll";
import { EASE } from "./ui";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
];

/** Floating pill navigation, detached from the top edge. */
export function Nav({ person }: { person: { name: string; email: string } }) {
  const { done } = useIntro();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    setOpen(false);
    if (!onHome) return;
    e.preventDefault();
    scrollTo(`#${id}`);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
        initial={{ y: -24, opacity: 0 }}
        animate={done ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
      >
        <nav
          aria-label="Main"
          className="flex w-full max-w-[720px] items-center justify-between gap-2 rounded-full bg-surface/75 p-1.5 shadow-[var(--shadow-soft)] ring-1 ring-line backdrop-blur-xl md:w-max md:max-w-none"
        >
          <Link
            href="/"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollTo(0);
              }
            }}
            className="rounded-full px-4 py-2 font-display text-[15px] font-semibold tracking-tight"
          >
            {person.name}
          </Link>

          <div className="hidden items-center md:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`/#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className="rounded-full px-4 py-2 text-[14px] text-soft transition-colors duration-200 hover:bg-mist hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`mailto:${person.email}`}
              className="ml-1 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-canvas transition-colors duration-200 hover:bg-purple"
            >
              <EnvelopeSimpleIcon size={16} weight="bold" />
              Email me
            </a>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="relative grid h-10 w-10 place-items-center rounded-full bg-mist md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute h-[1.5px] w-4 rounded bg-ink transition-transform duration-300 ease-[var(--ease-bloom)] ${open ? "rotate-45" : "-translate-y-[3px]"}`}
            />
            <span
              className={`absolute h-[1.5px] w-4 rounded bg-ink transition-transform duration-300 ease-[var(--ease-bloom)] ${open ? "-rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-canvas/85 px-6 pb-14 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35 }}
          >
            <ul className="space-y-2">
              {[...links, { id: "contact", label: "Email me" }].map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={l.id === "contact" ? `mailto:${person.email}` : `/#${l.id}`}
                    onClick={(e) => (l.id === "contact" ? setOpen(false) : go(e, l.id))}
                    className="block font-display text-5xl font-semibold tracking-[-0.035em]"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: EASE }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
