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
| **All personal copy** (quote, story, principles, career, projects, now, shelf) | `src/content/site.ts` |
| Field Notes (writing) | `content/notes/*.md` — front-matter: `title`, `date`, `summary`, `tags`, `draft` |
| Colours, fonts, easing | `src/app/globals.css` (`@theme`) |
| Sections | `src/components/*.tsx`, assembled in `src/app/page.tsx` |

Search for `TODO(manan)` to find everything that still needs your real words.

## The page, top to bottom

0. **Intro** — the quote writes itself in, then the curtain lifts (once per tab session; click / key / scroll skips it).
1. **The person** — who you are; the paragraph lights up word by word as you scroll.
2. **What I believe** — personal principles.
3. **What I do** — the craft, with a live request-flow diagram and the stack.
4. **The path so far** — career timeline.
5. **Things I've built** — selected projects.
6. **How I think** — engineering approach, pinned horizontal scroll.
7. **Field notes** — writing (`/notes`).
8. **Now & the shelf** — what you're into right now; books that shaped you.
9. **Say hello** — contact.
