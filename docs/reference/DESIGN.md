---
status: complete
updated: 2026-06-20
---

# Design reference: eileendevine.com

## Purpose

Katie has flagged the current TeachWithConnection design (diagnosed in [`../DESIGN.md`](../DESIGN.md)) as not working for her, and named **eileendevine.com** as a site whose aesthetic she responds to. This document analyzes that site as a comparable reference — not a template to clone, but a source of specific, actionable contrasts against the generic-template problems already diagnosed in the main design doc.

Eileen Devine, LCSW, runs a parenting-coaching brand built around a "Brain First Parenting" approach — coaching, a course, a community, and a podcast for parents (particularly of kids with neurobehavioral/regulation challenges). It's not the same audience as Katie's (educators/schools vs. parents), but the brand posture is close: a single credentialed expert, a relational/trust-first tone, multiple service formats, and a "hope + expertise" emotional register that maps well onto "warm professional educator."

## Methodology and confidence

This started from automated fetches of the live site's rendered text/HTML structure (no visual inspection), then was corrected and expanded against full-page screenshots of the live homepage, the "For Professionals / Think Brain First" page, and the About page, all provided directly. Each new page has refined or corrected claims made from the page(s) before it — that pattern is likely to continue, so treat anything below as the best read so far, not final.

- **High confidence** (directly observed across the three screenshots seen): navigation architecture, page section order, heading copy, CTA/button language, layout, the color families actually in use, the typeface system, imagery content.
- **Medium confidence**: specific hex values below are estimated by eye from compressed screenshots, not color-picked from source CSS/images — treat them as "close enough to design against," not literal tokens. The same caution the main `DESIGN.md` applies (preferring owner-supplied exact values over agent sampling) should apply here before any value is hardcoded.
- **Not yet seen**: Course, Community, Coaching, and Podcast sub-pages, mobile/responsive behavior, and hover/interaction states.
- **Corrected by the screenshot**: an earlier text-only fetch guessed "gold or warm tan" accents and described the hero as a generic dark background. Both were wrong — see Visual impression and Imagery below. It also returned a Wix-placeholder-looking footer address ("500 Terry Francois Street, San Francisco") that doesn't appear in the actual rendered footer at all, confirming it was a fetch artifact, not real content. The real footer just shows name, title, "Based in Oregon, supporting parents globally," and social icons.

## Site overview

- **Who:** Eileen Devine — a single named expert as the entire brand. The "For Professionals" page identifies her as "Founder and CEO of Brain First Parenting™ & Think Brain First Training & Consultation Program," confirming the methodology name is an actual trademarked asset, not just casual phrasing.
- **What:** One underlying methodology, productized twice for two different buyers: **"Brain First Parenting™"** for individual parents (coaching, course, community, podcast), and **"Think Brain First"** for institutional buyers (training/consultation sold to agencies, healthcare systems, and school districts). Same root IP and a shared brain-and-speech-bubble icon mark, different packaging per audience.
- **Audience:** Two distinct, separately-served segments: parents (emotionally-led, hope-framed) and professionals/institutions (outcomes- and ROI-led — staff training, organizational consultation). Both ultimately serve the same topic — neurobehavioral/regulation challenges in children — but the sales pitch and tone are rebuilt per audience, not reused.
- **Tagline / emotional register varies by audience.** The parent-facing homepage hero leads with "There is more hope than you can imagine." — short, plain-language, emotional. The professional-facing hero instead leads with the program's own name in giant type, "THINK BRAIN FIRST," over a photo of a clinician working with a child — branding-led rather than emotion-led, appropriate for a buyer evaluating a training vendor rather than seeking comfort.

## Information architecture

Primary nav: About · For Parents (Course / Community / Coaching) · For Professionals (Think Brain First, Think Brain First for Individuals) · Podcast · Connect.

Two things stand out structurally:

1. **Audience-first nav, not service-first.** The top-level split is "For Parents" vs. "For Professionals" — visitors self-select by who they are before seeing what's for sale. TeachWithConnection's current nav is service/page-first, with no audience branch, even though Katie likely also serves more than one distinct audience (e.g., school leaders vs. individual teachers) the way Eileen splits parents vs. professionals.
2. **One named methodology anchors everything.** "The Brain First Parenting Approach" is the spine the course, community, and coaching all hang off of — it's a proper noun, capitalized and reused consistently, not generic "our approach" copy. It gives the brand something distinctive to repeat that a generic template wouldn't have.

Homepage section order: hero → free lead-magnet offer → "Connect & Learn" service grid (Coaching / Course / Community / Content as four parallel cards) → named methodology + areas-of-expertise → podcast appearances → testimonials → presentations/partnerships (logo bar) → footer.

## The "For Professionals / Think Brain First" page — the closest analog to TWC

This page is a B2B/institutional sales page, and it's structurally a much closer match to what Katie's site needs to do (sell professional development/consulting to schools and districts) than the parent-facing homepage is. Section order: hero (program name + photo) → problem statement + "BOOK A CALL" → outcomes framing ("Transform the Way You Understand and Support...") → branded program band ("THINK BRAIN FIRST," rose background, icon mark) → "The Expectation Gap" (problem/credibility, photo + text) → credentialed pull-quote testimonial → org-level outcomes bullet list + portrait photo → "National & International Partnerships" band (agencies/healthcare systems/school districts — empty of visible logos in this capture) → "Designed For" audience bullet list + CTA ("SCHEDULE A CONSULTATION") → "Meet Eileen" bio band → **FAQ accordion with a search bar** → footer.

Notable patterns not present on the homepage:

- **A recurring icon/logomark** — a brain-inside-a-speech-bubble graphic — appears in the hero and the branded color band, giving "Think Brain First" its own visual identity distinct from the parent-facing brand, while staying in the same rose/navy palette family.
- **Credentialed testimonial, not first-name-only.** The quote here is attributed to "Crisa Harman, MA, LMHC" — full credentials, because the buyer is a fellow professional evaluating expertise, not a parent seeking emotional reassurance.
- **An FAQ accordion with a search field** — objection-handling content (training cost, CEUs, in-person vs. virtual, train-the-trainer, "what are the next steps if my org wants this") aimed squarely at an institutional buyer doing due diligence. TWC has no equivalent FAQ pattern currently.
- **CTA language shifts to sales-call language** — "BOOK A CALL," "SCHEDULE A CONSULTATION" — instead of the parent funnel's "BUY THE COURSE" / "JOIN THE COMMUNITY." Same CTA discipline (specific, never generic), different verbs for a different buying motion.
- **Section headings here are a bold serif/slab, not script** — see the About page note below for the corrected rule about where the script font actually applies.
- **Photography is used two ways**: crisp, documentary-style photos for credibility/real-moment shots (the hero, "Expectation Gap"), and deliberately soft-focus/blurred photos as mood-setting backdrops behind dense text blocks (the portrait next to the outcomes list, the blurred group photo behind "Training is Designed For"). Blur is a tool for de-emphasizing a photo so it doesn't compete with adjacent text, not a mistake — confirmed again on the About page (see below).

## The About page

Section order: hero (eyebrow "ABOUT EILEEN," "Welcome." heading, bold mission subhead, a second candid outdoor portrait of Eileen from the same shoot as the homepage hero, social icons) → sage pull-quote band (first-person, vulnerable) → "Our Story" (script heading + a short decorative underline rule + two-paragraph first-person narrative + three buttons) → "Recently featured on..." press band (rose, script heading) → bio/credentials two-column block with a blurred family-style photo → footer.

This page resolves two things left unconfirmed by the earlier pages, and reveals one new detail:

- **The script font is not homepage-only — it's reserved for personal/narrative content, on whichever page that shows up.** "Our Story" and "Recently featured on..." both use it here on the About page; the "For Professionals" page never does. The real rule: script = warm storytelling register (Home, About), bold serif/slab = informational/institutional register (For Professionals). That's a more useful pattern to copy than "homepage only."
- **The "Recently featured on..." rose band does contain real press/partner logos** (Attachment Theory in Action, Wild Peace for Parents, TILT, The Adoption Connection, The Better Behavior Show) — confirmed here, after appearing empty in the homepage and Professionals-page captures (likely a loading or carousel artifact in those, not a missing feature). Logos are shown plain, in white/light tone against the rose background, sized similarly — a simple "as seen on" strip with no individual styling per logo.
- **A literal hand-drawn-feeling divider exists**: a short sage-colored underline rule sits directly beneath the "Our Story" heading — exactly the "custom-drawn divider" hand-crafted touch the main `DESIGN.md` already lists as a Phase 3 idea it hadn't built yet. Direct precedent that it's a small, cheap, high-payoff detail.
- **A third button treatment**: navy/charcoal-outline pills on light backgrounds ("Connect with Eileen," "Access Free Resources," "Read the Blog"), alongside the white-outline (dark/photo) and rose-outline (photo cards) treatments seen on the other two pages. Three outline colors total, all sharing one pill shape/weight — outline color always picked for contrast against the immediate background, never a fixed brand color.
- **The footer wordmark "Eileen Devine" is set in a script/italic style**, distinct from the bold sans logo used in the header — a third typeface in the system, reserved specifically for that one signature-like moment at the very bottom of every page.
- **Icon outline color adapts to its background too**, not just buttons: the social icons are charcoal/gray outline on this page's white hero, white outline in the navy footer.
- **Bio copy uses specific, concrete credentials in first-person voice** ("over 20 years of clinical experience," "adoptive mother of a child with FASD," named instructor role for a named external program) rather than generic "expert" language — the same instinct the main `DESIGN.md` already names as a brand-voice goal ("specific, concrete claims... over vague value-prop copy").

## The "For Parents / Coaching" page — a different page type entirely

Unlike the other three pages (which are brand/info pages), this is a **long-form direct-response sales letter** — a single linear scroll of copywriting-led persuasion, not a grid of services. Section order: hero (script "Brain First Parenting" / "Individual Coaching" over a cozy latte/laptop photo, "CONNECT NOW") → italic pain-point headline ("Will anything help my child be less challenging?") + agitation paragraph → rose band continuing the pain-point narrative → two-column "Moving From Surviving to Thriving" (photo + a "Parent coaching with me is **not**:" bullet list) → full-width sage pull-quote → "Parent Coaching Details:" (photo + a fully transparent pricing/policy bullet list) + "CONNECT NOW" → another full-width sage pull-quote → "is this for you if:" qualifying bullet list + photo + "CONNECT NOW" → "My Approach" (objection-handling: why five sessions in three months) → closing paragraph + a handwritten-style cursive signature image → footer.

This page changes two things this doc previously stated too narrowly:

- **Rose isn't accent-only — it's also used as a full content-band background**, here for pain-point/agitation copy (white serif heading + white body text on rose). Combined with sage already doing the same double duty (text color *and* the newsletter band background), the real rule is: **both secondary colors are full-fledged background colors, not just trims** — TWC's main `DESIGN.md` plan to add "a warm cream/sand surface and a muted secondary accent" could similarly let its new secondary color carry a whole section, not just borders/text.
- **The oversized quote-mark + pull-quote device is reused full-width**, not just under a three-column testimonial grid — same component, different layout context.

New content-strategy patterns specific to this sales-letter format (less about visuals, more about how trust and conversion are built — worth flagging even though it's copy strategy, not a visual pattern):

- **Fully transparent, specific pricing and policies stated on the page** — exact package price, per-session price, scheduling window, cancellation policy, and email response-time commitment, all spelled out rather than "contact for pricing." Strong trust signal; whether to adopt depends on whether Katie's offer suits public pricing, but it's worth raising as an option rather than assuming "professional services always hide pricing."
- **Objection-handling structured as explicit lists**: "Parent coaching with me is not: [...]" (defines the offer by what it isn't) and an implicit "this is for you if: [...]" qualifying list — both let a visitor self-diagnose fit before ever talking to Eileen.
- **A handwritten-style signature graphic** closes the long-form copy — distinct from the script *typeface* used elsewhere; this is an actual cursive signature image, the most intimate trust device on the page.
- **The phrase "walk alongside [you/and support]" recurs here and on the About page** — confirms a deliberately repeated verbal motif, not a one-off turn of phrase.

## Tone of voice and content patterns

- **Headlines are short, plain-spoken, and emotional** — "There is more hope than you can imagine," "Never miss an update!" No SaaS abstractions ("unlock," "empower," "solutions").
- **CTAs are short, imperative, and concrete**: "BUY THE COURSE," "JOIN THE COMMUNITY," "FIND INSPIRATION," "RECEIVE THE INFOGRAPHIC," "Meet Eileen." Each button says exactly what happens next — generic "Learn More" appears once, alongside more specific labels, rather than being the default everywhere.
- **A free lead magnet sits high on the page** (the infographic), ahead of any paid offer — it gives visitors a low-commitment way to engage before being asked to buy a course or join a community.
- **Credibility is shown via partnerships and podcast appearances**, not testimonial quotes alone — a "Presentations & Partnerships" logo bar functions like a press/as-seen-in strip.

## Imagery

- **The hero is a real, candid-feeling portrait of Eileen herself** — outdoors, rust-orange jacket, soft scarf, a distinctive building/stained-glass and trees behind her, looking directly at camera with a warm, approachable expression. It's not a posed corporate headshot and not stock photography — it reads as "this is a real person you could meet," which is exactly the trust mechanism a solo-practitioner brand needs. This is a *stronger* parallel to the TWC gap than the alt-text-only version of this doc suggested: the named expert's own face carries the entire hero, full-bleed, with a dark gradient laid over the left portion only so the headline stays legible without blocking her out of the frame. TWC has the equivalent asset sitting unused (per [`../DESIGN.md`](../DESIGN.md): real photos of Katie in `public/images/`, referenced nowhere) and currently runs a text-only hero with no human presence at all.
- **The four service cards (Coaching/Course/Community/Content) are also photographic**, each a different muted, low-contrast image (laptop on a table, coffee/hands, a soft-focus community moment, hands with a journal) with a dark overlay and white text on top — so photography carries visual weight throughout the page, not just in the hero.
- **A real partner/press logo strip exists** (confirmed on the About page's "Recently featured on..." band: named podcasts/blogs/publications, shown plain in white against the rose background) — it just hadn't rendered in the homepage and Professionals-page captures.
- **Blurred, soft-focus photos recur as backdrops behind dense text** (the About page bio section, the Professionals page's outcomes list and "Designed For" section) — a deliberate way to use a human photo as mood/texture without it competing with adjacent copy.

## Visual impression (confirmed against screenshot; hex values estimated by eye, not sampled)

- **Color palette is four families, not one accent color:**
  - **Deep navy** (~`#1b2a38`) — the free-resource band and the footer. The darkest, most neutral tone in the palette.
  - **Muted slate blue-gray** (~`#5d7385`) — the header/nav bar and the "Presentations & Partnerships" band. Cooler and lighter than the navy; reads as a secondary dark rather than a repeat of the footer.
  - **Sage / muted green** (~`#7f9189`) — used twice, differently: as the color of every script-font section heading ("Connect & Learn," "The Brain First Parenting Approach," "Podcast Appearances," "Presentations & Partnerships"), *and* as a full solid background for the "Never miss an update!" newsletter band. One color doing both a text job and a surface job is a deliberate, economical move.
  - **Dusty rose / terracotta** (~`#a36a67`) — the only genuinely warm color in the palette. Used as a full content-band background (the "Podcast Appearances" band, and the Coaching page's pain-point section), as the outline-button color on photo cards, and as the oversized decorative quotation-mark glyph under testimonials. Like sage, it does both a surface job and an accent job depending on the page.
  - Light sections (testimonials, "Brain First Parenting Approach") sit on plain white/warm-white, with charcoal body text — no tint.
  - There is **no gold or tan** anywhere on the page — an earlier text-only pass through this site guessed that incorrectly; correcting it here since it's now confirmed by the actual screenshot.
- **Three deliberate typefaces, each with one job:** a bold sans-serif for the logo, nav, and button labels (site-wide); a bold serif/slab for body headings on informational/institutional pages (For Professionals); and an elegant **script/italic font reserved for personal-narrative section headings** (Home, About) plus the footer's "Eileen Devine" signature. Register, not page, decides which heading typeface is used — informational content gets the serif, storytelling content gets the script.
- **Three button outline treatments, always picked for contrast against the immediate background, never a fixed brand color:** white-outline pills on dark or photographic backgrounds (hero, free-resource band, podcast band), dusty-rose-outline pills on the photo service cards, and navy/charcoal-outline pills on plain light backgrounds (the About page's "Connect with Eileen" row). Same pill shape and weight every time — only the outline color changes.
- **A decorative oversized quotation mark** (in the dusty rose) sits under each testimonial as the one purely ornamental flourish on the page — small, repeated exactly three times, not scattered everywhere.
- **Layout:** card-based grid for the four service offerings, vertically stacked full-bleed bands of alternating color/photo for everything else, generous whitespace in the light sections, sticky-feeling header.
- **Restraint:** no gradients, no glassmorphism, no illustration — every accent color is reserved for one or two specific jobs rather than decorating everything, which is exactly the discipline the main `DESIGN.md` is aiming for when it says teal should not "also be the only decorative device on every list item."

## What this suggests for TeachWithConnection

Read together with the existing diagnosis in [`../DESIGN.md`](../DESIGN.md), the clearest overlaps are:

1. **Ship the real photography of Katie, full-bleed, in the hero.** This is already the #2 ranked fix in the main design doc. Eileen's site proves the specific execution: full-bleed portrait, dark gradient over only the text-bearing side, headline laid directly on top — not a separate photo-in-a-box next to text.
2. **The script-heading detail is a strong, low-risk candidate for the "one or two hand-crafted touches" the main `DESIGN.md` already wants.** It's a second typeface reserved for one specific register (warm/narrative content) and never used on informational pages — directly answers the brand doc's own warning against "one heading recipe, used everywhere," without requiring a redesign of every component.
3. **The oversized decorative quote-mark under testimonials is an almost exact match for what `../DESIGN.md`'s card-differentiation plan already calls for** ("a larger serif quote mark as a graphic element" for the testimonial card treatment) — this is direct precedent that the idea reads well in practice, not just in theory.
4. **Give the brand one named, capitalized "approach" or framework**, repeated consistently, the way "Brain First Parenting Approach" is repeated — if Katie already has informal language for her method, promoting it to a proper noun used consistently across the site is low-cost and high-identity-payoff.
5. **A two-color secondary system (sage + dusty rose), each doing double duty as both a full section background and a text/accent color**, is a concrete model for the main doc's "expand the palette so the primary accent isn't the only decorative color" goal — it shows that two new colors, each allowed to carry a whole section sometimes, is enough; it doesn't need five.
6. **Consider an audience-first nav branch** (e.g., a top-level split by who's visiting — school leaders vs. individual educators, if that distinction is real for Katie's business) rather than a flat service list.
7. **Diversify CTA language and consider a second, context-dependent button treatment** (light-outline on dark/photo backgrounds vs. a secondary accent-outline elsewhere) instead of one button style everywhere.
8. **A free, low-commitment lead-magnet offer placed high on the homepage** is a pattern TWC doesn't currently have and could borrow if there's a piece of content (a guide, checklist, etc.) suited to it.
9. **The "For Professionals" page is the most directly transferable model, not the homepage.** Katie's actual buyer (schools/districts/agencies) maps to Eileen's institutional-buyer page, not her parent-facing one. Worth borrowing directly: a credentialed (not first-name-only) testimonial, an FAQ accordion answering procurement-style questions (cost, format, next steps for an org), and sales-call CTAs ("Book a Call" / "Schedule a Consultation") rather than content-funnel CTAs.
10. **An FAQ section is a concrete, low-effort addition** TWC doesn't have — institutional buyers evaluating PD/consulting almost always have the same handful of questions (cost, format, scheduling, what's included) that a static accordion answers without a sales call.

11. **The custom underline rule beneath "Our Story" is another cheap, direct precedent** for the same Phase 3 idea in `../DESIGN.md` ("a custom-drawn divider... between major homepage sections") — small, narrow in scope, and clearly hand-placed rather than a default border.
12. **Concrete, specific, first-person credentials** (named credentials, named programs, named conditions) read as more trustworthy than generic "expert" copy — worth auditing Katie's existing bio copy against this same bar.
13. **If Katie has a specific, packaged service (a set number of sessions/workshops at a stated price), consider stating it plainly** the way the Coaching page does — exact pricing, scheduling terms, and cancellation policy spelled out — rather than a generic "contact us" CTA. Worth raising as an option with Katie, not assuming it fits every offer.
14. **"Is not" / "is this for you if" qualifying lists are a reusable content pattern** for any TWC service page that currently just describes what's included — they let a visitor self-select fit before reaching out, which reduces unqualified inquiries.

None of this should be treated as a literal visual template to copy. Of the four pages seen, the parent-facing homepage, About page, and Coaching sales letter are weaker analogs (different audience and sales mechanic) while the "For Professionals" page remains the closest match to Katie's own business model. The useful transfer overall is *posture*: real human warmth, one consistent named framework, audience-aware navigation and tone, specific rather than generic CTA copy, transparent specifics where the offer allows it, and a handful of narrow, repeatable hand-crafted details (script headings, a custom divider, an oversized quote glyph, a signature image) rather than heavy decoration.

## Open follow-ups

- The hex values above are estimated by eye from a screenshot, not color-picked from source files — fine for design direction, not fine to hardcode as final tokens without a real sample.
- Course, Community, and Podcast sub-pages, mobile layout, and hover/interaction states still haven't been seen — only Home, For Professionals, About, and the Coaching page, each captured as one full-page screenshot.
- Each new page screenshot so far has corrected something assumed from the page(s) before it (the palette, the "script font is homepage-only" claim, the "no partner logos" note, the "rose is accent-only" note) — worth treating any single-page conclusion in this doc as provisional until more pages are seen.
- Worth confirming directly with Katie: which specific elements of eileendevine.com she responds to — the warmth/photography, the script-heading detail, the methodology branding, the parent-vs-professional nav split, the sage/rose accent pair, or something else not captured here — before treating any of the "what this suggests" section as a committed direction.
- Per the main design doc's own rule: no implementation should proceed from this reference document without explicit sign-off on which specific change to make.
