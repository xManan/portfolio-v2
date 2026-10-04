/**
 * Fills an empty database with the starter content from src/content/defaults.ts
 * and imports the Markdown articles in content/notes.
 *
 *   npm run seed
 *
 * Safe to run more than once: it only writes what is still empty.
 *
 *   RESEED_OBJECTS=1 npm run seed
 *
 * Replaces the About objects with the current placeholder images, even if set.
 *
 *   RESEED_CONTENT=1 npm run seed
 *
 * Replaces the site's text (role, location, hero, contact and every Home section) with
 * the starter copy below, even if set. Leaves your name, email, socials,
 * quote, photos and articles alone. Project images are reset.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getPayload } from "payload";
import { convertMarkdownToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import config from "@payload-config";
import * as d from "./content/defaults";

const payload = await getPayload({ config });

type EditorConfig = Awaited<ReturnType<typeof editorConfigFactory.default>>;

/** Short fence names to the editor's Code block languages. */
const LANGUAGES: Record<string, string> = { md: "markdown", ts: "typescript", tsx: "typescript", js: "javascript", sh: "shell", bash: "shell", yml: "yaml", py: "python" };
const KNOWN = new Set(["markdown", "typescript", "javascript", "shell", "yaml", "python", "go", "rust", "sql", "html", "css", "java", "dockerfile", "plaintext"]);
const language = (fence: string) => {
  const l = LANGUAGES[fence] ?? fence;
  return KNOWN.has(l) ? l : "plaintext";
};

/**
 * Markdown to Lexical, turning ``` fences into the editor's Code block
 * (the stock converter leaves them as plain paragraphs).
 */
function markdownToLexical(markdown: string, editorConfig: EditorConfig) {
  const children: unknown[] = [];
  const parts = markdown.split(/^```(\w*)\n([\s\S]*?)^```\s*$/m);
  for (let i = 0; i < parts.length; i += 3) {
    const text = parts[i];
    if (text.trim()) {
      const state = convertMarkdownToLexical({ editorConfig, markdown: text });
      children.push(...state.root.children);
    }
    if (i + 2 < parts.length) {
      children.push({
        type: "block",
        version: 2,
        format: "",
        fields: { id: crypto.randomUUID().replace(/-/g, "").slice(0, 24), blockName: "", blockType: "Code", language: language(parts[i + 1]), code: parts[i + 2].replace(/\n$/, "") },
      });
    }
  }
  return { root: { type: "root", version: 1, direction: "ltr", format: "", indent: 0, children } };
}
const ctx = { context: { skipRevalidate: true } };

const reseedContent = Boolean(process.env.RESEED_CONTENT);

const settings = await payload.findGlobal({ slug: "settings" });
if (settings.name && reseedContent) {
  await payload.updateGlobal({
    slug: "settings",
    ...ctx,
    data: { role: d.person.role, location: d.person.location, hero: d.hero, contact: d.contact },
  });
  payload.logger.info("Replaced site settings text");
}
if (!settings.name) {
  await payload.updateGlobal({
    slug: "settings",
    ...ctx,
    data: {
      name: d.person.name,
      firstName: d.person.firstName,
      role: d.person.role,
      location: d.person.location,
      email: d.person.email,
      socials: d.person.socials,
      quote: d.quote,
      hero: d.hero,
      contact: d.contact,
    },
  });
  payload.logger.info("Seeded site settings");
}

const home = await payload.findGlobal({ slug: "home", depth: 0 });
if (!home.about?.lead || reseedContent) {
  await payload.updateGlobal({
    slug: "home",
    ...ctx,
    data: {
      about: {
        heading: d.story.heading,
        lead: d.story.lead,
        // Keep the objects (and their photos); refresh their words where the
        // object is still in its starter position.
        objects: (home.about?.objects ?? []).map((o, i) => {
          const starter = d.story.objects[i];
          return starter && o.label === starter.label ? { ...o, caption: starter.caption, story: starter.story } : o;
        }),
      },
      principles: d.principles,
      craft: {
        heading: d.craft.heading,
        statement: d.craft.statement,
        capabilities: d.craft.capabilities.map((c) => ({ ...c, items: c.items.join(", ") })),
        stack: d.craft.stack.join(", "),
      },
      journey: {
        heading: d.journey.heading,
        items: d.journey.items.map((j) => ({ ...j, highlights: j.highlights.map((text) => ({ text })) })),
      },
      projects: {
        heading: d.projects.heading,
        items: d.projects.items.map(({ image: _image, ...p }) => ({ ...p, stack: p.stack.join(", ") })),
      },
      now: d.now,
      shelf: { books: d.shelf },
    },
  });
  payload.logger.info(reseedContent ? "Replaced home page text" : "Seeded home page");
}

// The floating objects around the About story: upload the placeholder images once.
const homeNow = await payload.findGlobal({ slug: "home", depth: 0 });
if (!homeNow.about.objects?.length || process.env.RESEED_OBJECTS) {
  const objects = [];
  for (const o of d.story.objects) {
    const media = await payload.create({
      collection: "media",
      ...ctx,
      data: { alt: o.label },
      filePath: path.resolve(process.cwd(), "content/objects", o.file),
    });
    objects.push({ image: media.id, label: o.label, caption: o.caption, story: o.story, size: o.size });
  }
  await payload.updateGlobal({ slug: "home", ...ctx, data: { about: { ...homeNow.about, objects } } });
  payload.logger.info(`Seeded ${objects.length} about objects`);
}

// Articles: import any in content/notes that aren't in the database yet (by slug).
{
  const dir = path.resolve(process.cwd(), "content/notes");
  const editorConfig = await editorConfigFactory.default({ config: payload.config });
  const existing = await payload.find({ collection: "posts", limit: 0, pagination: false, depth: 0, draft: true });
  const slugs = new Set(existing.docs.map((doc) => doc.slug));
  for (const file of fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")) : []) {
    if (slugs.has(file.replace(/\.md$/, ""))) continue;
    const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
    await payload.create({
      collection: "posts",
      ...ctx,
      data: {
        title: String(data.title),
        slug: file.replace(/\.md$/, ""),
        date: new Date(data.date).toISOString(),
        summary: String(data.summary ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
        content: markdownToLexical(content, editorConfig) as never,
        _status: data.draft ? "draft" : "published",
      },
    });
    payload.logger.info(`Imported article ${file}`);
  }
}

payload.logger.info("Seed complete");
process.exit(0);
