# EBSL website (v2)

Next.js 16 (App Router, TypeScript), built to the *EBSL Website Revamp Arrangement Report v2.0*. No separate backend: forms post to a Next.js route handler.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
|---|---|
| Phone, email, address, **social handles**, **stats counters**, Tawk ID | `lib/site.ts` |
| Service catalogue + nav menu | `lib/site.ts` (`services`, `nav`) |
| Service detail page copy | `lib/service-detail.ts` |
| Insights / case studies | `lib/insights.ts` |
| Team members, job openings | `lib/people.ts` (sections render automatically once filled) |
| Design tokens + all styles | `app/globals.css` (single system, no Bootstrap) |
| Form handler (all forms) | `app/api/forms/route.ts` |
| Sitemap / robots / OG image | `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` |
| Old `.html` URLs → new routes (301) | `next.config.ts` |

## Email (spec §7.6)

Copy `.env.example` to `.env.local` and set **one** of `ZEPTO_TOKEN` (recommended for Nigeria) or `RESEND_API_KEY`,
plus `TEAM_EMAIL` / `HR_EMAIL`. Every form sends a team notification and a branded confirmation to the user; careers attaches the CV.
Newsletter also syncs to Brevo when `BREVO_API_KEY` + `BREVO_LIST_ID` are set. Without a provider, dev logs emails to the console and production returns an error.

Anti-spam: honeypot field, minimum fill time, per-IP rate limit.

## Before go-live

Search the code for `TODO(EBSL)` for content that still needs real values: social URLs, WhatsApp channel link, verified stats,
Phlyp Pay QR image, Agentic AI pricing, team photos/bios, job openings, gallery photos, case studies, and a legal review of Privacy/Terms.
