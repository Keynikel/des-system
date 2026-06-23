---
name: figma-docs-sync
description: >
  Detect manual changes in a Figma UI-KIT file, update component descriptions
  in Figma and React, and append a release notes entry to both the Figma
  "Release Notes" page and src/pages/ReleaseNotes.tsx. Run after any manual
  Figma edit session.
argument-hint: "[figma-file-key?]"
---

# figma-docs-sync

Sync component documentation and release notes between a Figma file and a
React codebase by diffing the current Figma state against a local snapshot.

## Trigger phrases

- "sync figma docs"
- "document figma changes"
- "update release notes"
- "what changed in figma"
- "run docs sync"

---

## Configuration

| Key | Value | Override |
|-----|-------|----------|
| `FIGMA_FILE_KEY` | `uo2jhkx6oBwYpiFJxWnLJf` | Pass a different key as the argument |
| `SNAPSHOT_PATH` | `.figma-sync/snapshot.json` | — |
| `REACT_RELEASE_NOTES` | `src/pages/ReleaseNotes.tsx` | — |
| `SKIP_PAGES` | `["Release Notes", "Cover", "_Archive"]` | — |

---

## Step 1 — Load snapshot

Read `SNAPSHOT_PATH`. If missing or empty, initialise:

```json
{
  "version": "0.0.0",
  "syncedAt": null,
  "components": {}
}
```

`components` is a map of `{ [nodeId]: { name, type, pageId, pageName, variantProps, description } }`.

---

## Step 2 — Scan Figma components

One `use_figma` call on `FIGMA_FILE_KEY`. Run this plugin code:

```js
async function scan() {
  const skip = ["Release Notes", "Cover", "_Archive"];
  const results = [];

  for (const page of figma.root.children) {
    if (skip.includes(page.name)) continue;

    const nodes = page.findAllWithCriteria({ types: ["COMPONENT_SET", "COMPONENT"] });

    for (const node of nodes) {
      // Skip variant components that live inside a COMPONENT_SET
      if (node.type === "COMPONENT" && node.parent?.type === "COMPONENT_SET") continue;

      results.push({
        id: node.id,
        name: node.name,
        type: node.type,
        description: node.description || "",
        pageId: page.id,
        pageName: page.name,
        variantProps: node.type === "COMPONENT_SET"
          ? Object.entries(node.componentPropertyDefinitions || {}).map(
              ([key, def]) => ({ key, type: def.type, values: def.variantOptions || [] })
            )
          : []
      });
    }
  }
  return results;
}
return scan();
```

---

## Step 3 — Diff

Compare the scan result against the snapshot. Produce three lists:

**NEW** — `id` not in `snapshot.components`
**CHANGED** — `id` exists but any of these differ: `name`, `variantProps` count, variant key names
**REMOVED** — `id` in snapshot but not in current scan

If all three lists are empty → print "No changes detected since last sync." and stop.

---

## Step 4 — Generate component descriptions

For every NEW and CHANGED component, write a 1–2 sentence description.

**Format rules:**
- Line 1: What the component is and its primary use.
- Line 2 (COMPONENT_SET only): Comma-separated variant properties, e.g. `Variants: size (sm, md, lg) · state (default, hover, disabled, loading)`.
- Max 280 characters total.
- No markdown, no bullet points — plain text only (Figma renders plain text in descriptions).

**Do not overwrite** existing descriptions that are already longer than 20 characters unless the component is in CHANGED.

---

## Step 5 — Write descriptions back to Figma

One `use_figma` call. Inline the `UPDATES` array (built in Step 4) directly into the plugin code:

```js
// UPDATES = [{ id: "231:3586", description: "..." }, ...]
async function writeDescriptions(updates) {
  for (const { id, description } of updates) {
    const node = figma.getNodeById(id);
    if (node && (node.type === "COMPONENT" || node.type === "COMPONENT_SET")) {
      node.description = description;
    }
  }
  return { written: updates.length };
}
return writeDescriptions(UPDATES);
```

---

## Step 6 — Determine version bump

Read `snapshot.version` (semver string). Apply:

| Condition | Bump |
|-----------|------|
| Any REMOVED components | **minor** (breaking removal) |
| Any NEW components | **minor** |
| Only CHANGED (no new/removed) | **patch** |

Increment accordingly: `0.3.1` → `0.3.2` (patch) or `0.4.0` (minor).

---

## Step 7 — Build release notes entry

Produce an entry object:

```json
{
  "version": "v0.4.0",
  "date": "YYYY-MM-DD",
  "changes": [
    { "type": "added",   "component": "Badge",   "note": "Status indicator with 4 severity variants" },
    { "type": "updated", "component": "Button",  "note": "Added loading state and icon-only variant" },
    { "type": "removed", "component": "Chip",    "note": "Replaced by Tag component" }
  ]
}
```

`note` is a single sentence — what was added/changed/removed, not why.

---

## Step 8 — Update Figma Release Notes page

One `use_figma` call. Inline `ENTRY` (from Step 7):

```js
async function addReleaseEntry(entry) {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

  // Find or create page
  let page = figma.root.children.find(p => p.name === "Release Notes");
  if (!page) {
    page = figma.createPage();
    page.name = "Release Notes";
    // Move to last position
    figma.root.insertChild(figma.root.children.length, page);
  }

  const prev = figma.currentPage;
  figma.currentPage = page;

  // Place new frame above existing content (most-recent at top)
  const existingFrames = page.children.filter(n => n.type === "FRAME");
  const topY = existingFrames.length > 0
    ? Math.min(...existingFrames.map(f => f.y)) - 280
    : 0;

  const frame = figma.createFrame();
  frame.name = entry.version;
  frame.resize(720, 240);
  frame.x = 0;
  frame.y = topY;
  frame.cornerRadius = 8;
  frame.fills = [{ type: "SOLID", color: { r: 0.97, g: 0.97, b: 0.99 } }];

  // Version + date title
  const title = figma.createText();
  title.fontName = { family: "Inter", style: "Semi Bold" };
  title.fontSize = 18;
  title.characters = `${entry.version}  ·  ${entry.date}`;
  title.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.15 } }];
  title.x = 24;
  title.y = 24;
  frame.appendChild(title);

  // Change lines
  const symbols = { added: "+ Added", updated: "~ Updated", removed: "- Removed" };
  const lines = entry.changes.map(
    c => `${symbols[c.type]}   ${c.component} — ${c.note}`
  ).join("\n");

  const body = figma.createText();
  body.fontName = { family: "Inter", style: "Regular" };
  body.fontSize = 13;
  body.lineHeight = { unit: "PIXELS", value: 22 };
  body.characters = lines;
  body.fills = [{ type: "SOLID", color: { r: 0.25, g: 0.25, b: 0.3 } }];
  body.x = 24;
  body.y = 60;
  frame.appendChild(body);

  // Auto-height
  frame.resize(720, body.y + body.height + 28);
  page.appendChild(frame);

  figma.currentPage = prev;
  return { pageId: page.id, frameId: frame.id };
}
return addReleaseEntry(ENTRY);
```

---

## Step 9 — Update React ReleaseNotes.tsx

Target: `src/pages/ReleaseNotes.tsx`

**If file does not exist** — scaffold it:

```tsx
// src/pages/ReleaseNotes.tsx

interface Change {
  type: 'added' | 'updated' | 'removed';
  component: string;
  note: string;
}

interface Release {
  version: string;
  date: string;
  changes: Change[];
}

const ICON: Record<Change['type'], string> = {
  added:   '＋',
  updated: '∿',
  removed: '−',
};

const COLOR: Record<Change['type'], string> = {
  added:   'text-emerald-600',
  updated: 'text-blue-600',
  removed: 'text-red-500',
};

const releases: Release[] = [];  // ← entries injected here

export default function ReleaseNotes() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-10 tracking-tight">Release Notes</h1>
      {releases.map(r => (
        <section key={r.version} className="mb-12">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-lg font-semibold">{r.version}</span>
            <span className="text-sm text-neutral-400">{r.date}</span>
          </div>
          <ul className="space-y-1.5 text-sm">
            {r.changes.map((c, i) => (
              <li key={i} className="flex gap-2">
                <span className={`font-mono font-bold ${COLOR[c.type]} w-20 shrink-0`}>
                  {ICON[c.type]} {c.type}
                </span>
                <span>
                  <strong>{c.component}</strong> — {c.note}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
```

**If file exists** — find the `releases` array declaration and **prepend** the new entry object. Do not touch the rest of the file.

---

## Step 10 — Save snapshot

Write to `SNAPSHOT_PATH`:

```json
{
  "version": "<new semver>",
  "syncedAt": "<ISO timestamp>",
  "components": {
    "<id>": {
      "name": "...",
      "type": "COMPONENT_SET",
      "pageId": "...",
      "pageName": "...",
      "variantProps": [...],
      "description": "..."
    }
  }
}
```

Create `.figma-sync/` directory if needed.

---

## Output summary

Print exactly this after completion:

```
✓ figma-docs-sync — v{old} → v{new}   {YYYY-MM-DD}

  + Added:   {n} components
  ~ Updated: {n} components
  − Removed: {n} components

  Figma descriptions updated    ({n} nodes written)
  Figma "Release Notes" page    ✓
  src/pages/ReleaseNotes.tsx    ✓
  .figma-sync/snapshot.json     ✓
```

---

## Notes

- **First run** creates the snapshot from scratch; all components are treated as NEW and get descriptions written. No release notes entry is created on first run (nothing to diff against).
- **Partial failures** — if a `use_figma` write call fails, report which step failed but still save the snapshot and update React.
- **Do not** delete or rename the Figma "Release Notes" page or reorder existing frames.
- **Do not** modify existing React release entries — prepend only.
