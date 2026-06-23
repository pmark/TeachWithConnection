---
status: active
updated: 2026-06-23
---

# SEO and Legacy Copy Integration Plan

## Purpose

Improve the current site copy so it satisfies both goals:

1. It reads naturally to educators, school leaders, conference planners, and early childhood organizations.
2. It gives each route a clear, defensible SEO job without sounding like keyword stuffing or generic marketing copy.

This plan is intentionally executable by a future coding agent. It should be used alongside:

- `docs/CONTENT.md`
- `docs/CONTENT-INVENTORY.md`
- `docs/reference/legacy-copy/*.yaml`
- `src/content/pages/*.yaml`
- `src/content/settings/site.yaml`
- `src/content/services/*.md`
- `src/content/testimonials/*.md`
- `src/content/proof/*.md`

The current legacy-copy archival files live in `docs/reference/legacy-copy/`, not `src/content/pages/`.

## Guardrails

- Do not edit Astro templates unless a copy key is unused, mislabeled, or routed to the wrong destination.
- Keep editable English copy in content collections:
  - Route copy: `src/content/pages/*.yaml`
  - Shared CTA/footer/interface copy: `src/content/settings/*.yaml`
  - Repeated service cards: `src/content/services/*.md`
  - Testimonials: `src/content/testimonials/*.md`
  - Proof/publication/logo items: `src/content/proof/*.md`
- Preserve verified legacy quotes verbatim.
- Preserve factual claims exactly unless the owner supplies a correction.
- Prefer concrete Katie/source-specific copy over generic phrases.
- Keep SEO terms visible in titles, H1s, introductions, and internal links, but make paragraphs sound like they were written for humans first.
- Do not invent services, guarantees, outcomes, partnerships, awards, testimonials, or credentials.
- Avoid overpromising. This site should imply support, clarity, training, and practical tools, not guaranteed behavior change.

## Target SEO jobs by route

| Route | Primary search intent | Supporting intent |
|---|---|---|
| `/` | Early childhood professional development | early childhood staff training, trauma-responsive professional development, educator workshops, Katie Statman-Weil |
| `/workshops/` | Early childhood educator workshops | trauma-responsive classroom training, neuroaffirming classroom training, early childhood behavior support training |
| `/keynotes/` | Early childhood keynote speaker | early childhood conference speaker, trauma-responsive keynote, neuroaffirming classroom keynote |
| `/consultation/` | Early childhood consultation for schools and centers | preschool behavior consultation, classroom behavior support, teacher consultation |
| `/bookstore/` | Trauma Responsive Strategies for Early Childhood | Katie Statman-Weil book, trauma-responsive early childhood book, NAEYC trauma sensitive classrooms |
| `/about/` | Katie Statman-Weil EdD LCSW | With Connection founder, early childhood trainer, author, consultant |
| `/publications/` | Katie Statman-Weil publications | Trauma Responsive Strategies, Creating Trauma Sensitive Classrooms, NAEYC Gold Excel Award |
| `/resources/` | Early childhood educator resources | trauma-sensitive classrooms PDF, relationship-centered classroom tools |
| `/contact/` | Contact Katie Statman-Weil / With Connection | professional development inquiry, keynote inquiry, consultation inquiry |

## Sitewide copy quality rules

Use more of:

- Direct nouns: workshops, keynotes, consultation, early childhood educators, school leaders, conference planners, teachers, children, classrooms.
- Source-specific proof: `Trauma Responsive Strategies for Early Childhood`, NAEYC, `Creating Trauma Sensitive Classrooms`, Redleaf Press, 2016 Gold Excel Award.
- Concrete educator problems: escalating behavior, dysregulation, educator exhaustion, strained relationships, crisis management, uncertainty about what to try next.
- Legacy phrases that sound specific and human:
  - “teachers feel heard, children feel supported, and relationships can thrive”
  - “real children in real classrooms”
  - “moving beyond crisis management”
  - “connection, safety, and regulation”
  - “clear, compassionate, and practical guidance”

Use less of:

- Repeated generic modifiers: “practical,” “grounded,” “relationship-centered,” “real classroom complexity,” “this work.”
- Speaker-marketing phrases that could describe anyone.
- CTA labels that do not match the destination.
- Placeholder-like resource language such as “Grab Katie’s free article” or “No strings attached.”
- Repeated section titles like “What participants say” if the surrounding page can use something more specific.

## Priority 1: Fix conversion clarity and obvious human-copy misses

### Homepage hero CTA mismatch

Files:

- `src/pages/index.astro`
- `src/content/pages/home.yaml`

Current issue:

- `hero.primaryCta` says “Meet Katie” but links to `/contact/`.
- A visitor expects “Meet Katie” to go to `/about/`, not an inquiry form.

Execution options:

1. If the button should continue linking to `/contact/`, change the label to one of:
   - “Inquire about professional development”
   - “Bring Katie to your organization”
   - “Start an inquiry”
2. If the label should remain “Meet Katie,” change the link to `/about/` and add a separate inquiry CTA nearby.

Preferred direction:

- Use a contact-oriented label in `home.yaml` and keep the link to `/contact/`.

Acceptance criteria:

- The visible CTA label accurately describes the destination.
- The homepage still has a prominent inquiry path above the fold.

### Footer CTA accuracy

Files:

- `src/content/settings/site.yaml`
- `src/components/layout/Footer.astro`

Current issue:

- `footer.consultCta` says “Schedule a Free Consult.”
- This may imply a free consultation is guaranteed or immediately schedulable.

Execution:

- If Katie explicitly offers a free consult, leave it.
- If not, change to “Start an inquiry” or “Inquire about working together.”

Acceptance criteria:

- CTA language matches the actual business process and does not overpromise.

### Homepage free-resource promo

Files:

- `src/content/pages/home.yaml`
- `src/content/resources/trauma-sensitive-classrooms.md`
- `docs/reference/legacy-copy/bookstore-old.yaml`

Current issue:

- “Grab Katie’s free article packed with practical, brain-first strategies…” reads salesy and less source-grounded than the rest of the site.

Execution:

- Rewrite using source-backed language from the NAEYC article/bookstore proof.
- Mention the article title and publication context plainly.
- Avoid “grab,” “no strings attached,” and invented framing like “brain-first” unless owner-approved.

Example direction:

> Read Katie’s NAEYC article, `Creating Trauma Sensitive Classrooms`, with practical guidance for understanding how trauma can shape learning, behavior, safety, and connection in early childhood classrooms.

Acceptance criteria:

- The copy names the article.
- The copy states why it matters.
- The tone matches the rest of the site.

## Priority 2: Strengthen page titles, H1s, and meta descriptions

### General rule

Every core page should have:

- A focused SEO title.
- One clear H1.
- A meta description that names audience, offer, and differentiator.
- Natural language; no comma-stuffed keyword lists.

### Homepage

Files:

- `src/content/pages/home.yaml`

Current issue:

- The homepage targets the right theme, but the hero copy should be more human and Katie-specific.
- `docs/CONTENT.md` says the homepage H1 is “Early Childhood Professional Development Rooted in Connection,” but current `home.yaml` uses “Trauma-Responsive Professional Development For Early Childhood Educators.” Resolve this drift intentionally.

Recommended direction:

- If prioritizing national professional-development search intent, use:
  - SEO title: “Early Childhood Professional Development Rooted in Connection”
  - H1: “Early Childhood Professional Development Rooted in Connection”
- Opening copy should incorporate the legacy offer:
  - Katie offers professional development online and in person.
  - Audience: early childhood educators and organizations.
  - Topics: child development, behavior, trauma, neurodivergence, emotional regulation, play-based strategies.
  - Outcome: teachers feel heard, children feel supported, relationships can thrive.

Acceptance criteria:

- The H1 includes “Early Childhood Professional Development.”
- The paragraph sounds like Katie’s actual offer, not a generic agency description.
- The content remains consistent with `docs/CONTENT.md`.

### Workshops

Files:

- `src/content/pages/workshops.yaml`

Current issue:

- SEO title is only “Workshops.”
- Hero title is clear but generic.

Recommended direction:

- SEO title: “Early Childhood Educator Workshops”
- H1/hero title: “Workshops for Early Childhood Educators”
- Keep the strong legacy problem/need narrative.
- Use the training-topic names as the page’s concrete SEO depth.

Acceptance criteria:

- Title/H1 clearly identify audience and format.
- The page remains readable and does not repeat the same keywords in every section.

### Keynotes

Files:

- `src/content/pages/keynotes.yaml`
- `docs/reference/legacy-copy/keynotes-old.yaml`

Current issue:

- SEO title is only “Keynotes.”
- Hero title “Grounded speaking for early childhood audiences” is human but underspecified.
- The strongest SEO phrase, “early childhood keynote speaker,” is not prominent enough.

Recommended direction:

- SEO title: “Early Childhood Keynote Speaker”
- H1/hero title: “Keynotes for Early Childhood Educators” or “Early Childhood Keynote Speaker for Educator Audiences”
- Keep the legacy keynote overview paragraph because it is specific and human.
- Make the topic titles visible as text, and consider restoring or reusing the old topic graphics only if the redesigned visual system supports them.

Acceptance criteria:

- The page immediately communicates keynote/speaking fit.
- The first screen names early childhood audiences.
- The page does not sound like generic speaker bureau copy.

### Consultation

Files:

- `src/content/pages/consultation.yaml`
- `docs/reference/legacy-copy/consultation-old.yaml`

Current issue:

- SEO title is only “Consultation.”
- Hero title “Support for complex classroom and team challenges” is clear but broad.

Recommended direction:

- SEO title: “Early Childhood Consultation for Schools and Centers”
- H1/hero title: “Consultation for Preschools, Centers, and Teaching Teams”
- Keep the legacy lead “Will anything help this student be less challenging?” as an early human hook.
- Preserve the ten fit indicators.

Acceptance criteria:

- Page title names audience and service.
- The opening still validates the emotional reality of classroom challenges.

### Bookstore

Files:

- `src/content/pages/bookstore.yaml`
- `docs/reference/legacy-copy/bookstore-old.yaml`

Current issue:

- “Books for early childhood educators” is clear but generic.
- The page undersells the specific book title and NAEYC article proof.

Recommended direction:

- SEO title: “Trauma Responsive Strategies for Early Childhood”
- H1/hero title: “Books and Articles by Katie Statman-Weil, EdD, LCSW”
- Lead with the book title and Redleaf Press publication.
- Keep NAEYC article, award, inclusion, and review proof.

Acceptance criteria:

- The specific book title appears prominently in title, H1/near-H1 copy, and body.
- Review quotes remain verbatim.
- NAEYC article proof remains source-backed.

### About

Files:

- `src/content/pages/about.yaml`

Current issue:

- SEO title “About Katie” is too thin for branded search.

Recommended direction:

- SEO title: “About Katie Statman-Weil, EdD, LCSW”
- H1 can remain “Katie Statman-Weil, EdD, LCSW.”
- Meta description should mention With Connection, early childhood professional development, author, clinician, and consultant.

Acceptance criteria:

- Branded search terms are explicit.
- Copy still reads like biography, not a credential list.

## Priority 3: Replace generic repeated sections with concrete, source-specific copy

### Service card descriptions

Files:

- `src/content/services/workshops.md`
- `src/content/services/keynotes.md`
- `src/content/services/consultation.md`
- `src/content/services/resources.md`

Current issue:

- The service card copy is accurate but generic and similar in rhythm.

Execution:

- Rewrite each card to include a concrete audience/problem/offer.
- Pull from relevant legacy page language where available.

Direction by service:

- Workshops: mention specific training topics and teams feeling stuck with behavior escalation.
- Keynotes: mention early childhood conferences, stories from the field, and audiences feeling seen.
- Consultation: mention schools/centers dealing with one child’s escalating needs and educator exhaustion.
- Resources: mention specific resource titles once confirmed, not generic “tools.”

Acceptance criteria:

- Each card can stand alone.
- Cards do not sound interchangeable.
- Cards include natural internal links through their CTAs.

### Repeated “lens” language

Files:

- `src/content/pages/workshops.yaml`
- `src/content/pages/consultation.yaml`
- `src/content/pages/about.yaml`
- `src/content/pages/home.yaml`

Current issue:

- “Connection and safety before compliance,” “behavior as communication,” “regulation as shared adult-child work,” and “neuroaffirming support” recur across multiple pages.

Execution:

- Keep these ideas, but avoid rendering the same four-item list on too many routes.
- On service pages, make the lens specific to that service:
  - Workshops: shared staff language and topic-specific application.
  - Consultation: case-specific support for a child/team/classroom.
  - About: Katie’s broader philosophy.

Acceptance criteria:

- Repetition feels intentional, not templated.
- At least one repeated philosophy block is made route-specific.

## Priority 4: Improve proof and resource copy for SEO and trust

### Publication proof descriptions

Files:

- `src/content/proof/*.md`
- `src/content/pages/publications.yaml`
- `src/content/pages/bookstore.yaml`

Current issue:

- Proof items are factual but terse.

Execution:

- Keep descriptions concise, but include enough context for humans and search:
  - where published
  - year, where available
  - why it matters to early childhood educators

Acceptance criteria:

- Proof descriptions are still factual and not promotional.
- Publication and award names remain exact.

### Resource descriptions

Files:

- `src/content/resources/*.md`
- `src/content/pages/resources.yaml`
- `src/content/pages/home.yaml`

Current issue:

- Resource copy is useful but may not yet be fully source-backed.
- Homepage resource promo should align with the actual resource detail page.

Execution:

- Confirm each resource file exists and is approved.
- Use resource descriptions that name the classroom problem and the practical use.
- Avoid claiming a resource is “free” in every mention; say it once where helpful.

Acceptance criteria:

- Resource listing, resource detail, and homepage promo agree.
- Resource descriptions include likely search terms naturally.

## Priority 5: CTA language cleanup

Review every CTA for two questions:

1. Does the label accurately describe where the link goes?
2. Does the label match the visitor’s likely intent at that moment?

Files to inspect:

- `src/content/pages/home.yaml`
- `src/content/pages/workshops.yaml`
- `src/content/pages/keynotes.yaml`
- `src/content/pages/consultation.yaml`
- `src/content/pages/bookstore.yaml`
- `src/content/pages/about.yaml`
- `src/content/pages/contact.yaml`
- `src/content/settings/site.yaml`
- `src/content/services/*.md`
- `src/components/common/InquiryCta.astro`

Preferred CTA patterns:

- “Inquire about professional development”
- “Bring Katie to your organization”
- “Ask about a keynote”
- “Inquire about consultation”
- “View workshop topics”
- “Read the article”
- “View the book at Redleaf Press”

Avoid unless explicitly accurate:

- “Schedule”
- “Free consult”
- “Get”
- “Grab”
- “Learn more” when a more specific verb is available.

## Suggested execution sequence

### Step 1: Baseline audit

Run:

```sh
git status --short
pnpm content:audit
```

Do not proceed if there are unexpected unrelated user changes in files you need to edit. Work around them or ask the owner.

### Step 2: Update high-impact YAML copy

Edit in this order:

1. `src/content/pages/home.yaml`
2. `src/content/pages/keynotes.yaml`
3. `src/content/pages/workshops.yaml`
4. `src/content/pages/consultation.yaml`
5. `src/content/pages/bookstore.yaml`
6. `src/content/pages/about.yaml`
7. `src/content/settings/site.yaml`

Keep edits narrow. Do not restructure templates during this pass unless a CTA destination mismatch requires it.

### Step 3: Update reusable collection descriptions

Edit:

1. `src/content/services/*.md`
2. `src/content/resources/*.md`
3. `src/content/proof/*.md` only if the current proof descriptions are too terse for the rendered page.

Do not edit testimonials except to fix attribution metadata; quote text must remain verbatim.

### Step 4: Check rendered semantics

Review the generated or dev-rendered pages for:

- One clear H1 per route.
- Page title and H1 alignment.
- No CTA/destination mismatch.
- No repeated block that makes adjacent pages feel templated.
- Specific proof appearing close to claims.
- Natural reading flow on mobile.

### Step 5: Verification

Run:

```sh
pnpm content:audit
pnpm lint
pnpm build
```

If templates were touched, also manually inspect at minimum:

- `/`
- `/workshops/`
- `/keynotes/`
- `/consultation/`
- `/bookstore/`
- `/contact/`

## Acceptance criteria for the full plan

The plan is complete when:

- Core route titles are specific enough to identify service + audience.
- Homepage owns “early childhood professional development” without sounding like a doorway page.
- Keynotes page visibly targets early childhood keynote/speaking intent.
- Workshops page visibly targets early childhood educator workshop/training intent.
- Consultation page visibly targets early childhood consultation/school/center/team intent.
- Bookstore page visibly targets Katie’s book title and publication proof.
- Old copy, testimonials, publication language, and proof are reused wherever they are stronger than current generic copy.
- New copy reads like Katie/With Connection, not a generic consultant website.
- CTA labels match their destinations.
- `pnpm content:audit`, `pnpm lint`, and `pnpm build` pass.

## Known cautions

- The site is actively being redesigned. Prefer content edits that survive layout changes: page YAML, settings YAML, service Markdown, resource Markdown, proof Markdown.
- Do not assume the current visual information architecture is final.
- Routes and navigation are expected to remain stable.
- If a future redesign changes section order, migrate copy by route purpose and visitor intent, not by old section order.
- Keep `docs/reference/legacy-copy/*.yaml` as archival source records; do not rewrite them during implementation.
