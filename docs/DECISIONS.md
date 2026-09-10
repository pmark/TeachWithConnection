# Decisions

Record meaningful product, UX, design, architecture, dependency, and deployment tradeoffs.

---

## 2026-06-19 — Homepage owns professional-development intent

### Decision

The homepage is the sole hub for national “early childhood professional development” searches. `/professional-development/` permanently redirects to `/` and is excluded from navigation, generated routes, and the sitemap.

### Why

A separate hub would divide authority and duplicate the site's primary offer. The homepage must orient search visitors, establish credibility, explain the offer, and route them to inquiry without functioning as a thin doorway page.

### Consequences

Homepage metadata and copy carry the phrase naturally. Service pages link to `/#professional-development`. Redirect and sitemap behavior are launch checks.

---

## 2026-06-19 — Domain and cross-domain authority

### Decision

TeachWithConnection.com is the authoritative educator-facing property. WithConnectionPDX.com remains the family therapy property. Both sites cross-link contextually and use reciprocal `Person.sameAs` references. TeachWithConnection.com is canonical for duplicated educator bookstore content.

### Why

The separation clarifies visitor intent while consolidating Katie's identity and avoiding duplicate bookstore competition.

### Consequences

Changes to WithConnectionPDX.com require owner coordination outside this repository. Canonical and structured-data consistency block launch.

---

## 2026-06-19 — Mobile-first implementation is a release gate

### Decision

Layouts begin at 320px and progressively enhance at wider breakpoints. Navigation uses semantic `details`/`summary` on mobile without application JavaScript.

### Why

Mobile usability and performance directly affect visitor trust, inquiry completion, accessibility, and organic search quality.

### Consequences

Every shared template is checked at 320px, 390px, 768px, and desktop widths. Overflow, clipped content, or undersized controls block launch.

---

## 2026-06-19 — Same-project inquiry Function with Resend

### Decision

The static Astro form posts to `/api/inquiry`, a same-project Cloudflare Pages Function. It uses server validation, honeypot/timing checks, Turnstile, a rate-limit binding, and the Resend API.

### Why

This keeps the public site static and fast while providing a controlled, same-origin, reliability-sensitive email path without a hosted form vendor.

### Consequences

Cloudflare and Resend secrets, verified sender DNS, rate-limit configuration, and a real mailbox delivery test are required before launch. D1 persistence and a protected admin surface are deferred to Phase 2.

---

## 2026-09-09 — Keystatic (local mode) for content editing, replacing the TinaCloud POC

### Decision

Use Keystatic in **local mode** for a Git-backed, no-code content-editing UI at `/keystatic`, superseding the earlier TinaCloud proof of concept (removed). All 7 existing content collections (`pages`, `settings`, `resources`, `articles`, `testimonials`, `proof`, `services`) are wired up, including the still-empty `articles` collection. Local mode means: no external SaaS account, no OAuth app, no server routes on the deployed site — an editor runs `pnpm dev:admin` locally, edits visually, and pushes the resulting Git commit like any other change.

### Why

TinaCloud required an external account, Google SSO configuration, and a client ID/token that were never set up, and its production visual-editing path needs server rendering, which conflicts with this site's static-first Cloudflare Pages deployment. Keystatic reads/writes the existing Astro content-layer files directly with **zero data migration** — every collection already matched Keystatic's native yaml/markdown-frontmatter shapes. The one structural wrinkle: `pages`/`settings` store copy as flat, per-page dotted-key maps (`copy.strings`/`lists`/`cards`) rather than a fixed schema. Rather than migrate that shape or hand-write ~500 field definitions, `keystatic/copy-fields.ts` builds each page's fields from a precomputed manifest of its current keys (`keystatic/page-keys.json`, regenerated via `pnpm keystatic:sync-fields`) — chosen because `keystatic.config.ts` is bundled for both the server and the browser (Keystatic's form UI runs client-side), so it can't read the YAML files directly with `node:fs` at runtime.

### Consequences

- `astro.config.mjs` only adds the Keystatic (and required `@astrojs/react`) integrations, and only switches to `output: 'server'`, when `KEYSTATIC_ADMIN=true` (i.e. `pnpm dev:admin`). Plain `pnpm dev`/`pnpm build` are unaffected and stay fully static.
- `src/content.config.ts` gained blank-tolerant transforms (e.g. `sourceSchema`, `optionalCtaSchema`, `optionalImageSchema`) so that leaving an optional field blank in the Keystatic UI round-trips to the same `undefined` behavior as an absent key previously had — no template changes required.
- Adding a new dotted copy key to a page template requires running `pnpm keystatic:sync-fields` before it appears in the admin UI.
- `@astrojs/react` is pinned to `5.0.7` (not the newest `6.x`) to match the Vite major (`^7.3.2`) that Astro 6.4.8 itself uses; `vite` is now also pinned directly as a devDependency so `@tailwindcss/vite`'s peer resolution doesn't drift onto a second, incompatible Vite major.
- Markdown collection bodies use `fields.markdoc({ extension: 'md' })`, not the deprecated `fields.document()` (which hardcodes a `.mdoc` file extension and would silently match zero existing `.md` files).
