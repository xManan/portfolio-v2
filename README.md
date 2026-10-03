# portfolio-v2

Personal site of Manan Chawla — built with Next.js (static export), Tailwind CSS v4 and Motion.

## How it works

- **Next.js** renders every page on the server and caches the result, so visitors get static HTML.
- **Payload CMS** runs inside the same app. The dashboard is at `/admin`; content is stored in SQLite.
- Saving anything in the dashboard purges the cached pages, so changes are live on the next visit. No rebuild or deploy.

## Run it locally

```bash
cp .env.example .env     # set PAYLOAD_SECRET to any long random string
npm install
npm run migrate          # create the database
npm run seed             # fill it with starter content
npm run dev              # site on http://localhost:3000, dashboard on /admin
```

## Where things live

| What | Where |
| --- | --- |
| **All content** (quote, hero, about, principles, career, projects, writing, now, bookshelf) | The dashboard at `/admin` |
| Starter content used by `npm run seed` | `src/content/defaults.ts`, `content/notes/*.md`, `content/objects/` (placeholder images) |
| Dashboard schema (fields and tabs) | `src/payload/` |
| Reading content into pages | `src/lib/content.ts` |
| Design system (palette, type, motion rules) | `design/DESIGN.md` |
| Sections | `src/components/*.tsx` |
| Deploying to a VPS | `deploy/README.md` |

**Changing the schema** (adding a field): edit `src/payload/`, then run
`npm run migrate:create -- describe-change` and commit the new file in `src/migrations/`.
`deploy.sh` applies it on the server.

## The page, top to bottom

1. **Intro**: the quote writes itself in over a drifting gradient, then the sheet lifts (on every load of the home page; click, key or scroll skips it).
2. **Hero**: who you are in one line, under a slanted gradient band.
3. **About**: your story in the middle, with cut-out objects from your life floating around it. A line draws itself between them as you scroll; hovering one types out its caption.
4. **What I believe**: principle cards that stack as you scroll.
5. **What I do**: capabilities accordion and the tool marquee.
6. **Where I've been**: career timeline with a filling rail.
7. **Things I've built**: project list; a cover follows your cursor.
8. **Writing**: latest piece plus the rest (`/notes`).
9. **Now and bookshelf**.
10. **Contact**.
