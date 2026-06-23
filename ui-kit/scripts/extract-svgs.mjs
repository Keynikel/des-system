import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const [,, jsonFile, groupDir] = process.argv;
const icons = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
const outDir = path.join(ROOT, 'src/icons/svg', groupDir);
fs.mkdirSync(outDir, { recursive: true });
let written = 0;
for (const { name, svg } of icons) {
  if (!svg || svg.trim().length < 10) { console.warn(`  SKIP empty: ${name}`); continue; }
  fs.writeFileSync(path.join(outDir, `${name}.svg`), svg, 'utf8');
  written++;
}
console.log(`${groupDir}: wrote ${written}/${icons.length}`);
