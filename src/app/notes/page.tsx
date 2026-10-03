import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { Nav } from "@/components/nav";
import { NoteRow } from "@/components/writing";
import { Container } from "@/components/ui";
import { formatDate, getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Writing",
  description: "Things I'm learning, building and figuring out, written down so I understand them better.",
};

export default function NotesIndex() {
  const notes = getNotes().map((n) => ({ ...n, displayDate: formatDate(n.date) }));
  return (
    <>
      <Nav />
      <main className="relative min-h-[100dvh] pb-32 pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
          style={{ background: "radial-gradient(50% 60% at 10% 0%, rgb(106 61 240 / 0.22), transparent 70%), radial-gradient(40% 50% at 92% 5%, rgb(255 106 31 / 0.2), transparent 70%), radial-gradient(30% 40% at 60% 0%, rgb(255 194 46 / 0.25), transparent 70%)" }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <Link href="/" className="inline-flex items-center gap-2 text-soft hover:text-purple">
              <ArrowLeftIcon size={16} weight="bold" /> Home
            </Link>
            <h1 className="mt-8 font-display text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-none tracking-[-0.045em]">Writing</h1>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-soft">
              Things I&rsquo;m learning, building, breaking and figuring out, written down so I understand them better.
            </p>
            <div className="mt-14">
              {notes.map((n) => (
                <NoteRow key={n.slug} note={n} />
              ))}
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
