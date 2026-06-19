---
status: complete
updated: 2026-06-19
---

# Deploy

## Target

- Production URL: `https://teachwithconnection.com`
- Platform: Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Node: `>=22.12.0`
- Public pages: static Astro output
- Dynamic endpoint: Cloudflare Pages Function at `POST /api/inquiry`

## Dependencies

- `@astrojs/sitemap` generates the production sitemap from the configured Astro `site` URL.
- `wrangler` supplies Cloudflare configuration and local/deployment tooling.
- The Worker calls Resend and Turnstile over HTTPS; no Resend SDK is required.

## Cloudflare configuration

`wrangler.jsonc` defines the Pages output and `INQUIRY_RATE_LIMITER` binding. Confirm namespace availability in the production Cloudflare account before deploy.

Required secrets and variables:

```text
RESEND_API_KEY
INQUIRY_TO_EMAIL
INQUIRY_FROM_EMAIL
TURNSTILE_SECRET_KEY
PUBLIC_TURNSTILE_SITE_KEY
```

Optional preview/local origin list:

```text
ALLOWED_ORIGINS
```

`ALLOWED_ORIGINS` is a comma-separated list. Production origins are already restricted to the root and `www` TeachWithConnection domains.

## Inquiry delivery

1. The browser posts form data to `/api/inquiry`.
2. The Function checks origin, payload size, rate limit, honeypot, completion time, field constraints, and Turnstile.
3. The Function sends plain-text and escaped HTML email through Resend with the visitor email as `reply_to`.
4. The UI reports accepted, validation, spam, rate-limit, configuration, and delivery-failure states.

Before launch, verify the Resend sender domain in DNS, configure the sender/recipient addresses, submit through the production form, confirm receipt in Katie's mailbox, and confirm replies address the visitor.

## SEO deployment

- `teachwithconnection.com` is the canonical origin.
- `/professional-development/` and its non-trailing-slash form permanently redirect to `/` through `public/_redirects`.
- Placeholder legal, resource, and article listing pages are `noindex`; they are excluded from the sitemap until complete.
- TeachWithConnection.com owns educator bookstore canonicals.
- WithConnectionPDX.com must add reciprocal `Person.sameAs`, contextual educator links, and canonicals pointing duplicated educator bookstore pages here.

## Phase 2

D1-backed inquiry persistence and a password-protected admin surface are planned after launch. That work requires a separate ADR and Cloudflare Astro adapter evaluation. Public marketing routes remain prerendered.

## Launch checklist

- [x] `npm run lint` succeeds with no diagnostics.
- [x] `npm run build` succeeds.
- [x] Shared templates pass 320px, 390px, 768px, and desktop review.
- [x] Mobile Lighthouse: SEO 100, Accessibility ≥95, Best Practices ≥95, Performance ≥90.
- [x] Canonicals, social metadata, JSON-LD, sitemap, robots directives, and redirects are verified.
- [ ] WithConnectionPDX reciprocal links, `sameAs`, and bookstore canonicals are live.
- [ ] Resend domain and sender are verified.
- [ ] Valid, invalid, spam, duplicate, rate-limited, and upstream-failure form paths are tested.
- [ ] A production inquiry reaches Katie and reply-to works.
- [ ] Owner-approved legal copy and asset permissions are complete.

Mobile, SEO, canonical, structured-data, or email-delivery failures block launch.
