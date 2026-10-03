/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything personal on the site lives in this one file.
 *
 *  The copy below is a DRAFT written to show the tone and shape of each
 *  section. Anything marked `TODO(manan)` is a guess and must be replaced with
 *  your own words — the site only works if it actually sounds like you.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const person = {
  name: "Manan Chawla",
  firstName: "Manan",
  initials: "MC",
  role: "Backend Engineer",
  // TODO(manan): your city and IANA timezone (drives the live clock).
  location: "New Delhi, India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  // TODO(manan): confirm the email you want people to use.
  email: "mananchawla10@gmail.com",
  // TODO(manan): what you’re doing right now, one short line.
  status: "Building distributed systems",
  available: true,
  socials: [
    { label: "GitHub", href: "https://github.com/xManan" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/manan-chawla-01b3bb246" },
    // TODO(manan): add X / Bluesky / Read.cv etc. if you use them.
  ],
};

/** The opening quote. Pick one that you’d actually tattoo on your arm. */
export const quote = {
  // TODO(manan): replace with the quote that means the most to you.
  // Wrap words in *asterisks* to italicise them.
  text: "Simplicity is *prerequisite* for *reliability.*",
  author: "Edsger W. Dijkstra",
};

export const hero = {
  // Lines of the headline. Wrap a word in *asterisks* to set it in the
  // italic accent style.
  headline: ["I build the *quiet* systems", "that keep everything else", "*running.*"],
  intro:
    "I’m Manan — a backend engineer who cares about the parts of software nobody sees: the APIs, data and infrastructure that have to just work, every time, for everyone.",
};

/** Chapter 01 — The person. Read top to bottom, it should feel like a letter. */
export const story = {
  // TODO(manan): this is the most important paragraph on the site. Rewrite it
  // in your own voice: where you grew up, what pulled you into computers,
  // what you care about outside of work.
  lead:
    "I fell in love with computers the way most people fall in love with anything — by breaking it first. What kept me there wasn’t the code. It was the feeling of taking something tangled and making it calm, clear and dependable. I still chase that feeling every day. Outside of work I’m a curious, slightly obsessive learner who believes the best engineers are, first, good people to build with.",
  facts: [
    // TODO(manan): four small, true, human things about you.
    { label: "Mornings", value: "Chai, a notebook, and one hard problem before the inbox." },
    { label: "Off the keyboard", value: "Long walks, longer playlists, and too many open browser tabs." },
    { label: "Currently learning", value: "How databases really work, one paper at a time." },
    { label: "Quietly proud of", value: "Systems that went years without paging anyone." },
  ],
};

/** Chapter 02 — What I believe. Values as a person, not as an engineer. */
export const principles = [
  // TODO(manan): keep the ones that are true, rewrite the rest.
  {
    title: "Leave it better than you found it",
    body: "Codebases, teams, conversations. I try to make every place I pass through a little clearer and a little kinder than it was.",
  },
  {
    title: "Honesty over comfort",
    body: "Say what you know, admit what you don’t, and never let a status update hide a problem. Trust is built in the boring, truthful moments.",
  },
  {
    title: "Curiosity is a discipline",
    body: "“I don’t know yet” is my favourite sentence. I’d rather understand one thing deeply than skim ten.",
  },
  {
    title: "Own the outcome, not the task",
    body: "Shipping isn’t the finish line — the thing working for real people is. I follow my work all the way into production.",
  },
  {
    title: "Patience compounds",
    body: "Good systems, good habits and good relationships are all built the same way: small, consistent, unglamorous effort over a long time.",
  },
];

/** Chapter 03 — What I do. */
export const craft = {
  statement:
    "I design the parts of software you never see — and only notice when they break. My job is to make sure you never have to.",
  capabilities: [
    {
      title: "APIs & Services",
      body: "Clear contracts, sensible boundaries, and services that are easy to reason about at 3am.",
      items: ["REST & gRPC", "Event-driven design", "Auth & multi-tenancy"],
    },
    {
      title: "Data & Storage",
      body: "Modelling data so it stays correct as the product grows, and fast when it matters.",
      items: ["Schema design", "Query performance", "Caching strategy"],
    },
    {
      title: "Reliability & Scale",
      body: "Systems that degrade gracefully, recover on their own, and tell you what’s wrong.",
      items: ["Observability", "Queues & retries", "Load & failure testing"],
    },
    {
      title: "Infrastructure",
      body: "Boring, reproducible infrastructure so the team can ship without fear.",
      items: ["Containers", "CI/CD", "Cloud & IaC"],
    },
  ],
  // TODO(manan): your actual stack.
  stack: [
    "Go",
    "Node.js",
    "TypeScript",
    "Python",
    "PostgreSQL",
    "Redis",
    "Kafka",
    "Docker",
    "Kubernetes",
    "AWS",
    "gRPC",
    "Linux",
  ],
};

/** Chapter 04 — The path. Newest first. */
export const journey = [
  // TODO(manan): replace with your real roles, years and impact.
  {
    period: "2024 — Now",
    role: "Backend Engineer",
    org: "Company Name",
    summary:
      "Designing and running the services behind the core product. Focused on performance, reliability and making the platform a calm place to build on.",
    highlights: ["Cut p99 latency of a critical API by 60%", "Led a zero-downtime data migration"],
  },
  {
    period: "2023 — 2024",
    role: "Software Engineer",
    org: "Previous Company",
    summary:
      "Built the APIs and background workers for a fast-growing product, and learned what production really means.",
    highlights: ["Shipped an event pipeline processing millions of events a day"],
  },
  {
    period: "2021 — 2023",
    role: "Student & Builder",
    org: "University / Self-taught",
    summary:
      "Where it started — side projects, open source, late nights and the first time something I built was used by a stranger.",
    highlights: ["31 public repositories and counting"],
  },
];

/** Chapter 05 — Things I’ve built. */
export const projects = [
  // TODO(manan): your real projects. `terminal` lines are shown in the card’s
  // little console — make them say something true about the project.
  {
    title: "Project One",
    year: "2026",
    kind: "Distributed system",
    summary: "A short, human description of the problem this solved and why it mattered to someone.",
    stack: ["Go", "PostgreSQL", "Redis"],
    terminal: ["$ make bench", "→ 42,000 req/s · p99 8ms", "✓ all systems nominal"],
    href: "https://github.com/xManan",
  },
  {
    title: "Project Two",
    year: "2025",
    kind: "Developer tool",
    summary: "A tool you built because you were tired of doing something by hand — and others ended up using too.",
    stack: ["TypeScript", "Node.js"],
    terminal: ["$ npx project-two init", "→ scaffolded in 1.2s", "✓ ready"],
    href: "https://github.com/xManan",
  },
  {
    title: "Project Three",
    year: "2025",
    kind: "Data pipeline",
    summary: "Moving and shaping data reliably, with retries, backpressure and dashboards that tell the truth.",
    stack: ["Python", "Kafka", "Docker"],
    terminal: ["$ pipeline status", "→ 3.1M events / day", "✓ 0 dropped"],
    href: "https://github.com/xManan",
  },
  {
    title: "Project Four",
    year: "2024",
    kind: "Open source",
    summary: "Something small and sharp you put out into the world for free.",
    stack: ["Rust", "CLI"],
    terminal: ["$ cargo install project-four", "→ compiled in 9.8s", "✓ installed"],
    href: "https://github.com/xManan",
  },
];

/** Chapter 06 — How I think. Engineering approach, read left to right. */
export const thinking = [
  {
    title: "Understand the why",
    body: "Before a line of code, I want to know who this is for and what changes for them if we get it right.",
  },
  {
    title: "Find the real constraints",
    body: "Scale, latency, money, time, people. The constraints are the design — everything else is preference.",
  },
  {
    title: "Design for failure",
    body: "Every network call fails eventually. I start from the failure modes and work backwards to the happy path.",
  },
  {
    title: "Ship small, ship often",
    body: "Small changes are easy to review, easy to roll back and easy to learn from. Big bangs are for physics.",
  },
  {
    title: "Measure, then believe",
    body: "Intuition picks where to look; data decides what’s true. If it isn’t observable, it isn’t done.",
  },
];

/** "Now" — inspired by nownownow.com. Update it every month or so. */
export const now = {
  // TODO(manan): keep this fresh — it’s the most human part of the page.
  updated: "October 2026",
  items: [
    { label: "Building", value: "This portfolio, and a toy key-value store to understand storage engines." },
    { label: "Learning", value: "Consensus algorithms — reading the Raft paper slowly." },
    { label: "Reading", value: "Designing Data-Intensive Applications, again." },
    { label: "Thinking about", value: "What it means to write software that lasts ten years." },
  ],
};

/** "Shelf" — the books and ideas that shaped you. */
export const shelf = [
  // TODO(manan): your actual shelf.
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", note: "The book that made backend click." },
  { title: "The Pragmatic Programmer", author: "Hunt & Thomas", note: "Care about your craft." },
  { title: "A Philosophy of Software Design", author: "John Ousterhout", note: "Complexity is the enemy." },
  { title: "Atomic Habits", author: "James Clear", note: "Small things, consistently." },
];
