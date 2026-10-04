---
title: I stopped writing most of my code. I didn't stop engineering.
date: 2026-09-20
summary: From backend to full stack to designing systems while AI writes the code, and what the job turned out to be all along.
tags: [ai, career, system-design]
---

> A sample article in your voice. Rewrite it with your own story: the moment it clicked, what you were building, what surprised you.

I started as a backend developer. APIs, queues, databases: the parts nobody sees until they break. Then I moved up the stack, because I wanted to build whole things, from the schema to the button people click.

Today, most of the code I ship is written by AI. I spend my time somewhere else.

## The typing was never the job

For years I thought my value was in how fast and how well I could write code. It turns out that was the part easiest to hand over. What's left is everything around it:

- Deciding what the system should do, and what it shouldn't.
- Drawing the boundaries: which service owns which data, what talks to what.
- Planning for failure before it happens.
- Reading every line that ships and asking, *would I have written this?*

## Specs are the new source code

When AI writes the implementation, the spec is where the engineering happens. A vague spec gets you confident, plausible, wrong code. A clear one, with the constraints, the edge cases and the things that must never happen, gets you something you can trust.

```markdown
## Rate limiter
- Per API key, 100 requests per minute, sliding window.
- Must never block a request because Redis is down: fail open, log loudly.
- Return 429 with a Retry-After header.
```

That block took me ten minutes to write. The code took the AI thirty seconds. The ten minutes were the job.

## What stays the same

Judgement. Taste. Knowing when something is good enough, and when "it works" isn't. Those came from years of writing code by hand, and they're the reason I can direct an AI well now.

I don't miss the typing. I'd miss the thinking.
