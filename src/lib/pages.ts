export type Section = { title: string; body: string };
export type PageDef = {
  eyebrow: string;
  title: string;
  lede: string;
  cta?: { label: string; href: string };
  sections: Section[];
  band?: { title: string; body: string };
  steps?: Section[];
  legal?: boolean;
};

const S = (title: string, body: string): Section => ({ title, body });

export const PAGES: Record<string, PageDef> = {
  design: {
    eyebrow: "Design",
    title: "An infinite canvas for your next interface",
    lede: "Explore layouts, type and colour side by side, then push the version you like straight into a working project.",
    cta: { label: "Start designing", href: "/signup" },
    sections: [
      S("Explore in parallel", "Ask for several directions at once and compare them on one canvas instead of replacing the last attempt."),
      S("Tweak visually", "Adjust spacing, colour and typography by describing the change. Every tweak is a new version you can roll back."),
      S("Apply to real code", "Pick a direction and it becomes a live, editable project, not a flat mock-up that needs to be rebuilt."),
      S("Keep a design memory", "Palettes, fonts and components from earlier projects can be reused so new work stays consistent."),
    ],
    steps: [S("Describe the mood", "Tell us the audience and the feeling you want."), S("Compare directions", "Review variations and keep the strongest."), S("Ship it", "Convert the winner to a project and publish.")],
    band: { title: "From moodboard to product", body: "Design and build happen in one place, so nothing gets lost in hand-off." },
  },
  slides: {
    eyebrow: "Slides",
    title: "Decks that write and lay themselves out",
    lede: "Give ToolSmithAi a topic and an audience. It drafts the story, builds each slide and lets you refine them by chat.",
    cta: { label: "Build a deck", href: "/signup" },
    sections: [
      S("Story first", "The outline is drafted before any design, so slides serve a narrative rather than the other way round."),
      S("Keyboard-ready", "Decks run in the browser with arrow-key navigation and a progress bar, with no files to send."),
      S("Data that is live", "Charts are generated from the figures you provide and update when you edit them."),
      S("Share by link", "Make a deck public and send a link. Switch it back to private any time."),
    ],
    steps: [S("Brief", "Topic, audience, length."), S("Draft", "Outline and slides appear in the preview."), S("Refine", "Ask for tighter wording or a different layout.")],
  },
  "products/agent": { eyebrow: "", title: "", lede: "", sections: [] },
  "products/database": {
    eyebrow: "Databases",
    title: "A real Postgres database, without the setup",
    lede: "Every serious project needs persistent data. ToolSmithAi runs on Postgres with authentication and row-level security built in.",
    cta: { label: "Get started", href: "/signup" },
    sections: [
      S("Postgres underneath", "Standard SQL, foreign keys and indexes. Nothing proprietary to learn or escape from."),
      S("Row-level security", "Policies decide who can read and write each row, enforced in the database itself."),
      S("Versioned projects", "Every generation is stored, so you can restore an earlier state of your project."),
      S("Usage ledger", "Every credit spent is recorded with its model and time for transparent billing."),
    ],
  },
  integrations: {
    eyebrow: "Integrations",
    title: "Connect your project to the services you already use",
    lede: "ToolSmithAi builds on Gemini for generation and Supabase for data, with payments handled through our checkout partner.",
    cta: { label: "Start building", href: "/signup" },
    sections: [
      S("Gemini models", "Generation and revision run on Google Gemini with automatic fallback between model versions."),
      S("Supabase", "Authentication, Postgres storage and row-level security come from Supabase."),
      S("Checkout", "Plans are purchased through Selar. Activation happens after the payment is verified."),
      S("Bring a CDN library", "Generated projects can load libraries such as three.js or Chart.js from public CDNs."),
    ],
    band: { title: "More connectors are on the roadmap", body: "We list only what works today. Email, analytics and storage connectors will appear here as they ship." },
  },
  security: {
    eyebrow: "Security",
    title: "Safe by default as you scale",
    lede: "Isolation, access control and careful key handling are part of the platform, not an add-on.",
    cta: { label: "Contact security", href: "/contact" },
    sections: [
      S("Sandboxed previews", "Generated code runs in a sandboxed frame with no access to your account session."),
      S("Server-side secrets", "API keys live on the server. Nothing sensitive is shipped to the browser."),
      S("Row-level security", "Users can only read and change their own records; plan and credit fields are server-controlled."),
      S("Verified billing", "A redirect never grants a plan. Access changes only after payment is verified."),
    ],
  },
  enterprise: { eyebrow: "", title: "", lede: "", sections: [] },
  "usecases/ai-app-builder": {
    eyebrow: "Apps", title: "Turn a sentence into a working app", lede: "Calculators, trackers, boards and dashboards, generated, previewed and refined in one conversation.",
    cta: { label: "Build an app", href: "/signup" },
    sections: [S("Working, not wireframed", "Apps run immediately with real interactions and sample data."), S("Iterate by asking", "Describe the next change and see it applied to the same project."), S("Own the code", "Download the full source any time."), S("Version safety", "Roll back to any earlier version.")],
  },
  "usecases/ai-website-builder": {
    eyebrow: "Websites", title: "Launch a website in minutes", lede: "Describe the business and the tone. Get a complete multi-section site you can edit by chat.",
    cta: { label: "Build a website", href: "/signup" },
    sections: [S("Real content", "Pages are written for your business instead of filled with placeholders."), S("Responsive", "Layouts adapt from phones to wide desktops."), S("Share a link", "Publish a public preview with one switch."), S("Export", "Download a self-contained HTML file.")],
  },
  "usecases/landing-page-builder": {
    eyebrow: "Landing pages", title: "Landing pages that are ready to convert", lede: "Generate a focused page with a clear offer, proof and a single call to action, then test variations quickly.",
    cta: { label: "Create a landing page", href: "/signup" },
    sections: [S("Clear structure", "Hero, benefits, proof, pricing and FAQ in a proven order."), S("Fast variants", "Ask for a second headline or layout and compare."), S("Forms that work", "Capture sign-ups with front-end validation."), S("Lightweight", "Single-file pages that load quickly.")],
  },
  "usecases/founders": {
    eyebrow: "Founders", title: "Validate ideas before you hire", lede: "Put a working prototype in front of customers this week, not next quarter.",
    cta: { label: "Start free", href: "/signup" },
    sections: [S("Prototype fast", "From idea to clickable product in an afternoon."), S("Show investors", "Share a live link instead of slides about a plan."), S("Spend carefully", "Credits make cost predictable."), S("Grow into it", "Export the code when you outgrow the prototype.")],
  },
  "usecases/product-managers": {
    eyebrow: "Product managers", title: "Show, don't tell", lede: "Replace long requirement documents with a working example that stakeholders can click.",
    cta: { label: "Start free", href: "/signup" },
    sections: [S("Requirements to demo", "Describe the flow and get something to react to."), S("Faster feedback", "Share a link and iterate in the same conversation."), S("Version trail", "Keep every iteration for later comparison."), S("Hand-off ready", "Give engineering concrete source, not screenshots.")],
  },
  "usecases/designers": {
    eyebrow: "Designers", title: "Ship what you design", lede: "Take a visual idea all the way to a live page without waiting for a developer.",
    cta: { label: "Start free", href: "/signup" },
    sections: [S("Type and colour control", "Specify palettes, fonts and spacing in plain language."), S("Real interactions", "Hover, motion and responsive behaviour are included."), S("Readable code", "Generated markup is clean enough to hand over."), S("Explore more", "Try several directions in minutes.")],
  },
  "usecases/software-engineers": {
    eyebrow: "Engineers", title: "Skip the boilerplate", lede: "Let the agent write the first draft, then read, edit and extend the code yourself.",
    cta: { label: "Start free", href: "/signup" },
    sections: [S("Full source access", "Every project exposes its complete code."), S("Predictable output", "Single-file HTML with no build step."), S("Iterate precisely", "Ask for a targeted change and review the diff in history."), S("Standard stack", "Plain HTML, CSS and JavaScript.")],
  },
  "usecases/operations": {
    eyebrow: "Operations", title: "Internal tools in hours, not weeks", lede: "Trackers, calculators and dashboards for your team, built by the people who need them.",
    cta: { label: "Start free", href: "/signup" },
    sections: [S("No queue", "Build the tool today instead of filing a ticket."), S("Fits the process", "Describe your exact workflow."), S("Share safely", "Keep tools private or share a link."), S("Low cost", "Pay per generation, not per seat of software.")],
  },
  about: {
    eyebrow: "Company", title: "We make building software a conversation", lede: "ToolSmithAi exists so that anyone with an idea can turn it into something real.",
    cta: { label: "Join us", href: "/careers" },
    sections: [S("Our mission", "Remove the distance between an idea and a working product."), S("Our approach", "Be honest about what the product does today, and ship improvements steadily."), S("Our values", "Craft, clarity and respect for our users' data and time.")],
  },
  careers: {
    eyebrow: "Careers", title: "Help us build the forge", lede: "We are a small team that values craft and ownership.",
    cta: { label: "Contact us", href: "/contact" },
    sections: [S("Open roles", "We have no open roles listed right now. Send us a note and tell us how you would help."), S("How we work", "Small teams, written communication, shipping weekly."), S("Benefits", "Details are shared during the hiring process.")],
  },
  docs: {
    eyebrow: "Docs", title: "Documentation", lede: "Everything you need to go from first prompt to published project.",
    cta: { label: "Open the dashboard", href: "/dashboard" },
    sections: [S("Getting started", "Create an account, choose a build type, describe your idea and press Build. Your project opens with a live preview."), S("Refining a project", "Use the chat panel to request changes. Each change costs one credit and creates a version."), S("Credits and plans", "Plans include a monthly credit allowance that resets each month. See Billing for current balance."), S("Sharing and export", "Toggle a project public to get a shareable link, or download the HTML file."), S("Versions", "Use the History menu in the workspace to restore any earlier version."), S("Limits", "The Free plan allows three projects. Paid plans allow sixty.")],
  },
  blog: {
    eyebrow: "Blog", title: "Notes from the forge", lede: "Product news and craft from the ToolSmithAi team.",
    sections: [S("Introducing ToolSmithAi", "Our first public release brings prompt-to-project building with live preview and version history."), S("How credits work", "A plain explanation of what a credit buys and when it resets."), S("Writing prompts that build better projects", "Be specific about audience, content and feel; ask for one change at a time when refining.")],
  },
  community: {
    eyebrow: "Community", title: "Builders helping builders", lede: "Share what you make and learn how others prompt.",
    cta: { label: "Join the conversation", href: "/signup" },
    sections: [S("Share projects", "Make a project public and share the link."), S("Prompt library", "Browse prompts that produced good results."), S("Feedback", "Tell us what to build next.")],
  },
  templates: {
    eyebrow: "Templates", title: "Start from a working base", lede: "Pick a starting point and make it yours.",
    cta: { label: "Start from a template", href: "/signup" },
    sections: [S("Portfolio", "A gallery-led personal site."), S("SaaS landing page", "Hero, features, pricing and FAQ."), S("Kanban board", "Drag-and-drop task board."), S("Pitch deck", "Ten keyboard-driven slides."), S("Budget tracker", "Editable cells with live totals."), S("Sales dashboard", "Interactive charts with filters.")],
  },
  gallery: {
    eyebrow: "Gallery", title: "Made on ToolSmithAi", lede: "A showcase of projects from our community.",
    sections: [S("Coming soon", "Public projects will appear here once creators opt in to be featured. Make a project public from its workspace to get a shareable link today.")],
  },
  customers: {
    eyebrow: "Customer stories", title: "How teams build with us", lede: "Examples of the kinds of work teams do on ToolSmithAi.",
    sections: [S("Internal tools", "Operations teams replace spreadsheets with small purpose-built apps."), S("Prototyping", "Product teams share clickable prototypes before committing engineering time."), S("Marketing sites", "Small businesses launch pages without an agency.")],
  },
  support: {
    eyebrow: "Support", title: "Get help from a human", lede: "Tell us what is going wrong and we will reply by email.",
    cta: { label: "Contact support", href: "/contact" },
    sections: [S("Common questions", "See Docs for credits, versions and sharing."), S("Billing help", "If you paid and your plan has not activated, submit your order reference on the Billing page."), S("Report a problem", "Use the contact form and include the project name.")],
  },
  status: {
    eyebrow: "Status", title: "System status", lede: "Current availability of ToolSmithAi services.",
    sections: [S("Application", "Operational."), S("Generation (Gemini)", "Operational. Generation may be slower during peak demand and is retried automatically."), S("Authentication & database", "Operational.")],
  },
  news: {
    eyebrow: "Newsroom", title: "News", lede: "Announcements and press resources.",
    cta: { label: "Press enquiries", href: "/contact" },
    sections: [S("ToolSmithAi launches", "Prompt-to-project building with live preview, versions and sharing.")],
  },
  partners: {
    eyebrow: "Partners", title: "Work with us", lede: "Agencies and consultancies can build client projects on ToolSmithAi.",
    cta: { label: "Become a partner", href: "/contact" },
    sections: [S("Agencies", "Deliver faster by drafting with ToolSmithAi."), S("Educators", "Teach web building through conversation."), S("Technology partners", "Talk to us about integrations.")],
  },
  certifications: {
    eyebrow: "Certifications", title: "Compliance and certifications", lede: "We are transparent about where we are.",
    sections: [S("Current status", "ToolSmithAi has not completed formal third-party certifications such as SOC 2. We will list them here when we have."), S("What we do today", "Encryption in transit, row-level security and server-side secret handling.")],
  },
  brand: {
    eyebrow: "Brand kit", title: "Brand kit", lede: "Guidelines for using the ToolSmithAi name and mark.",
    cta: { label: "Request assets", href: "/contact" },
    sections: [S("Name", "Write ToolSmithAi as one word with a capital T, S and A."), S("Colour", "Forge orange #FF3C00 on warm off-white."), S("Clear space", "Leave space equal to the mark's height around the logo.")],
  },
  "legal/terms": { legal: true, eyebrow: "Legal", title: "Terms of service", lede: "Template terms. Have counsel review before launch.", sections: [S("Using the service", "You agree to use ToolSmithAi lawfully and not to abuse generation capacity."), S("Your content", "You own what you create. You grant us the licence needed to host and display it for you."), S("Plans and billing", "Paid plans are billed monthly through our payment partner and activate after verification."), S("Liability", "The service is provided as is. Generated output may contain errors and should be reviewed before use.")] },
  "legal/privacy": { legal: true, eyebrow: "Legal", title: "Privacy policy", lede: "Template policy. Have counsel review before launch.", sections: [S("What we collect", "Account email, name, projects, prompts and usage records."), S("How we use it", "To provide and improve the service and to bill correctly."), S("Processors", "Supabase (data), Google (Gemini generation) and Selar (checkout)."), S("Your rights", "Contact us to export or delete your data.")] },
  "legal/pro-agreement": { legal: true, eyebrow: "Legal", title: "Pro agreement", lede: "Template agreement. Have counsel review before launch.", sections: [S("Scope", "Applies to Core, Pro and Scale subscribers."), S("Credits", "Credits reset monthly and do not roll over.")] },
  "legal/enterprise-agreement": { legal: true, eyebrow: "Legal", title: "Enterprise agreement", lede: "Template agreement. Have counsel review before launch.", sections: [S("Custom terms", "Enterprise customers receive a negotiated agreement. Contact sales.")] },
  "legal/dpa": { legal: true, eyebrow: "Legal", title: "Data processing agreement", lede: "Template DPA. Have counsel review before launch.", sections: [S("Roles", "You are the controller of your project data; we act as processor."), S("Security", "We apply the measures described on our Security page.")] },
  "legal/subprocessors": { legal: true, eyebrow: "Legal", title: "Subprocessors", lede: "Third parties that process data on our behalf.", sections: [S("Supabase", "Database, authentication and storage."), S("Google (Gemini)", "AI generation."), S("Selar", "Payment checkout."), S("Vercel", "Application hosting.")] },
  "legal/abuse": { legal: true, eyebrow: "Legal", title: "Report abuse", lede: "Tell us about content that violates our terms.", cta: { label: "Report via contact form", href: "/contact" }, sections: [S("What to include", "A link to the project and a description of the problem.")] },
};
