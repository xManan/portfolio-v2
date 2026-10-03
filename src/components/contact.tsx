"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { person } from "@/content/site";
import { Clock } from "./clock";
import { scrollTo } from "./smooth-scroll";
import { Container, EASE_OUT, LineReveal, Reveal } from "./ui";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line pt-32 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[50vmax] w-[50vmax] -translate-x-1/2 rounded-full bg-ember/10 blur-[140px]"
      />
      <Container className="relative">
        <Reveal className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span className="text-ember">( 09 )</span> Say hello
        </Reveal>

        <h2 className="text-[clamp(3rem,9vw,9rem)] font-medium leading-[0.92] tracking-[-0.05em]">
          <LineReveal
            lines={[
              "Let’s build",
              <>
                something that <em className="font-serif font-normal italic text-ember">lasts.</em>
              </>,
            ]}
          />
        </h2>

        <Reveal delay={0.2} className="mt-16 flex flex-col gap-6 md:mt-20 md:flex-row md:items-center">
          <a
            href={`mailto:${person.email}`}
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-ink px-7 py-4 text-canvas"
          >
            <span className="absolute inset-0 translate-y-full rounded-full bg-ember transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
            <span className="relative text-base font-medium md:text-lg">{person.email}</span>
            <span className="relative transition-transform duration-500 group-hover:rotate-45">↗</span>
          </a>
          <button
            onClick={copy}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-ink/40 hover:text-ink"
          >
            <motion.span key={String(copied)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: EASE_OUT }}>
              {copied ? "Copied ✓" : "Copy email"}
            </motion.span>
          </button>
        </Reveal>

        <div className="mt-32 grid gap-10 border-t border-line py-10 font-mono text-[11px] uppercase tracking-[0.18em] md:grid-cols-4">
          <div>
            <p className="mb-3 text-muted">Elsewhere</p>
            <ul className="space-y-2">
              {person.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 hover:text-ember">
                    {s.label}
                    <span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-muted">Local time</p>
            <Clock timezone={person.timezone} label={person.timezoneLabel} />
          </div>
          <div>
            <p className="mb-3 text-muted">Colophon</p>
            <p className="normal-case tracking-normal text-ink/70">
              Designed &amp; built by me. Set in Geist and Instrument Serif.
            </p>
          </div>
          <div className="md:text-right">
            <button onClick={() => scrollTo(0)} className="group inline-flex items-center gap-2 uppercase hover:text-ember">
              Back to top <span className="transition-transform group-hover:-translate-y-1">↑</span>
            </button>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark that bleeds off the bottom of the page */}
      <div aria-hidden className="relative select-none overflow-hidden">
        <motion.p
          className="whitespace-nowrap text-center font-serif text-[17vw] italic leading-[0.8] tracking-[-0.04em] text-ink/[0.06]"
          initial={{ y: "40%" }}
          whileInView={{ y: "12%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE_OUT }}
        >
          {person.name}
        </motion.p>
      </div>
    </footer>
  );
}
