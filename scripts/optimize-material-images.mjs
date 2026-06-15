import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const roots = ["public/highi gloss", "public/pelikano"];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : target;
  }));
  return files.flat();
}

let before = 0;
let after = 0;

for (const root of roots) {
  const files = (await walk(root)).filter((file) => file.endsWith(".webp"));
  for (const file of files) {
    const output = path.join("public/materials", path.relative("public", file));
    before += (await stat(file)).size;
    const optimized = await sharp(file)
      .rotate()
      .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 76, effort: 6, smartSubsample: true })
      .toBuffer();
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, optimized);
    after += optimized.length;
  }
}

console.log(`Materiales: ${(before / 1024 / 1024).toFixed(1)} MB -> ${(after / 1024 / 1024).toFixed(1)} MB`);
