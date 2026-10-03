# Design system: "Mesh"

> Reading this as: a personal developer portfolio for hiring managers and fellow engineers,
> in a confident, warm, light language inspired by Stripe's mesh gradients, built with
> Tailwind v4 + Motion, heavy film grain and one sturdy grotesk.

Dials (taste-skill): **variance 7 / motion 6 / density 3**. Light mode only, at the owner's request.

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| `canvas` | `#F6F5FA` | Page background (cool, faintly violet) |
| `ink` | `#1A1530` | Text, primary buttons |
| `soft` | `#5C5872` | Secondary text |
| `purple` | `#6A3DF0` | The one UI accent: links, focus, hover. Also the gradient base |
| `violet` | `#3A1F9D` | Deep gradient tone, dark tiles |
| `orange` | `#FF6A1F` | Gradient colour, warm tiles |
| `sun` | `#FFC22E` | Gradient colour, selection, bright tiles |
| `mist` | `#E8E3FA` | Quiet fills (icon circles, chips) |

No pink. Text on purple/violet is white; text on orange/sun is ink (contrast).

## Type

- **Schibsted Grotesk** (variable): display and headings, semibold, tight tracking.
- **Geist Sans**: body and UI.
- Sentence case everywhere; no mono labels, no eyebrows, no em-dashes.

## Shape

- Cards and media: **24px** radius, inner surfaces 18px. Buttons, chips, nav: full pill.
- Shadows tinted violet, never grey/black.

## Texture

- Page-wide fixed film grain (multiply, 0.32).
- Every gradient surface carries heavier grain (overlay, 0.85), so colour reads as printed.

## Signature: the mesh

`src/components/mesh.tsx`: soft radial colour fields drifting over a base colour, CSS
transforms only. Presets: `brand` (purple / orange / sun), `dusk` (deep violet, intro),
`sun`, `ember`, `violet`. Used for the intro, the slanted hero band, principle cards,
project covers, the featured article and the contact panel.

## Motion (motion-design skill)

- Calm / premium. Signature easing `cubic-bezier(0.22, 1, 0.36, 1)`; 0.2s / 0.5s / 0.9s.
- Intro is the one orchestrated moment. Elsewhere motion explains something: reading pace,
  stacking principles, timeline progress, a left-to-right process, cursor feedback.
- `prefers-reduced-motion`: mesh stops drifting, no pinning, everything in final state.

## Layout families (no repeats)

Intro (full-bleed mesh + quote), hero (slanted band, Stripe-style), about (lit paragraph, then a scroll trail of photos with focus-in text), principles (sticky stack), craft (sticky statement + accordion + marquee), journey
(timeline), work (rows + cursor cover), writing (featured +
list), now + bookshelf, contact (mesh panel).
