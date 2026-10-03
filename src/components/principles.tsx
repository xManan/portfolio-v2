"use client";

import { principles } from "@/content/site";
import { Chapter, Container, LineReveal, Reveal } from "./ui";

export function Principles() {
  return (
    <section id="principles" className="relative border-t border-line py-32 md:py-48">
      <Container>
        <Chapter index="02" label="What I believe" />

        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
                <LineReveal
                  lines={[
                    "The principles",
                    <>
                      I try to <em className="font-serif font-normal italic text-ember">live</em>
                    </>,
                    "and build by.",
                  ]}
                />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-sm leading-relaxed text-muted">
                  Not rules I always get right — just the ones I keep coming back to when it matters. They shape how I
                  work, and who I want to be while doing it.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="md:col-span-7">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-10 last:border-b md:grid-cols-[5rem_1fr] md:py-12"
              >
                <span className="font-mono text-xs text-muted transition-colors duration-500 group-hover:text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.05] tracking-[-0.01em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink/65">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
