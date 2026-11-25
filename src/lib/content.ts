// Site-wide content for ToolSmithAi. Positioning: AI-native platform for business software.

export const BRAND = { name: "ToolSmithAi" };

export const PAYMENT_LINKS = {
  core: "https://selar.com/47plan?currency=USD",
  pro: "https://selar.com/57plan?currency=USD",
  scale: "https://selar.com/97plan?currency=USD",
} as const;

export const PLANS = [
  {
    id: "free",
    name: "Evaluate",
    price: 0,
    credits: 20,
    blurb: "Test the AI engine on a real workflow before you commit budget.",
    link: null as string | null,
    features: ["20 AI builds per month", "3 active projects", "Live preview and version history", "Shareable project links"],
  },
  {
    id: "core",
    name: "Core",
    price: 47,
    credits: 300,
    blurb: "For teams replacing manual processes with AI-built internal tools.",
    link: PAYMENT_LINKS.core as string | null,
    features: ["300 AI builds per month", "Up to 60 projects", "Full source code export", "Version rollback on every project", "Usage ledger with per-build cost"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 57,
    credits: 1000,
    blurb: "For operating teams that ship and revise software every week.",
    link: PAYMENT_LINKS.pro as string | null,
    features: ["Everything in Core, plus:", "1,000 AI builds per month", "Priority model routing", "Premium support", "Built for multi-team delivery"],
  },
  {
    id: "scale",
    name: "Scale",
    price: 97,
    credits: 3000,
    blurb: "For organizations that run software delivery through AI.",
    link: PAYMENT_LINKS.scale as string | null,
    features: ["Everything in Pro, plus:", "3,000 AI builds per month", "Highest build throughput", "Dedicated support", "Priority access to new build types"],
  },
];

export const PLAN_CREDITS: Record<string, number> = Object.fromEntries(PLANS.map((p) => [p.id, p.credits]));

export const BUILD_MODES = [
  { id: "website", label: "Website", icon: "globe", placeholder: "A partner portal with a product catalog, pricing tiers and an inquiry form…" },
  { id: "mobile", label: "Mobile", icon: "phone", placeholder: "A field-service checklist for technicians, laid out for a phone screen…" },
  { id: "design", label: "Design", icon: "pen", placeholder: "A landing page for a logistics platform with a bold, enterprise look…" },
  { id: "slides", label: "Slides", icon: "layers", placeholder: "An 8-slide board update covering revenue, churn and pipeline risk…" },
  { id: "animation", label: "Animation", icon: "play", placeholder: "An animated explainer of our onboarding workflow…" },
  { id: "dataviz", label: "Data Visualization", icon: "chart", placeholder: "An interactive view of monthly revenue by region with variance flags…" },
  { id: "game", label: "3D Game", icon: "cube", placeholder: "A 3D warehouse-training simulation built with three.js…" },
  { id: "document", label: "Document", icon: "file", placeholder: "A print-ready purchase order with line items, tax and totals…" },
  { id: "spreadsheet", label: "Spreadsheet", icon: "table", placeholder: "A budget model with live totals, scenarios and category charts…" },
] as const;

export const EXAMPLE_PROMPTS = [
  "An approvals dashboard that routes purchase requests by amount and flags overspend",
  "A churn-risk board that ranks accounts by usage decline and renewal date",
  "A supplier scorecard with delivery performance, defect rate and cost trends",
  "A sales pipeline view that forecasts quarterly revenue from deal stage and age",
  "An onboarding tracker that assigns tasks to teams and escalates overdue steps",
];

export const NAV = {
  product: {
    label: "Product",
    groups: [
      {
        title: "Platform",
        items: [
          { label: "AI Agent", desc: "Turns a business requirement into running software", href: "/products/agent" },
          { label: "Data layer", desc: "Postgres with row-level security", href: "/products/database" },
          { label: "Integrations", desc: "Gemini, Supabase and checkout in one stack", href: "/integrations" },
          { label: "Security", desc: "Isolation and access control by default", href: "/security" },
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
          { label: "Internal apps", desc: "Replace spreadsheets and manual handoffs", href: "/usecases/ai-app-builder" },
          { label: "Business websites", desc: "Partner and customer portals", href: "/usecases/ai-website-builder" },
          { label: "Landing pages", desc: "Campaign pages built to convert", href: "/usecases/landing-page-builder" },
        ],
      },
      {
        title: "Teams",
        items: [
          { label: "Operations", desc: "Automate recurring workflows", href: "/usecases/operations" },
          { label: "Product", desc: "Validate decisions with working software", href: "/usecases/product-managers" },
          { label: "Engineering", desc: "Remove boilerplate from delivery", href: "/usecases/software-engineers" },
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
          { label: "Documentation", desc: "Guides for builds, credits and sharing", href: "/docs" },
          { label: "Support", desc: "Answers on billing and access", href: "/support" },
          { label: "About", desc: "Why we built ToolSmithAi", href: "/about" },
        ],
      },
    ],
  },
};

export const FOOTER = [
  { title: "Product", links: [["AI Agent", "/products/agent"], ["Data layer", "/products/database"], ["Integrations", "/integrations"], ["Security", "/security"], ["Pricing", "/pricing"]] },
  { title: "Solutions", links: [["Internal apps", "/usecases/ai-app-builder"], ["Business websites", "/usecases/ai-website-builder"], ["Operations", "/usecases/operations"]] },
  { title: "Company", links: [["About", "/about"], ["Documentation", "/docs"], ["Support", "/support"]] },
  { title: "Legal", links: [["Terms of service", "/legal/terms"], ["Privacy policy", "/legal/privacy"], ["Data processing agreement", "/legal/dpa"], ["Subprocessors", "/legal/subprocessors"]] },
];

export const AGENT_FAQ = [
  ["What does the ToolSmithAi Agent do?", "It converts a business requirement written in plain language into a working application. It plans the structure, generates the code with Gemini models, validates the output and returns a live preview."],
  ["How are revisions handled?", "Each change request is applied to the existing project and stored as a version. Any earlier version can be restored in one action."],
  ["What can the platform build?", "Internal tools, portals, dashboards, landing pages, slide decks, data visualizations, documents and spreadsheet-style models."],
  ["Does my team need engineers?", "No. Operators describe the outcome and the Agent builds it. Engineers can inspect and export the full source code at any time."],
  ["How do we share a project?", "Switch a project to public to publish a link, or download the complete file. Projects are private by default."],
  ["How is usage measured?", "Every build and revision consumes one credit, recorded in a usage ledger with its time and model."],
];

export const PRICING_FAQ = [
  ["What is included in every plan?", "Live preview, version history, source export and shareable links. Higher tiers raise monthly build volume and support level."],
  ["How do credits work?", "Each build or revision uses one credit. The allowance resets monthly and the dashboard shows the live balance."],
  ["What happens when credits run out?", "New builds pause until the allowance resets or the plan is upgraded. Existing projects stay available."],
  ["Which plan fits our team?", "Core suits a team automating its first workflows. Pro suits teams shipping weekly. Scale suits organizations running delivery through AI."],
  ["How can we audit spend?", "The Usage page lists every build with its credit cost, model and timestamp."],
  ["How is billing handled?", "Plans are billed monthly in USD through our payment partner. After payment, enter the order reference on the Billing page and the plan is activated once verified."],
];
