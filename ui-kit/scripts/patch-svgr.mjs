// Converts SVGR default exports → named exports.
// Before: const SvgAlertCircle = ...; export default SvgAlertCircle;
// After:  export const AlertCircle = ...;
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const files = execSync('find src/icons/components -name "*.tsx"')
  .toString().trim().split('\n');

let patched = 0;
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const out = src
    .replace(/\bconst (Svg)(\w+)(\s*=)/g, 'export const $2$3')
    .replace(/\nexport default Svg\w+;\n?/g, '\n');
  if (out !== src) {
    writeFileSync(file, out);
    patched++;
  }
}
console.log(`Patched ${patched}/${files.length} files`);
