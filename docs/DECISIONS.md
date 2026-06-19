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
