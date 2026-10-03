"use client";

import { useEffect, useState } from "react";
import { craft } from "@/content/site";
import { Chapter, Container, LineReveal, Reveal } from "./ui";

type Node = { id: string; label: string; sub: string; x: number; y: number; accent?: boolean };

const nodes: Node[] = [
  { id: "client", label: "client", sub: "you", x: 70, y: 180 },
  { id: "gateway", label: "gateway", sub: "auth · rate", x: 240, y: 180 },
  { id: "api", label: "service", sub: "where I live", x: 420, y: 180, accent: true },
  { id: "cache", label: "cache", sub: "redis", x: 600, y: 70 },
  { id: "db", label: "database", sub: "postgres", x: 790, y: 180 },
  { id: "queue", label: "queue", sub: "events", x: 600, y: 290 },
  { id: "worker", label: "worker", sub: "async", x: 790, y: 290 },
];

const edges = [
  { d: "M110 180 H200", dur: 2.2, begin: 0 },
  { d: "M280 180 H380", dur: 2.2, begin: 0.6 },
  { d: "M460 180 C 520 180, 520 70, 560 70", dur: 2.4, begin: 1.1 },
  { d: "M460 180 H750", dur: 2.6, begin: 1.4 },
  { d: "M460 180 C 520 180, 520 290, 560 290", dur: 2.4, begin: 1.8 },
  { d: "M640 290 H750", dur: 2, begin: 2.4 },
  { d: "M790 270 V200", dur: 1.6, begin: 3 },
];

const logLines = [
  "GET  /v1/orders        200   8ms",
  "POST /v1/payments      201  24ms",
  "evt  order.created     → queue",
  "GET  /v1/users/me      200   3ms  (cache hit)",
  "job  send-receipt      ✓ done",
  "GET  /v1/search?q=…    200  14ms",
  "evt  retry #1          → backoff 200ms",
  "PUT  /v1/profile       200  11ms",
];

/** A tiny, always-moving picture of the part of software I spend my days in. */
function SystemDiagram() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, []);
  const visible = Array.from({ length: 4 }, (_, i) => logLines[(tick + i) % logLines.length]);

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-raised/60">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          fig. 01 — a request&rsquo;s journey
        </span>
        <span className="hidden sm:inline">illustrative</span>
      </div>

      <svg viewBox="0 0 880 360" className="block w-full" role="img" aria-label="Diagram of a request flowing from a client, through a gateway and service, to a cache, database, queue and worker.">
        <defs>
          <radialGradient id="packet">
            <stop offset="0%" stopColor="#ff6a3d" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff6a3d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {edges.map((e, i) => (
          <path key={i} d={e.d} fill="none" stroke="rgb(239 233 223 / 0.14)" strokeWidth="1" strokeDasharray="3 5" />
        ))}

        {edges.map((e, i) => (
          <g key={`p${i}`}>
            <circle r="9" fill="url(#packet)" opacity="0.6">
              <animateMotion dur={`${e.dur}s`} begin={`${e.begin}s`} repeatCount="indefinite" path={e.d} />
            </circle>
            <circle r="2.5" fill="#ffd9cc">
              <animateMotion dur={`${e.dur}s`} begin={`${e.begin}s`} repeatCount="indefinite" path={e.d} />
            </circle>
          </g>
        ))}

        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {n.accent && (
              <rect x="-52" y="-30" width="104" height="60" rx="16" fill="none" stroke="#ff6a3d" strokeOpacity="0.35">
                <animate attributeName="stroke-opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite" />
              </rect>
            )}
            <rect
              x="-42"
              y="-22"
              width="84"
              height="44"
              rx="11"
              fill="#15140f"
              stroke={n.accent ? "#ff6a3d" : "rgb(239 233 223 / 0.18)"}
            />
            <text textAnchor="middle" y="-1" fill="#efe9df" fontSize="12" fontFamily="var(--font-geist-mono)">
              {n.label}
            </text>
            <text textAnchor="middle" y="13" fill="#8f887c" fontSize="9" fontFamily="var(--font-geist-mono)">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>

      <div className="border-t border-line px-5 py-4 font-mono text-[11px] leading-6 text-muted">
        {visible.map((line, i) => (
          <div key={`${tick}-${i}`} className={i === visible.length - 1 ? "text-ink" : ""} style={{ opacity: 0.35 + i * 0.2 }}>
            <span className="mr-3 text-faint">›</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Craft() {
  return (
    <section id="craft" className="relative border-t border-line py-32 md:py-48">
      <Container>
        <Chapter index="03" label="What I do" />

        <div className="grid items-end gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
          <h2 className="text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.04em]">
            <LineReveal
              lines={[
                <>
                  I&rsquo;m a <em className="font-serif font-normal italic text-ember">backend</em>
                </>,
                "engineer.",
              ]}
            />
          </h2>
            <Reveal delay={0.25}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/65">{craft.statement}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <SystemDiagram />
          </Reveal>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-32 md:grid-cols-2 lg:grid-cols-4">
          {craft.capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="group flex flex-col bg-canvas p-8 transition-colors duration-500 hover:bg-raised">
              <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
              <h3 className="mt-12 text-xl font-medium tracking-tight">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/60">{c.body}</p>
              <ul className="mt-8 space-y-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {c.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-px w-3 bg-faint transition-all duration-500 group-hover:w-5 group-hover:bg-ember" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* The everyday toolbox, scrolling by */}
      <div className="marquee-mask mt-24 overflow-hidden border-y border-line py-8 md:mt-32">
        <div className="marquee flex w-max gap-14">
          {[...craft.stack, ...craft.stack].map((t, i) => (
            <span key={i} className="flex items-center gap-14 whitespace-nowrap font-serif text-4xl italic text-ink/80 md:text-5xl">
              {t}
              <span className="text-lg not-italic text-ember">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
