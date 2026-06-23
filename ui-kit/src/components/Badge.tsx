// Source of truth: Figma component set 293:1279, node 293:1191 (file uo2jhkx6oBwYpiFJxWnLJf).
// 20 variants: View(2) × Color(5) + Type(2, numeric only) + Size(2, dot only).
//
// Token note — Muted Primary text: Figma node 293:1292 binds --ui/neutrals/content
// (not --ui/primary/content). App maps: --color-neutrals-content.
//
// Token note — Inverted text: Figma --ui/neutrals/content-inverted (fallback white).
// App has no content-inverted semantic token → uses --color-palette-white.
//
// Dot md = 6px: Figma --spacing/spacing-6 = 6px. No app token resolves to 6px
// (app --spacing-6 = 24px). size-[6px] used; lg = --spacing-sm (8px) has a token.

export type BadgeView  = 'numeric' | 'dot';
export type BadgeColor = 'default' | 'primary' | 'error' | 'warning' | 'success';
export type BadgeType  = 'default' | 'muted';  // numeric only
export type BadgeSize  = 'md' | 'lg';          // dot only

export interface BadgeProps {
  view?:      BadgeView;
  color?:     BadgeColor;
  /** Numeric only — ignored for dot. */
  type?:      BadgeType;
  /** Numeric only — ignored for dot. */
  content?:   number | string;
  /** Dot only — ignored for numeric. */
  size?:      BadgeSize;
  className?: string;
}

// ── Solid bg/text (View=Numeric type=Default, and all View=Dot) ───────────────
// Figma nodes: 293:1280 (default), 293:1282 (primary), 293:1284 (error),
//              293:1286 (warning), 293:1288 (success)

const SOLID_BG: Record<BadgeColor, string> = {
  default: 'bg-[var(--color-neutrals-content-subdued)]',  // ui/neutrals/content-subdued
  primary: 'bg-[var(--color-primary-bg)]',                // ui/primary/bg
  error:   'bg-[var(--color-critical-bg-active)]',        // ui/critical/bg-active
  warning: 'bg-[var(--color-warning-bg)]',                // ui/warning/bg
  success: 'bg-[var(--color-success-bg-active)]',         // ui/success/bg-active
};

const SOLID_TEXT = 'text-[var(--color-palette-white)]';  // ui/neutrals/content-inverted

// ── Muted bg/text (View=Numeric type=Muted) ───────────────────────────────────
// Figma nodes: 293:1290 (default), 293:1292 (primary), 293:1294 (error),
//              293:1296 (warning), 293:1298 (success)

const MUTED_BG: Record<BadgeColor, string> = {
  default: 'bg-[var(--color-neutrals-bg-muted)]',  // ui/neutrals/bg-muted
  primary: 'bg-[var(--color-primary-bg-muted)]',   // ui/primary/bg-muted
  error:   'bg-[var(--color-critical-bg-muted)]',  // ui/critical/bg-muted
  warning: 'bg-[var(--color-warning-bg-muted)]',   // ui/warning/bg-muted
  success: 'bg-[var(--color-success-bg-muted)]',   // ui/success/bg-muted
};

const MUTED_TEXT: Record<BadgeColor, string> = {
  default: 'text-[var(--color-neutrals-content)]',        // ui/neutrals/content
  primary: 'text-[var(--color-neutrals-content)]',        // ui/neutrals/content (Figma 293:1292)
  error:   'text-[var(--color-critical-content)]',        // ui/critical/content
  warning: 'text-[var(--color-warning-content-active)]',  // ui/warning/content-active
  success: 'text-[var(--color-success-content-active)]',  // ui/success/content-active
};

// ── Dot sizes ─────────────────────────────────────────────────────────────────

const DOT_SIZE: Record<BadgeSize, string> = {
  md: 'size-[6px]',                  // Figma --spacing/spacing-6 = 6px; no matching app token
  lg: 'size-[var(--spacing-sm)]',    // --spacing-sm = --spacing-2 = 8px
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Badge({
  view    = 'numeric',
  color   = 'default',
  type    = 'default',
  content = 1,
  size    = 'md',
  className = '',
}: BadgeProps) {
  if (view === 'dot') {
    return (
      <div
        aria-hidden
        className={[
          'shrink-0 rounded-[var(--radius-full)]',
          SOLID_BG[color],
          DOT_SIZE[size],
          className,
        ].filter(Boolean).join(' ')}
      />
    );
  }

  // Numeric
  const bgClass   = type === 'muted' ? MUTED_BG[color]  : SOLID_BG[color];
  const textClass = type === 'muted' ? MUTED_TEXT[color] : SOLID_TEXT;

  return (
    <div
      className={[
        'inline-flex items-center justify-center shrink-0',
        // w-fit prevents grid/flex parents from stretching the badge beyond content width
        'h-5 min-h-5 min-w-5 w-fit',
        'rounded-[var(--radius-full)]',
        // px-xs (4px) gives breathing room when content is wider than one digit
        'px-[var(--spacing-xs)]',
        bgClass,
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Caption-medium: Roboto Medium 12/20 0.2px — Figma font token */}
      <span
        className={[
          'font-medium text-xs whitespace-nowrap text-center',
          'leading-[var(--line-height-caption)]',
          'tracking-[var(--letter-spacing-caption)]',
          textClass,
        ].join(' ')}
      >
        {content}
      </span>
    </div>
  );
}
