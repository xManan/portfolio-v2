"use client";

import Link from "next/link";
import type { NoteMeta } from "@/lib/notes";
import { Chapter, Container, LineReveal, Reveal } from "./ui";

export function NoteRow({ note, date }: { note: NoteMeta; date: string }) {
  return (
    <Link
      href={`/notes/${note.slug}/`}
      className="group relative grid grid-cols-1 gap-3 border-t border-line py-8 transition-colors md:grid-cols-12 md:items-baseline md:gap-6 md:py-10"
    >
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted md:col-span-2">{date}</span>
      <div className="md:col-span-8">
        <h3 className="font-serif text-3xl leading-tight tracking-[-0.01em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 md:text-4xl">
          {note.title}
        </h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/55">{note.summary}</p>
      </div>
      <span className="flex items-center gap-4 font-mono text-xs text-muted md:col-span-2 md:justify-end">
        {note.readingTime} min read
        <span className="transition-all duration-500 group-hover:translate-x-1 group-hover:text-ember">→</span>
      </span>
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
    </Link>
  );
}

export function NotesPreview({ notes }: { notes: (NoteMeta & { displayDate: string })[] }) {
  return (
    <section id="notes" className="relative border-t border-line py-32 md:py-48">
      <Container>
        <Chapter index="07" label="Field notes" />

        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <h2 className="max-w-3xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.04em]">
            <LineReveal
              lines={[
                "Notes from the field —",
                <>
                  things I&rsquo;m <em className="font-serif font-normal italic text-ember">figuring out.</em>
                </>,
              ]}
            />
          </h2>
          <Reveal delay={0.2}>
            <Link
              href="/notes/"
              className="group inline-flex items-center gap-3 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-ember"
            >
              All notes
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="border-b border-line">
          {notes.slice(0, 4).map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.06}>
              <NoteRow note={n} date={n.displayDate} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
