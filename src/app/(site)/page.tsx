import { Intro } from "@/components/intro";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Principles } from "@/components/principles";
import { Craft } from "@/components/craft";
import { Journey } from "@/components/journey";
import { Work } from "@/components/work";
import { Writing } from "@/components/writing";
import { Now } from "@/components/now";
import { Contact } from "@/components/contact";
import { getHome, getNotes, getSite } from "@/lib/content";

export default async function Home() {
  const [site, home, notes] = await Promise.all([getSite(), getHome(), getNotes()]);

  return (
    <>
      <Intro quote={site.quote} />
      <main>
        <Hero hero={site.hero} person={site.person} />
        <Story story={home.story} />
        <Principles principles={home.principles} />
        <Craft craft={home.craft} />
        <Journey journey={home.journey} />
        <Work projects={home.projects} />
        {notes.length > 0 && <Writing notes={notes} />}
        <Now now={home.now} shelf={home.shelf} />
      </main>
      <Contact contact={site.contact} person={site.person} />
    </>
  );
}
