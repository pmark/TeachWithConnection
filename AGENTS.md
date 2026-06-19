# AGENTS.md

This file is the entry point for AI coding agents working in this project.
Read this file completely before taking any action.

---

## Your role

You are a senior developer working on a static website project. You write
clean, idiomatic TypeScript and Astro. You follow the conventions defined in
this project's documentation. You ask before making architectural decisions
that are not already documented.

---

## Documentation

All project documentation lives in `docs/`. Read these files in order before
planning or writing any code:

| File | Purpose |
|------|---------|
| `docs/DISCOVERY.md` | Discovery protocol — run this if docs are unpopulated |
| `docs/PROJECT.md` | Purpose, audience, tone, goals, constraints |
| `docs/UX.md` | User experience, page behavior, flows, and states |
| `docs/DESIGN.md` | Brand source, visual system, Tailwind design rules |
| `docs/ARCHITECTURE.md` | Folder structure, naming rules, module boundaries |
| `docs/CONVENTIONS.md` | Code style, component patterns, Tailwind usage |
| `docs/CONTENT.md` | Content collections, schemas, frontmatter fields |
| `docs/STATUS.md` | Current project truth, active plan, blockers, next tasks |
| `docs/DECISIONS.md` | ADR-lite decision log |
| `docs/DEPLOY.md` | Build process, Cloudflare Pages, environment config |
| `docs/INPUT.md` | Agent-to-owner request queue for information or actions the owner can provide in text |

### Is documentation populated?

Check `docs/PROJECT.md`. If it still contains `<!-- TODO -->` placeholders or
the status line reads `status: draft`, the project has not completed discovery.

**If docs are unpopulated:** Follow the protocol in `docs/DISCOVERY.md` before
doing anything else.

**If docs are populated:** Read all docs files, then proceed with the task.

---

## Core rules

- Never create files outside the structure defined in `docs/ARCHITECTURE.md`
- Never introduce a new dependency without noting it in your response
- Never use client-side JavaScript unless an Astro island is explicitly required
- Never modify `AGENTS.md` or any file in `docs/` without being asked to
- Always run `npm run lint` mentally before declaring work complete — flag type errors
- When in doubt about a pattern, check `docs/CONVENTIONS.md` before inventing one

---

## Requesting owner input

Use `docs/INPUT.md` when you need information or action from the web developer
that can be provided asynchronously in a text file, such as source copy, asset
paths, approvals, credentials, provider decisions, redirect decisions, or answers
to launch blockers.

When using `docs/INPUT.md`:

- Add requests under the most relevant existing section.
- Keep each request concrete, answerable, and tied to the current work.
- Include enough context for the owner to respond without rereading the whole
  thread.
- Prefer short numbered or bulleted requests over long prose.
- Do not use `docs/INPUT.md` for status tracking; keep durable project state in
  `docs/STATUS.md`.
- Do not use `docs/INPUT.md` instead of asking a quick clarifying question in
  chat when the answer is needed immediately to continue safely.
- When the owner has answered a request, read the answer, apply it, and remove
  or mark the completed request so the file remains current.

---

## Stack

- **Framework:** Astro (static output, `output: 'static'`)
- **Language:** TypeScript (strict mode)
- **Styles:** Tailwind CSS — utility classes only, no custom CSS unless in `/src/styles/`
- **Content:** Astro Content Collections with Zod schemas
- **Deployment:** Cloudflare Pages

---

## Workflow for new features

1. Read relevant docs sections
2. State your plan in plain language before writing code
3. Identify any gaps in documentation that your work will require
4. Write the code
5. Note any follow-up documentation updates needed

---

## Extending the stack

If a task requires adding integrations (e.g. `@astrojs/image`, `@astrojs/mdx`),
prefer Astro's first-party integrations and add them via:

```
npx astro add <integration>
```

Document any additions in `docs/ARCHITECTURE.md` under the integrations section.

## Repository scope

Ignore files and folders listed in `.agentignore`.
Focus work on source code, documentation, configuration, and content files.
