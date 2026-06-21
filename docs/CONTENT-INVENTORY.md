# Content Inventory

Editable website copy lives in `src/content/pages/*.yaml`, shared interface copy lives in `src/content/settings/*.yaml`, and collection content remains in `src/content/`. Layout and section order remain in Astro templates.

## Placeholder and editorial-copy audit

The initial audit identified 32 public strings requiring replacement, centralization, or an explicit owner blocker.

| # | Route/surface | Content key | Disposition | Source or owner dependency |
|---:|---|---|---|---|
| 1 | `/` | `approach.testimonialTitle` | replaced | None |
| 2 | `/` | `approach.testimonialEmpty` | resolved | Owner approved testimonial reuse; key removed and replaced with a real quote from `src/content/testimonials/` |
| 3 | `/` | `approach.secondaryDescription` | replaced | None |
| 4 | `/` | `resources.description` | replaced | None |
| 5 | `/` | `resources.empty` | blocked-owner | Approved resource files |
| 6 | `/keynotes/` | `audienceExperience.description` | replaced | None |
| 7 | `/consultation/` | `lens.secondaryDescription` | replaced | None |
| 8 | `/workshops/` | `topics.description` | replaced | None |
| 9 | `/publications/` | `proof.title` | replaced | None |
| 10 | `/publications/` | `proof.description` | replaced | None |
| 11 | `/articles/` | `hero.description` | replaced | None |
| 12 | `/articles/` | `library.emptyTitle` | blocked-owner | Article selections |
| 13 | `/articles/` | `library.description` | replaced | None |
| 14 | `/articles/` | `library.empty` | blocked-owner | Article selections |
| 15 | `/resources/` | `hero.description` | replaced | None |
| 16 | `/resources/` | `library.emptyTitle` | blocked-owner | Approved resource files |
| 17 | `/resources/` | `library.description` | replaced | None |
| 18 | `/resources/` | `library.empty` | blocked-owner | Approved resource files |
| 19 | `/resources/[slug]/` | `missingFile` | replaced | Resource file per entry |
| 20 | `/privacy/` | `hero.title` | blocked-owner | Approved privacy policy |
| 21 | `/privacy/` | `hero.description` | blocked-owner | Approved privacy policy |
| 22 | `/privacy/` | `status.title` | blocked-owner | Approved privacy policy |
| 23 | `/privacy/` | `status.description` | blocked-owner | Approved privacy policy |
| 24 | `/disclaimer/` | `hero.title` | blocked-owner | Approved disclaimer |
| 25 | `/disclaimer/` | `hero.description` | blocked-owner | Approved disclaimer |
| 26 | `/disclaimer/` | `status.title` | blocked-owner | Approved disclaimer |
| 27 | `/disclaimer/` | `status.description` | blocked-owner | Approved disclaimer |
| 28 | `/terms/` | `hero.title` | blocked-owner | Approved terms |
| 29 | `/terms/` | `hero.description` | blocked-owner | Approved terms |
| 30 | `/terms/` | `status.title` | blocked-owner | Approved terms |
| 31 | `/terms/` | `status.description` | blocked-owner | Approved terms |
| 32 | Footer | `footer.closing` | replaced | None |

## Editing workflow

1. Open the YAML file matching the route.
2. Edit values, not semantic keys such as `keynotes.audienceExperience.description`.
3. Keep list indentation intact and quote values containing punctuation when in doubt.
4. Run `pnpm content:audit`, `pnpm lint`, and `pnpm build` before publishing.

Entries marked `blocked-owner` remain noindex or render a visitor-safe empty state until approved source material is available.
