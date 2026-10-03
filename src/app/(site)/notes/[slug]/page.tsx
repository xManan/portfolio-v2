import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui";
import { RichText } from "@/components/rich-text";
import { ContactButton } from "@/components/contact-form";
import { getNote, getNotes, getSite } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getNotes()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getNote((await params).slug);
  return note ? { title: note.title, description: note.summary } : {};
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const [note, all, { person }] = await Promise.all([getNote(slug), getNotes(), getSite()]);
  if (!note) notFound();

  const i = all.findIndex((n) => n.slug === slug);
  const next = all[i + 1] ?? all[0];

  return (
    <>
      <main className="relative min-h-[100dvh] pb-32 pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
          style={{ background: "radial-gradient(50% 60% at 10% 0%, rgb(106 61 240 / 0.22), transparent 70%), radial-gradient(40% 50% at 92% 5%, rgb(255 106 31 / 0.2), transparent 70%), radial-gradient(30% 40% at 60% 0%, rgb(255 194 46 / 0.25), transparent 70%)" }}
        />
        <Container className="relative">
          <article className="mx-auto max-w-[68ch]">
            <Link href="/notes" className="inline-flex items-center gap-2 text-soft hover:text-purple">
              <ArrowLeftIcon size={16} weight="bold" /> All writing
            </Link>
            <header className="mt-10 pb-10">
              <p className="text-soft">
                {note.displayDate}, {note.readingTime} min read
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{note.title}</h1>
              {note.summary && <p className="mt-5 text-xl leading-relaxed text-soft">{note.summary}</p>}
              {note.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {note.tags.map((t) => (
                    <li key={t} className="rounded-full bg-mist px-3 py-1 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </header>

            <RichText data={note.content} />

            <footer className="mt-20 grid gap-6 border-t border-line pt-10 md:grid-cols-2">
              <div>
                <p className="text-soft">Written by {person.name}</p>
                <ContactButton context={note.title} className="mt-1 inline-block font-medium text-purple underline-offset-4 hover:underline">
                  Reply to this
                </ContactButton>
              </div>
              {next && next.slug !== slug && (
                <Link href={`/notes/${next.slug}`} className="group md:text-right">
                  <span className="inline-flex items-center gap-2 text-soft">
                    Next <ArrowRightIcon size={14} weight="bold" />
                  </span>
                  <span className="mt-1 block font-display text-2xl font-semibold tracking-[-0.025em] transition-colors group-hover:text-purple">
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
