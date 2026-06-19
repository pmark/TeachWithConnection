#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const name = process.argv[2];
if (!name) { console.error("Usage: pnpm new:component ComponentName"); process.exit(1); }
if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) { console.error("Component name must be PascalCase."); process.exit(1); }
const dir = join(process.cwd(), "src", "components");
mkdirSync(dir, { recursive: true });
const file = join(dir, `${name}.astro`);
if (existsSync(file)) { console.error(`Component already exists: ${file}`); process.exit(1); }
writeFileSync(file, `---
---

<section>
  <!-- ${name} -->
</section>
`);
console.log(`Created src/components/${name}.astro`);
