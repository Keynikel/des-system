// Source of truth: Figma 373:5136 (Buttons/Button), file uo2jhkx6oBwYpiFJxWnLJf.
//
// ── Token mapping: Figma UUI variable → project DS token ─────────────────────
// --ui/neutrals/content-inverted   → MISSING semantic alias → --color-palette-white
// --ui/primary/bg                  → --color-primary-bg
// --ui/primary/bg-hover            → --color-primary-bg-hover
// --ui/primary/content             → --color-primary-content
// --ui/neutrals/bg                 → --color-neutrals-bg
// --ui/neutrals/bg-hover           → --color-neutrals-bg-hover
// --ui/neutrals/bg-canvas          → --color-neutrals-bg-canvas
// --ui/neutrals/bg-noninteractive  → --color-neutrals-bg-noninteractive
// --ui/neutrals/content            → --color-neutrals-content
// --ui/neutrals/content-noninteractive → --color-neutrals-content-noninteractive
// --ui/neutrals/border             → --color-neutrals-border
// --ui/critical/bg                 → --color-critical-bg
// --ui/critical/bg-hover           → --color-critical-bg-hover
// --ui/critical/content            → --color-critical-content
// --ui/critical/border             → --color-critical-border
//
// ── Spacing: UUI names differ from project DS — mapped by px value ────────────
// --spacing-xxs (2px)          → px-0.5          (Tailwind; no --spacing-xxs in DS)
// --spacing-xs  (4px)          → --spacing-xs    ✓ (DS xs = spacing-1 = 4px)
// --spacing-md  (8px in UUI)   → py-2            (Tailwind; DS --spacing-md = 16px ≠ 8px)
// --spacing-lg  (12px in UUI)  → px-3            (Tailwind; DS --spacing-lg = 24px ≠ 12px)
// --spacing/spacing-32 (32px)  → h-8 / size-8    (Tailwind)
// --spacing/spacing-40 (40px)  → h-10 / size-10  (Tailwind)
// --radius/radius-8  (8px)     → --radius-md     ✓ (DS radius-md = 8px)

import { useContext } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoadingIndicator } from '../LoadingIndicator';
import { ButtonGroupContext } from '../ui/ButtonGroup/ButtonGroupContext';

export type ButtonHierarchy  = 'primary' | 'secondary' | 'text' | 'text-primary';
export type ButtonSize       = 'sm' | 'md';
export type ButtonForceState = 'hover' | 'disabled' | 'loading';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual hierarchy. Default: 'primary'. Figma: hierarchy prop. */
  hierarchy?:    ButtonHierarchy;
  /** Height token tier. Default: 'md'. sm=32px, md=40px. */
  size?:         ButtonSize;
  /** Red / critical color treatment. Works on all hierarchies. */
  destructive?:  boolean;
  /** Swaps content for spinner + "Submitting…", disables interaction. */
  loading?:      boolean;
  /** Leading icon slot (any ReactNode — typically an SVGR icon component). */
  iconLeading?:  ReactNode;
  /** Trailing icon slot. */
  iconTrailing?: ReactNode;
  /** Square icon-only mode. Requires at least one icon slot to be filled. */
  iconOnly?:     boolean;
  /** Dot badge indicator. Valid only for 'text' and 'text-primary'. */
  badge?:        boolean;
  /** QA/Storybook — forces a visual pseudo-state without JS interaction. */
  forceState?:   ButtonForceState;
  children?:     ReactNode;
}

// ── Background ─────────────────────────────────────────────────────────────────
// All strings are complete static literals so Tailwind JIT scans them reliably.

// Default state — includes CSS :hover modifier for native hover behaviour.
// text/text-primary: no bg on hover — hover is expressed via text color + underline (see TEXT_HOVER).
const BG_DEFAULT: Record<ButtonHierarchy, string> = {
  'primary':      'bg-[var(--color-primary-bg)] hover:bg-[var(--color-primary-bg-hover)]',
  'secondary':    'bg-[var(--color-neutrals-bg)] hover:bg-[var(--color-neutrals-bg-hover)]',
  'text':         'bg-transparent',
  'text-primary': 'bg-[var(--color-neutrals-bg-canvas)]',
};

// forceState='hover' — apply hover bg directly, no pseudo-class.
// text/text-primary stay at their default bg; only primary/secondary change.
const BG_HOVER: Record<ButtonHierarchy, string> = {
  'primary':      'bg-[var(--color-primary-bg-hover)]',
  'secondary':    'bg-[var(--color-neutrals-bg-hover)]',
  'text':         'bg-transparent',
  'text-primary': 'bg-[var(--color-neutrals-bg-canvas)]',
};

// Disabled / loading state.
const BG_INACTIVE: Record<ButtonHierarchy, string> = {
  'primary':      'bg-[var(--color-neutrals-bg-noninteractive)]',
  'secondary':    'bg-[var(--color-neutrals-bg-noninteractive)]',
  'text':         'bg-transparent',
  'text-primary': 'bg-[var(--color-neutrals-bg-noninteractive)]',
};

// Destructive default state (bg only — text/text-primary bg unchanged).
const BG_DESTRUCTIVE: Record<ButtonHierarchy, string> = {
  'primary':      'bg-[var(--color-critical-bg)] hover:bg-[var(--color-critical-bg-hover)]',
  'secondary':    'bg-[var(--color-critical-bg)] hover:bg-[var(--color-critical-bg-hover)]',
  'text':         'bg-transparent',
  'text-primary': 'bg-[var(--color-neutrals-bg-canvas)]',
};

// Destructive + forceState='hover'.
const BG_HOVER_DESTRUCTIVE: Record<ButtonHierarchy, string> = {
  'primary':      'bg-[var(--color-critical-bg-hover)]',
  'secondary':    'bg-[var(--color-critical-bg-hover)]',
  'text':         'bg-transparent',
  'text-primary': 'bg-[var(--color-neutrals-bg-canvas)]',
};

// ── Text color ──────────────────────────────────────────────────────────────────

const TEXT_DEFAULT: Record<ButtonHierarchy, string> = {
  'primary':      'text-[var(--color-palette-white)]',   // --ui/neutrals/content-inverted (no DS semantic alias)
  'secondary':    'text-[var(--color-neutrals-content)]',
  'text':         'text-[var(--color-neutrals-content)]',
  'text-primary': 'text-[var(--color-primary-content)]',
};

const TEXT_DESTRUCTIVE: Record<ButtonHierarchy, string> = {
  'primary':      'text-[var(--color-palette-white)]',   // unchanged — still inverted
  'secondary':    'text-[var(--color-palette-white)]',   // inverted for destructive secondary
  'text':         'text-[var(--color-critical-content)]',
  'text-primary': 'text-[var(--color-critical-content)]',
};

const TEXT_INACTIVE = 'text-[var(--color-neutrals-content-noninteractive)]';

// text/text-primary hover: text color changes + label gets bottom-border underline.
// Figma nodes 375:960 (Text hover) and 375:1018 (Text primary hover).
// Native CSS hover — applied to the button element so icons inherit via currentColor.
const TEXT_HOVER_CSS: Record<ButtonHierarchy, string> = {
  'primary':      '',
  'secondary':    '',
  'text':         'hover:text-[var(--color-neutrals-content-hover)]',
  'text-primary': 'hover:text-[var(--color-primary-content-hover)]',
};
// forceState='hover' — same colors, applied directly (no pseudo-class).
const TEXT_HOVER_FORCED: Record<ButtonHierarchy, string> = {
  'primary':      '',
  'secondary':    '',
  'text':         'text-[var(--color-neutrals-content-hover)]',
  'text-primary': 'text-[var(--color-primary-content-hover)]',
};

// ── Border (secondary only; destructive swaps to critical border) ───────────────

const BORDER: Record<ButtonHierarchy, string> = {
  'primary':      '',
  'secondary':    'border border-[var(--color-neutrals-border)]',
  'text':         '',
  'text-primary': '',
};

const BORDER_DESTRUCTIVE: Record<ButtonHierarchy, string> = {
  'primary':      '',
  'secondary':    'border border-[var(--color-critical-border)]',
  'text':         '',
  'text-primary': '',
};

// ── Typography ──────────────────────────────────────────────────────────────────
// Figma: Roboto Regular 14/22/0.1px.
// text-[length:var(--font-size-body)] = 14px; leading-[var(--line-height-body)] = 22px;
// tracking-[var(--letter-spacing-body)] = 0.1px; font-normal = 400 (Regular).

const BUTTON_TEXT = [
  'text-[length:var(--font-size-body)]',
  'font-normal',
  'leading-[var(--line-height-body)]',
  'tracking-[var(--letter-spacing-body)]',
  'whitespace-nowrap',
].join(' ');

// ── Icon slot wrapper (Figma: opacity-90 overflow-clip shrink-0 size-[16px] flex center) ─

const ICON_SLOT = 'shrink-0 opacity-90 overflow-clip size-4 relative flex items-center justify-center';

// ── Component ───────────────────────────────────────────────────────────────────

export function Button({
  hierarchy    = 'primary',
  size: sizeProp,
  destructive  = false,
  loading      = false,
  iconLeading,
  iconTrailing,
  iconOnly     = false,
  badge        = false,
  forceState,
  className    = '',
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const { size: contextSize } = useContext(ButtonGroupContext);
  const size = sizeProp ?? contextSize;

  if (process.env.NODE_ENV !== 'production' && iconOnly && !iconLeading && !iconTrailing) {
    console.warn('Button (iconOnly=true): provide iconLeading or iconTrailing.');
  }

  const isLoading  = loading  || forceState === 'loading';
  const isDisabled = disabled || forceState === 'disabled' || isLoading;
  const isHover    = forceState === 'hover' && !isDisabled;

  const isTextHierarchy = hierarchy === 'text' || hierarchy === 'text-primary';

  // ── Background ──
  let bg: string;
  if (isDisabled) {
    bg = BG_INACTIVE[hierarchy];
  } else if (isHover) {
    bg = destructive ? BG_HOVER_DESTRUCTIVE[hierarchy] : BG_HOVER[hierarchy];
  } else {
    bg = destructive ? BG_DESTRUCTIVE[hierarchy] : BG_DEFAULT[hierarchy];
  }

  // ── Text color ──
  // text/text-primary: when forceState='hover', swap to the -hover token directly.
  // For native CSS hover the TEXT_HOVER_CSS modifier is appended (hover:text-...).
  let textColor: string;
  if (isDisabled) {
    textColor = TEXT_INACTIVE;
  } else if (isHover && isTextHierarchy) {
    textColor = TEXT_HOVER_FORCED[hierarchy];
  } else if (destructive) {
    textColor = TEXT_DESTRUCTIVE[hierarchy];
  } else {
    textColor = [TEXT_DEFAULT[hierarchy], TEXT_HOVER_CSS[hierarchy]].filter(Boolean).join(' ');
  }

  // ── Border ──
  const border = destructive ? BORDER_DESTRUCTIVE[hierarchy] : BORDER[hierarchy];

  // ── overflow-clip: primary + secondary only (text hierarchies need relative for badge) ──
  const clip = hierarchy === 'primary' || hierarchy === 'secondary' ? 'overflow-clip' : '';

  // ── Sizing ──
  // icon-only: square; non-icon-only: fixed-height with horizontal + vertical padding.
  // Figma sm=32px h-8, md=40px h-10. Padding: px-3 (12px), py-2 (8px) — same for both sizes.
  const sizing = iconOnly
    ? (size === 'sm' ? 'size-8' : 'size-10')
    : (size === 'sm' ? 'h-8 px-3 py-2' : 'h-10 px-3 py-2');

  const cls = [
    'relative inline-flex items-center justify-center',
    `gap-[var(--spacing-xs)]`,
    `rounded-[var(--radius-md)]`,
    'select-none transition-colors duration-150',
    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary-border)] focus-visible:outline-offset-2',
    // group enables group-hover:* on children (label underline for text hierarchies).
    isTextHierarchy && !isDisabled ? 'group' : '',
    BUTTON_TEXT,
    sizing,
    clip,
    bg,
    textColor,
    border,
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ');

  // ── Leading slot: spinner when loading, icon otherwise ──
  const leadingSlot = isLoading ? (
    // Spinner: same size-4 slot as icon for stable layout.
    <span className="shrink-0 size-4 flex items-center justify-center" aria-hidden>
      <LoadingIndicator size="xxs" color="neutral" />
    </span>
  ) : iconLeading ? (
    <span className={ICON_SLOT} aria-hidden>{iconLeading}</span>
  ) : null;

  // ── Trailing slot: hidden during loading ──
  const trailingSlot = !isLoading && !iconOnly && iconTrailing
    ? <span className={ICON_SLOT} aria-hidden>{iconTrailing}</span>
    : null;

  // ── Label ──
  // iconOnly: icon is already in leadingSlot, no label.
  // loading: label is always "Submitting…".
  // text/text-primary: bottom border on hover = underline (Figma "Text padding" border-b).
  // border-current inherits from the button's text color so it always matches.
  // border-b is ALWAYS present (transparent by default) so the box model never changes on hover —
  // only the color changes, preventing a 1px layout jump.
  const labelUnderline = !iconOnly && isTextHierarchy && !isDisabled
    ? isHover
      ? 'border-b border-current'
      : 'border-b border-transparent group-hover:border-current'
    : '';
  const labelSlot = iconOnly ? null : (
    <span className={['px-0.5 shrink-0', labelUnderline].filter(Boolean).join(' ')}>
      {isLoading ? 'Submitting…' : children}
    </span>
  );

  // ── Badge dot (text + text-primary only) ──
  // Figma 375:2898 / 375:2858: absolute 8×8px circle, top-[-4px] right-[-4px].
  const badgeDot = badge && (hierarchy === 'text' || hierarchy === 'text-primary')
    ? <span
        aria-hidden
        className="absolute top-[-4px] right-[-4px] size-2 rounded-full bg-[var(--color-primary-bg)]"
      />
    : null;

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      aria-disabled={isDisabled || undefined}
      className={cls}
      {...rest}
    >
      {leadingSlot}
      {labelSlot}
      {trailingSlot}
      {badgeDot}
    </button>
  );
}
