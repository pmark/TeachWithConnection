---
status: in-progress
updated: 2026-06-19
---

# Design

This is the design source of truth for TeachWithConnection.com. It replaces
the brand-source-only version of this file with a full diagnosis, visual
system, component plan, and phased implementation sequence. The original
brand facts (logo, colors, typography mood, imagery rules) are preserved
below — nothing here changes the With Connection brand identity. It tightens
the execution so the site stops reading as a generic AI-generated Tailwind
template and starts reading as a warm, professional, hand-crafted educator
brand.

No implementation should proceed from this document without explicit
approval of the specific phase being started. See "Implementation phases."

---

## 1. Current design diagnosis

### What feels generic / AI-generated

The site is functional and clean, but nearly every visual decision repeats
the same three or four moves with no variation, which is the strongest
"template" tell:

- **One card shape, used for everything.** `rounded-md border border-[#e8e2dc] bg-white p-6` appears, verbatim or near-verbatim, in [ServiceCard.astro](src/components/services/ServiceCard.astro:14), [TestimonialQuote.astro](src/components/proof/TestimonialQuote.astro:10), the homepage credibility aside, the formats grid, the resources placeholder, and [InquiryForm.astro](src/components/forms/InquiryForm.astro:41). Cards never differ by content type, importance, or context — a testimonial looks like a form looks like a stat block.
- **One heading recipe, used everywhere.** Every section heading is `font-serif text-{size} leading-tight text-[#272727]` preceded by a `text-sm font-semibold uppercase tracking-wide text-[#157c93]` eyebrow. This eyebrow-plus-serif-heading pattern is one of the most recognizable "AI-generated SaaS template" signatures — it appears on the hero, every [Section.astro](src/components/common/Section.astro:1) instance, and [PageHero.astro](src/components/common/PageHero.astro:1).
- **Single accent color carrying every job.** `#157c93` is the link color, the eyebrow color, the button color, the left-border accent on list items, and the focus ring. Nothing else in the palette does visual work, so every page reads as "white background, charcoal text, one teal accent" with no tonal variation between sections.
- **No photography or texture anywhere in the rendered site.** Two real photos of Katie exist in `public/images/` (`katie-statman-weil-photo-1.jpg`, `katie-statman-weil-photo-2.webp`) but are not referenced by any component or page. A site about a real, relational, in-the-room educator currently has zero human imagery — this is the single biggest reason it feels synthetic rather than hand-crafted.
- **Left-border-accent list items as the only "decorative" device.** `border-l-4 border-[#157c93] bg-[#f7f7f7]` shows up in the homepage focus list and in [ProofList.astro](src/components/proof/ProofList.astro:11) as the only attempt at visual interest beyond cards — it's a common low-effort Tailwind pattern, not a brand-specific one.
- **No texture, grain, or warmth in surfaces.** Backgrounds are pure white, `#f7f7f7`, or solid `#157c93` / `#272727` blocks. Nothing is warm-neutral other than text color (`#4f4a45`, `#5d5751`, `#3c3834`), so the palette reads cooler and flatter than the "warm professional educator" goal.
- **System-ui body font.** `system-ui` is a reasonable performance default, but it's also the default of countless AI-scaffolded sites, and it renders differently per OS/browser, undermining a consistent "crafted" feel.
- **The real logo exists but is unused — the header runs on a text lockup.** `public/images/logo-small-785x240.jpg` and `public/images/logo-large-1570x480.jpg` are an interlocking-rings mark ("WITH Connection") sitting in the repo, but [Header.astro](src/components/layout/Header.astro:11) renders a plain serif text lockup instead. Same category of gap as the unused Katie photos: a real brand asset sitting on disk, invisible on the live site.
- **The coded "brand teal" doesn't match the actual logo color.** The logo's rings and wordmark are a **steel-blue / navy blue** family (light steel-blue outer rings, deep navy bold ring and "Connection" text) — visibly cooler and darker than the `#157c93` teal-green hardcoded into every button, link, and accent across the codebase. This is a real brand-consistency bug, not a style preference: the site's entire accent system was built from an old CSS color guess, not from the logo itself. This must be reconciled (see Color palette, below) before any token work in Phase 1 — otherwise Phase 1 will polish a palette that doesn't match the mark in the header.

### What already works and should be preserved

- **The information architecture and content priority are sound.** Hero → credibility → professional development → services → proof → approach → resources → inquiry CTA is a sensible, scan-friendly order that should not be restructured.
- **Accessibility fundamentals are genuinely good.** Visible focus rings, 44px (`min-h-11`) touch targets, labeled fields with described errors, semantic `<dl>`/`<blockquote>`/`<figure>` usage, mobile-first unprefixed classes — this is real engineering discipline and must not regress.
- **The teal/charcoal/warm-neutral palette direction is correct** and matches the legacy With Connection brand. It needs more range, not replacement.
- **The serif/sans pairing concept (Georgia-mood serif headings + system sans body) is the right idea**, inherited correctly from the original brand. The execution just needs more refined font choices and better-tuned sizes/spacing, not a different concept.
- **The inquiry form's structure, validation, and error handling are solid** (honeypot, Turnstile, per-field errors, accessible status region) — this is backend/UX work that should be visually restyled, not rebuilt.
- **Section component architecture (`Section`, `PageHero`, `ButtonLink`) is the right abstraction layer** for applying new visual tokens centrally without touching every page.

### Highest-impact improvements (ranked)

1. **Wire in the real logo and reconcile the accent color to it.** The logo asset already exists; the header currently ignores it and the rest of the site is built around a teal that doesn't match it. This is the highest-leverage *and* highest-priority fix — it's both a missing-asset gap and a brand-accuracy bug, and every other color decision in this doc depends on settling it first.
2. **Add real photography of Katie** to the hero or about page — highest-leverage single change for "hand-crafted, human, trustworthy" and currently a zero-cost fix since the assets already exist unused.
3. **Differentiate card/surface treatment by content type** so testimonials, forms, stat blocks, and service cards each have a distinct (but related) visual identity instead of one rounded-bordered box repeated forty times.
4. **Expand the color palette with secondary/warm tones** (e.g., a warm cream/sand surface and a muted secondary accent) so the primary accent is reserved for action and identity, not used as the only decorative color.
5. **Upgrade typography choices and rhythm** — pick a specific serif (not just "Georgia fallback") and refine the type scale/spacing so headings feel intentional rather than default browser-serif.
6. **Add one or two restrained hand-crafted accents** (e.g., a subtle background texture/paper grain, a custom underline/quote mark treatment, an asymmetric section divider) used sparingly so the site doesn't look stamped from a component library.
7. **Vary section rhythm** — not every section needs to be `py-16/py-20` with a centered `max-w-3xl` intro block; introduce at least one alternate layout pattern (e.g., offset two-column, pull-quote breakout) to break the metronomic scroll.

---

## 2. Brand direction

**In one line:** *a trusted colleague who happens to hold a doctorate — not a startup, not a brochure.*

- **Warm professional educator tone.** Speak like a respected mentor in the room with a teaching team, not a marketing department. Confidence comes from expertise and lived classroom experience, not superlatives.
- **Human, grounded, confident — not corporate.** Avoid SaaS-dashboard polish, glossy stock-photo gloss, and "disruptive" startup language. Favor specific, concrete claims (credentials, named publications, named approach) over vague value-prop copy.
- **Modern but not trendy.** Clean grid layouts, generous whitespace, restrained color — but no glassmorphism, no gradient mesh backgrounds, no oversized blob shapes, no AI-art illustration style.
- **Hand-crafted touches used sparingly.** One or two deliberate, brand-specific details (a refined pull-quote treatment, a paper-grain section background, a custom-drawn divider) — not decoration layered on every component. If a touch doesn't reinforce trust or warmth, cut it.
- **Educator-centered.** Visual hierarchy should always foreground Katie's expertise and the educator's problem, never abstract "innovation" or "solutions" framing.

---

## 3. Visual system

### Color palette with semantic roles

**Open item — resolve before Phase 1 token work begins:** the coded accent (`#157c93`, a teal-green) does not match the actual logo's steel-blue/navy family (`public/images/logo-small-785x240.jpg`, `logo-large-1570x480.jpg`). The original brand doc inherited `#157c93` from the old Squarespace site's CSS, not from the vector mark. Before locking in palette tokens, sample the logo's exact hex values (approximately a light steel-blue `#7CA6CC`-range for the outer/inner rings and a deep navy `#1B4D74`-range for the bold ring and "Connection" wordmark — sample precisely from the source file rather than trusting this estimate) and decide one of:

- **(a) Shift the site accent to match the logo's navy/steel-blue** — most brand-accurate, but touches every button, link, and focus-ring color in the codebase (larger Phase 1 scope).
- **(b) Keep `#157c93` as the site's digital accent and treat the logo as a standalone mark** that doesn't have to color-match every UI element — lower implementation cost, but leaves a visible mismatch between the header mark and the rest of the page.

This plan defaults to **(a)** since color accuracy to the real logo is a stronger trust signal than preserving an inherited guess, but it's flagged here for explicit sign-off since it's a wider-reaching change than originally scoped for "low-risk polish." The table below assumes (a) is approved; if (b) is chosen instead, keep the existing `#157c93`/`#0f6174` rows as-is and only add the logo to the header without recoloring anything else.

Extend the existing two-color brand (teal/navy + charcoal) into a small, purposeful palette. Only the accent hue is being corrected to match the logo — everything else (charcoal, neutrals, structure) is unchanged.

| Token | Hex | Role |
|---|---|---|
| `--color-brand-accent` | logo navy, sampled exactly from the source file (est. `#1B4D74` range) — replaces `#157c93` | Primary action, links, focus rings, identity accent |
| `--color-brand-accent-dark` | a darker shade of the sampled navy for hover/active | Hover/active state for accent elements |
| `--color-brand-accent-light` | logo's lighter steel-blue ring tone (est. `#7CA6CC` range) | Optional secondary accent — subtle backgrounds, decorative ring/line details only, never body text |
| `--color-brand-charcoal` | `#272727` (existing) | Primary text, footer background |
| `--color-brand-ink` | `#3c3834` (existing) | Secondary text on light surfaces |
| `--color-brand-slate` | `#4f4a45` (existing) | Body copy on light surfaces |
| `--color-brand-muted` | `#5d5751` (existing) | Tertiary text, captions, helper text |
| `--color-surface-white` | `#ffffff` (existing) | Primary page background |
| `--color-surface-warm` | `#f7f7f7` → refine to `#f6f2ec` (new, warm) | Section band background — replace the slightly cool `#f7f7f7` with a warm off-white for more "paper" feel |
| `--color-surface-sand` | `#efe7da` (new, sparing) | Secondary surface for callouts/quotes only — not for every other section |
| `--color-border-warm` | `#e8e2dc` (existing) | Card/section borders |
| `--color-accent-clay` | `#b5562f` or similar terracotta (new, **sparing**) | Optional second accent for a single hand-crafted detail (e.g., pull-quote mark, one illustration line) — never used for primary CTAs |
| `--color-success` | `#3c7a57` / `#edf8f1` (existing, form) | Form success state |
| `--color-error` | `#9f1d1d` / `#fff1f1` (existing, form) | Form error state |

Rules carried forward from the existing brand doc and reaffirmed:

- Teal stays reserved for action, identity, and small proof markers — it should not also be the only decorative device on every list item.
- All foreground/background pairs must pass WCAG AA.
- No purple/blue-gradient styling, no glossy SaaS treatments (forbidden list below, carried from prior doc).

The terracotta/clay accent is optional and Phase 3 only — flag for owner approval before use since it's a net-new hue not present in the legacy brand.

### Typography

Keep the serif-heading / sans-body structure. Refine the specific stack rather than replacing the concept:

- **Headings:** Move from "Georgia, Times New Roman, serif" toward a more deliberate web-safe/system serif pairing such as `"Source Serif 4", Georgia, "Times New Roman", serif` if a self-hosted variable font is approved (small, one-weight-family addition — must be documented as a new dependency per `AGENTS.md`). If no new font is approved, keep Georgia but tune size/leading rather than introducing a different concept.
- **Body:** Keep the system-ui stack for performance and zero-dependency simplicity; this is an acceptable, non-generic choice for body text specifically (most readers won't consciously notice system fonts in body copy — they will notice them in display headings, which is where Georgia/serif already differentiates).
- **Type scale:** Tighten the current ad hoc sizes (`text-4xl`/`text-5xl`/`text-6xl` hero, `text-2xl`/`text-3xl` section/card headings) into a documented scale so every heading level maps to exactly one size per breakpoint — currently sizes are chosen per-component without a shared scale.
- **Eyebrow treatment:** Keep uppercase+tracking but reduce its ubiquity — not every section needs one; reserve it for top-level section intros, not sub-blocks within a section (e.g., the "Outcomes"/"Formats" sub-headings on the homepage don't need the same treatment as the page's primary section eyebrow).

### Spacing scale

Formalize the scale already implicit in the codebase rather than inventing a new one:

- Page gutter: `16px` mobile → `24px` at `sm:` (existing, keep).
- Section vertical rhythm: `py-16`/`py-20` (existing) — but introduce one alternate rhythm (`py-12`/`py-14`, used by `InquiryCta`/`PageHero`) deliberately for "band" sections vs. "content" sections, rather than applying the same rhythm everywhere.
- Card padding: standardize on `p-6` for primary cards, `p-4 sm:p-6` for dense content (forms) — already mostly consistent, just document it.
- Gap scale: `gap-3` (tight lists/buttons), `gap-5` (form rows, card grids), `gap-8`–`gap-12` (major layout columns) — already in use; document as the canonical scale so new components don't invent `gap-4`/`gap-6` ad hoc.

### Border radius, shadows, dividers, cards

- **Radius:** Keep `rounded-md` as the system radius — it's restrained and already consistent. Do not introduce larger radii (forbidden list: "oversized rounded cards").
- **Shadows:** Currently none are used anywhere — keep it that way as the default. The brand doc already prefers borders over shadows; this is correct and should stay the dominant pattern. Reserve a single soft shadow (e.g., `shadow-sm`) for exactly one elevated element type (the inquiry form, or a pull-quote) to create one deliberate point of emphasis rather than flat borders on literally everything.
- **Dividers:** `border-t`/`border-b border-[#e8e2dc]` (existing) is fine for structural dividers; consider one custom divider treatment (a short teal or clay rule, not full-width) as a hand-crafted detail between major homepage sections — Phase 3 only.
- **Card differentiation (key fix):** Establish at least three distinct surface treatments instead of one:
  1. **Content card** (service/article/resource cards): current `border + bg-white + rounded-md` — keep as-is, this is the right default.
  2. **Quote/testimonial card**: distinct treatment — warm sand background instead of white, no border, larger serif quote mark as a graphic element, no rounded corners or a different radius — so testimonials are immediately recognizable as a different content type at a glance.
  3. **Stat/credibility block**: keep border+white but tighten so it doesn't compete visually with content cards (e.g., remove the border and use a left accent rule instead, since it's already information-dense with the `<dl>` structure).

### Button/link states

Current `ButtonLink` primary/secondary/text variants are solid and should be kept structurally. Refinements:

- Add a documented `disabled` state for `ButtonLink` (currently only the raw form submit button has one) so any future disabled CTA doesn't get a one-off style.
- Confirm hover states have enough visible change beyond color shift on the secondary/text variants (e.g., underline appears, not just color) — already true for `text`, should be confirmed for `secondary`.
- Keep `min-h-11` touch targets and the existing focus-visible teal outline pattern unchanged — this is correct and should propagate to any new interactive component.

### Form styling

Keep the current `InquiryForm` field treatment (border `#9b928a`, focus teal outline, per-field inline errors) — it's accessible and clean. Visual refinement only:

- Apply the same card-differentiation thinking: the form currently uses the generic `border + bg-white + rounded-md` card shell. Consider a distinct, slightly warmer shell (e.g., `bg-surface-warm` instead of white) so the form doesn't read as "just another content card" on the contact page.
- No structural, validation, or accessibility changes — this component is functionally solid.

### Section layout patterns

- Current pattern: eyebrow + centered `max-w-3xl` title/description block, then full-width content below. Keep as the default for most sections.
- Add one alternate pattern for visual variety on the homepage and About page: an asymmetric two-column "intro + content" layout where the eyebrow/title sits beside (not above) the content, used for exactly one or two sections (e.g., "Approach" or "About") to break the repetition without adding layout complexity everywhere.

---

## 4. Component improvement plan

### Header / nav

- **Replace the text-only brand lockup with the real logo.** Use `public/images/logo-small-785x240.jpg` (or convert/optimize to SVG/WebP if the owner can supply a vector source — flag as an `INPUT.md` request if not) in place of the current serif "With Connection" text in [Header.astro](src/components/layout/Header.astro:11). Keep "Katie Statman-Weil, EdD, LCSW" as the small text line beside or beneath the mark, per the existing brand doc's logo guidance (logo as primary mark, name nearby).
- Keep the rest of the structure (mobile `<details>` menu, desktop inline nav, inquire CTA) — it's accessible and functional, no change needed.
- Size the logo to the existing header height/scale (`text-2xl`/`text-3xl` lockup proportions) and confirm it doesn't break the 44px+ tap-target spacing already established around the brand link.
- This is now the **highest-priority** component change, not the lowest — it directly fixes the "logo unused, header runs on a fallback" and "accent doesn't match the logo" findings above.

### Hero

- **Add Katie's photo.** Use `katie-statman-weil-photo-1.jpg` or `-2.webp` in the hero's right column, replacing or accompanying the current credibility `<aside>` text block, or placed above/beside it. This is the single highest-impact change in this entire plan.
- Keep the eyebrow/serif-h1/description/dual-CTA structure — it's a sound, conversion-appropriate hero pattern.
- Consider trimming the hero background from flat `#f7f7f7` to the new warm surface token once defined.

### Content sections (Professional Development, Services, Approach, Resources)

- Apply the differentiated card system (section 3) so the "Outcomes" card, "Formats" cards, and service cards read as distinct content types rather than identical boxes.
- Reduce eyebrow usage on sub-headings within a section (e.g., "Outcomes"/"Formats" titles) — keep eyebrow only at the section level.
- Introduce the asymmetric layout pattern on the "Approach" section as the first candidate.

### Cards / testimonials / calls-to-action

- `ServiceCard`: keep structure, apply standardized content-card token.
- `TestimonialQuote`: redesign per section 3's quote-card treatment — warm surface, larger quote-mark graphic, no border — this is currently empty/unused on the homepage (`approach.testimonialEmpty` placeholder) so design and content need to land together.
- `ProofList`: keep the left-border-accent pattern — it's already a reasonable lightweight device, just make sure it isn't the only decorative idea on the page once cards are differentiated elsewhere.
- `InquiryCta`: keep the solid-teal full-bleed band — it's a good, confident use of the brand color as a single emphasis device. No change needed beyond palette token alignment.

### Contact / inquiry form

- Apply the warmer shell background per section 3.
- No other changes — structure, validation, and accessibility are already strong.

### Footer

- Keep the charcoal full-bleed footer — appropriately grounds the page and contrasts well.
- Consider adding a small Katie photo or logo mark here only if it doesn't compete with the hero photo — low priority, optional Phase 3 idea only.

### Mobile layout

- Current mobile-first implementation is already disciplined (unprefixed-for-mobile, `sm:`/`md:`/`lg:` progressive enhancement, 44px targets, no horizontal overflow reported). Preserve this discipline in all new work — every new component must be authored mobile-first per `docs/CONVENTIONS.md`.
- Specifically verify: hero photo doesn't push primary CTA below the fold on 320–390px widths; quote-card graphic quote-mark scales down or hides on narrow viewports rather than overlapping text.

---

## 5. Implementation phases

### Phase 1 — low-risk polish (CSS/design tokens only)

No new dependencies, no layout restructuring. Pure token and styling refinement.

1. **Sample the logo's exact colors from the source files and decide accent option (a) or (b)** per the Color palette section above — this gates step 2.
2. Add documented Tailwind v4 `@theme` tokens to `src/styles/global.css` for the full color palette (the resolved accent color, warm surface, sand surface, all existing neutrals as named tokens) instead of repeating raw hex arbitrary values across components.
3. **Add the real logo to the header**, replacing the text-only lockup, per the Header/nav plan above.
4. Swap `#f7f7f7` section backgrounds for the new warm `--color-surface-warm` token.
5. Differentiate the testimonial/quote card treatment (sand surface, no border, quote-mark graphic) — pure CSS/markup change to one component.
6. Reduce eyebrow usage on sub-section headings (Outcomes/Formats) — markup-only change.
7. Add Katie's existing photo to the hero — asset already exists, this is a template change with no new dependency.

### Phase 2 — layout and component refinements

1. Introduce the asymmetric two-column section pattern for "Approach" (and optionally "About").
2. Differentiate the credibility/stat block from generic content cards (left-accent rule instead of full border).
3. Standardize spacing/radius/shadow rules across all card types per the documented scale.
4. Evaluate and, if approved, add a single refined serif display font (new dependency — must be documented per `AGENTS.md` and `ARCHITECTURE.md` before adding).

### Phase 3 — optional hand-crafted accents (smallest scope, most discretionary)

1. One subtle background texture/paper-grain treatment on a single section (e.g., hero or testimonial section only) — CSS background only, no JS, no heavy image assets.
2. Optional terracotta/clay secondary accent for the quote-mark graphic or a single divider — owner approval required since it's a net-new hue.
3. Optional custom section-divider rule between major homepage sections.

Each phase requires explicit approval before work begins. Phase 3 items are individually optional — approve none, some, or all.

---

## 6. Acceptance criteria

- Site continues to pass WCAG AA contrast, visible focus states, semantic structure, and 44px touch targets — no accessibility regressions from any visual change.
- Site continues to pass existing SEO requirements (canonical URLs, structured data, meta descriptions, the `/professional-development/` redirect rule) — no template change should alter `<head>` output or heading hierarchy.
- Mobile layout (320px–430px) checked for every changed template — no horizontal overflow, no clipped text, no overlapping elements.
- No phase begins implementation without explicit sign-off on that specific phase.
- No new dependency (fonts, icon libraries, image libraries) added without being called out and approved first — Phase 2's optional serif font is the only anticipated candidate.
- No fake testimonials, fabricated photos, or invented credentials — the testimonial card redesign in Phase 1 must ship empty/placeholder-safe until real testimonial content exists, exactly as today.
- Site remains static-output Astro with no client-side JavaScript added beyond what's already used by the inquiry form.
- Build (`pnpm build`) and lint (`pnpm lint`) pass after each phase.

---

## Appendix: brand source (carried forward, unchanged)

The original With Connection website remains the brand source for logo
treatment, name, credentials, and legacy color/type mood. Nothing in this
document overrides those facts:

- Brand name: With Connection. Legal entity: With Connection, LLC.
- Principal: Katie Statman-Weil, EdD, LCSW.
- Legacy accent: `#157c93`. Legacy charcoal: `#272727`. White/near-white neutrals.
- Legacy serif mood: Adobe Garamond / Arno / Garamond Premier. Legacy sans mood: Proxima Nova.
- Logo: the existing With Connection mark is already present in the repo at `public/images/logo-small-785x240.jpg` and `public/images/logo-large-1570x480.jpg` (interlocking-rings icon + "WITH Connection" wordmark, steel-blue/navy). It is not yet wired into the header — see Phase 1 and the Header/nav plan. Text lockup remains the fallback only if the logo file is ever missing.
- Imagery: source-backed only — Katie/With Connection photography, professional-development/training visuals, book/publication imagery. No stock photography, no invented logos or proof.
- Forbidden styles (unchanged): purple/blue-purple gradients, corporate SaaS dashboard gloss, decorative blobs/bokeh/abstract SVG backgrounds, oversized rounded cards as dominant language, nested cards, generic stock photography, salesy popups/countdowns, clinical/compliance-coded visuals, text overlapping images or adjacent sections at mobile widths.
