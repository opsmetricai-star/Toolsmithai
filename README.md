# ToolSmithAi

AI app and website builder. Describe an idea, get a working project with live preview, chat-based revisions, version history, sharing and credit-based billing.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Supabase (Auth, Postgres, RLS), Gemini API.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in every value.
3. In the Supabase SQL editor run `supabase/schema.sql`.
4. In Supabase Auth settings add `http://localhost:3000/auth/callback` (and your production URL) to the redirect allow-list.
5. `npm run dev`

## Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Supabase anon key (RLS-protected) |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Credit spending, usage ledger, payment approval, contact form |
| `GEMINI_API_KEY` | **server only** | Generation |
| `GEMINI_MODEL` | server | Preferred model (falls back automatically) |
| `NEXT_PUBLIC_SITE_URL` | public | Site URL |
| `ADMIN_EMAILS` | server | Comma-separated emails allowed to approve payments |

Never commit `.env.local`.

## Payments

Plans are bought through Selar checkout links (see `src/lib/content.ts`). A redirect or a user's claim never grants a plan:
the user submits the order reference on `/billing`, and an admin verifies it in Selar and approves it at `/admin/payments`.
Approval writes the subscription, sets the plan and resets credits. Automatic activation would need a verified Selar webhook, which is not implemented.

## Deploying to Vercel

Import the repo, add the environment variables above, deploy. Set `NEXT_PUBLIC_SITE_URL` to the production URL.

## Known limitations

- Native/store mobile builds, one-click hosting and agent automations are not implemented; marketing copy marks them as roadmap.
- Annual billing is not offered.
- Legal pages are templates and need legal review.
