// Regenerates keystatic/page-keys.json from the current pages/settings YAML
// files. keystatic.config.ts is bundled for both the server and the browser
// (Keystatic's form UI runs client-side), so it can't read files at runtime
// via node:fs the way a Node-only script could. This script does that
// filesystem read once, ahead of time, and writes a plain JSON manifest of
// each page's copy.strings/lists/cards *keys* (not values) that
// keystatic/copy-fields.ts imports safely in both environments.
//
// Re-run this (`pnpm keystatic:sync-fields`) after adding a new copy key to
// an Astro page template, so the admin UI picks up the new field.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { parse } from "yaml";

function keysFor(dir) {
  const result = {};
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".yaml")) continue;
    const name = file.replace(/\.yaml$/, "");
    const raw = parse(readFileSync(`${dir}/${file}`, "utf8"));
    const copy = raw?.copy ?? {};
    result[name] = {
      strings: Object.keys(copy.strings ?? {}),
      lists: Object.keys(copy.lists ?? {}),
      cards: Object.keys(copy.cards ?? {}),
    };
  }
  return result;
}

const manifest = {
  pages: keysFor("src/content/pages"),
  settings: keysFor("src/content/settings"),
};

writeFileSync("keystatic/page-keys.json", JSON.stringify(manifest, null, 2) + "\n");
console.log("Wrote keystatic/page-keys.json");
