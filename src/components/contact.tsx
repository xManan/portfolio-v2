"use client";

import { useState } from "react";
import { ArrowUpIcon, CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { contact, person } from "@/content/site";
import { Bloom } from "./bloom";
import { scrollTo } from "./smooth-scroll";
import { Container, Heading, PillLink } from "./ui";

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
    <footer id="contact" className="relative overflow-hidden pt-28 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 20% 40%, rgb(247 205 223 / 0.6), transparent 70%), radial-gradient(45% 40% at 85% 30%, rgb(216 203 245 / 0.7), transparent 70%)",
        }}
      />
      <Container className="relative flex flex-col items-center text-center">
        <div className="mb-10 w-28 md:w-32">
          <Bloom />
        </div>
        <Heading className="max-w-[14ch] text-[clamp(2.75rem,7vw,6rem)] leading-[1]">{contact.heading}</Heading>
        <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-soft md:text-xl">{contact.body}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <PillLink href={`mailto:${person.email}`}>Email me</PillLink>
          <button
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full bg-surface/70 px-5 py-3.5 text-[15px] font-medium ring-1 ring-line backdrop-blur transition-[background-color,transform] duration-200 hover:bg-surface active:scale-[0.98]"
          >
            {copied ? <CheckIcon size={16} weight="bold" className="text-orchid" /> : <CopyIcon size={16} weight="bold" />}
            {copied ? "Copied" : "Copy address"}
          </button>
        </div>
      </Container>

      <Container className="relative mt-28 flex flex-col gap-8 border-t border-line py-10 text-[15px] md:mt-36 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {person.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-orchid hover:underline">
                {s.label}
              </a>
            </li>
          ))}
          <li className="text-soft">{person.location}</li>
        </ul>
        <p className="text-soft">Designed and built by {person.firstName}.</p>
        <button onClick={() => scrollTo(0)} className="inline-flex w-fit items-center gap-2 hover:text-orchid">
          Back to top <ArrowUpIcon size={14} weight="bold" />
        </button>
      </Container>

      <p
        aria-hidden
        className="relative select-none whitespace-nowrap text-center font-display text-[15.5vw] font-semibold leading-[0.78] tracking-[-0.05em] text-lavender/70"
      >
        {person.name}
      </p>
    </footer>
  );
}
