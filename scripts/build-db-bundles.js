/**
 * Merges assets/db/poems/*.json and assets/db/summaries/*.json into single
 * minified bundle files to reduce APK size (fewer files, better zip compression).
 * Run: node scripts/build-db-bundles.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DB = path.join(ROOT, 'assets', 'db');
const POEMS_DIR = path.join(DB, 'poems');
const SUMMARIES_DIR = path.join(DB, 'summaries');

// Poems: each file is an array of verses; key by filename (id)
const poemsBundle = {};
const poemFiles = fs.readdirSync(POEMS_DIR).filter((f) => f.endsWith('.json'));
for (const file of poemFiles) {
  const id = file.replace(/\.json$/, '');
  const content = JSON.parse(fs.readFileSync(path.join(POEMS_DIR, file), 'utf8'));
  poemsBundle[id] = content;
}
fs.writeFileSync(
  path.join(DB, 'poems.bundle.json'),
  JSON.stringify(poemsBundle),
  'utf8'
);
console.log(`Wrote poems.bundle.json (${poemFiles.length} poems)`);

// Summaries: each file is { id, title, url, summaries }; key by id, value = summaries array
const summariesBundle = {};
const summaryFiles = fs.readdirSync(SUMMARIES_DIR).filter((f) => f.endsWith('.json'));
for (const file of summaryFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(SUMMARIES_DIR, file), 'utf8'));
  const id = String(content.id ?? file.replace(/\.json$/, ''));
  summariesBundle[id] = content.summaries ?? [];
}
fs.writeFileSync(
  path.join(DB, 'summaries.bundle.json'),
  JSON.stringify(summariesBundle),
  'utf8'
);
console.log(`Wrote summaries.bundle.json (${summaryFiles.length} summaries)`);
