/**
 * Compacts poem / summary JSON for smaller Metro bundles:
 * - poems/*.json: [{poem_id,vorder,position,text}, ...] → ["text", ...]
 * - summaries/*.json: {id,title,summaries:[...]} → ["...", ...]
 *
 * Safety:
 * 1. Full backup of poems/ + summaries/ before any writes
 * 2. Validate every file (including reconstructibility of vorder/position)
 * 3. Write to staging, then swap into place
 * 4. On any failure: restore from backup and exit non-zero
 *
 * Run:  node scripts/compact-db-json.js
 * Undo: node scripts/restore-db-json.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const DB = path.join(ROOT, 'assets', 'db');
const POEMS_DIR = path.join(DB, 'poems');
const SUMMARIES_DIR = path.join(DB, 'summaries');
const BACKUPS_DIR = path.join(DB, '_backups');

function listJson(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort();
}

function sha256File(filePath) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(from, to);
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to);
    }
  }
}

function removeDirRecursive(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

/** Windows-safe: rename when possible, otherwise copy + remove. */
function replaceDir(srcDir, destDir) {
  const backupName = `${destDir}.replace-backup-${process.pid}`;
  try {
    if (fs.existsSync(destDir)) {
      removeDirRecursive(backupName);
      fs.renameSync(destDir, backupName);
    }
    fs.renameSync(srcDir, destDir);
    if (fs.existsSync(backupName)) removeDirRecursive(backupName);
    return;
  } catch (renameErr) {
    // Fall back to copy-over for EPERM / locked dirs on Windows.
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    // Clear dest files but keep the directory handle stable.
    for (const name of fs.readdirSync(destDir)) {
      removeDirRecursive(path.join(destDir, name));
    }
    copyDirRecursive(srcDir, destDir);
    removeDirRecursive(srcDir);
    if (fs.existsSync(backupName)) {
      try {
        removeDirRecursive(backupName);
      } catch (_) {
        /* ignore */
      }
    }
    if (renameErr && renameErr.code) {
      console.warn(
        `rename swap failed (${renameErr.code}); used copy fallback for ${path.basename(destDir)}`
      );
    }
  }
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

/**
 * @returns {{ alreadyCompact: boolean, texts: string[], verseCount: number }}
 */
function compactPoem(data, fileName) {
  if (isStringArray(data)) {
    return { alreadyCompact: true, texts: data, verseCount: data.length };
  }

  if (!Array.isArray(data)) {
    throw new Error(`${fileName}: expected array of verses`);
  }

  for (let i = 0; i < data.length; i++) {
    const v = data[i];
    if (!v || typeof v !== 'object' || typeof v.text !== 'string') {
      throw new Error(`${fileName}: verse[${i}] missing string "text"`);
    }
    if (typeof v.vorder !== 'number') {
      throw new Error(`${fileName}: verse[${i}] missing numeric "vorder"`);
    }
  }

  const sorted = [...data].sort((a, b) => a.vorder - b.vorder);

  for (let i = 0; i < sorted.length; i++) {
    const v = sorted[i];
    const expectedVorder = i + 1;

    if (v.vorder !== expectedVorder) {
      throw new Error(
        `${fileName}: after sort, vorder at index ${i} is ${v.vorder}, expected ${expectedVorder} (cannot safely drop vorder)`
      );
    }
    // position is unused at runtime (couplets pair by array index). Odd
    // values (e.g. prose notes) are dropped on purpose; loader reconstructs i%2.
  }

  return {
    alreadyCompact: false,
    texts: sorted.map((v) => v.text),
    verseCount: sorted.length,
  };
}

/**
 * @returns {{ alreadyCompact: boolean, texts: string[], summaryCount: number }}
 */
function compactSummary(data, fileName) {
  if (isStringArray(data)) {
    return { alreadyCompact: true, texts: data, summaryCount: data.length };
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(`${fileName}: expected object with "summaries" array`);
  }

  if (!Array.isArray(data.summaries)) {
    throw new Error(`${fileName}: missing "summaries" array`);
  }

  for (let i = 0; i < data.summaries.length; i++) {
    if (typeof data.summaries[i] !== 'string') {
      throw new Error(`${fileName}: summaries[${i}] is not a string`);
    }
  }

  return {
    alreadyCompact: false,
    texts: data.summaries,
    summaryCount: data.summaries.length,
  };
}

function writeJsonAtomic(filePath, value) {
  const tmpPath = `${filePath}.tmp`;
  fs.writeFileSync(tmpPath, `${JSON.stringify(value)}\n`, 'utf8');
  fs.renameSync(tmpPath, filePath);
}

function createBackup() {
  const stamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .replace(/Z$/, '');
  const backupRoot = path.join(BACKUPS_DIR, `compact-${stamp}`);
  const poemsBackup = path.join(backupRoot, 'poems');
  const summariesBackup = path.join(backupRoot, 'summaries');

  fs.mkdirSync(backupRoot, { recursive: true });
  copyDirRecursive(POEMS_DIR, poemsBackup);
  copyDirRecursive(SUMMARIES_DIR, summariesBackup);

  const poemFiles = listJson(poemsBackup);
  const summaryFiles = listJson(summariesBackup);

  const manifest = {
    createdAt: new Date().toISOString(),
    purpose: 'pre-compact-db-json backup',
    poems: {
      count: poemFiles.length,
      files: poemFiles.map((f) => ({
        file: f,
        sha256: sha256File(path.join(poemsBackup, f)),
        bytes: fs.statSync(path.join(poemsBackup, f)).size,
      })),
    },
    summaries: {
      count: summaryFiles.length,
      files: summaryFiles.map((f) => ({
        file: f,
        sha256: sha256File(path.join(summariesBackup, f)),
        bytes: fs.statSync(path.join(summariesBackup, f)).size,
      })),
    },
  };

  fs.writeFileSync(
    path.join(backupRoot, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(BACKUPS_DIR, 'LATEST'),
    `${path.basename(backupRoot)}\n`,
    'utf8'
  );

  return backupRoot;
}

function restoreFromBackup(backupRoot) {
  const poemsBackup = path.join(backupRoot, 'poems');
  const summariesBackup = path.join(backupRoot, 'summaries');

  if (!fs.existsSync(poemsBackup) || !fs.existsSync(summariesBackup)) {
    throw new Error(`Backup incomplete: ${backupRoot}`);
  }

  // Stage restore first, then swap (Windows-safe replaceDir).
  const poemsStaging = `${POEMS_DIR}.restore-staging`;
  const summariesStaging = `${SUMMARIES_DIR}.restore-staging`;

  removeDirRecursive(poemsStaging);
  removeDirRecursive(summariesStaging);
  copyDirRecursive(poemsBackup, poemsStaging);
  copyDirRecursive(summariesBackup, summariesStaging);

  replaceDir(poemsStaging, POEMS_DIR);
  replaceDir(summariesStaging, SUMMARIES_DIR);
}

function processKind({ label, srcDir, stagingDir, compactFn }) {
  const files = listJson(srcDir);
  let converted = 0;
  let skipped = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;
  const errors = [];

  fs.mkdirSync(stagingDir, { recursive: true });

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(stagingDir, file);
    bytesBefore += fs.statSync(srcPath).size;

    try {
      const raw = fs.readFileSync(srcPath, 'utf8');
      const data = JSON.parse(raw);
      const result = compactFn(data, file);
      writeJsonAtomic(destPath, result.texts);
      bytesAfter += fs.statSync(destPath).size;

      // Round-trip check: staged file must parse as string[] of same length/content
      const written = JSON.parse(fs.readFileSync(destPath, 'utf8'));
      if (!isStringArray(written)) {
        throw new Error(`${file}: staged output is not a string array`);
      }
      if (written.length !== result.texts.length) {
        throw new Error(`${file}: staged length mismatch`);
      }
      for (let i = 0; i < written.length; i++) {
        if (written[i] !== result.texts[i]) {
          throw new Error(`${file}: staged content mismatch at index ${i}`);
        }
      }

      if (result.alreadyCompact) skipped += 1;
      else converted += 1;
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  if (errors.length) {
    throw new Error(
      `${label} failed (${errors.length} file(s)):\n- ${errors.slice(0, 20).join('\n- ')}${
        errors.length > 20 ? `\n- ...and ${errors.length - 20} more` : ''
      }`
    );
  }

  if (files.length !== listJson(stagingDir).length) {
    throw new Error(
      `${label}: staging file count mismatch (src=${files.length}, staging=${listJson(stagingDir).length})`
    );
  }

  return { files: files.length, converted, skipped, bytesBefore, bytesAfter };
}

function swapIn(stagingDir, liveDir) {
  replaceDir(stagingDir, liveDir);
}

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function main() {
  let backupRoot = null;
  const poemsStaging = path.join(DB, 'poems.compact-staging');
  const summariesStaging = path.join(DB, 'summaries.compact-staging');

  try {
    if (!fs.existsSync(POEMS_DIR) || !fs.existsSync(SUMMARIES_DIR)) {
      throw new Error('Missing poems/ or summaries/ under assets/db');
    }

    console.log('Creating full backup before any changes...');
    backupRoot = createBackup();
    console.log(`Backup ready: ${backupRoot}`);

    removeDirRecursive(poemsStaging);
    removeDirRecursive(summariesStaging);

    console.log('Compacting poems into staging...');
    const poemStats = processKind({
      label: 'poems',
      srcDir: POEMS_DIR,
      stagingDir: poemsStaging,
      compactFn: compactPoem,
    });

    console.log('Compacting summaries into staging...');
    const summaryStats = processKind({
      label: 'summaries',
      srcDir: SUMMARIES_DIR,
      stagingDir: summariesStaging,
      compactFn: compactSummary,
    });

    console.log('Swapping staged files into place...');
    swapIn(poemsStaging, POEMS_DIR);
    swapIn(summariesStaging, SUMMARIES_DIR);

    const report = {
      completedAt: new Date().toISOString(),
      backup: backupRoot,
      poems: {
        ...poemStats,
        bytesBeforeHuman: formatMb(poemStats.bytesBefore),
        bytesAfterHuman: formatMb(poemStats.bytesAfter),
      },
      summaries: {
        ...summaryStats,
        bytesBeforeHuman: formatMb(summaryStats.bytesBefore),
        bytesAfterHuman: formatMb(summaryStats.bytesAfter),
      },
    };

    fs.writeFileSync(
      path.join(backupRoot, 'compact-report.json'),
      JSON.stringify(report, null, 2),
      'utf8'
    );

    console.log('\nDone.');
    console.log(
      `Poems:     ${poemStats.converted} converted, ${poemStats.skipped} already compact, ${poemStats.files} total`
    );
    console.log(
      `           ${formatMb(poemStats.bytesBefore)} → ${formatMb(poemStats.bytesAfter)}`
    );
    console.log(
      `Summaries: ${summaryStats.converted} converted, ${summaryStats.skipped} already compact, ${summaryStats.files} total`
    );
    console.log(
      `           ${formatMb(summaryStats.bytesBefore)} → ${formatMb(summaryStats.bytesAfter)}`
    );
    console.log(`\nTo undo: node scripts/restore-db-json.js`);
    console.log(`Backup:  ${backupRoot}`);
  } catch (err) {
    console.error('\nERROR:', err instanceof Error ? err.message : err);

    // Clean staging leftovers
    try {
      removeDirRecursive(poemsStaging);
      removeDirRecursive(summariesStaging);
    } catch (_) {
      /* ignore */
    }

    if (backupRoot && fs.existsSync(backupRoot)) {
      console.error('Restoring originals from backup...');
      try {
        restoreFromBackup(backupRoot);
        console.error('Restore succeeded. Live data is back to the pre-compact state.');
      } catch (restoreErr) {
        console.error(
          'CRITICAL: auto-restore failed. Your backup is still intact at:'
        );
        console.error(`  ${backupRoot}`);
        console.error('Run manually:');
        console.error(`  node scripts/restore-db-json.js "${backupRoot}"`);
        console.error(
          restoreErr instanceof Error ? restoreErr.message : restoreErr
        );
      }
    } else {
      console.error(
        'No backup was created yet (or backup path missing). Live files should be unchanged.'
      );
    }

    process.exit(1);
  }
}

main();
