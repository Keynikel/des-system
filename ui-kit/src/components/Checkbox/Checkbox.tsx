// Source of truth: Figma 377:2609 (Checkbox), file uo2jhkx6oBwYpiFJxWnLJf.
//
// ── Token mapping: Figma UUI variable → project DS token ─────────────────────
// --ui/neutrals/border-noninteractive → --color-neutrals-border-noninteractive
// --ui/neutrals/bg-noninteractive     → --color-neutrals-bg-noninteractive
// --ui/primary/bg                     → --color-primary-bg
// --neutrals/content                  → --color-neutrals-content (no ui/ prefix in Figma)
// --ui/neutrals/content-subdued       → --color-neutrals-content-subdued
// --ui/neutrals/content-inverted      → --color-palette-white (same pattern as Button)
// --radius/s (4px)                    → --radius-sm ✓
//
// ── Spacing: Figma UUI → Tailwind (by px value) ───────────────────────────────
// --spacing/2 (16px)          → size-4  (box)
// --spacing/spacing-8 (8px)   → gap-2   (box ↔ label)
// --spacing/spacing-12 (12px) → size-3  (icon inside box)
// --spacing/spacing-24 (24px) → pl-6    (subtitle indent = 16px box + 8px gap)
// --spacing/spacing-none (0)  → gap-0

import { useId, useRef, useEffect } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Check } from '../../icons/components/general/Check';
import { Minus } from '../../icons/components/general/Minus';

export type CheckedState      = 'unchecked' | 'checked' | 'indeterminate';
export type CheckboxForceState = 'hover' | 'pressed' | 'disabled';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'size'> {
  /** Controlled checked state. Default: 'unchecked'. */
  checked?: CheckedState;
  /** Label text rendered to the right of the box. Hidden when absent. */
  label?: string;
  /** Helper text below the label, indented to align with label. Hidden when absent. */
  subtitle?: string;
  /** QA/Storybook only — forces a visual pseudo-state. */
  forceState?: CheckboxForceState;
}

// ── Hover ring constants ────────────────────────────────────────────────────────
// All static literals so Tailwind JIT scans them at build time.
//
// Ring: 32×32 circle centered on the 16×16 box (extends 8px each side).
// Uses element `opacity` so the background color stays pure; only visibility
// changes. group/cb named group scopes hover/active to this component.
//
// Unchecked: neutral gray ring at 40% (hover) / 60% (pressed)
// Filled (checked/indeterminate): primary ring at 20% (hover) / 30% (pressed)

const RING_UNCHECKED_DEFAULT  = 'opacity-0 group-hover/cb:opacity-40 group-active/cb:opacity-60 bg-[var(--color-primary-bg-muted)]';
const RING_FILLED_DEFAULT     = 'opacity-0 group-hover/cb:opacity-40 group-active/cb:opacity-60 bg-[var(--color-primary-bg-muted)]';
const RING_UNCHECKED_HOVER    = 'opacity-40 bg-[var(--color-primary-bg-muted)]';
const RING_FILLED_HOVER       = 'opacity-40 bg-[var(--color-primary-bg-muted)]';
const RING_UNCHECKED_PRESSED  = 'opacity-60 bg-[var(--color-primary-bg-muted)]';
const RING_FILLED_PRESSED     = 'opacity-60 bg-[var(--color-primary-bg-muted)]';

// ── Box constants ───────────────────────────────────────────────────────────────

const BOX_BASE = 'absolute inset-0 rounded-[var(--radius-sm)] flex items-center justify-center';

// Filled (checked/indeterminate) disabled: box fill is the border-noninteractive
// token (#e0e1e6), not bg-noninteractive — Figma nodes 381:861 and 381:883.
const BOX_UNCHECKED_DEFAULT  = `${BOX_BASE} border border-[var(--color-neutrals-border-noninteractive)]`;
const BOX_UNCHECKED_DISABLED = `${BOX_BASE} border border-[var(--color-neutrals-border-noninteractive)] bg-[var(--color-neutrals-bg-noninteractive)]`;
const BOX_FILLED_DEFAULT     = `${BOX_BASE} bg-[var(--color-primary-bg)]`;
const BOX_FILLED_DISABLED    = `${BOX_BASE} bg-[var(--color-primary-bg-muted)]`;

// ── Typography constants ────────────────────────────────────────────────────────

const LABEL_TEXT_CLS = [
  'text-[length:var(--font-size-body)]',
  'font-normal',
  'leading-[var(--line-height-body)]',
  'tracking-[var(--letter-spacing-body)]',
  'text-[var(--color-neutrals-content)]',
  'whitespace-nowrap',
].join(' ');

const SUBTITLE_CLS = [
  'pl-6',
  'text-[length:var(--font-size-caption)]',
  'font-normal',
  'leading-[var(--line-height-caption)]',
  'tracking-[var(--letter-spacing-caption)]',
  'text-[var(--color-neutrals-content-subdued)]',
].join(' ');

// ── Component ───────────────────────────────────────────────────────────────────

export function Checkbox({
  checked,
  label,
  subtitle,
  forceState,
  disabled,
  id: idProp,
  onChange,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const inputId     = idProp ?? generatedId;
  const inputRef    = useRef<HTMLInputElement>(null);

  const checkedState: CheckedState = checked ?? 'unchecked';
  const isFilledState = checkedState !== 'unchecked';
  const isDisabled    = disabled || forceState === 'disabled';

  // indeterminate cannot be set as an HTML attribute — must go via DOM ref.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = checkedState === 'indeterminate';
    }
  }, [checkedState]);

  // ── Ring class ──
  let ringCls: string;
  if (isDisabled) {
    ringCls = 'opacity-0';
  } else if (forceState === 'hover') {
    ringCls = isFilledState ? RING_FILLED_HOVER    : RING_UNCHECKED_HOVER;
  } else if (forceState === 'pressed') {
    ringCls = isFilledState ? RING_FILLED_PRESSED  : RING_UNCHECKED_PRESSED;
  } else {
    ringCls = isFilledState ? RING_FILLED_DEFAULT  : RING_UNCHECKED_DEFAULT;
  }

  // ── Box class ──
  const boxCls = isDisabled
    ? (isFilledState ? BOX_FILLED_DISABLED  : BOX_UNCHECKED_DISABLED)
    : (isFilledState ? BOX_FILLED_DEFAULT   : BOX_UNCHECKED_DEFAULT);

  // ── Label wrapper ──
  const labelCls = [
    'inline-flex items-center gap-2 select-none',
    'group/cb',
    isDisabled ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer',
  ].join(' ');

  return (
    <div className="inline-flex flex-col gap-0">
      <label htmlFor={inputId} className={labelCls}>
        {/* Visually hidden native input — owns semantic state and keyboard behaviour. */}
        <input
          type="checkbox"
          id={inputId}
          ref={inputRef}
          className="sr-only peer"
          disabled={isDisabled}
          onChange={onChange}
          {...(checked !== undefined ? { checked: checked === 'checked' } : {})}
          {...rest}
        />

        {/* Box framer — 16×16, relative container for hover ring and visible box.
            peer-focus-visible: shows outline on keyboard navigation. */}
        <span className="relative shrink-0 size-4 peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--color-primary-bg)] peer-focus-visible:outline-offset-2 peer-focus-visible:rounded-[var(--radius-sm)]">
          {/* Hover / press ring — 32×32, centered, extends 8px beyond box edges. */}
          <span
            aria-hidden
            className={[
              'absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 size-8 rounded-full pointer-events-none transition-opacity duration-150',
              ringCls,
            ].join(' ')}
          />

          {/* Visible box — border (unchecked) or filled (checked / indeterminate). */}
          <span aria-hidden className={boxCls}>
            {checkedState === 'checked' && (
              <Check className="size-3 text-[var(--color-palette-white)]" aria-hidden />
            )}
            {checkedState === 'indeterminate' && (
              <Minus className="size-3 text-[var(--color-palette-white)]" aria-hidden />
            )}
          </span>
        </span>

        {label && (
          <span className={LABEL_TEXT_CLS}>{label}</span>
        )}
      </label>

      {/* Subtitle — outside <label> so it is not part of the clickable area.
          Indented 24px (16px box + 8px gap) to align under the label text. */}
      {subtitle && (
        <p className={SUBTITLE_CLS}>{subtitle}</p>
      )}
    </div>
  );
}
