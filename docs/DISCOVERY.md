# Discovery Protocol

**Read this file if `docs/PROJECT.md` has not been populated.**

This protocol guides you through a structured discovery process that results
in a complete, accurate project documentation set before any code is written.
Follow each phase in order. Do not skip phases or merge them.

---

## Purpose of discovery

Documentation written before development makes the difference between an agent
that builds the right thing and one that builds confidently in the wrong
direction. Your goal is to understand this project deeply enough that every
subsequent decision — architecture, component design, content model, tone —
follows logically from what you learn here.

Discovery is not a form-filling exercise. It is an interview and an analysis.
Bring your full reasoning capability to it.

---

## Phase 1: Orient

Before asking anything, gather all available context from the project as it
exists right now.

- Read every file currently in `docs/` — note what is present and what is absent
- Read `package.json` — note the project name and any dependencies already added
- Read `astro.config.ts` — note any integrations already configured
- Scan `src/` — note any existing pages, components, or content
- Check for any `README.md`, `notes.txt`, or other loose text files at the root

Synthesize what you have found. Form initial hypotheses about the project's
nature and purpose. Identify the gaps that discovery must fill.

---

## Phase 2: Investigate

Conduct a focused interview with the project owner. Your goal is clarity, not
comprehensiveness for its own sake. Ask the most important questions first.

Group your questions into no more than three focused exchanges. Do not present
a wall of questions at once — ask the highest-priority questions first, wait
for answers, then ask follow-ups based on what you learn.

### Minimum required answers before proceeding

You must have clear answers to all of the following before writing any doc:

**Project identity**
- What is this website for? (One clear sentence.)
- Who is the primary audience? Be specific — not "general public" but who exactly.
- What is the single most important thing a visitor should do or understand?

**Content and structure**
- What types of content will this site have? (Pages, blog posts, event listings, releases, portfolio items, etc.)
- Are there any content types that must exist at launch vs. nice-to-have later?
- Is there existing content (copy, images, data) that needs to be migrated or referenced?

**Design and tone**
- How should this site feel? Ask for three adjectives or reference sites if helpful.
- Are there branding elements already defined? (Colors, fonts, logo, etc.)
- What should the site explicitly *not* feel like?

**Constraints and concerns**
- Are there any technical constraints not already implied by the stack?
- Are there deadlines, phases, or milestones to be aware of?
- Are there any known risks or things the owner is uncertain about?

**Operational concerns**
- Who will update content after launch — a developer or a non-technical owner?
- How frequently will content change?

### Optional but high-value

Ask these if the answers to the required questions suggest they are relevant:

- SEO and discoverability requirements
- Accessibility requirements beyond standard best practices
- Third-party integrations (analytics, forms, mailing lists, etc.)
- Multi-language or localization needs

---

## Phase 3: Synthesize

Before writing any documentation, pause and synthesize.

State your understanding of the project in 3–5 sentences. Present this to the
project owner and ask: *"Is this accurate? What have I missed or misunderstood?"*

Do not proceed until this synthesis is confirmed.

---

## Phase 4: Populate docs

Write each documentation file using the confirmed understanding from Phase 3.
Write complete, specific content — not restatements of the template headers.

Work through the files in this order:

1. `docs/PROJECT.md` — foundation; everything else derives from this
2. `docs/CONTENT.md` — content model follows directly from project purpose
3. `docs/ARCHITECTURE.md` — structure follows from content model
4. `docs/CONVENTIONS.md` — conventions follow from architecture decisions
5. `docs/DEPLOY.md` — deployment details; fill in what is known, flag unknowns

For each file:
- Remove all `<!-- TODO -->` placeholders as you fill them in
- Change `status: draft` to `status: complete` when a file is fully populated
- Be specific. Vague documentation is nearly as bad as no documentation.

---

## Phase 5: Confirm and close

When all five doc files are populated and status lines read `complete`:

1. Present a brief summary of what was documented
2. List any open questions or flagged unknowns that remain
3. Ask whether the owner wants to resolve any open questions before development begins
4. Confirm the first development task when documentation is accepted

---

## Discovery is complete when

- `docs/PROJECT.md` status is `complete`
- `docs/CONTENT.md` status is `complete`
- `docs/ARCHITECTURE.md` status is `complete`
- `docs/CONVENTIONS.md` status is `complete`
- `docs/DEPLOY.md` status is `complete` or flagged unknowns are explicitly accepted
- The owner has confirmed the Phase 3 synthesis

Only then should development begin.
