# portfolio-v2

Personal site of Manan Chawla — built with Next.js (static export), Tailwind CSS v4 and Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out — deploy anywhere
```

## Where things live

| What | Where |
| --- | --- |
| **All personal copy** (quote, story, principles, career, projects, now, bookshelf) | `src/content/site.ts` |
| Writing | `content/notes/*.md` (front-matter: `title`, `date`, `summary`, `tags`, `draft`) |
| Design system (palette, type, motion rules) | `design/DESIGN.md` |
| Tokens and grain | `src/app/globals.css` (`@theme`) |
| Sections | `src/components/*.tsx`, assembled in `src/app/page.tsx` |

Search for `TODO(manan)` to find everything that still needs your real words.
Give projects an `image` (a path in `/public`) to replace their gradient covers.

## The page, top to bottom

1. **Intro**: the quote writes itself in over a drifting gradient, then the sheet lifts (once per tab session; click, key or scroll skips it).
2. **Hero**: who you are in one line, under a slanted gradient band.
3. **About**: the paragraph darkens word by word as you read, then four small truths.
4. **What I believe**: principle cards that stack as you scroll.
5. **What I do**: capabilities accordion and the tool marquee.
6. **Where I've been**: career timeline with a filling rail.
7. **Things I've built**: project list; a cover follows your cursor.
8. **How I approach a problem**: a pinned, sideways sequence.
9. **Writing**: latest piece plus the rest (`/notes`).
10. **Now and bookshelf**.
11. **Contact**.
