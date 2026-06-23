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
