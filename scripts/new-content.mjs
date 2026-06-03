#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const collection = process.argv[2];
const slug = process.argv[3];
if (!collection || !slug) { console.error("Usage: npm run new:content collection slug"); process.exit(1); }
if (!/^[a-z0-9-]+$/.test(collection) || !/^[a-z0-9-]+$/.test(slug)) { console.error("Collection and slug must use lowercase letters, numbers, and hyphens."); process.exit(1); }
const dir = join(process.cwd(), "src", "content", collection);
mkdirSync(dir, { recursive: true });
const file = join(dir, `${slug}.md`);
if (existsSync(file)) { console.error(`Content file already exists: ${file}`); process.exit(1); }
writeFileSync(file, `---
title: "${slug.replaceAll("-", " ")}"
description: ""
---

`);
console.log(`Created src/content/${collection}/${slug}.md`);
