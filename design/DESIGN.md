# Design system: "Bloom"

> Reading this as: a personal developer portfolio for hiring managers and fellow engineers,
> with a soft, warm, human language in light pastel, leaning toward Tailwind v4 + Motion,
> grainy gradients and one characterful sans.

Dials (taste-skill): **variance 7 / motion 6 / density 3**. Light mode only, at the owner's request.

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| `canvas` | `#F8F5FC` | Page background (lavender mist, not cream) |
| `ink` | `#2B2238` | Text, primary buttons (deep plum, not espresso) |
| `soft` | `#6A6080` | Secondary text (4.9:1 on canvas) |
| `lavender` | `#D8CBF5` | Petal / tile wash |
| `pink` | `#F7CDDF` | Petal / tile wash (baby pink) |
| `butter` | `#F7EBC0` | Flower centre, rare highlight |
| `periwinkle` | `#CCD9F6` | Fourth wash, used sparingly |
| `orchid` | `#7A4FB5` | The one accent: focus rings, links, selection, hover |

Pastels are surfaces only, never text. One accent (orchid) across the whole page.

## Type

- **Bricolage Grotesque** (variable, optical size): display and headings. Its soft ink traps feel handmade.
- **Geist Sans**: body and UI.
- No serif, no mono labels, no all-caps eyebrows. Sentence case everywhere. Emphasis by weight, never by switching family.
- Scale (1.25 ratio): 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 80.

## Shape

- Cards and media: **28px** radius. Inner nested surfaces: 22px (concentric).
- Buttons, chips, nav: **full pill**.
- Shadows are tinted plum (`rgb(43 34 56 / 0.08)`), never grey/black.

## Texture

- Fixed, pointer-events-none film grain over the whole page (multiply blend).
- Grainy gradient "petals" are the single memorable element: they bloom in the intro and stay as the hero visual.

## Motion (motion-design skill)

- Personality: **calm / premium**. Signature easing `cubic-bezier(0.22, 1, 0.36, 1)` (decelerate in), exits `cubic-bezier(0.55, 0, 1, 0.45)`.
- Durations: quick 0.2s (hover/press), standard 0.5s (state), slow 0.9s (reveals). Intro is the only dramatic sequence.
- Staggers stay under 500ms total.
- Layers: primary (content), secondary (headline masks), ambient (slow petal drift).
- Motion is motivated: intro (story), lit paragraph (reading pace), stacked principles (one at a time), timeline fill (progress), horizontal process (sequence), cursor cover on work (feedback).
- `prefers-reduced-motion`: everything renders final state, no drift, no pinning.

## Layout families (no repeats)

1. Intro: centred quote over blooming petals.
2. Hero: asymmetric split, text left, bloom right.
3. About: lit paragraph + asymmetric bento of small truths.
4. Principles: sticky stacking cards, one pastel each.
5. Craft: sticky statement + accordion, then the one marquee (stack).
6. Journey: timeline with filling rail.
7. Work: list rows with a cover that follows the cursor.
8. How I think: pinned horizontal sequence.
9. Writing: featured piece + list.
10. Now + bookshelf: card + book spines.
11. Contact: centred closing.
