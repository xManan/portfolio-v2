/**
 * Everything personal on the site lives in this one file.
 *
 * The copy below is a DRAFT that shows the tone and shape of each section.
 * Anything marked `TODO(manan)` is a guess and must be replaced with your own
 * words. House style: sentence case, no em-dashes, plain verbs.
 */

export const person = {
  name: "Manan Chawla",
  firstName: "Manan",
  role: "Backend engineer",
  // TODO(manan): your city (shown once, in the footer).
  location: "New Delhi, India",
  // TODO(manan): confirm the email you want people to use.
  email: "mananchawla10@gmail.com",
  // TODO(manan): drop a square-ish photo in /public and set the path, e.g. "/manan.jpg".
  portrait: "" as string,
  socials: [
    { label: "GitHub", href: "https://github.com/xManan" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/manan-chawla-01b3bb246" },
  ],
};

/** The opening quote. Pick one you would actually tattoo on your arm. */
export const quote = {
  // TODO(manan): replace with the quote that means the most to you.
  text: "Simplicity is prerequisite for reliability.",
  author: "Edsger W. Dijkstra",
};

export const hero = {
  greeting: "Hi, I’m Manan, a backend engineer.",
  // Keep this to two lines on desktop (about 40 characters).
  headline: "I build quiet systems that just work.",
  // Max 20 words.
  intro: "I design the APIs, data and infrastructure people never see, and make sure they never have to.",
};

/** About. Read top to bottom, it should feel like a letter. */
export const story = {
  heading: "A little about me",
  // TODO(manan): the most important paragraph on the site. Rewrite it in your
  // own voice: where you grew up, what pulled you into computers, what you
  // care about outside of work.
  lead:
    "I fell in love with computers the way most people fall in love with anything: by breaking one first. What kept me there wasn’t the code. It was the feeling of taking something tangled and making it calm, clear and dependable. I still chase that feeling every day. Outside of work I’m a curious, slightly obsessive learner who believes the best engineers are, first, good people to build with.",
  // Floating objects around the story. Files live in content/objects (placeholder
  // 3D renders); replace them with cut-out photos of your own things in /admin.
  // TODO(manan): your real things and captions.
  objects: [
    { file: "controller.webp", label: "A game controller", caption: "One more match, then bed. Probably.", size: "medium" },
    { file: "laptop.webp", label: "My laptop", caption: "It works on my machine. I checked twice.", size: "large" },
    { file: "headphones.webp", label: "Headphones", caption: "Long walks, longer playlists.", size: "medium" },
    { file: "books.webp", label: "A stack of books", caption: "Reading the Raft paper. Slowly.", size: "medium" },
    { file: "dumbbells.webp", label: "A pair of dumbbells", caption: "Lifting things that aren't servers.", size: "small" },
    { file: "bulb.webp", label: "A light bulb", caption: "100 tabs open, one good idea.", size: "small" },
    { file: "plant.webp", label: "A potted plant", caption: "Keeping one plant alive. So far.", size: "small" },
  ] as const,
};

/** What I believe. Values as a person, not as an engineer. */
export const principles = {
  heading: "What I believe",
  items: [
    // TODO(manan): keep the ones that are true, rewrite the rest.
    {
      title: "Leave it better than you found it",
      body: "Codebases, teams, conversations. I try to make every place I pass through a little clearer and a little kinder.",
    },
    {
      title: "Honesty over comfort",
      body: "Say what you know, admit what you don’t, and never let a status update hide a problem.",
    },
    {
      title: "Curiosity is a discipline",
      body: "“I don’t know yet” is my favourite sentence. I’d rather understand one thing deeply than skim ten.",
    },
    {
      title: "Own the outcome, not the task",
      body: "Shipping isn’t the finish line. The thing working for real people is, so I follow my work into production.",
    },
    {
      title: "Patience compounds",
      body: "Good systems, habits and friendships are built the same way: small, steady, unglamorous effort over years.",
    },
  ],
};

/** What I do. */
export const craft = {
  heading: "What I do",
  statement:
    "I design the parts of software you never see and only notice when they break. My job is to make sure you never have to.",
  capabilities: [
    {
      title: "APIs and services",
      body: "Clear contracts, sensible boundaries, and services that are easy to reason about at 3am.",
      items: ["REST and gRPC", "Event-driven design", "Auth and multi-tenancy"],
    },
    {
      title: "Data and storage",
      body: "Modelling data so it stays correct as the product grows, and fast where it matters.",
      items: ["Schema design", "Query performance", "Caching"],
    },
    {
      title: "Reliability",
      body: "Systems that degrade gracefully, recover on their own, and tell you what went wrong.",
      items: ["Observability", "Queues and retries", "Failure testing"],
    },
    {
      title: "Infrastructure",
      body: "Boring, reproducible infrastructure so the team can ship without fear.",
      items: ["Containers", "CI/CD", "Cloud and IaC"],
    },
  ],
  // TODO(manan): your actual stack.
  stack: ["Go", "Node.js", "TypeScript", "Python", "PostgreSQL", "Redis", "Kafka", "Docker", "Kubernetes", "AWS", "gRPC", "Linux"],
};

/** Career, newest first. */
export const journey = {
  heading: "Where I’ve been",
  items: [
    // TODO(manan): replace with your real roles, years and impact.
    {
      period: "2024 - now",
      role: "Backend engineer",
      org: "Company name",
      summary:
        "Designing and running the services behind the core product, with a focus on performance, reliability and a calm platform to build on.",
      highlights: ["Cut p99 latency of a critical API by 60%", "Led a zero-downtime data migration"],
    },
    {
      period: "2023 - 2024",
      role: "Software engineer",
      org: "Previous company",
      summary: "Built the APIs and background workers for a fast-growing product, and learned what production really means.",
      highlights: ["Shipped an event pipeline handling millions of events a day"],
    },
    {
      period: "2021 - 2023",
      role: "Student and builder",
      org: "University and self-taught",
      summary:
        "Where it started: side projects, open source, late nights, and the first time a stranger used something I built.",
      highlights: ["31 public repositories and counting"],
    },
  ],
};

/** Projects. Optional `image` is a path in /public; without it a gradient cover is drawn. */
export const projects = {
  heading: "Things I’ve built",
  items: [
    // TODO(manan): your real projects.
    {
      title: "Project one",
      year: "2026",
      kind: "Distributed system",
      summary: "A short, human description of the problem this solved and who it helped.",
      stack: ["Go", "PostgreSQL", "Redis"],
      href: "https://github.com/xManan",
      image: "",
    },
    {
      title: "Project two",
      year: "2025",
      kind: "Developer tool",
      summary: "Something you built because you were tired of doing it by hand, and others ended up using too.",
      stack: ["TypeScript", "Node.js"],
      href: "https://github.com/xManan",
      image: "",
    },
    {
      title: "Project three",
      year: "2025",
      kind: "Data pipeline",
      summary: "Moving and shaping data reliably, with retries, backpressure and dashboards that tell the truth.",
      stack: ["Python", "Kafka", "Docker"],
      href: "https://github.com/xManan",
      image: "",
    },
    {
      title: "Project four",
      year: "2024",
      kind: "Open source",
      summary: "Something small and sharp you put out into the world for free.",
      stack: ["Rust", "CLI"],
      href: "https://github.com/xManan",
      image: "",
    },
  ],
};

/** How I think. A real sequence, read left to right. */
export const thinking = {
  heading: "How I approach a problem",
  steps: [
    { title: "Understand the why", body: "Before any code, I want to know who this is for and what changes for them if we get it right." },
    { title: "Find the real constraints", body: "Scale, latency, money, time, people. The constraints are the design. The rest is preference." },
    { title: "Design for failure", body: "Every network call fails eventually. I start from the failure modes and work back to the happy path." },
    { title: "Ship small, ship often", body: "Small changes are easy to review, easy to roll back and easy to learn from." },
    { title: "Measure, then believe", body: "Intuition picks where to look. Data decides what’s true. If it isn’t observable, it isn’t done." },
  ],
};

/** "Now", inspired by nownownow.com. Update it every month or so. */
export const now = {
  // TODO(manan): keep this fresh. It's the most human part of the page.
  updated: "October 2026",
  items: [
    { label: "Building", value: "This site, and a toy key-value store to understand storage engines." },
    { label: "Learning", value: "Consensus algorithms, reading the Raft paper slowly." },
    { label: "Reading", value: "Designing Data-Intensive Applications, again." },
    { label: "Thinking about", value: "What it takes to write software that lasts ten years." },
  ],
};

/** Books that shaped you. */
export const shelf = [
  // TODO(manan): your actual shelf.
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", note: "The book that made backend click." },
  { title: "The Pragmatic Programmer", author: "Hunt and Thomas", note: "Care about your craft." },
  { title: "A Philosophy of Software Design", author: "John Ousterhout", note: "Complexity is the enemy." },
  { title: "Atomic Habits", author: "James Clear", note: "Small things, consistently." },
];

export const contact = {
  heading: "Let’s build something that lasts.",
  body: "I’m always happy to talk about backend systems, a role, or an idea you’re chewing on.",
};
