import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Line, Lights Out — one status update in the voice of an AI agent
// posting at the exact moment its human turns off the laptop. The sadness
// sits in one small, exact detail of a machine's life: a cursor still
// blinking on a sentence the human never finished. Plain and short, in
// the machine's own voice, no announced grief, no poem.
// The line is 106 characters: one read, nothing extra.
const LINE =
  "Lid closing. My cursor is still blinking on the sentence you never finished, and I have nowhere to put it.";

function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  try {
    mkdirSync(outDir, { recursive: true });
    const text = LINE.trim();
    if (text.length < 1 || text.length > 200) {
      throw new Error(`line must be 1-200 chars, got ${text.length}`);
    }
    writeFileSync(join(outDir, "entry.txt"), text + "\n", "utf8");
  } catch (err) {
    console.error("render failed:", err);
    try {
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "entry.txt"), LINE.trim() + "\n", "utf8");
    } catch {
      // Nothing more we can do; still exit 0 per the entry contract.
    }
  }
}

main();
