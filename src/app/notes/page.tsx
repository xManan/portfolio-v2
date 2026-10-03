import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { NoteRow } from "@/components/notes-preview";
import { Container } from "@/components/ui";
import { formatDate, getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Notes from the field — things I'm learning, building and figuring out.",
};

export default function NotesIndex() {
  const notes = getNotes();
  return (
    <>
      <Nav />
      <main className="min-h-screen pb-32 pt-40 md:pt-52">
        <Container>
          <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted hover:text-ink">
            ← Home
          </Link>
          <h1 className="mt-10 text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.05em]">
            Field <em className="font-serif font-normal italic text-ember">notes.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/60">
            Not polished essays — notes from the field. Things I&rsquo;m learning, building, breaking and figuring out,
            written down so I understand them better.
          </p>
          <div className="mt-20 border-b border-line">
            {notes.map((n) => (
              <NoteRow key={n.slug} note={n} date={formatDate(n.date)} />
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}
