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

`npm run seed` only fills what's empty and imports articles from `content/notes`
that aren't in the database yet. To overwrite existing data with the starter
content:

```bash
RESEED_CONTENT=1 npm run seed   # all the text (keeps name, email, socials, quote, photos, articles)
RESEED_OBJECTS=1 npm run seed   # the About objects and their photos
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
| Deploying to Vercel (with Turso and Vercel Blob) | `deploy/VERCEL.md` |

**Changing the schema** (adding a field): edit `src/payload/`, then run
`npm run migrate:create -- describe-change` and commit the new file in `src/migrations/`.
`deploy.sh` applies it on the server.

## The page, top to bottom

1. **Intro**: the quote writes itself in over a drifting gradient, then the sheet lifts (on every load of the home page; click, key or scroll skips it).
2. **Hero**: who you are in one line, under a slanted gradient band.
3. **About**: your story, then the things from your life one by one down the page. Each photo floats on one side while its words come into focus beside it, and a line follows your scroll from one object to the next.
4. **What I believe**: principle cards that stack as you scroll.
5. **What I do**: capabilities accordion and the tool marquee.
6. **Where I've been**: career timeline with a filling rail.
7. **Things I've built**: project list; a cover follows your cursor.
8. **Writing**: latest piece plus the rest (`/notes`).
9. **Now and bookshelf**.
10. **Contact**.
