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
  role: "Software engineer",
  // TODO(manan): your city (shown once, in the footer).
  location: "New Delhi, India",
  // TODO(manan): confirm the email you want people to use.
  email: "mananchawla10@gmail.com",
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
  greeting: "Hi, I’m Manan. I design systems.",
  // Keep this to two lines on desktop (about 40 characters).
  headline: "I design the system. AI writes the code.",
  // Max 20 words.
  intro: "Backend first, then full stack. Now I design how software should work and let AI write most of it.",
};

/** About. Read top to bottom, it should feel like a letter. */
export const story = {
  heading: "A little about me",
  // TODO(manan): the most important paragraph on the site. Rewrite it in your
  // own voice: where you grew up, what pulled you into computers, what you
  // care about outside of work.
  lead:
    "I started in the backend, where the work is invisible and the stakes are real. Then I followed it up the stack, until I could build a product end to end. Somewhere along the way the typing stopped being the hard part. Today I spend my time on the decisions that matter: how a system should work, where it should bend, and what happens when it breaks. AI writes most of the code. I make sure it’s the right code.",
  // The things that tell your story, top to bottom. Files live in content/objects
  // (placeholder photos from Wikimedia Commons, see the LICENSE.md there);
  // replace them with cut-out photos of your own things in /admin.
  // TODO(manan): your real things, captions and stories.
  objects: [
    {
      file: "laptop.webp",
      label: "My MacBook Air",
      caption: "Less typing, more thinking.",
      story: "Where the day job happens. I sketch the system, write the spec, then pair with AI to build it, and read every line before it ships.",
      size: "large",
    },
    {
      file: "controller.webp",
      label: "A PS5 controller",
      caption: "One more match, then bed. Probably.",
      story: "Games taught me systems thinking before I had a name for it: every rule leans on every other rule. I still play most evenings, mostly co-op, always too late.",
      size: "medium",
    },
    {
      file: "headphones.webp",
      label: "AirPods Max",
      caption: "Long walks, longer playlists.",
      story: "My best ideas rarely show up at the desk. I walk, I listen, and whatever I was stuck on usually comes loose somewhere around the second album.",
      size: "medium",
    },
    {
      file: "dumbbells.webp",
      label: "A pair of dumbbells",
      caption: "Lifting things that aren't servers.",
      story: "Training keeps my head clear, and it's the most honest feedback loop I know: show up consistently and the numbers move.",
      size: "medium",
    },
    {
      file: "bulb.webp",
      label: "A light bulb",
      caption: "100 tabs open, one good idea.",
      story: "Curious to a fault. Side projects start as a question at midnight and end, sometimes, as something useful.",
      size: "small",
    },
    {
      file: "plant.webp",
      label: "A potted plant",
      caption: "Keeping one plant alive. So far.",
      story: "Small, steady care beats heroics, for plants and for production systems. This one is proof I'm learning.",
      size: "small",
    },
  ] as const,
};

/** What I believe. Values as a person, not as an engineer. */
export const principles = {
  heading: "What I believe",
  items: [
    // TODO(manan): keep the ones that are true, rewrite the rest.
    {
      title: "Judgement is the job",
      body: "AI can write the code. Deciding what to build, what to leave out and when something is good enough is still on me.",
    },
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
      body: "“I don’t know yet” is my favourite sentence. The tools change every month; the habit of learning is what lasts.",
    },
    {
      title: "Own the outcome, not the task",
      body: "Shipping isn’t the finish line. The thing working for real people is, whoever or whatever wrote the code.",
    },
  ],
};

/** What I do. */
export const craft = {
  heading: "What I do",
  statement:
    "I decide how a system should work: the boundaries, the data and the failure modes. Then I direct AI to build it, and review the result like it’s mine. Because it is.",
  capabilities: [
    {
      title: "System design",
      body: "Architecture that fits on a whiteboard: clear boundaries, honest trade-offs and a plan for when things fail.",
      items: ["Architecture and boundaries", "Data modelling", "Failure modes"],
    },
    {
      title: "AI-assisted engineering",
      body: "I treat AI as a fast, tireless pair. I write the specs, set the guardrails and review everything it produces.",
      items: ["Agentic coding", "Specs and context", "Code review"],
    },
    {
      title: "Backend",
      body: "Where I started and still feel most at home: APIs, queues, databases and the quiet work of making them boring.",
      items: ["APIs and services", "Queues and events", "Performance"],
    },
    {
      title: "Full stack",
      body: "Enough of the frontend to ship a product end to end, and to care how it feels to use.",
      items: ["React and Next.js", "TypeScript", "Product sense"],
    },
  ],
  // TODO(manan): your actual stack.
  stack: ["Claude Code", "TypeScript", "Go", "Node.js", "Next.js", "React", "Python", "PostgreSQL", "Redis", "Kafka", "Docker", "AWS"],
};

/** Career, newest first. Backend, then full stack, then systems with AI. */
export const journey = {
  heading: "Where I’ve been",
  items: [
    // TODO(manan): your real companies, years and results.
    {
      period: "2025 - now",
      role: "Systems and AI-assisted engineering",
      org: "Company name",
      summary:
        "I design the system and let AI do most of the writing: architecture, specs, guardrails and review. I ship more, and type less, than ever.",
      highlights: ["Moved the team to spec-first, AI-assisted development", "A result you’re proud of, with a number"],
    },
    {
      period: "2023 - 2025",
      role: "Full-stack engineer",
      org: "Previous company",
      summary: "Followed the work up the stack and learned to build the whole product, from the database to the button people click.",
      highlights: ["Shipped features end to end, from schema to UI"],
    },
    {
      period: "2021 - 2023",
      role: "Backend developer",
      org: "First company",
      summary: "Where it started: APIs, background workers and databases, and learning what production really means.",
      highlights: ["Built the services behind the core product"],
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
      kind: "Designed with AI",
      summary: "A product you designed end to end and built with AI. Say what it does, who it helps and what you decided.",
      stack: ["Next.js", "PostgreSQL", "Claude Code"],
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
      kind: "Backend system",
      summary: "From your backend years: moving data reliably, with retries, backpressure and dashboards that tell the truth.",
      stack: ["Go", "Kafka", "Docker"],
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

/** "Now", inspired by nownownow.com. Update it every month or so. */
export const now = {
  // TODO(manan): keep this fresh. It's the most human part of the page.
  updated: "October 2026",
  items: [
    { label: "Building", value: "This site. I designed it; AI wrote most of the code." },
    { label: "Learning", value: "How to write specs so clear an AI can’t misread them." },
    { label: "Reading", value: "Designing Data-Intensive Applications, again." },
    { label: "Thinking about", value: "What engineering becomes when code is cheap and judgement isn’t." },
  ],
};

/** Books that shaped you. */
export const shelf = [
  // TODO(manan): your actual shelf.
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", note: "The book that made backend click." },
  { title: "The Pragmatic Programmer", author: "Hunt and Thomas", note: "Care about your craft." },
  { title: "A Philosophy of Software Design", author: "John Ousterhout", note: "Complexity is the enemy, even when it’s cheap to write." },
  { title: "Atomic Habits", author: "James Clear", note: "Small things, consistently." },
];

export const contact = {
  heading: "Let’s build something that lasts.",
  body: "I’m always happy to talk about system design, building with AI, a role, or an idea you’re chewing on.",
};
