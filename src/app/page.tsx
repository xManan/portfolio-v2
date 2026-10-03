import { Intro } from "@/components/intro";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Principles } from "@/components/principles";
import { Craft } from "@/components/craft";
import { Journey } from "@/components/journey";
import { Work } from "@/components/work";
import { Thinking } from "@/components/thinking";
import { Writing } from "@/components/writing";
import { Now } from "@/components/now";
import { Contact } from "@/components/contact";
import { formatDate, getNotes } from "@/lib/notes";

export default function Home() {
  const notes = getNotes().map((n) => ({ ...n, displayDate: formatDate(n.date) }));

  return (
    <>
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Story />
        <Principles />
        <Craft />
        <Journey />
        <Work />
        <Thinking />
        {notes.length > 0 && <Writing notes={notes} />}
        <Now />
      </main>
      <Contact />
    </>
  );
}
