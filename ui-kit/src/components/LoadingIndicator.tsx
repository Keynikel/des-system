// Source of truth: Figma component set 368:2806 (file uo2jhkx6oBwYpiFJxWnLJf).
// Figma exports 16 baked per-variant SVGs; recreated as inline SVG with stroke="currentColor"
// so color is driven by design tokens. Arc ≈ 270° with rounded strokeLinecap.
//
// Size → CSS token mapping (outer diameter):
//   xxs 16px → --spacing-md   (= --spacing-4  = 16px)   used by Button sm spinner slot
//   xs  24px → --spacing-lg   (= --spacing-6  = 24px)   used by Button md spinner slot
//   sm  32px → --spacing-xl   (= --spacing-8  = 32px)
//   md  48px → --spacing-2xl  (= --spacing-12 = 48px)
//   lg  56px → --spacing-14   (primitive; no semantic alias = 56px)
//   xl  64px → --spacing-3xl  (= --spacing-16 = 64px)
//
// Color → text color token → SVG stroke via currentColor:
//   primary  → --color-primary-content
//   warning  → --color-warning-content
//   critical → --color-critical-content
//   neutral  → --color-neutrals-content-noninteractive

// Animation CSS lives in index.css (.loading-indicator-spin keyframe).

export type LoadingColor = 'primary' | 'warning' | 'critical' | 'neutral';
export type LoadingSize  = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LoadingIndicatorProps {
  color?:        LoadingColor;
  size?:         LoadingSize;
  'aria-label'?: string;
  className?:    string;
}

const COLOR_CLASS: Record<LoadingColor, string> = {
  primary:  'text-[var(--color-primary-content)]',
  warning:  'text-[var(--color-warning-content)]',
  critical: 'text-[var(--color-critical-content)]',
  neutral:  'text-[var(--color-neutrals-content-noninteractive)]',
};

// token: CSS variable name without var(); px: resolved diameter; sw: stroke width in px
const SIZE_SPEC: Record<LoadingSize, { token: string; px: number; sw: number }> = {
  xxs: { token: '--spacing-md',  px: 16, sw: 2 },
  xs:  { token: '--spacing-lg',  px: 24, sw: 2 },
  sm:  { token: '--spacing-xl',  px: 32, sw: 3 },
  md:  { token: '--spacing-2xl', px: 48, sw: 4 },
  lg:  { token: '--spacing-14',  px: 56, sw: 4 },
  xl:  { token: '--spacing-3xl', px: 64, sw: 5 },
};

export function LoadingIndicator({
  color = 'primary',
  size  = 'md',
  'aria-label': ariaLabel = 'Loading',
  className = '',
}: LoadingIndicatorProps) {
  const spec = SIZE_SPEC[size];
  if (!spec) {
    throw new Error(
      `LoadingIndicator: unknown size "${size}". ` +
      `Valid values: ${Object.keys(SIZE_SPEC).join(' | ')}`,
    );
  }
  const { token, px, sw } = spec;
  const r             = (px - sw) / 2;
  const circumference = 2 * Math.PI * r;
  // 270° visible arc (0.75 × circumference) with rounded caps — matches Figma ring shape
  const dashArray = `${(circumference * 0.75).toFixed(2)} ${circumference.toFixed(2)}`;

  return (
    <svg
      role="status"
      aria-label={ariaLabel}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      className={[
        'loading-indicator-spin shrink-0',
        COLOR_CLASS[color],
        className,
      ].filter(Boolean).join(' ')}
      style={{ width: `var(${token})`, height: `var(${token})` }}
    >
      <circle
        cx={px / 2}
        cy={px / 2}
        r={r}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={dashArray}
      />
    </svg>
  );
}
