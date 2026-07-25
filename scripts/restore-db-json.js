/**
 * Restores poems/ and summaries/ from a compact-db-json backup.
 *
 * Usage:
 *   node scripts/restore-db-json.js
 *   node scripts/restore-db-json.js assets/db/_backups/compact-2026-07-25_14-30-00-000
 *   node scripts/restore-db-json.js compact-2026-07-25_14-30-00-000
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DB = path.join(ROOT, 'assets', 'db');
const POEMS_DIR = path.join(DB, 'poems');
const SUMMARIES_DIR = path.join(DB, 'summaries');
const BACKUPS_DIR = path.join(DB, '_backups');

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
  } catch (renameErr) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
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

function resolveBackupArg(arg) {
  if (!arg) {
    const latestPath = path.join(BACKUPS_DIR, 'LATEST');
    if (!fs.existsSync(latestPath)) {
      throw new Error(
        'No LATEST backup pointer found. Pass a backup path explicitly.'
      );
    }
    const name = fs.readFileSync(latestPath, 'utf8').trim();
    return path.join(BACKUPS_DIR, name);
  }

  if (path.isAbsolute(arg)) return arg;

  const asRelative = path.join(ROOT, arg);
  if (fs.existsSync(asRelative)) return asRelative;

  const underBackups = path.join(BACKUPS_DIR, arg);
  if (fs.existsSync(underBackups)) return underBackups;

  throw new Error(`Backup not found: ${arg}`);
}

function restoreFromBackup(backupRoot) {
  const poemsBackup = path.join(backupRoot, 'poems');
  const summariesBackup = path.join(backupRoot, 'summaries');

  if (!fs.existsSync(poemsBackup) || !fs.existsSync(summariesBackup)) {
    throw new Error(
      `Backup incomplete (need poems/ and summaries/): ${backupRoot}`
    );
  }

  const poemCount = fs
    .readdirSync(poemsBackup)
    .filter((f) => f.endsWith('.json')).length;
  const summaryCount = fs
    .readdirSync(summariesBackup)
    .filter((f) => f.endsWith('.json')).length;

  if (poemCount === 0 || summaryCount === 0) {
    throw new Error(
      `Backup looks empty (poems=${poemCount}, summaries=${summaryCount})`
    );
  }

  const poemsStaging = `${POEMS_DIR}.restore-staging`;
  const summariesStaging = `${SUMMARIES_DIR}.restore-staging`;

  removeDirRecursive(poemsStaging);
  removeDirRecursive(summariesStaging);
  copyDirRecursive(poemsBackup, poemsStaging);
  copyDirRecursive(summariesBackup, summariesStaging);

  replaceDir(poemsStaging, POEMS_DIR);
  replaceDir(summariesStaging, SUMMARIES_DIR);

  return { poemCount, summaryCount };
}

function main() {
  try {
    const backupRoot = resolveBackupArg(process.argv[2]);
    console.log(`Restoring from: ${backupRoot}`);
    const { poemCount, summaryCount } = restoreFromBackup(backupRoot);
    console.log(
      `Restored ${poemCount} poem files and ${summaryCount} summary files.`
    );
  } catch (err) {
    console.error('ERROR:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
