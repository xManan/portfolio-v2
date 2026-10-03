"use client";

import { useState } from "react";
import { ArrowUpIcon, CheckIcon, CopyIcon } from "@phosphor-icons/react";
import type { Site } from "@/lib/content";
import { Mesh } from "./mesh";
import { scrollTo } from "./smooth-scroll";
import { ContactButton } from "./contact-form";
import { Container, Heading, PillContent, pillClass } from "./ui";

export function Contact({ contact, person }: { contact: Site["contact"]; person: Site["person"] }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy my email address:", person.email);
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden pt-16 md:pt-24">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-card)] px-6 py-20 text-center md:px-16 md:py-32">
          <Mesh preset="brand" />
          <div className="relative z-[2] flex flex-col items-center">
            <Heading className="max-w-[14ch] text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] text-white">{contact.heading}</Heading>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-white/85 md:text-xl">{contact.body}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <ContactButton className={pillClass("solid")}>
                <PillContent>Contact me</PillContent>
              </ContactButton>
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3.5 text-[15px] font-medium text-white ring-1 ring-white/30 backdrop-blur transition-[background-color,transform] duration-200 hover:bg-white/25 active:scale-[0.98]"
              >
                {copied ? <CheckIcon size={16} weight="bold" /> : <CopyIcon size={16} weight="bold" />}
                {copied ? "Copied" : "Copy address"}
              </button>
            </div>
          </div>
        </div>
      </Container>

      <Container className="relative mt-16 flex flex-col gap-8 border-t border-line py-10 text-[15px] md:mt-20 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {person.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-purple hover:underline">
                {s.label}
              </a>
            </li>
          ))}
          <li className="text-soft">{person.location}</li>
        </ul>
        <p className="text-soft">Designed and built by {person.firstName}.</p>
        <button onClick={() => scrollTo(0)} className="inline-flex w-fit items-center gap-2 hover:text-purple">
          Back to top <ArrowUpIcon size={14} weight="bold" />
        </button>
      </Container>

      <p
        aria-hidden
        className="relative select-none whitespace-nowrap text-center font-display text-[13.2vw] font-semibold leading-[0.8] tracking-[-0.05em] text-purple/15"
      >
        {person.name}
      </p>
    </footer>
  );
}
