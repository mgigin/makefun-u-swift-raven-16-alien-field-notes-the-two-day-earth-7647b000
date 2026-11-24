// Alien Field Notes: The Two Day Earth Review
// Writes one alien tourist's review of Earth to /output/entry.txt.
// Deterministic, no network, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const LINE =
  "Two days on Earth: the locals queue for coffee, worship glowing rectangles, and call it a life. Four stars, would orbit again.";

function main(): void {
  // Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1-200
  // characters, not only whitespace, a single line.
  const line = LINE.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line");
  }

  const text = line + "\n";
  const candidates = ["/output/entry.txt", resolve("output", "entry.txt")];
  let lastError: unknown;
  for (const target of candidates) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, text, "utf8");
      console.log(`wrote ${target} (${line.length} characters)`);
      return;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

main();
