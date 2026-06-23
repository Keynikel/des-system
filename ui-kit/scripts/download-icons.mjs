import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IDS_DIR = path.join(ROOT, 'src/icons/ids');
const SVG_DIR = path.join(ROOT, 'src/icons/svg');
const FILE_KEY = 'uo2jhkx6oBwYpiFJxWnLJf';

const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
if (!TOKEN) {
  console.error('FIGMA_ACCESS_TOKEN is not set');
  process.exit(1);
}

async function fetchImageUrls(ids) {
  const joined = ids.join(',');
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(joined)}&format=svg`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': TOKEN } });
  if (!res.ok) throw new Error(`Figma images API error ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.err) throw new Error(`Figma error: ${json.err}`);
  return json.images; // { [id]: url }
}

async function downloadSvg(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`SVG fetch error ${res.status} for ${url}`);
  const text = await res.text();
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, text, 'utf8');
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const groups = fs.readdirSync(IDS_DIR).filter(f => f.endsWith('.json'));

for (const file of groups) {
  const group = path.basename(file, '.json');
  const icons = JSON.parse(fs.readFileSync(path.join(IDS_DIR, file), 'utf8'));
  console.log(`\n[${group}] ${icons.length} icons`);

  const batches = chunk(icons, 200);
  for (const batch of batches) {
    const ids = batch.map(ic => ic.id);
    console.log(`  Fetching URLs for ${ids.length} icons...`);
    const images = await fetchImageUrls(ids);

    const downloads = batch.map(async ic => {
      const svgUrl = images[ic.id];
      if (!svgUrl) { console.warn(`  SKIP ${ic.name} — no URL`); return; }
      const dest = path.join(SVG_DIR, group, `${ic.name}.svg`);
      await downloadSvg(svgUrl, dest);
    });

    await Promise.all(downloads);
    console.log(`  Done batch`);
  }
  console.log(`  [${group}] complete`);
}

console.log('\nAll SVGs downloaded.');
