---
title: Why I love boring technology
date: 2026-09-14
summary: The most exciting thing a system can do is nothing surprising at all.
tags: [engineering, opinion]
---

> This is a sample article to show how Writing looks. Replace it with your own writing, or keep the idea and make it yours.

Every few months a new database, framework or runtime promises to change everything. Some of them do. Most of them change *something*, usually the number of things that can go wrong at 3am.

## Boring is a feature

A boring technology is one whose failure modes are **well understood**. Someone has already hit the weird edge case, written the blog post and fixed the bug. When I pick Postgres over the shiny new thing, I'm not picking the past. I'm picking a decade of other people's pain that I don't have to repeat.

- Boring tools have answers on page one of the search results.
- Boring tools have operators who know them.
- Boring tools let you spend your novelty budget on the *product*.

## Spend your innovation tokens wisely

Every team gets a small number of chances to do something genuinely new. I'd rather spend them on the problem only we can solve, and let everything underneath be quietly, wonderfully dull.

```go
// The best code is the code that never pages you.
if err := db.Ping(ctx); err != nil {
    return fmt.Errorf("db unreachable: %w", err)
}
```

---

The goal isn't to never try new things. It's to know exactly why you're doing it.
