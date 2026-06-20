---
status: complete
updated: 2026-06-19
---

# Conventions

## General

- Prefer simple static Astro pages and components.
- Use TypeScript.
- Use semantic HTML.
- Keep content editable without complex component logic.
- Avoid client-side JavaScript unless an Astro island is clearly justified.
- Keep implementation aligned with the existing With Connection brand and source content.
- Do not add dependencies without documenting them.

## Naming

- Components: `PascalCase.astro`.
- Layouts: `PascalCase.astro`, usually ending in `Layout` where appropriate.
- Content files: kebab-case slugs.
- Routes: lowercase kebab-case.
- Data files: kebab-case or descriptive camelCase exports.
- Props interfaces: `Props` inside the component unless shared across files.

Examples:

```text
src/components/services/ServiceCard.astro
src/components/proof/TestimonialQuote.astro
src/content/resources/classroom-regulation-guide.md
src/pages/professional-development.astro
```

## Astro components

- Keep components presentational unless they own a clear content boundary.
- Use typed props for all component inputs.
- Prefer slots for flexible content sections.
- Keep repeated sections reusable, but do not abstract one-off page copy prematurely.
- Do not use framework islands unless interactivity is required and documented.
- Do not fetch public website content at runtime; migrate source content into this repo.

## Tailwind

- Prefer documented design tokens and repeated patterns from the brand system.
- Use utility classes in markup.
- Avoid arbitrary one-off values unless they are tied to a documented brand need.
- Keep responsive classes readable.
- Favor quiet, spacious, professional layouts over decorative marketing patterns.
- Maintain the existing With Connection feel: warm neutrals, teal accent, serif headings, readable sans-serif body text.
- Write the unprefixed utility set for 320–430px screens. Use `sm:`, `md:`, and `lg:` only to progressively enhance wider layouts.
- Do not build desktop layouts and then repair them with mobile overrides.
- Maintain at least 44px interactive targets and verify no horizontal overflow at 320px.

### Dark mode

The site supports dark mode via a class-based `dark:` variant (`@custom-variant dark (&:where(.dark, .dark *));` in `global.css`), toggled by a button in the header (`ThemeToggleButton.astro`) and persisted to `localStorage`. A blocking inline script in `BaseLayout.astro`'s `<head>` sets the class before first paint from `localStorage` or `prefers-color-scheme`.

Every semantic color token in `global.css` falls into one of two roles, and this distinction matters when adding new ones:

- **Fill/self-contained-surface tokens** (`--color-brand`, `--color-brand-dark`, `--color-brand-light`, `--color-brand-pale`, `--color-clay`, `--color-footer`, `--color-footer-dark`) stay the **same value in light and dark mode**. They're used on elements that carry their own contrasting text on top (buttons, the CTA band, the footer, `KeynoteHeroVisual`) — self-contained color blocks that don't need to react to the surrounding page background.
- **Text/surface-on-page tokens** (`--color-brand-text`, `--color-clay-text`, `--color-charcoal`, `--color-graphite`, `--color-slate`, `--color-stone`, `--color-surface`, `--color-paper`, `--color-sand`, `--color-line`) **do change** under `.dark`, because they're rendered directly against the page background, which itself flips.

Do not use a flipping token (`paper`, `sand`, `charcoal`, etc.) for text or backgrounds inside an always-dark self-contained surface (footer, buttons, CTA bands) — it will invert to the wrong value in dark mode. Use a literal hex value instead (see the footer's nav link color) if you need a fixed light/dark color regardless of theme. Conversely, use the flipping tokens for anything sitting on the general page background, including card surfaces (`bg-white` is banned — use `bg-surface`) and any teal/clay text, border, or focus-ring color that isn't inside a filled button (use `-text` suffixed tokens, not the base `brand`/`clay`).

Avoid:

- Purple/blue gradient-heavy styling.
- Corporate SaaS styling.
- Oversized decorative cards.
- Rounded-pill overuse beyond CTA buttons if it stops matching the brand.
- Text over busy imagery without sufficient contrast.

## Content

- Use the existing With Connection site as source material.
- Preserve the meaning of testimonials and quoted material.
- Attribute proof accurately.
- Do not invent client names, awards, testimonials, certifications, or outcomes.
- Keep educator-facing content primary.
- Use therapy-related content only when it supports Katie's biography, philosophy, or credibility.
- Free resources must remain ungated.

## Voice

- Write to leaders and educators with respect.
- Validate classroom complexity without blame.
- Explain specialized concepts in plain language.
- Use direct CTAs tied to inquiry.
- Avoid exaggerated promises or guaranteed outcomes.

Preferred phrasing themes:

- relationship-centered
- trauma-responsive
- neuroaffirming
- attachment-informed
- behavior as communication
- regulation
- practical classroom tools
- children and educators both feeling supported

## Accessibility

- Use one H1 per page.
- Preserve heading order.
- Use semantic sections, lists, blockquotes, and forms.
- Give every meaningful image descriptive alt text.
- Use empty alt text only for decorative images.
- Ensure color contrast passes WCAG AA.
- Provide visible focus states.
- Label every form field.
- Make resource links understandable without surrounding context.

## SEO

- SEO is a permanent business requirement and release gate, not a launch-only task.
- Each page needs a unique title and meta description.
- Each indexable page needs a canonical URL, index/follow directive, social metadata, and accurate structured data where applicable.
- Use canonical URLs once the production domain is known.
- Use Katie Statman-Weil, With Connection, EdD, LCSW, and key service terms consistently.
- Link service pages, resources, articles, and inquiry CTAs together.
- Do not keyword-stuff; maintain natural, professional language.
- `/` alone owns the “early childhood professional development” hub intent. Never recreate `/professional-development/` as a page or add another doorway route.
- TeachWithConnection.com owns canonical educator bookstore content; duplicated WithConnectionPDX pages must canonicalize here.

## Forms

- The inquiry form is the primary conversion path.
- Keep the form short enough to complete, but detailed enough to qualify inquiries.
- Required fields should be limited to essential contact and inquiry information.
- Provide a clear success state and error state once the provider is selected.
- Do not collect email addresses for resource access.

## Testing and checks

Before declaring implementation complete:

- Run `pnpm lint`.
- Run `pnpm build`.
- Check primary pages on mobile and desktop.
- Check every shared template at 320px, 390px, 768px, and desktop widths.
- Inspect sitemap, robots directives, canonicals, social metadata, and JSON-LD before launch.
- Test inquiry form submission once a provider exists.
- Check all resource download links.
- Check all external book, publication, and social links.
- Verify that no content requires client-side JavaScript unless documented.
