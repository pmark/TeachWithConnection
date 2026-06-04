---
status: complete
updated: 2026-06-04
---

# UX

## Information hierarchy

The site should make the hiring path obvious without making the experience feel sales-driven.

Primary hierarchy:

1. Katie Statman-Weil and With Connection positioning.
2. Professional development workshops and staff trainings.
3. Keynotes.
4. Consultation.
5. Proof: credentials, publications, testimonials, awards, and source-backed partner/client signals.
6. Free resources and articles.
7. Inquiry form.

The homepage should quickly answer:

- Who is this for?
- What can Katie bring to an organization?
- Why is she credible?
- What should a leader do next?

Service pages should prioritize clarity over volume. Visitors should understand audience fit, topics, format, likely outcomes, and how to inquire without having to read every page.

## Page list

Launch pages:

- `/`: Positioning, primary offers, proof, resources preview, and inquiry CTA.
- `/professional-development/`: Lead offer page for schools, districts, centers, and organizations.
- `/workshops/`: Workshop topics, format options, and training themes.
- `/keynotes/`: Speaking fit, keynote themes, audience experience, proof, and inquiry CTA.
- `/consultation/`: Consultation for centers, schools, teams, directors, and classroom challenges.
- `/about/`: Katie biography, credentials, philosophy, publications, and With Connection story.
- `/resources/`: Ungated resource listing.
- `/resources/[slug]/`: Resource detail page with direct file access and related service CTA.
- `/articles/`: Selected thought leadership listing.
- `/articles/[slug]/`: Article detail page.
- `/publications/`: Book, NAEYC article, award, and related publication proof.
- `/contact/`: Form-first inquiry path.
- `/privacy/`: Privacy information once form provider and analytics choices are known.
- `/disclaimer/`: Professional and educational disclaimer if carried over or required.
- `/terms/`: Terms page if carried over or required.

Future pages may include events, topic landing pages, case studies, and a speaking media page if the owner supplies enough material.

## Navigation model

Primary navigation should be simple and service-led:

- Professional Development.
- Workshops.
- Keynotes.
- Consultation.
- About.
- Resources.
- Contact.

The header should include a clear inquiry CTA. On small screens, navigation should collapse into a simple accessible menu only if needed; avoid adding client-side JavaScript unless the mobile navigation genuinely requires an Astro island and that decision is documented.

Footer navigation should include the same core routes plus legal pages, publications, articles, social links, and source attribution where needed.

Use internal links to keep the visitor moving naturally:

- Homepage service previews link to service pages.
- Service pages link to related resources and contact.
- Resource and article pages link back to relevant services.
- About and publications pages link to inquiry after credibility sections.

## Primary visitor flows

### Organization Leader Hiring Katie

1. Visitor lands on homepage or a service page.
2. Visitor sees educator-facing positioning and service fit.
3. Visitor scans proof: credentials, book, article, testimonials, and partner/client signals.
4. Visitor opens a relevant service page.
5. Visitor submits an inquiry through `/contact/`.

This flow should always have a visible next step, but the CTA language should stay calm and professional.

### Conference Planner Evaluating a Keynote

1. Visitor lands on `/keynotes/` or homepage.
2. Visitor reviews audience fit, possible topics, and Katie's credibility.
3. Visitor sees testimonials or speaking proof.
4. Visitor submits an inquiry with event timeline and audience size.

The keynote path should make it easy to understand Katie's voice and subject matter without turning into a generic speaker page.

### Director Seeking Consultation

1. Visitor lands on `/consultation/` or reaches it from the homepage.
2. Visitor recognizes classroom behavior, educator exhaustion, dysregulation, or relational strain.
3. Visitor sees that consultation is practical and non-blaming.
4. Visitor submits an inquiry or reads a relevant resource first.

The consultation path should validate complexity without implying a quick fix or guaranteed outcome.

## Secondary flows

### Educator Reading or Downloading a Resource

1. Visitor lands on `/resources/`, an article, or a resource detail page.
2. Visitor accesses the resource directly without an email gate.
3. Visitor sees related services or a gentle CTA to bring the work to a team.

Resource pages should be useful on their own. CTAs should support the resource rather than interrupt it.

### Visitor Researching Katie

1. Visitor opens `/about/` or `/publications/`.
2. Visitor sees credentials, experience, publication proof, and philosophy.
3. Visitor follows links to service pages or contact.

The biography path should integrate educator, clinician, author, and consultant experience without shifting the site toward therapy services.

### Returning Visitor

Returning visitors should be able to find contact, service details, and downloadable resources quickly. Navigation labels should stay literal and predictable.

## Critical UX rules

- The inquiry form is the primary conversion surface.
- Free resources must never require email signup.
- Use one clear H1 per page.
- Keep service pages scan-friendly with sections, lists, quotes, and concrete topic groupings.
- Keep CTAs specific: "Inquire about professional development," "Bring this workshop to your team," or "Ask about a keynote."
- Avoid exaggerated promises, urgency tactics, popups, countdowns, and intrusive lead capture.
- Make proof visible early, but do not overstate source material.
- Keep external links to book, publication, and social pages clearly labeled.
- Make downloadable resources accessible by direct link.
- Ensure contact information and inquiry path are reachable from every core page.

## Empty, error, and loading states

The site is static, so most pages should not need loading states.

Resource listings:

- If no resources are published, show a short statement that resources are being prepared and route visitors to relevant articles or inquiry.
- If a resource has no downloadable file yet, do not display a fake download action.

Article listings:

- If no articles are published, route visitors to resources, publications, and inquiry.

Inquiry form:

- Until a provider is chosen, form markup may be scaffolded but should not imply submissions work.
- Once a provider is selected, include an accessible success state, validation errors, and a delivery failure state.
- Required fields should be limited to essential contact and inquiry details.

Images:

- Missing images should not break layout or leave unlabeled visual gaps.
- Use source-backed alt text for meaningful images and empty alt text for decorative images.

## Sharing and conversion behavior

Every core page should have:

- A unique title and meta description.
- A primary CTA to inquiry where appropriate.
- Secondary internal links to related services, resources, articles, or proof.
- Shareable URLs with stable lowercase kebab-case routes.

Conversion behavior should be measured only after an analytics provider is approved. If analytics are added later, track inquiry submissions, resource downloads, contact page visits, and outbound book/publication links in a privacy-conscious way.
