"use client";

import { ArrowUpIcon } from "@phosphor-icons/react";
import type { Site } from "@/lib/content";
import { Mesh } from "./mesh";
import { scrollTo } from "./smooth-scroll";
import { ConnectButton } from "./connect";
import { Container, Heading, PillContent, pillClass } from "./ui";

export function Contact({ contact, person }: { contact: Site["contact"]; person: Site["person"] }) {
  return (
    <footer id="contact" className="relative overflow-hidden pt-16 md:pt-24">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-card)] px-6 py-20 text-center md:px-16 md:py-32">
          <Mesh preset="brand" />
          <div className="relative z-[2] flex flex-col items-center">
            <Heading className="max-w-[14ch] text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] text-white">{contact.heading}</Heading>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-white/85 md:text-xl">{contact.body}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <ConnectButton className={pillClass("solid")}>
                <PillContent>Connect with me</PillContent>
              </ConnectButton>
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
