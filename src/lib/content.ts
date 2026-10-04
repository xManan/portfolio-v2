import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Post } from "@/payload-types";

/**
 * All site content comes from the Payload database through its in-process
 * Local API (no HTTP hop). Pages are statically rendered and cached; saving in
 * the dashboard purges that cache (see src/payload/revalidate.ts).
 */
const payload = cache(() => getPayload({ config }));

const list = (csv?: string | null) =>
  (csv ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const mediaUrl = (m?: number | Media | null) => (m && typeof m === "object" ? m.sizes?.large?.url || m.url || "" : "");

export const getSite = cache(async () => {
  const p = await payload();
  const s = await p.findGlobal({ slug: "settings", depth: 1 });
  const portrait = s.portrait && typeof s.portrait === "object" && s.portrait.url ? s.portrait : null;
  return {
    person: {
      name: s.name,
      firstName: s.firstName,
      role: s.role,
      location: s.location ?? "",
      portrait: portrait
        ? { src: portrait.url as string, width: portrait.width ?? 800, height: portrait.height ?? 1000, alt: portrait.alt || s.name }
        : null,
      email: s.email,
      socials: (s.socials ?? []).map(({ label, href }) => ({ label, href })),
    },
    quote: { text: s.quote.text, author: s.quote.author },
    hero: { greeting: s.hero.greeting, headline: s.hero.headline, intro: s.hero.intro },
    contact: { heading: s.contact.heading, body: s.contact.body },
  };
});

export const getHome = cache(async () => {
  const p = await payload();
  const h = await p.findGlobal({ slug: "home", depth: 1 });
  return {
    story: {
      heading: h.about.heading,
      lead: h.about.lead,
      objects: (h.about.objects ?? [])
        .filter((o) => o.image && typeof o.image === "object" && o.image.url)
        .map((o) => {
          const m = o.image as Media;
          return {
            src: m.url as string,
            width: m.width ?? 400,
            height: m.height ?? 400,
            label: o.label,
            caption: o.caption,
            story: o.story ?? "",
            size: (o.size ?? "medium") as "small" | "medium" | "large",
          };
        }),
    },
    principles: {
      heading: h.principles.heading,
      items: (h.principles.items ?? []).map(({ title, body }) => ({ title, body })),
    },
    craft: {
      heading: h.craft.heading,
      statement: h.craft.statement,
      capabilities: (h.craft.capabilities ?? []).map((c) => ({ title: c.title, body: c.body, items: list(c.items) })),
      stack: list(h.craft.stack),
    },
    journey: {
      heading: h.journey.heading,
      items: (h.journey.items ?? []).map((j) => ({
        period: j.period,
        role: j.role,
        org: j.org,
        summary: j.summary,
        highlights: (j.highlights ?? []).map((x) => x.text),
      })),
    },
    projects: {
      heading: h.projects.heading,
      items: (h.projects.items ?? []).map((x) => ({
        title: x.title,
        year: x.year,
        kind: x.kind,
        summary: x.summary,
        stack: list(x.stack),
        href: x.href,
        image: mediaUrl(x.image),
      }))
        // Newest first by year; projects from the same year keep their dashboard order.
        .sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0)),
    },
    now: { updated: h.now.updated, items: (h.now.items ?? []).map(({ label, value }) => ({ label, value })) },
    shelf: (h.shelf?.books ?? []).map(({ title, author, note }) => ({ title, author, note })),
  };
});

export type Site = Awaited<ReturnType<typeof getSite>>;
export type HomeContent = Awaited<ReturnType<typeof getHome>>;

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  summary: string;
  tags: string[];
  readingTime: number;
};

/** Rough reading time from the Lexical tree's text nodes. */
function countWords(node: unknown): number {
  if (!node || typeof node !== "object") return 0;
  const n = node as { text?: string; children?: unknown[]; root?: unknown; fields?: { code?: string } };
  let words = n.text ? n.text.trim().split(/\s+/).length : 0;
  if (n.fields?.code) words += n.fields.code.split(/\s+/).length;
  if (n.root) words += countWords(n.root);
  for (const c of n.children ?? []) words += countWords(c);
  return words;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

const toMeta = (p: Post): NoteMeta => ({
  slug: p.slug ?? String(p.id),
  title: p.title,
  date: p.date,
  displayDate: formatDate(p.date),
  summary: p.summary,
  tags: list(p.tags),
  readingTime: Math.max(1, Math.round(countWords(p.content) / 220)),
});

export const getNotes = cache(async (): Promise<NoteMeta[]> => {
  const p = await payload();
  const { docs } = await p.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-date",
    limit: 100,
    depth: 0,
  });
  return docs.map(toMeta);
});

export const getNote = cache(async (slug: string) => {
  const p = await payload();
  const { docs } = await p.find({
    collection: "posts",
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
    limit: 1,
    depth: 1,
  });
  const post = docs[0];
  return post ? { ...toMeta(post), content: post.content } : null;
});
