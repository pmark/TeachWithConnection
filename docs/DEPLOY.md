---
status: complete
updated: 2026-06-19
---

# Deploy

## Target

- Production URL: `https://teachwithconnection.com`
- Staging URL: `https://staging.teachwithconnection.com` (stable, pinned to the `staging` branch)
- Platform: Cloudflare Pages, deployed via Cloudflare's native Git integration — no GitHub Actions deploy workflow exists or is needed.
- Package manager: pnpm (`pnpm-lock.yaml` is the only lockfile in this repo — do not reintroduce `package-lock.json`).
- Build command: `pnpm build`
- Output directory: `dist`
- Node: `>=22.12.0`, pinned in `.node-version` and `package.json` `engines.node`
- Public pages: static Astro output
- Dynamic endpoint: Cloudflare Pages Function at `POST /api/inquiry`

## Dependencies

- `@astrojs/sitemap` generates the production sitemap from the configured Astro `site` URL.
- `wrangler` supplies Cloudflare configuration and local/deployment tooling.
- The Worker calls Resend and Turnstile over HTTPS; no Resend SDK is required.

## Cloudflare configuration

`wrangler.jsonc` defines the Pages output, `compatibility_date`, and the active `INQUIRY_RATE_LIMITER` ratelimit binding (`namespace_id: "1001"`, 10 requests/60s). It is version-controlled and contains no secrets. Confirm the namespace exists in the production Cloudflare account before deploy — if it doesn't, either provision it or remove the `ratelimits` block (the Function already treats `INQUIRY_RATE_LIMITER` as optional).

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

## Local development secrets

Two gitignored files hold local-only values; both have a committed `.example` counterpart with placeholder keys and no real secrets:

- `.env` (copy from `.env.example`) — `PUBLIC_TURNSTILE_SITE_KEY`, read by Astro/Vite at dev and build time. Use Cloudflare's always-pass testing key (`1x00000000000000000000AA`) so the widget renders without a real Turnstile account.
- `.dev.vars` (copy from `.dev.vars.example`) — the Function-only secrets (`RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `ALLOWED_ORIGINS`), auto-loaded by `wrangler pages dev`.

Plain `pnpm dev` (Astro's dev server) never executes Pages Functions and never reads `.dev.vars` — it's frontend-only. To exercise `/api/inquiry` locally:

```sh
pnpm dev:functions
```

This builds the site and serves `dist/` through Wrangler (`wrangler pages dev ./dist`), which does run the Function with `.dev.vars` bound. It does not hot-reload — rerun it after frontend changes, or use `pnpm dev` for everyday UI work and only switch to `pnpm dev:functions` when testing the inquiry flow itself.

None of this touches the dashboard env vars from the table above — local secrets and the Production/Preview dashboard values are entirely separate stores.

## Branches and environments

| Branch | Cloudflare environment | URL |
|---|---|---|
| `main` | Production | `https://teachwithconnection.com` |
| `staging` | Preview, pinned to a custom domain | `https://staging.teachwithconnection.com` |
| any other branch/PR | Preview, ephemeral `*.pages.dev` URL | auto-generated per deployment |

Cloudflare's Git integration builds and deploys every push automatically: pushes to `main` deploy to Production, pushes to any other branch (including `staging`) deploy as a Preview. Ad hoc per-PR preview URLs are intentionally **not** in `ALLOWED_ORIGINS`, so the inquiry form on those shows the fallback-contact-link state instead of sending mail — only `main` and the pinned `staging` domain can submit the form. This is expected, not a bug.

## One-time Cloudflare dashboard setup

Run `pnpm deploy:setup` first — it automates the parts the Wrangler CLI can do reliably (auth check, idempotent Pages project creation, the one secret that's identical across environments). Everything else below needs the dashboard because the CLI has no per-environment flag for Pages secrets/variables and no command for Git connection or branch-scoped custom domains.

1. **Run the setup script:**
   ```sh
   pnpm deploy:setup
   ```
   It logs in if needed, creates the Pages project (`teachwithconnection`) if missing, and sets the `RESEND_API_KEY` secret (the only secret whose value is intentionally the same in Production and Preview).

2. **Connect the project to GitHub.** Cloudflare dashboard → Workers & Pages → `teachwithconnection` → Settings → Builds & deployments → Connect to Git → select the repo and authorize.

3. **Set build configuration:**
   - Framework preset: Astro
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Root directory: `/`
   - Production branch: `main`
   - Build environment variable `NODE_VERSION` = `22.12.0` (Production and Preview)

4. **Create Turnstile widgets.** Dashboard → Turnstile → Add widget.
   - Production: hostname `teachwithconnection.com` (and `www` if used). Copy the site key and secret key into the Production env vars in step 6.
   - Preview/staging: use Cloudflare's published always-pass testing keys instead of a second real widget:
     - Site key: `1x00000000000000000000AA`
     - Secret key: `1x0000000000000000000000000000AA`

5. **Verify the Resend sending domain** (dashboard → Domains → Add Domain → `teachwithconnection.com`, add the DKIM/SPF/DMARC records it gives you). One API key covers both environments (already set by step 1) — staging isolation comes from `INQUIRY_TO_EMAIL`, not a second key.

6. **Set environment variables and secrets** in Settings → Environment variables, with different values for Production and Preview:

   | Variable | Type | Production | Preview |
   |---|---|---|---|
   | `PUBLIC_TURNSTILE_SITE_KEY` | Plain (build-time) | real Turnstile site key | `1x00000000000000000000AA` |
   | `TURNSTILE_SECRET_KEY` | Secret | real Turnstile secret key | `1x0000000000000000000000000000AA` |
   | `RESEND_API_KEY` | Secret | set by `pnpm deploy:setup` | same (shared) |
   | `INQUIRY_TO_EMAIL` | Plain | Katie's real inbox | a test inbox or `+staging` alias |
   | `INQUIRY_FROM_EMAIL` | Plain | verified sender on `teachwithconnection.com` | e.g. `staging@teachwithconnection.com` |
   | `ALLOWED_ORIGINS` | Plain | leave unset (prod origins are hardcoded in `functions/api/inquiry.ts`) | `https://staging.teachwithconnection.com` |
   | `NODE_VERSION` | Plain (build) | `22.12.0` | `22.12.0` |

7. **Add custom domains** (Pages project → Custom domains):
   - Production: `teachwithconnection.com` (and `www`), pointed at the Production environment.
   - Staging: add `staging.teachwithconnection.com`, choosing **Preview** rather than Production, restricted to the `staging` branch — this gives staging a stable URL instead of a new hash per deploy.

8. **Push a `staging` branch** so there's something for the staging custom domain to attach to:
   ```sh
   git checkout -b staging
   git push -u origin staging
   ```

## What's scripted vs dashboard-only

- Scripted (`scripts/deploy-setup.sh`, idempotent, re-runnable): Wrangler auth check, Pages project creation, the one secret shared across environments.
- Dashboard-only: Git connection, Turnstile widget creation, Resend domain verification, anything that must differ between Production and Preview, and custom-domain-to-branch binding.

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

D1-backed inquiry persistence and a password-protected admin surface are planned after launch. That work requires a separate ADR and Cloudflare Astro adapter evaluation. Public marketing routes remain prerendered. When it starts: provision with `pnpm exec wrangler d1 create teachwithconnection`, add a `d1_databases` block to `wrangler.jsonc` with the resulting `database_id`, and document the migration step here.

## Launch checklist

- [x] `pnpm lint` succeeds with no diagnostics.
- [x] `pnpm build` succeeds.
- [x] Shared templates pass 320px, 390px, 768px, and desktop review.
- [x] Mobile Lighthouse: SEO 100, Accessibility ≥95, Best Practices ≥95, Performance ≥90.
- [x] Canonicals, social metadata, JSON-LD, sitemap, robots directives, and redirects are verified.
- [ ] WithConnectionPDX reciprocal links, `sameAs`, and bookstore canonicals are live.
- [ ] Resend domain and sender are verified.
- [ ] Valid, invalid, spam, duplicate, rate-limited, and upstream-failure form paths are tested.
- [ ] A production inquiry reaches Katie and reply-to works.
- [ ] Owner-approved legal copy and asset permissions are complete.
- [ ] Cloudflare Pages project is connected to GitHub with `main` as the production branch.
- [ ] `staging` branch is pushed and pinned to `staging.teachwithconnection.com`.
- [ ] Production and Preview environment variables/secrets are set per the table above.
- [ ] Inquiry form tested end to end on `staging.teachwithconnection.com` before testing on production.

Mobile, SEO, canonical, structured-data, or email-delivery failures block launch.
