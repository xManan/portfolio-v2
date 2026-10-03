import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Container } from "@/components/ui";
import { formatDate, getNote, getNotes } from "@/lib/notes";
import { person } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNote((await params).slug);
  return note ? { title: note.title, description: note.summary } : {};
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const all = getNotes();
  const i = all.findIndex((n) => n.slug === slug);
  const next = all[i + 1] ?? all[0];

  return (
    <>
      <Nav />
      <main className="min-h-screen pb-32 pt-40 md:pt-52">
        <Container>
          <div className="mx-auto max-w-3xl">
          <Link href="/notes/" className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted hover:text-ink">
            ← Field notes
          </Link>
          <header className="mt-10 border-b border-line pb-12">
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span>{formatDate(note.date)}</span>
              <span>{note.readingTime} min read</span>
              {note.tags.map((t) => (
                <span key={t} className="text-ember">
                  #{t}
                </span>
              ))}
            </div>
            <h1 className="mt-8 font-serif text-[clamp(2.75rem,6vw,4.75rem)] leading-[1] tracking-[-0.015em]">{note.title}</h1>
            {note.summary && <p className="mt-6 text-xl leading-relaxed text-ink/60">{note.summary}</p>}
          </header>

          <article className="prose-note mt-12" dangerouslySetInnerHTML={{ __html: note.html }} />

          <footer className="mt-24 flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Written by {person.name}
              <br />
              <a href={`mailto:${person.email}?subject=${encodeURIComponent(`Re: ${note.title}`)}`} className="mt-2 inline-block text-ink hover:text-ember">
                Reply by email ↗
              </a>
            </p>
            {next && next.slug !== slug && (
              <Link href={`/notes/${next.slug}/`} className="group md:text-right">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Next note →</span>
                <span className="mt-2 block font-serif text-3xl transition-colors group-hover:text-ember">{next.title}</span>
              </Link>
            )}
          </footer>
          </div>
        </Container>
      </main>
    </>
  );
}
