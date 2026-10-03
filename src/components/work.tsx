"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { projects } from "@/content/site";
import { Chapter, Container, EASE_OUT, LineReveal, Reveal } from "./ui";

type Project = (typeof projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgb(255 106 61 / 0.16), transparent 65%)`;

  return (
    <Reveal delay={(index % 2) * 0.12} className={index % 2 === 1 ? "md:mt-32" : ""}>
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="group block"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 100);
          my.set(((e.clientY - r.top) / r.height) * 100);
        }}
      >
        {/* Visual: a calm little console that "runs" the project */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-raised">
          <motion.div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlight }} />
          <div
            aria-hidden
            className="absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
            style={{
              backgroundImage: "radial-gradient(rgb(239 233 223 / 0.12) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          {/* Orbit rings + glow give each card its own quiet visual */}
          <div aria-hidden className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
            <div
              className="h-40 w-40 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-125"
              style={{ background: ["#ff6a3d", "#c9a27a", "#ff8a5c", "#e8d9c4"][index % 4], opacity: 0.18 }}
            />
            {[220, 340, 460].map((size, r) => (
              <span
                key={size}
                className="absolute left-1/2 top-1/2 rounded-full border border-ink/[0.07] transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105"
                style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, transitionDelay: `${r * 80}ms` }}
              />
            ))}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-5xl italic text-ink/80 md:text-6xl">
              {project.title}
            </span>
          </div>
          <span className="absolute left-6 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {project.kind}
          </span>
          <span className="absolute right-6 top-5 font-mono text-[10px] text-muted">{String(index + 1).padStart(2, "0")}</span>

          <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-line bg-canvas/80 shadow-2xl shadow-black/40 backdrop-blur transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 md:inset-x-10 md:bottom-10">
            <div className="flex gap-1.5 border-b border-line px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-faint" />
              <span className="h-2 w-2 rounded-full bg-faint" />
              <span className="h-2 w-2 rounded-full bg-faint" />
            </div>
            <div className="space-y-1.5 px-4 py-4 font-mono text-[12px] leading-relaxed">
              {project.terminal.map((line, i) => (
                <motion.div
                  key={line}
                  className={i === 0 ? "text-ink" : i === project.terminal.length - 1 ? "text-emerald-400" : "text-muted"}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.35, duration: 0.6, ease: EASE_OUT }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-serif text-4xl leading-none tracking-[-0.01em] md:text-5xl">{project.title}</h3>
            <p className="mt-4 max-w-md leading-relaxed text-ink/65">{project.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-4">
            <span className="font-mono text-xs text-muted">{project.year}</span>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-canvas">
              ↗
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="relative border-t border-line py-32 md:py-48">
      <Container>
        <Chapter index="05" label="Things I've built" />

        <div className="mb-20 flex flex-col justify-between gap-8 md:mb-28 md:flex-row md:items-end">
          <h2 className="max-w-3xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.04em]">
            <LineReveal
              lines={[
                "Selected work —",
                <>
                  built to <em className="font-serif font-normal italic text-ember">last.</em>
                </>,
              ]}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="max-w-xs leading-relaxed text-muted">
              A few things I&rsquo;ve made, from production systems to weekend experiments. The rest lives on GitHub.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-x-10 gap-y-24 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
