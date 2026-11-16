import { copyFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

/**
 * Next 16 static export writes nested route payloads as
 * `theory/__next.theory/__PAGE__.txt`, while the client requests
 * `theory/__next.theory.__PAGE__.txt`. Copy them to the expected names.
 */
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;

    if (entry.name.startsWith("__next.")) {
      const page = path.join(full, "__PAGE__.txt");
      try {
        await stat(page);
        await copyFile(page, path.join(dir, `${entry.name}.__PAGE__.txt`));
      } catch {
        // No page payload in this segment — nothing to copy.
      }
    }

    await walk(full);
  }
}

await walk("out");
