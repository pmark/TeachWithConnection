---
status: complete
updated: 2026-06-04
---

# Design

## Brand source

The existing With Connection website is the brand source for launch. Use it for logo treatment, color mood, typography feel, photography style, proof imagery, and language.

Known brand signals from source-site review:

- Brand name: With Connection.
- Business identity: With Connection, LLC.
- Primary public figure: Katie Statman-Weil, EdD, LCSW.
- Existing accent color near `#157c93`.
- Existing charcoal near `#272727`.
- White, near-white, and restrained warm neutrals.
- Serif headings in the Adobe Garamond, Arno, or Garamond Premier family mood.
- Sans-serif body and navigation in the Proxima Nova mood.
- Warm, relational photography and professional development/book/publication visuals.

The new site should feel like a modern static expression of the existing brand, not a new brand system.

## Brand continuity goals

- Preserve the recognizable With Connection tone: warm, grounded, relational, educator-centered, and practical.
- Keep layouts quiet and readable so credibility and inquiry paths stay clear.
- Make professional development the lead service without hiding keynotes, consultation, resources, or publications.
- Use proof conservatively and accurately.
- Avoid corporate, flashy, clinical, or generic speaker-site patterns.

## Logo usage

Use the existing With Connection logo once the asset is imported or supplied.

Guidelines:

- Place the logo in the header as the main brand anchor.
- Keep sufficient clear space around the logo.
- Do not recolor, stretch, distort, or add effects to the logo.
- Use text fallback "With Connection" if the logo asset is temporarily unavailable.
- Header brand text may include Katie's name nearby, but the logo should remain the primary brand mark.

If a logo source file is not available during implementation, use a semantic text brand lockup and record the missing asset in `docs/STATUS.md`.

## Colors

Base palette:

- Teal accent: `#157c93`.
- Charcoal text: `#272727`.
- White: `#ffffff`.
- Near-white surface: `#f7f7f7`.
- Warm neutral surfaces may be added sparingly if they support the existing brand mood.

Color usage:

- Use charcoal for primary text.
- Use teal for primary CTAs, links, accents, and small proof markers.
- Use white and near-white for page backgrounds and section contrast.
- Use warm neutral borders or muted backgrounds for separation rather than heavy shadows.
- Ensure all foreground/background combinations pass WCAG AA contrast.

Avoid one-note teal pages. Teal should carry action and identity accents, not dominate every surface.

## Typography

Typography should approximate the existing With Connection feel using available system and web-safe stacks until custom font licensing or hosting is approved.

Heading stack:

```css
Georgia, "Times New Roman", serif
```

Body stack:

```css
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Rules:

- Use serif headings for warmth and continuity.
- Use sans-serif body copy for readability.
- Keep heading sizes restrained on content and service pages.
- Avoid viewport-scaled text.
- Use normal letter spacing.
- Keep line lengths comfortable, especially on article/resource pages.

If brand fonts are later approved, document the source, licensing, and loading approach before implementation.

## Spacing and layout

Use calm, generous spacing without turning the site into a decorative landing page.

Layout patterns:

- Constrain core content to readable max widths.
- Use full-width section bands for major page rhythm.
- Avoid cards nested inside cards.
- Use simple two-column layouts for service/proof pairings on wider screens, collapsing cleanly on mobile.
- Keep hero sections focused on positioning, primary CTA, secondary CTA, and one or two proof signals.
- Let the next section be visible below first-viewport hero content.
- Use predictable vertical rhythm between sections.

Service pages should use scan-friendly sections: audience fit, topics, format, proof, related resources, and inquiry CTA.

## Components

Expected component patterns:

- Header: logo/brand, primary navigation, inquiry CTA.
- Footer: brand summary, core links, legal links, publications/social links where appropriate.
- Buttons: primary teal CTA, secondary outline/text CTA, clear focus states.
- Service cards: short title, description, audience fit, and link.
- Testimonial quotes: readable quote styling with source labels available from source content.
- Proof lists: credentials, publications, awards, and client/partner signals.
- Resource cards: title, description, tags, audience, direct access link.
- Article cards: title, excerpt, topic tags, and date/source when available.
- Inquiry CTA: reusable section with service-specific language.
- Inquiry form: simple labeled fields and accessible validation once provider is selected.

Buttons should use text labels because the primary actions are content and inquiry actions, not icon-only tool commands.

## Imagery

Use source-backed imagery from the existing With Connection site or owner-supplied assets.

Preferred imagery:

- Katie/With Connection photography.
- Professional development or training visuals.
- Book cover or book photography for *Trauma Responsive Strategies for Early Childhood*.
- NAEYC article or publication imagery when reuse is allowed.
- Existing partner/client proof logos only when reuse is confirmed.

Rules:

- Do not use generic stock classroom photos unless explicitly approved.
- Do not invent organization logos or proof imagery.
- Keep images bright, natural, and relational.
- Avoid dark overlays, heavy blur, atmospheric crops, or images that make content hard to inspect.
- Use descriptive alt text for meaningful images.
- Use empty alt text only for decorative image treatments.

## Tailwind tokens and patterns

Tailwind should be used through utility classes. Add shared CSS only in `src/styles/global.css` when it defines global font stacks, base element styles, or documented brand tokens.

Recommended token names if custom theme variables are introduced:

- `color-brand-teal`: `#157c93`.
- `color-brand-charcoal`: `#272727`.
- `color-brand-surface`: `#f7f7f7`.
- `font-heading`: serif stack.
- `font-body`: sans-serif stack.

Reusable class patterns should favor:

- `max-w-*` content constraints.
- `mx-auto` centered wrappers.
- responsive grid utilities.
- modest border radii.
- thin borders and quiet backgrounds.
- visible focus rings using the teal accent.

Avoid arbitrary Tailwind values unless they directly encode documented brand colors, layout widths, or spacing decisions.

## Accessibility

Design must support:

- WCAG AA color contrast.
- Visible keyboard focus states.
- Readable mobile text sizes.
- Touch targets large enough for navigation and CTAs.
- No text over busy imagery without a solid contrast treatment.
- Semantic heading hierarchy.
- Labeled form fields.
- Clear link text for resources and external publications.
- No motion-dependent content.

Do not rely on color alone to communicate form errors, active navigation, or resource state.

## Forbidden styles

Avoid:

- Purple or blue-purple gradient-heavy styling.
- Corporate SaaS dashboards or glossy startup hero patterns.
- Large decorative orbs, blobs, bokeh, or abstract SVG backgrounds.
- Oversized rounded cards as the dominant layout language.
- Nested cards.
- Generic stock photography.
- Salesy popups, countdowns, or intrusive lead capture.
- Dense clinical styling that distances Katie from educators.
- Compliance-focused behavior imagery or language.
- Text that overlaps images, buttons, or adjacent sections at mobile widths.

## Reference sites

Primary reference:

- Existing With Connection website at `www.withconnectionpdx.com`.

Design should not copy another external site. If future reference sites are supplied, use them to clarify mood or interaction patterns only after checking that they do not conflict with the existing With Connection brand.
