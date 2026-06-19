---
status: complete
updated: 2026-06-19
---

# Content

## Content model

Launch content should be built around one clear business path: a visitor learns what Katie offers, sees credible proof, understands her approach, and submits an inquiry form.

Primary launch content types:

- Core marketing pages.
- Service/offer pages.
- Free resources.
- Thought leadership posts.
- Testimonials.
- Proof items such as publications, awards, credentials, client/partner logos, and speaking/training appearances.
- Contact and inquiry content.
- Legal and utility pages as needed.

Existing With Connection content is the launch source of truth. Educator-facing content from the current site should be prioritized over therapy-service content, though therapy content may inform the about page, tone, and credibility.

## Launch pages

Required launch pages:

- Home: the sole professional-development hub, with educator-facing positioning, audience fit, formats, differentiators, proof, service links, resources preview, and inquiry CTA.
- Workshops: specific workshop topics and training formats.
- Keynotes: keynote positioning, audience fit, sample topics, testimonials, and inquiry CTA.
- Consultation: school/center/team consultation offer for challenging classroom behavior and complex student needs.
- About Katie: biography, credentials, philosophy, publications, educator/clinician background, and With Connection story.
- Resources: ungated downloads and practical tools.
- Articles: selected thought leadership from the existing With Connection blog where relevant to early childhood education, trauma, behavior, regulation, parenting, and relationships.
- Publications: book, NAEYC article, article award, and related links.
- Bookstore: Katie's source-backed books for educators, publisher links, and a related professional-development CTA. TeachWithConnection.com is canonical for duplicated educator bookstore pages.
- Contact / Inquiry: form-first inquiry path.
- Privacy, disclaimer, and terms pages if needed for launch or carried over from the existing site.

Nice-to-have later:

- Events or appearances archive.
- Case studies or impact stories.
- Dedicated topic landing pages for trauma-responsive classrooms, neuroaffirming classrooms, classroom regulation, behavior support, and early childhood professional development.
- Speaking media page if video or audio becomes available.

## Service content

Professional development is the lead offer. Copy should emphasize practical, relationship-centered trainings for educators who want support with child development, behavior, trauma, neurodivergence, emotional regulation, and play-based strategies.

Workshop topics available from existing content include:

- Working with children who have experienced trauma.
- Understanding and responding to behavior.
- Understanding neurodivergence and creating neuroaffirming classrooms.
- Understanding Pervasive Drive for Autonomy (PDA) in the classroom.
- The classroom environment as a regulator.
- Supporting children who have been adopted or experienced foster care.

Keynotes should emphasize Katie's ability to speak to early childhood educators' lived classroom experience, use stories from the field, help audiences feel seen, and leave them with practical ideas.

Consultation should focus on schools, centers, teachers, and administrators facing escalating behavior, educator exhaustion, strained relationships, classroom dysregulation, and the need for sustainable relational strategies.

## Content collections

Use Astro Content Collections where repeated content will benefit from typed frontmatter and predictable rendering.

Recommended collections:

- `pages`: one YAML entry per fixed route/template, including SEO and named section copy.
- `settings`: shared brand, navigation, footer, CTA, form, validation, and template-state copy.
- `resources`: free downloadable resources.
- `articles`: thought leadership posts migrated or adapted from the With Connection blog.
- `testimonials`: participant and client quotes.
- `proof`: publications, awards, logos, credentials, and appearances.
- `services`: service metadata if service pages share reusable fields.

Static pages remain fixed `.astro` templates, but editable copy does not live in their markup. Use semantic YAML keys such as `home.professionalDevelopment.outcomes` and retrieve them through `src/data/content.ts`.

## Voice and tone

Voice should be warm, clear, grounded, and direct. It should respect the emotional labor of educators while still giving leaders confidence that Katie can help.

Use language patterns like:

- "real children in real classrooms"
- "connection, safety, and regulation"
- "behavior as communication"
- "moving beyond crisis management"
- "relational, trauma-responsive, and neuroaffirming"
- "teachers feel heard, children feel supported, and relationships can thrive"

Avoid:

- Blaming educators, children, families, or systems.
- Overpromising outcomes.
- Framing behavior support around compliance or control.
- Dense clinical language without practical explanation.
- Generic speaker-marketing language.

## SEO

Primary SEO themes:

- Early childhood professional development.
- Early childhood educator workshops.
- Early childhood keynote speaker.
- Trauma-responsive classrooms.
- Trauma-informed early childhood education.
- Neuroaffirming classrooms.
- Preschool behavior consultation.
- Classroom regulation strategies.
- Attachment-informed teaching.
- Early childhood behavior support.

Each core page should have:

- One focused page title.
- A plain-language meta description.
- One clear H1.
- Internal links to inquiry.
- Internal links between services, resources, articles, and proof.

The homepage H1 is “Early Childhood Professional Development Rooted in Connection.” Its title, description, opening copy, and substantive offer section should use the target phrase naturally while orienting visitors who do not already know Katie. There is no separate professional-development route or doorway page.

The site should use Katie's name, With Connection, EdD, LCSW, book title, and publication credentials consistently for branded search.

## Assets

Reusable assets should come from the existing With Connection site or owner-supplied files.

Known asset categories:

- With Connection logo.
- Existing favicon.
- Katie/With Connection photography.
- Professional development slide or presentation imagery from the existing site.
- Book cover and book photography for *Trauma Responsive Strategies for Early Childhood*.
- Article imagery for NAEYC publication references.
- Partner/client logo imagery currently visible on the existing site, including University of Michigan.
- Social icons/links for Facebook and Instagram.
- PDFs or downloadable resource files supplied by the owner.

All image reuse should preserve accessibility with descriptive alt text. Decorative images should use empty alt text only when they add no content.

## Testimonials

Known testimonial language from the existing site includes quotes from workshop, course, keynote, and consultation participants. Use only attributed labels available from source content, such as "Workshop participant," "Participant," "Course participant," and "Teacher," unless the owner supplies fuller names or organizations.

Testimonials should be placed near relevant offers and on the homepage. They should not be edited in a way that changes meaning.

## Free resources

Resources are ungated and should be easy to download or view. They should support educators directly and help leaders see the value of bringing Katie to their organization.

Each resource should have:

- Title.
- Short description.
- Topic tags.
- Audience.
- File path or URL.
- Optional related service CTA.

Resource pages should include a direct inquiry CTA but no email signup requirement.

## Ownership and editing

The developer or repository-aware editor changes English copy in `src/content/pages/*.yaml` and `src/content/settings/*.yaml`. Articles, resources, testimonials, services, and proof remain separate Markdown collection entries. Do not rename semantic keys without updating their template references.

Before publishing content changes, run:

```sh
pnpm content:audit
pnpm lint
pnpm build
```

The complete placeholder audit and owner dependencies are tracked in `docs/CONTENT-INVENTORY.md`. English is the only locale; the separation exists for maintainability rather than runtime localization.

The owner/developer will maintain content after launch. Updates are expected to be frequent during launch refinement, then less frequent over time.

Content should therefore be simple to edit in Markdown or MDX-style content files where possible. Avoid complicated content abstractions unless they reduce repeated manual work or protect important fields.
