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
  location: "Mumbai, India",
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
  stack: ["Claude Code", "TypeScript", "Node.js", "Next.js", "React", "Python", "MySQL", "PostgreSQL", "Amazon Redshift", "AWS", "Redis", "Docker"],
};

/** Career, newest first. */
export const journey = {
  heading: "Where I’ve been",
  items: [
    {
      period: "Aug 2025 - now",
      role: "Full-stack engineer (SDE-1)",
      org: "SolarSquare",
      summary:
        "Building across the whole stack, from APIs and data to the screens people use, and spending more and more of my time on the design: how a system should work, where it should bend and what happens when it breaks. AI writes most of the code; I make sure it’s the right code.",
      // TODO(manan): add one or two results once you have numbers you can share.
      highlights: [],
    },
    {
      period: "Jun 2024 - Jul 2025",
      role: "Software engineer",
      org: "Novoinvent Softwares",
      summary:
        "Backend for a fintech platform: transactions, bank integrations and data at scale, where correctness isn’t optional.",
      highlights: [
        "API latency down 60% by reworking SQL queries",
        "1,000+ concurrent transactions with no data corruption",
        "5,000+ bank files a day into wallets, 90% faster",
        "10M rows a day into Redshift, 15% faster processing",
        "Database response times down 20% with indexing",
      ],
    },
    {
      period: "May 2023 - May 2024",
      role: "Software engineer intern",
      org: "Novoinvent Softwares",
      summary:
        "Where it started: learning the craft next to senior engineers, from MySQL performance to shipping real features on AWS.",
      highlights: [
        "Invoice text extraction at scale with AWS Textract and S3",
        "Query optimisation cut database load by 25%",
        "Integrated external REST APIs into the platform",
      ],
    },
  ],
};

/** Projects, newest first (the site sorts by year). Without an image a gradient cover is drawn. */
export const projects = {
  heading: "Things I’ve built",
  items: [
    {
      title: "Kubera",
      year: "2026",
      kind: "MCP server",
      summary:
        "Personal-finance tracking built for AI agents. The agent handles the conversation; Kubera owns validation, duplicate detection, audit history and reports. Designed on paper first, then built with AI.",
      stack: ["Go", "MCP", "SQLite"],
      href: "https://github.com/xManan/kubera",
      image: "",
    },
    {
      title: "Snapmart",
      year: "2025",
      kind: "Full-stack app",
      summary: "A quick-commerce grocery store, end to end: OTP sign-in, catalogue and categories, inventory, orders and delivery agents.",
      stack: ["Go", "PostgreSQL", "Redis", "React", "TypeScript"],
      href: "https://github.com/xManan/snapmart",
      image: "",
    },
    {
      title: "home-server",
      year: "2025",
      kind: "Self-hosted infrastructure",
      summary:
        "An old laptop turned home server, declared entirely in NixOS: media streaming with Jellyfin, downloads over a VPN, nginx in front, a tunnel to the internet and wake-on-LAN.",
      stack: ["NixOS", "nginx", "Docker"],
      href: "https://github.com/xManan/home-server",
      image: "",
    },
    {
      title: "go-t",
      year: "2024",
      kind: "Command-line tool",
      summary: "A typing speed test that lives in the terminal. Small, fast and written in Go, with a Nix flake so it runs anywhere.",
      stack: ["Go", "CLI", "Nix"],
      href: "https://github.com/xManan/go-t",
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
