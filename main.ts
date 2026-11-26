// Funniest One-Line Out-of-Office Reply
// Writes one out-of-office auto-reply line (under 160 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I'm on annual leave. Your email has been forwarded to my hammock, which has no Wi-Fi and no regrets.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// Gate validation: the sealed scorer takes one line, UTF-8, 1–160 chars,
// with no surrounding whitespace and no control characters in it.
function validateReply(line: string): void {
  if (line.length < 1 || line.length > 160) {
    throw new Error(`entry length ${line.length} is outside the 1–160 char gate`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have surrounding whitespace");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("entry must be a single line with no control characters");
  }
}

validateReply(REPLY);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
console.log(REPLY);
