// Site-wide content for ToolSmithAi. Original copy; structure mirrors the audited reference.

export const BRAND = { name: "ToolSmithAi", short: "ToolSmith" };

export const PAYMENT_LINKS = {
  core: "https://selar.com/47plan?currency=USD",
  pro: "https://selar.com/57plan?currency=USD",
  scale: "https://selar.com/97plan?currency=USD",
} as const;

export const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    credits: 20,
    blurb: "Try ToolSmithAi with a small monthly allowance.",
    link: null as string | null,
    features: ["20 generation credits / month", "3 projects", "Live preview", "Community support"],
  },
  {
    id: "core",
    name: "Core",
    price: 47,
    credits: 300,
    blurb: "For personal projects and simple apps.",
    link: PAYMENT_LINKS.core as string | null,
    features: [
      "300 generation credits / month",
      "Up to 60 projects",
      "Unlimited workspaces",
      "Export and download code",
      "AI integrations",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 57,
    credits: 1000,
    blurb: "For commercial and professional builds.",
    link: PAYMENT_LINKS.pro as string | null,
    features: [
      "Everything in Core, plus:",
      "1,000 generation credits / month",
      "Priority model routing",
      "Premium support",
      "Up to 15 collaborators",
      "Version history rollback",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: 97,
    credits: 3000,
    blurb: "For teams shipping every day.",
    link: PAYMENT_LINKS.scale as string | null,
    features: [
      "Everything in Pro, plus:",
      "3,000 generation credits / month",
      "Advanced privacy controls",
      "Dedicated support",
      "Early access to new modes",
    ],
  },
];

export const PLAN_CREDITS: Record<string, number> = Object.fromEntries(PLANS.map((p) => [p.id, p.credits]));

export const BUILD_MODES = [
  { id: "website", label: "Website", icon: "globe", placeholder: "A portfolio site for a ceramic artist with a gallery and contact form…" },
  { id: "mobile", label: "Mobile", icon: "phone", placeholder: "A habit tracker with streaks, laid out for a phone screen…" },
  { id: "design", label: "Design", icon: "pen", placeholder: "A moodboard-style landing page for a boutique hotel…" },
  { id: "slides", label: "Slides", icon: "layers", placeholder: "A 8-slide pitch deck for a meal-kit startup…" },
  { id: "animation", label: "Animation", icon: "play", placeholder: "An animated logo reveal for a coffee brand…" },
  { id: "dataviz", label: "Data Visualization", icon: "chart", placeholder: "An interactive chart of monthly sales by region…" },
  { id: "game", label: "3D Game", icon: "cube", placeholder: "A small three.js game where you steer a ball through a maze…" },
  { id: "document", label: "Document", icon: "file", placeholder: "A printable invoice template with line items and totals…" },
  { id: "spreadsheet", label: "Spreadsheet", icon: "table", placeholder: "A budget tracker with live totals and category charts…" },
] as const;

export const EXAMPLE_PROMPTS = [
  "A booking page for a small yoga studio with class schedule and sign-up form",
  "A kanban board for my team with drag and drop and local persistence",
  "A mortgage calculator with an amortization chart",
  "A recipe collection site with search and tag filters",
  "An animated countdown page for a product launch",
];

export const NAV = {
  product: {
    label: "Product",
    groups: [
      {
        title: "Build",
        items: [
          { label: "Agent", desc: "Describe it, and it gets built", href: "/products/agent" },
          { label: "Design", desc: "An infinite canvas for explorations", href: "/design" },
          { label: "Slides", desc: "Decks generated from a prompt", href: "/slides" },
        ],
      },
      {
        title: "Platform",
        items: [
          { label: "Databases", desc: "Postgres with zero setup", href: "/products/database" },
          { label: "Integrations", desc: "AI, payments, email and more", href: "/integrations" },
          { label: "Security", desc: "Safe by default as you scale", href: "/security" },
        ],
      },
    ],
  },
  solutions: {
    label: "Solutions",
    groups: [
      {
        title: "Use cases",
        items: [
          { label: "Apps", desc: "Full applications from a sentence", href: "/usecases/ai-app-builder" },
          { label: "Websites", desc: "Launch a site in minutes", href: "/usecases/ai-website-builder" },
          { label: "Landing Pages", desc: "Convert more visitors", href: "/usecases/landing-page-builder" },
        ],
      },
      {
        title: "Teams",
        items: [
          { label: "Founders", desc: "Validate ideas faster", href: "/usecases/founders" },
          { label: "Product Managers", desc: "Show, don't tell", href: "/usecases/product-managers" },
          { label: "Designers", desc: "Ship what you design", href: "/usecases/designers" },
          { label: "Engineers", desc: "Skip the boilerplate", href: "/usecases/software-engineers" },
          { label: "Operations", desc: "Internal tools in hours", href: "/usecases/operations" },
        ],
      },
    ],
  },
  resources: {
    label: "Resources",
    groups: [
      {
        title: "Learn",
        items: [
          { label: "Docs", desc: "Guides and reference", href: "/docs" },
          { label: "Blog", desc: "Product news and craft", href: "/blog" },
          { label: "Community", desc: "Builders helping builders", href: "/community" },
        ],
      },
      {
        title: "Explore",
        items: [
          { label: "Templates", desc: "Start from a working base", href: "/templates" },
          { label: "Gallery", desc: "Projects made on ToolSmithAi", href: "/gallery" },
          { label: "Customer Stories", desc: "How teams build with us", href: "/customers" },
          { label: "Support", desc: "Get help from a human", href: "/support" },
          { label: "Newsroom", desc: "Press and announcements", href: "/news" },
          { label: "Partners", desc: "Work with us", href: "/partners" },
        ],
      },
    ],
  },
};

export const FOOTER = [
  { title: "Product", links: [["Design", "/design"], ["Slides", "/slides"], ["Agents", "/products/agent"], ["Databases", "/products/database"], ["Integrations", "/integrations"], ["Security", "/security"], ["Enterprise", "/enterprise"], ["Pricing", "/pricing"]] },
  { title: "Resources", links: [["Templates", "/templates"], ["Gallery", "/gallery"], ["Customer stories", "/customers"], ["Docs", "/docs"], ["Blog", "/blog"], ["Community", "/community"], ["Support", "/support"], ["Status", "/status"]] },
  { title: "Company", links: [["About", "/about"], ["Careers", "/careers"], ["Newsroom", "/news"], ["Partners", "/partners"], ["Certifications", "/certifications"], ["Brand kit", "/brand"], ["Contact us", "/contact"]] },
  { title: "Legal", links: [["Terms of service", "/legal/terms"], ["Privacy policy", "/legal/privacy"], ["Pro agreement", "/legal/pro-agreement"], ["Enterprise agreement", "/legal/enterprise-agreement"], ["Data processing agreement", "/legal/dpa"], ["Subprocessors", "/legal/subprocessors"], ["Report abuse", "/legal/abuse"]] },
];

export const TESTIMONIALS = [
  { quote: "Connecting ToolSmithAi to our warehouse data meant analysts could ship their own internal apps with the right governance already in place.", name: "Marcus Hale", role: "VP Data Platform", co: "Northwind Analytics" },
  { quote: "Live co-building with partners changed our feedback loop. Instead of mock-ups and meetings, we review working software together.", name: "Priya Raman", role: "Principal Product Manager", co: "Loomstead" },
  { quote: "A one-line prompt came back with a requirements plan before a single line of code. It took me from rough concept to clickable prototype in an afternoon.", name: "Daniel Okafor", role: "Principal Product Manager", co: "Paylane" },
  { quote: "Several builders work in one codebase every day. Seeing every task before it merges is exactly the workflow we wanted.", name: "Elena Voss", role: "Co-Founder & Chief AI Officer", co: "Brightmint" },
  { quote: "Our internal teams prototype and scale tools in hours rather than weeks. Operations finally moves as fast as the product.", name: "Hannah Brooks", role: "SVP, People & Talent", co: "Corvid Systems" },
  { quote: "Multi-user building through the board is a milestone for enterprises. Individual ideas turn into team projects with clear roles.", name: "Kenji Watanabe", role: "Director", co: "Aoyama Digital Lab" },
];

export const AGENT_FAQ = [
  ["What is the ToolSmithAi Agent?", "It is an AI builder that turns a plain-language description into a working app, site or document. You refine the result through conversation and publish from the same workspace."],
  ["How does it work?", "You describe what you want. The Agent plans the build, writes the code with a Gemini model, shows a live preview and keeps every version so you can roll back."],
  ["What can I build?", "Websites, landing pages, small web apps, dashboards, slide decks, animations, calculators, documents and spreadsheets-style tools."],
  ["Do I need to write code?", "No. You can read and edit the generated code if you like, but every change can be made by asking."],
  ["Does it deploy my app?", "You can download the project or share a public preview link. Production hosting integrations are on the roadmap and are not enabled yet."],
  ["Can it build mobile apps?", "It builds mobile-first web apps that run in the browser. Native store builds are not supported."],
];

export const PRICING_FAQ = [
  ["What are all the features included in these plans?", "Every paid plan includes live previews, project history, code export and priority generation. Higher tiers add more monthly credits, collaborators and support."],
  ["How do credits work?", "Each generation or revision spends one credit. Your plan's allowance resets monthly and the dashboard shows your remaining balance in real time."],
  ["What happens when I run out of credits?", "Generation pauses until your allowance resets or you upgrade. Your projects stay available and editable."],
  ["What comes with my subscription?", "Your plan's monthly credits, project and collaborator limits, support level and access to every build mode."],
  ["What plan is best for me?", "Core suits personal projects, Pro suits commercial work and small teams, Scale suits teams generating daily."],
  ["How can I see how much I'm spending?", "The Usage page in your dashboard lists every generation with the credits it consumed."],
  ["Do you offer invoicing instead of credit card payments?", "Checkout is handled by our payment partner. For invoiced billing, contact sales."],
  ["Do you offer annual plans at a discount?", "Annual billing is not available yet. Today every plan is billed monthly."],
];
