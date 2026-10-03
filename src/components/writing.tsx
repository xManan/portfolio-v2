"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import type { NoteMeta } from "@/lib/notes";
import { Container, Heading } from "./ui";

type Item = NoteMeta & { displayDate: string };

export function NoteRow({ note }: { note: Item }) {
  return (
    <Link href={`/notes/${note.slug}/`} className="group block border-b border-line py-7 first:border-t">
      <p className="text-sm text-soft">
        {note.displayDate}, {note.readingTime} min read
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold leading-snug tracking-[-0.025em] transition-colors duration-200 group-hover:text-orchid md:text-[28px]">
        {note.title}
      </h3>
      <p className="mt-2 max-w-[52ch] leading-relaxed text-soft">{note.summary}</p>
    </Link>
  );
}

export function Writing({ notes }: { notes: Item[] }) {
  const [featured, ...rest] = notes;

  return (
    <section id="writing" className="relative py-28 md:py-40">
      <Container>
        <Heading className="mb-12 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05] md:mb-16">Writing</Heading>

        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <Link
            href={`/notes/${featured.slug}/`}
            className="grainy group flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-8 md:col-span-7 md:min-h-[460px] md:p-12"
            style={{ background: "linear-gradient(150deg, #d8cbf5 0%, #efd5f0 45%, #f7cddf 100%)" }}
          >
            <p className="relative z-[2] text-sm font-medium text-ink/70">
              Latest, {featured.displayDate}
            </p>
            <div className="relative z-[2]">
              <h3 className="max-w-[16ch] font-display text-[clamp(2rem,3.8vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-ink/75">{featured.summary}</p>
              <span className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-5 pr-2 text-sm font-medium text-canvas transition-colors duration-200 group-hover:bg-orchid">
                Read it
                <span className="grid h-8 w-8 place-items-center rounded-full bg-canvas/15 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRightIcon size={14} weight="bold" />
                </span>
              </span>
            </div>
          </Link>

          <div className="flex flex-col md:col-span-5">
            {rest.slice(0, 3).map((n) => (
              <NoteRow key={n.slug} note={n} />
            ))}
            <Link
              href="/notes/"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-sm font-medium shadow-[var(--shadow-soft)] ring-1 ring-line transition-colors hover:text-orchid"
            >
              Read all writing
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
