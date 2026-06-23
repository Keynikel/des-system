# Claude Code — Project Rules

## Figma is the only source of truth for components

When building a component from Figma:

- **Call `get_design_context` first.** The Figma component's variant set and its bound variables are the only source of truth for prop API, variant names, structure, spacing, typography, and icon assets. External docs (shadcn, Radix, MUI, etc.) are reference for accessibility behaviour only — never for props, variant names, structure, or styling.
- **Replicate variants verbatim.** Match variant property names exactly as they appear in Figma (e.g. `collapsed`, `state: "Default" | "Hover" | "Disabled"`). Do not invent structural props that have no corresponding Figma variant.
- **Bind to existing project tokens — no hardcoded values.** Strip all hex/value fallbacks from generated CSS (e.g. `,#1c2024`). Map Figma variable names (`--ui/neutrals/content`) to their app equivalents (`--color-neutrals-content`). Never leave a raw hex, px literal, or magic number where a spacing/radius/color token exists.
- **Icons from the SVGR set.** Use the repo's SVGR icon components (`src/icons/components/…`) at the size Figma specifies. Reference Figma node IDs in a comment when the mapping is non-obvious.
- **Diff before finishing.** Before marking a task complete, check the component against the Figma node: prop API, variant names, tokens, spacing, type styles, icons — all must match.

## Token conventions

| What | Use |
|------|-----|
| Color | `var(--color-<category>-<role>)` CSS vars |
| Spacing | Tailwind scale where it aligns (e.g. `py-3` = 12 px); CSS var (`var(--spacing-xs)`) when a semantic token exists for that exact value |
| Border radius | `rounded-[var(--radius-md)]` etc. — CSS vars, not Tailwind defaults (Tailwind's `rounded-md` ≠ design token) |
| Typography | Tailwind `font-medium` / `text-base` / `leading-5` where values align; CSS vars for font sizes that don't map cleanly |
