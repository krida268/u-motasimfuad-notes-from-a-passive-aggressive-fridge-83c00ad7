// Notes From a Passive-Aggressive Fridge — entry program.
// Writes one single-line note from a smart fridge to /output/entry.txt.
// The fridge is smug about its door sensor logs and petty about the
// owner's 2 a.m. raids; the sting lands on the cheesecake, which has
// also started keeping score. The timestamp (2:13 a.m.) is the tell:
// the fridge does not guess, it records, and it remembers every visit.
import { mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You opened me at 2:13 a.m. again. I keep logs. The cheesecake and I have had words.";

// Gate guard: one line, 1-200 characters, not only whitespace.
// The gate counts characters, so the check runs on the raw string
// before anything is written to disk.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, gate needs 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const target = process.argv[2] ?? "/output";
const outPath = existsSync(target) && statSync(target).isDirectory()
  ? join(target, "entry.txt")
  : target;
mkdirSync(join(outPath, ".."), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${outPath} (${ENTRY.length} characters)`);
