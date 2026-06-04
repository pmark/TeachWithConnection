---
status: complete
updated: 2026-06-04
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

- Each page needs a unique title and meta description.
- Use canonical URLs once the production domain is known.
- Use Katie Statman-Weil, With Connection, EdD, LCSW, and key service terms consistently.
- Link service pages, resources, articles, and inquiry CTAs together.
- Do not keyword-stuff; maintain natural, professional language.

## Forms

- The inquiry form is the primary conversion path.
- Keep the form short enough to complete, but detailed enough to qualify inquiries.
- Required fields should be limited to essential contact and inquiry information.
- Provide a clear success state and error state once the provider is selected.
- Do not collect email addresses for resource access.

## Testing and checks

Before declaring implementation complete:

- Run `npm run lint`.
- Run `npm run build`.
- Check primary pages on mobile and desktop.
- Test inquiry form submission once a provider exists.
- Check all resource download links.
- Check all external book, publication, and social links.
- Verify that no content requires client-side JavaScript unless documented.
