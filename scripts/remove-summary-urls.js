/**
 * Removes the top-level "url" property from every JSON file in summaries.
 * Run: node scripts/remove-summary-urls.js
 */
const fs = require('fs');
const path = require('path');

const summariesDir = path.join(__dirname, '..', 'assets', 'db', 'summaries');
const summaryFiles = fs
  .readdirSync(summariesDir)
  .filter((file) => file.endsWith('.json'));

let updatedFiles = 0;

for (const file of summaryFiles) {
  const filePath = path.join(summariesDir, file);
  const source = fs.readFileSync(filePath, 'utf8');
  const summary = JSON.parse(source);

  if (!Object.hasOwn(summary, 'url')) {
    continue;
  }

  delete summary.url;
  const trailingNewline = source.endsWith('\r\n')
    ? '\r\n'
    : source.endsWith('\n')
      ? '\n'
      : '';
  fs.writeFileSync(
    filePath,
    `${JSON.stringify(summary, null, 2)}${trailingNewline}`,
    'utf8'
  );
  updatedFiles += 1;
}

console.log(
  `Removed "url" from ${updatedFiles} of ${summaryFiles.length} summary files.`
);
