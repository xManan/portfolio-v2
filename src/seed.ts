/**
 * Fills an empty database with the starter content from src/content/defaults.ts
 * and imports the Markdown articles in content/notes.
 *
 *   npm run seed
 *
 * Safe to run more than once: it only writes what is still empty.
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
        fields: { id: crypto.randomUUID().replace(/-/g, "").slice(0, 24), blockName: "", blockType: "Code", language: parts[i + 1] || "plaintext", code: parts[i + 2].replace(/\n$/, "") },
      });
    }
  }
  return { root: { type: "root", version: 1, direction: "ltr", format: "", indent: 0, children } };
}
const ctx = { context: { skipRevalidate: true } };

const settings = await payload.findGlobal({ slug: "settings" });
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

const home = await payload.findGlobal({ slug: "home" });
if (!home.about?.lead) {
  await payload.updateGlobal({
    slug: "home",
    ...ctx,
    data: {
      about: { heading: d.story.heading, lead: d.story.lead, facts: d.story.facts },
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
      thinking: d.thinking,
      now: d.now,
      shelf: { books: d.shelf },
    },
  });
  payload.logger.info("Seeded home page");
}

const { totalDocs } = await payload.count({ collection: "posts" });
if (totalDocs === 0) {
  const dir = path.resolve(process.cwd(), "content/notes");
  const editorConfig = await editorConfigFactory.default({ config: payload.config });
  for (const file of fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")) : []) {
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
