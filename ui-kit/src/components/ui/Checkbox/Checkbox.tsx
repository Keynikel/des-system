// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 377:756 (Checkbox component set)
//
// Token mapping — Figma variable → project DS token:
// --ui/neutrals/border-noninteractive  → --color-neutrals-border-noninteractive
// --ui/neutrals/bg-noninteractive       → --color-neutrals-bg-noninteractive
// --ui/primary/bg                       → --color-primary-bg
// --neutrals/content                    → --color-neutrals-content
// --ui/neutrals/content-noninteractive  → --color-neutrals-content-noninteractive
// --radius/s (4 px)                     → --radius-sm
// Hover/pressed ring (Figma: image asset, absolute inset -50% on 16 px box)
//   → CSS box-shadow: 0 0 0 3px var(--color-primary-bg-muted)
//   TOKEN MISSING: no semantic ring-width token; 3 px approximated from Figma geometry
// Disabled + checked fill (#e0e1e6)     → --color-neutrals-border-noninteractive
//   (compound rule lives in styles/checkbox.css — too specific for Tailwind peer chaining)
//
// Architecture note:
//   The `<input>` and all visual spans are siblings inside a `relative size-4` wrapper.
//   This lets Tailwind's `peer-*` sibling combinator (~) reach the box and icon spans
//   even though the input is `sr-only`. The `<label>` provides the group ancestor for
//   `group-data-[*]` variants.

import { useRef, useEffect } from 'react';
import type { ChangeEvent, ReactNode } from 'react';

export interface CheckboxProps {
  /** Whether the checkbox is checked (controlled). */
  checked?: boolean;
  /** Default checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Indeterminate — visually overrides checked; input.indeterminate set via useEffect. */
  indeterminate?: boolean;
  /** Disables interaction. */
  disabled?: boolean;
  /** Label text rendered next to the checkbox. */
  label?: ReactNode;
  /** Accessible label when no visible label is provided. */
  'aria-label'?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
  /** QA / Storybook only — forces a visual state without changing real DOM state. */
  forceState?: 'default' | 'hover' | 'focus' | 'disabled';
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M 1.5 6.5 L 4.5 9 L 10.5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M 2.5 6 H 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Checkbox({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  label,
  'aria-label': ariaLabel,
  onChange,
  className,
  forceState,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // indeterminate is write-only via JS — not settable through an HTML attribute.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isDisabled = disabled || forceState === 'disabled';
  const isControlled = checked !== undefined;

  // ── Visual box ──────────────────────────────────────────────────────────────
  // `cb-box` is a CSS hook for compound rules in checkbox.css (disabled+checked fill).
  // Hover/focus classes are conditionally omitted when disabled — avoids specificity fights
  // with peer-disabled styles.
  const boxClass = [
    'cb-box',
    'absolute inset-0',
    'rounded-[var(--radius-sm)]',
    'border border-[var(--color-neutrals-border-noninteractive)]',
    'bg-transparent',
    'transition-all duration-150',

    // Checked: primary fill, border collapses
    'peer-checked:bg-[var(--color-primary-bg)]',
    'peer-checked:border-transparent',

    // Indeterminate: same fill (disabled+indeterminate override in checkbox.css)
    'group-data-[indeterminate=true]:bg-[var(--color-primary-bg)]',
    'group-data-[indeterminate=true]:border-transparent',

    // Hover ring — only when interactive (no peer-disabled:shadow-none fight needed)
    // TOKEN MISSING: ring-width 3px — no semantic DS token; approximated from Figma geometry
    !isDisabled && 'group-hover:shadow-[0_0_0_3px_var(--color-primary-bg-muted)]',
    !isDisabled && forceState === 'hover' && 'shadow-[0_0_0_3px_var(--color-primary-bg-muted)]',

    // Focus outline — only when interactive
    !isDisabled && 'peer-focus-visible:outline-2',
    !isDisabled && 'peer-focus-visible:outline-[var(--color-primary-border)]',
    !isDisabled && 'peer-focus-visible:outline-offset-2',
    !isDisabled && forceState === 'focus' && 'outline-2 outline-[var(--color-primary-border)] outline-offset-2',

    // Disabled: muted bg + noninteractive border (compound cases in checkbox.css)
    'peer-disabled:bg-[var(--color-neutrals-bg-noninteractive)]',
    'peer-disabled:border-[var(--color-neutrals-border-noninteractive)]',
    'peer-disabled:cursor-not-allowed',
  ].filter(Boolean).join(' ');

  // ── Checkmark: shown on :checked; hidden when indeterminate overrides ────────
  // `!opacity-0` (Tailwind important) ensures indeterminate wins over peer-checked
  // regardless of stylesheet cascade order.
  const checkClass = [
    'absolute inset-0',
    'flex items-center justify-center',
    'opacity-0 peer-checked:opacity-100',
    'group-data-[indeterminate=true]:!opacity-0',
    'transition-opacity duration-150',
    'pointer-events-none',
    // Icon color: white on filled box; non-interactive when disabled
    'text-[var(--color-palette-white)]',
    'peer-disabled:text-[var(--color-neutrals-content-noninteractive)]',
  ].join(' ');

  // ── Dash: shown only when indeterminate ─────────────────────────────────────
  const dashClass = [
    'absolute inset-0',
    'flex items-center justify-center',
    'opacity-0 group-data-[indeterminate=true]:opacity-100',
    'transition-opacity duration-150',
    'pointer-events-none',
    // Icon color: white on filled box; non-interactive when disabled
    'text-[var(--color-palette-white)]',
    'peer-disabled:text-[var(--color-neutrals-content-noninteractive)]',
  ].join(' ');

  // ── Label text ───────────────────────────────────────────────────────────────
  const labelClass = [
    'select-none',
    'text-[length:var(--font-size-body)]',
    'font-normal',
    'leading-[var(--line-height-body)]',
    'tracking-[var(--letter-spacing-body)]',
    isDisabled
      ? 'text-[var(--color-neutrals-content-noninteractive)]'
      : 'text-[var(--color-neutrals-content)]',
  ].join(' ');

  const wrapperClass = [
    'group inline-flex items-center gap-2',
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ');

  const inputEventProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked),
  };

  return (
    <label
      className={wrapperClass}
      data-indeterminate={indeterminate ? 'true' : undefined}
      data-force-state={forceState && forceState !== 'default' ? forceState : undefined}
    >
      {/*
        Relative container: keeps the sr-only input and all visual siblings in the
        same stacking context so Tailwind's `peer ~` selector works at every depth.
      */}
      <span className="relative shrink-0 size-4">
        <input
          ref={inputRef}
          type="checkbox"
          className="peer cb-input sr-only"
          aria-label={ariaLabel}
          disabled={isDisabled}
          aria-disabled={isDisabled || undefined}
          {...(isControlled
            ? { checked, ...inputEventProps }
            : { defaultChecked, ...inputEventProps })}
        />

        {/* Visual box (peer sibling — receives peer-checked, peer-focus-visible, peer-disabled) */}
        <span className={boxClass} aria-hidden />

        {/* Checkmark (peer sibling — same peer source as box) */}
        <span className={checkClass} aria-hidden>
          <CheckIcon />
        </span>

        {/* Indeterminate dash (group sibling — driven by data-indeterminate on wrapper) */}
        <span className={dashClass} aria-hidden>
          <DashIcon />
        </span>
      </span>

      {label && <span className={labelClass}>{label}</span>}
    </label>
  );
}
