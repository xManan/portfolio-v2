import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
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
      <main className="relative min-h-[100dvh] pb-32 pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
          style={{ background: "radial-gradient(50% 60% at 10% 0%, rgb(247 205 223 / 0.6), transparent 70%), radial-gradient(45% 55% at 95% 5%, rgb(216 203 245 / 0.65), transparent 70%)" }}
        />
        <Container className="relative">
          <article className="mx-auto max-w-[68ch]">
            <Link href="/notes/" className="inline-flex items-center gap-2 text-soft hover:text-orchid">
              <ArrowLeftIcon size={16} weight="bold" /> All writing
            </Link>
            <header className="mt-10 pb-10">
              <p className="text-soft">
                {formatDate(note.date)}, {note.readingTime} min read
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{note.title}</h1>
              {note.summary && <p className="mt-5 text-xl leading-relaxed text-soft">{note.summary}</p>}
              {note.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {note.tags.map((t) => (
                    <li key={t} className="rounded-full bg-lavender/50 px-3 py-1 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </header>

            <div className="prose-note" dangerouslySetInnerHTML={{ __html: note.html }} />

            <footer className="mt-20 grid gap-6 border-t border-line pt-10 md:grid-cols-2">
              <div>
                <p className="text-soft">Written by {person.name}</p>
                <a
                  href={`mailto:${person.email}?subject=${encodeURIComponent(`Re: ${note.title}`)}`}
                  className="mt-1 inline-block font-medium text-orchid underline-offset-4 hover:underline"
                >
                  Reply by email
                </a>
              </div>
              {next && next.slug !== slug && (
                <Link href={`/notes/${next.slug}/`} className="group md:text-right">
                  <span className="inline-flex items-center gap-2 text-soft">
                    Next <ArrowRightIcon size={14} weight="bold" />
                  </span>
                  <span className="mt-1 block font-display text-2xl font-semibold tracking-[-0.025em] transition-colors group-hover:text-orchid">
                    {next.title}
                  </span>
                </Link>
              )}
            </footer>
          </article>
        </Container>
      </main>
    </>
  );
}
