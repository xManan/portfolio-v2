"use client";

import { now, shelf } from "@/content/site";
import { Chapter, Container, Reveal } from "./ui";

export function Now() {
  return (
    <section id="now" className="relative border-t border-line py-32 md:py-48">
      <Container>
        <Chapter index="08" label="Now & the shelf" />

        <div className="grid gap-20 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-raised/40 p-8 md:p-12">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-5xl italic md:text-6xl">Now</h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Updated {now.updated}</span>
              </div>
              <p className="mt-4 max-w-md text-ink/55">What has my attention these days. If we met at a coffee shop, this is what I&rsquo;d talk about.</p>
              <dl className="mt-12">
                {now.items.map((item) => (
                  <div key={item.label} className="grid gap-2 border-t border-line py-5 sm:grid-cols-3 sm:gap-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">{item.label}</dt>
                    <dd className="leading-relaxed text-ink/80 sm:col-span-2">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full p-2 md:p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-5xl italic md:text-6xl">The shelf</h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{shelf.length} books</span>
              </div>
              <p className="mt-4 max-w-md text-ink/55">Books that rearranged something in my head.</p>
              <ul className="mt-12 grid gap-4 sm:grid-cols-2">
                {shelf.map((b, i) => (
                  <li
                    key={b.title}
                    className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-r-xl rounded-l-sm border border-line bg-raised p-5 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:-rotate-1"
                  >
                    {/* Spine */}
                    <span className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/50 to-transparent" />
                    <span
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ background: ["#ff6a3d", "#efe9df", "#8f887c", "#c9a27a"][i % 4] }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{b.author}</span>
                    <div>
                      <p className="font-serif text-2xl leading-[1.05]">{b.title}</p>
                      <p className="mt-3 text-sm text-ink/50 transition-colors group-hover:text-ink/80">{b.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
