/* Figma: uo2jhkx6oBwYpiFJxWnLJf  node 382:2542
 *
 * Variant reference:
 * ┌────────┬─────────┬────────────────────────────┬────────────────┬───────┬──────┐
 * │ Shape  │ Node    │ Fill                       │ Radius         │  W    │  H   │
 * ├────────┼─────────┼────────────────────────────┼────────────────┼───────┼──────┤
 * │ Circle │ 389:9   │ --color-neutrals-bg-muted  │ --radius-full  │  48px │ 48px │
 * │ Line   │ 389:8   │ --color-neutrals-bg-muted  │ 6px*           │ 250px │ 16px │
 * └────────┴─────────┴────────────────────────────┴────────────────┴───────┴──────┘
 * * TOKEN MISSING: Figma uses 6px radius; no --radius-6 exists.
 *   Fallback: --radius-sm (4px). Nearest up: --radius-md (8px).
 *
 * Shimmer colours (all token-bound):
 *   base      → --color-neutrals-bg-muted  (#f0f0f3)
 *   highlight → --color-neutrals-bg-hover  (#f9f9fb)
 */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Any valid CSS width. Defaults to 100%. */
  width?: string;
  /** Any valid CSS height. Defaults to --spacing-4 (16 px) — Figma Line height. */
  height?: string;
  /** Border-radius override. Defaults to --radius-sm (Figma: 6 px, TOKEN MISSING). */
  radius?: string;
  /** "shimmer" (default) animates; "static" freezes for snapshots. */
  forceState?: 'shimmer' | 'static';
}

export function Skeleton({
  width = '100%',
  // TOKEN MISSING: Figma Line height is 16px = --spacing-4; no semantic height token.
  height = 'var(--spacing-4)',
  // TOKEN MISSING: Figma Line radius is 6px; fallback --radius-sm (4px).
  radius = 'var(--radius-sm)',
  forceState = 'shimmer',
  style,
  className,
  ...rest
}: SkeletonProps) {
  const classes = [
    'skeleton',
    forceState === 'shimmer' ? 'animate-shimmer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      aria-hidden="true"
      className={classes}
      style={{ width, height, borderRadius: radius, ...style }}
      {...rest}
    />
  );
}
