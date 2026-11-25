export type Section = { title: string; body: string };
export type PageDef = {
  eyebrow: string;
  title: string;
  lede: string;
  cta?: boolean;
  sections: Section[];
  band?: { title: string; body: string };
  steps?: Section[];
  legal?: boolean;
};

const S = (title: string, body: string): Section => ({ title, body });

export const PAGES: Record<string, PageDef> = {
  "products/agent": { eyebrow: "", title: "", lede: "", sections: [] },
  "products/database": {
    eyebrow: "Data layer",
    title: "A Postgres core with access control enforced in the database",
    lede: "Every project, version and usage record lives in Postgres. Row-level security decides who can read and write each row, so isolation does not depend on application code.",
    cta: true,
    sections: [
      S("Tenant isolation", "Policies bind every record to its owner. A user can only read and change their own data, and plan and credit fields are writable by the server alone."),
      S("Version history", "Each generation is stored as an immutable version. Teams restore any earlier state without losing later work."),
      S("Usage ledger", "Every credit spent is written to a ledger with its model and timestamp, giving finance a complete audit trail of AI spend."),
      S("Atomic spending", "Credits are deducted in a single database transaction before generation starts and refunded automatically if a build fails."),
    ],
    steps: [S("Authenticate", "Users sign in with email and password."), S("Build", "Each AI build is saved with its prompt and result."), S("Audit", "Usage and billing records are available on demand.")],
  },
  integrations: {
    eyebrow: "Integrations",
    title: "One stack: Gemini for intelligence, Supabase for data, Selar for revenue",
    lede: "ToolSmithAi connects the three systems a software business needs. Generation, storage and checkout work together without glue code.",
    cta: true,
    sections: [
      S("Gemini models", "Generation runs on Google Gemini. Requests route across model versions automatically, so a busy model does not stop a build."),
      S("Supabase", "Authentication, Postgres storage and row-level security are provided by Supabase and wired into every screen."),
      S("Checkout", "Plans are purchased through Selar payment links. Access changes only after the payment is verified by an administrator."),
      S("CDN libraries", "Generated projects can load libraries such as three.js and Chart.js from public CDNs for 3D and charting."),
    ],
  },
  security: {
    eyebrow: "Security",
    title: "Isolation, least privilege and verified billing by default",
    lede: "Generated code runs in a sandbox, secrets stay on the server and plan changes require verification. Each control is built into the platform.",
    cta: true,
    sections: [
      S("Sandboxed execution", "Previews and public links run in a sandboxed frame with no access to the account session or cookies."),
      S("Server-side secrets", "AI and database service keys exist only on the server and are never sent to the browser."),
      S("Row-level security", "The database enforces ownership on every table, including projects, versions, messages and usage."),
      S("Verified billing", "A payment redirect never grants a plan. An administrator confirms the order reference before access changes."),
    ],
  },
  "usecases/ai-app-builder": {
    eyebrow: "Internal apps",
    title: "Replace spreadsheets and manual handoffs with AI-built applications",
    lede: "Describe the workflow and the AI engine builds the application: approvals, trackers, dashboards and calculators, ready to use in minutes.",
    cta: true,
    sections: [S("Cut delivery time", "A requirement becomes a working application in one request instead of a backlog item."), S("Reduce rework", "Revisions apply to the same project, and every version is stored for comparison or rollback."), S("Keep control", "Engineers can export the complete source at any time."), S("Measure spend", "Each build carries a recorded credit cost.")],
  },
  "usecases/ai-website-builder": {
    eyebrow: "Business websites",
    title: "Launch partner and customer portals without an agency cycle",
    lede: "The AI engine writes the structure, copy and layout for a complete multi-section site and revises it on instruction.",
    cta: true,
    sections: [S("Complete sites", "Pages ship with real content and responsive layouts, not empty templates."), S("Faster approvals", "Share a project link so stakeholders review the live result."), S("Controlled access", "Projects are private until you publish them."), S("Portable output", "Download a self-contained file and host it anywhere.")],
  },
  "usecases/landing-page-builder": {
    eyebrow: "Landing pages",
    title: "Campaign pages built for conversion and revised in minutes",
    lede: "The AI engine structures the offer, proof and call to action, then produces variants so marketing teams test faster.",
    cta: true,
    sections: [S("Proven structure", "Hero, benefits, proof, pricing and FAQ are arranged in a conversion-oriented order."), S("Rapid variants", "Request a new headline or layout and compare versions side by side."), S("Lead capture", "Forms include front-end validation."), S("Fast loading", "Pages are single files with no build step.")],
  },
  "usecases/operations": {
    eyebrow: "Operations",
    title: "Automate recurring workflows and remove the queue for internal tools",
    lede: "Operations teams describe a process and receive the tool that runs it: trackers, escalations, checklists and scorecards.",
    cta: true,
    sections: [S("No ticket queue", "Teams build the tool they need without waiting for an engineering slot."), S("Fits the process", "The AI engine follows your exact workflow, thresholds and roles."), S("Lower cost per tool", "Credit-based pricing replaces per-seat software for narrow workflows."), S("Controlled sharing", "Keep tools private or publish a link to a partner.")],
  },
  "usecases/product-managers": {
    eyebrow: "Product",
    title: "Decide with working software instead of requirement documents",
    lede: "Product teams turn a specification into a clickable build, put it in front of stakeholders and revise it in the same conversation.",
    cta: true,
    sections: [S("Faster decisions", "Stakeholders react to a working build, which shortens review cycles."), S("Traceable iterations", "Every revision is stored, so teams compare approaches and keep the strongest."), S("Clear handoff", "Engineering receives concrete source code instead of screenshots."), S("Lower risk", "Test an idea before committing engineering capacity.")],
  },
  "usecases/software-engineers": {
    eyebrow: "Engineering",
    title: "Remove boilerplate from delivery and spend time on the hard problems",
    lede: "The AI engine writes the first draft of a build. Engineers review, edit and extend the code they own.",
    cta: true,
    sections: [S("Full source access", "Every project exposes its complete code."), S("Predictable output", "Single-file HTML, CSS and JavaScript with no build step."), S("Precise revisions", "Request a targeted change and compare versions in the history."), S("Standard stack", "No proprietary runtime to learn or escape.")],
  },
  about: {
    eyebrow: "Company",
    title: "We build the AI engine that turns business intent into software",
    lede: "ToolSmithAi exists to remove the delay between a business decision and the software that executes it.",
    cta: true,
    sections: [S("Mission", "Collapse the distance between a requirement and a running application."), S("Approach", "AI does the build work. People keep the decisions, the review and the ownership of the code."), S("Standards", "Clear terms, transparent usage records and careful handling of customer data.")],
  },
  docs: {
    eyebrow: "Documentation",
    title: "From first requirement to shared project",
    lede: "Everything a team needs to build, revise, audit and share with ToolSmithAi.",
    cta: true,
    sections: [
      S("Create a build", "Choose a build type, describe the outcome in plain language and start the build. The project opens with a live preview."),
      S("Revise a project", "Use the chat panel to request changes. Each change uses one credit and creates a new version."),
      S("Credits and plans", "Each plan includes a monthly credit allowance that resets each month. The Billing page shows the current balance and plan."),
      S("Share and export", "Switch a project to public to publish a link, or download the complete HTML file."),
      S("Restore versions", "Use the History menu in the workspace to restore any earlier version."),
      S("Project limits", "The Evaluate plan allows three projects. Paid plans allow sixty."),
    ],
  },
  support: {
    eyebrow: "Support",
    title: "Answers on billing, access and builds",
    lede: "The most common questions, with the exact steps to resolve them.",
    cta: true,
    sections: [
      S("Payment made, plan not active", "Open Billing, select the plan you paid for and enter the order reference from your receipt. The plan is activated once the payment is verified."),
      S("Build failed", "A failed build does not consume a credit. Retry the request, or simplify it and run it again."),
      S("Out of credits", "Credits reset monthly. Upgrade on the Billing page to raise the allowance immediately."),
      S("Password reset", "Use the reset link on the log in page. The email contains a link that returns you to the site to set a new password."),
    ],
  },
  "legal/terms": { legal: true, eyebrow: "Legal", title: "Terms of service", lede: "The terms that govern use of ToolSmithAi.", sections: [S("Use of the service", "You agree to use ToolSmithAi lawfully and not to abuse generation capacity."), S("Your content", "You own what you create. You grant ToolSmithAi the license needed to host and display it on your behalf."), S("Plans and billing", "Paid plans are billed monthly through our payment partner and activate after verification."), S("Liability", "The service is provided as is. Generated output can contain errors and must be reviewed before use.")] },
  "legal/privacy": { legal: true, eyebrow: "Legal", title: "Privacy policy", lede: "What ToolSmithAi collects and why.", sections: [S("Data collected", "Account email and name, projects, prompts and usage records."), S("Use of data", "To provide the service, improve it and bill correctly."), S("Processors", "Supabase for data, Google for Gemini generation and Selar for checkout."), S("Your rights", "You can request export or deletion of your data through your account.")] },
  "legal/dpa": { legal: true, eyebrow: "Legal", title: "Data processing agreement", lede: "How ToolSmithAi processes customer data.", sections: [S("Roles", "The customer is the controller of project data. ToolSmithAi acts as processor."), S("Security", "Measures are described on the Security page.")] },
  "legal/subprocessors": { legal: true, eyebrow: "Legal", title: "Subprocessors", lede: "Third parties that process data on behalf of ToolSmithAi.", sections: [S("Supabase", "Database, authentication and storage."), S("Google (Gemini)", "AI generation."), S("Selar", "Payment checkout."), S("Vercel", "Application hosting.")] },
};
