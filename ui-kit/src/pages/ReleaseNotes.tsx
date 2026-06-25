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

const releases: Release[] = [
  {
    version: '0.4.0',
    date: '2026-06-24',
    changes: [
      {
        type: 'added',
        component: 'Input',
        note: 'Input component from Figma node 417:11499 (file uo2jhkx6oBwYpiFJxWnLJf). Single-line text field. Props: label, required, optional, helperText, error, leadingIcon (20 px slot), trailingIcon (16 px slot, auto-replaced by error icon when error is set), forceState for Storybook QA. Error state drives aria-invalid, aria-errormessage, and aria-describedby automatically. React.forwardRef for form library compatibility. Focus ring via :focus-within on the wrapper div. No size or visual variant axes — single appearance per Figma. All styling bound to design-system tokens; zero hardcoded values.',
      },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-06-24',
    changes: [
      {
        type: 'added',
        component: 'Tag',
        note: 'Tag component from Figma node 417:5907 (file uo2jhkx6oBwYpiFJxWnLJf). Three visual types (filled, outlined, highlighted), five semantic colors (default, primary, error, warning, success), two sizes (sm=24px, md=32px). Leading icon slot (16px, any React node), removable close button (independent focusable <button> with aria-label). Disabled state via HTML disabled + aria-disabled. forceState prop for Storybook visual QA. All styling bound to design-system tokens; zero hardcoded values.',
      },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-06-24',
    changes: [
      {
        type: 'added',
        component: 'Card',
        note: 'Card component family from Figma node 413:1320 (file uo2jhkx6oBwYpiFJxWnLJf). Six named exports: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter. CardTitle accepts an `as` prop for semantic heading level (default h3). No structural variants in Figma (no shadow, no size). All styling bound to design-system tokens; zero hardcoded values. Storybook stories cover Default, HeaderOnly, NoDescription, NoFooter, LongContent, Composed, and AllVariants.',
      },
      {
        type: 'added',
        component: 'Button',
        note: 'Button component from Figma node 373:5136. Four hierarchy levels (primary / secondary / text / text-primary), two sizes (sm / md), destructive treatment, icon leading/trailing slots, icon-only mode, loading state with spinner, and badge dot indicator. forceState prop for QA/Storybook. All tokens from design system CSS vars.',
      },
      {
        type: 'added',
        component: 'ButtonGroup',
        note: 'ButtonGroup component from Figma node 387:696. Joins two or more Buttons into a connected control — adjacent borders collapse to a single 1 px line, outer corners retain --radius-md. Supports horizontal (default) and vertical orientations, size propagation via context, and asRow wrapper for spacing multiple sub-groups.',
      },
      {
        type: 'added',
        component: 'Skeleton',
        note: 'Skeleton placeholder component from Figma node 382:2542. Compose blocks at any width, height, and border-radius via props. Shimmer animation via CSS gradient sweep keyframe; respects prefers-reduced-motion. forceState="static" freezes the animation for snapshot tests.',
      },
      {
        type: 'added',
        component: 'Checkbox',
        note: 'Checkbox component from Figma node 377:756. Three variants: unchecked, checked, indeterminate. Native sr-only <input> with peer-checked / peer-focus-visible / peer-disabled CSS modifiers driving the visual box and icon spans. Indeterminate state set via useEffect on input.indeterminate. forceState prop for QA/Storybook. Compound disabled+checked fill handled in styles/checkbox.css.',
      },
{
        type: 'added',
        component: 'RadioButton',
        note: 'RadioButton component from Figma node 381:943 (↳ Radio button page). Unchecked/Checked × Default/Hover/Disabled variants. Native sr-only <input type="radio"> with peer-based circular indicator and inner dot span. Hover ring via box-shadow. Optional label and description (subtitle) props; description indented 24 px to align with label text. forceState prop for QA/Storybook. Compound checked+disabled fill handled in styles/radiobutton.css.',
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-06-19',
    changes: [
      {
        type: 'added',
        component: 'Accordion',
        note: 'AccordionItem and AccordionGroup components from Figma node 286:870. Supports single-open and multi-open (multiple prop), controlled/uncontrolled state, disabled state. Height animation via CSS grid-rows trick. Chevron icons from SVGR set; all tokens from design system CSS vars.',
      },
      {
        type: 'added',
        component: 'Avatar',
        note: 'Avatar component from Figma component set 293:942. 4 sizes (xs/sm/md/lg) × 3 types (image/placeholder/text) = 12 variants. Circular, border-clipped. Image error fallback to text initials or placeholder. All dimensions bound to spacing tokens; colors and radius from design system CSS vars.',
      },
      {
        type: 'added',
        component: 'Badge',
        note: 'Badge component from Figma component set 293:1279. Numeric view (default + muted) × 5 colors, dot view (md + lg) × 5 colors = 20 variants. Caption-medium typography (Roboto Medium 12/20). All colors, sizes, and radius from design system CSS vars; no hardcoded values.',
      },
      {
        type: 'added',
        component: 'Breadcrumbs',
        note: 'Breadcrumbs component from Figma 293:1319 — three exports: BreadcrumbLink (anchor/button/cut), BreadcrumbSeparator ("/" or ">"), Breadcrumbs (items prop). Interactive: hover underline, aria-current on current page, focus-visible ring on links. Collapsible mode collapses middle items behind a "…" button (Figma: Cutted=True). Body/Caption text styles; all colors and spacing from design system CSS vars.',
      },
      {
        type: 'added',
        component: 'LoadingIndicator',
        note: 'Spinner component from Figma component set 368:2806. 4 colors (primary/warning/critical/neutral) × 4 sizes (sm/md/lg/xl) = 16 variants. Recreated as inline SVG arc (~270°, rounded caps) with stroke="currentColor" — no baked assets. Color from design token; size from spacing tokens. Continuous rotation via CSS keyframe; respects prefers-reduced-motion. role="status" + aria-label for accessibility.',
      },
    ],
  },
];

export default function ReleaseNotes() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-10 tracking-tight">Release Notes</h1>
      {releases.length === 0 ? (
        <p className="text-sm text-neutral-400">No releases yet.</p>
      ) : (
        releases.map(r => (
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
        ))
      )}
    </main>
  );
}
