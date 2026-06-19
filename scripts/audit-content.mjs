import { readFile, readdir } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const requiredPages = [
  "about", "article-detail", "articles", "bookstore", "consultation", "contact",
  "disclaimer", "home", "keynotes", "privacy", "publications", "resource-detail",
  "resources", "terms", "workshops",
];
const requiredSettings = ["interface", "site"];
const failures = [];

for (const id of requiredPages) {
  try { await readFile(new URL(`src/content/pages/${id}.yaml`, root)); }
  catch { failures.push(`Missing page content entry: ${id}`); }
}
for (const id of requiredSettings) {
  try { await readFile(new URL(`src/content/settings/${id}.yaml`, root)); }
  catch { failures.push(`Missing settings content entry: ${id}`); }
}

async function filesUnder(relative, extension) {
  const directory = new URL(relative, root);
  const names = await readdir(directory, { recursive: true });
  return names.filter((name) => name.endsWith(extension)).map((name) => new URL(name, directory));
}

const placeholderPattern = /\b(source-backed|static build|belongs? here|details are pending|should be (migrated|supplied|completed)|have not been supplied)\b/i;
for (const file of [...await filesUnder("src/pages/", ".astro"), ...await filesUnder("src/components/", ".astro")]) {
  const source = await readFile(file, "utf8");
  const relative = file.pathname.slice(root.pathname.length);
  for (const [index, line] of source.split("\n").entries()) {
    if (placeholderPattern.test(line)) failures.push(`${relative}:${index + 1}: placeholder/editorial language`);
  }

  const markup = source
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/<script\b[\s\S]*?<\/script>/g, "");
  const literalProp = /\b(?:title|description|eyebrow|aria-label)="[A-Za-z][^"]*"/g;
  for (const match of markup.matchAll(literalProp)) failures.push(`${relative}: literal editable prop: ${match[0]}`);
  for (const [index, line] of markup.split("\n").entries()) {
    const trimmed = line.trim();
    if (/^[A-Z][^<{}`]*[A-Za-z.!?]$/.test(trimmed)) {
      failures.push(`${relative}:${index + 1}: literal text node: ${trimmed}`);
    }
  }
}

const inventory = await readFile(new URL("docs/CONTENT-INVENTORY.md", root), "utf8").catch(() => "");
if (!inventory) failures.push("Missing docs/CONTENT-INVENTORY.md");
if (/\|\s*untracked\s*\|/i.test(inventory)) failures.push("Content inventory contains untracked items");

if (failures.length) {
  console.error(`Content audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Content audit passed: ${requiredPages.length} page entries, ${requiredSettings.length} settings entries, and no embedded placeholder copy.`);
}
