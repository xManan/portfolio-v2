import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Field Notes are plain Markdown files in /content/notes.
 * Front-matter: title, date (YYYY-MM-DD), summary, tags (optional), draft (optional).
 */
const DIR = path.join(process.cwd(), "content/notes");

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
};

export type Note = NoteMeta & { html: string };

function read(file: string): (Note & { draft: boolean }) | null {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? "Untitled"),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingTime: Math.max(1, Math.round(words / 220)),
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getNotes(): NoteMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(read)
    .filter((n): n is Note & { draft: boolean } => !!n && !n.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ html: _html, draft: _draft, ...meta }) => meta);
}

export function getNote(slug: string): Note | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(DIR, file))) return null;
  return read(file);
}

export function formatDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
