// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 381:943 (↳ Radio button page)
// Variant nodes: Unchecked/Default 381:1823 · Checked/Default 381:1830
//               Unchecked/Hover 381:1844 · Unchecked/Disabled 381:1896 · Checked/Disabled 381:1902
//
// Token mapping — Figma variable → project DS token:
//   neutrals/content                   → --color-neutrals-content
//   ui/neutrals/content-subdued        → --color-neutrals-content-subdued
//   ui/neutrals/content-noninteractive → --color-neutrals-content-noninteractive
//   ui/neutrals/border-noninteractive  → --color-neutrals-border-noninteractive
//   ui/neutrals/bg-noninteractive      → --color-neutrals-bg-noninteractive
//   ui/primary/bg                      → --color-primary-bg
//   palette/white                      → --color-palette-white
//   spacing/spacing-8                  → --spacing-sm  (8px: gap circle ↔ label)
//   spacing/spacing-24                 → --spacing-lg  (24px: description left padding)
//   radius/radius-full                 → --radius-full (9999px: circle shape)
//
// Hover ring: 0 0 0 3px var(--color-primary-bg-muted)
//   TOKEN MISSING: ring-width 3px — no semantic DS token; approximated from
//   Figma geometry (box framer extends inset -50% on 16px indicator = 8px expansion)
//
// Checked+disabled circle fill handled in styles/radiobutton.css
// (compound :checked:disabled rule — too specific for Tailwind peer chaining)

import type { ChangeEvent, ReactNode } from 'react';
import '../../../styles/radiobutton.css';

export interface RadioButtonProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  name?: string;
  value?: string;
  'aria-label'?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  /** QA / Storybook only — forces a visual state without changing real DOM state. */
  forceState?: 'default' | 'hover' | 'focus' | 'disabled';
}

export function RadioButton({
  checked,
  defaultChecked,
  disabled = false,
  label,
  description,
  name,
  value,
  'aria-label': ariaLabel,
  onChange,
  className,
  forceState,
}: RadioButtonProps) {
  const isDisabled = disabled || forceState === 'disabled';
  const isControlled = checked !== undefined;

  // ── Outer circle (peer sibling of input) ─────────────────────────────────────
  // rb-circle is a CSS hook for the compound checked+disabled rule in radiobutton.css.
  const circleClass = [
    'rb-circle',
    'absolute inset-0',
    'rounded-[var(--radius-full)]',
    'border border-[var(--color-neutrals-border-noninteractive)]',
    'bg-transparent',
    'transition-all duration-150',

    // Checked: primary fill, border hides
    'peer-checked:bg-[var(--color-primary-bg)]',
    'peer-checked:border-transparent',

    // Hover ring — only when interactive
    // TOKEN MISSING: ring-width 3px — no semantic DS token
    !isDisabled && 'group-hover:shadow-[0_0_0_3px_var(--color-primary-bg-muted)]',
    !isDisabled && forceState === 'hover' && 'shadow-[0_0_0_3px_var(--color-primary-bg-muted)]',

    // Focus outline — only when interactive
    !isDisabled && 'peer-focus-visible:outline-2',
    !isDisabled && 'peer-focus-visible:outline-[var(--color-primary-border)]',
    !isDisabled && 'peer-focus-visible:outline-offset-2',
    !isDisabled && forceState === 'focus' && 'outline-2 outline-[var(--color-primary-border)] outline-offset-2',

    // Disabled unchecked: muted bg, noninteractive border, no ring
    'peer-disabled:bg-[var(--color-neutrals-bg-noninteractive)]',
    'peer-disabled:border-[var(--color-neutrals-border-noninteractive)]',
    'peer-disabled:shadow-none',
    'peer-disabled:cursor-not-allowed',
  ].filter(Boolean).join(' ');

  // ── Inner dot wrapper (peer sibling — becomes visible on :checked) ────────────
  const dotWrapperClass = [
    'absolute inset-0',
    'flex items-center justify-center',
    'opacity-0 peer-checked:opacity-100',
    'transition-opacity duration-150',
    'pointer-events-none',
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

  // ── Description text ─────────────────────────────────────────────────────────
  const descriptionClass = [
    'select-none',
    'text-[length:var(--font-size-caption)]',
    'font-normal',
    'leading-[var(--line-height-caption)]',
    'tracking-[var(--letter-spacing-caption)]',
    isDisabled
      ? 'text-[var(--color-neutrals-content-noninteractive)]'
      : 'text-[var(--color-neutrals-content-subdued)]',
  ].join(' ');

  const wrapperClass = [
    'group inline-flex flex-col items-start',
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ');

  const inputEventProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value ?? '', e),
  };

  return (
    <label
      className={wrapperClass}
      data-force-state={forceState && forceState !== 'default' ? forceState : undefined}
    >
      {/* Content row: circle indicator + label */}
      <span className="inline-flex items-center gap-[var(--spacing-sm)]">
        <span className="relative shrink-0 size-4">
          <input
            type="radio"
            className="peer rb-input sr-only"
            name={name}
            value={value}
            aria-label={ariaLabel}
            disabled={isDisabled}
            aria-disabled={isDisabled || undefined}
            {...(isControlled
              ? { checked, ...inputEventProps }
              : { defaultChecked, ...inputEventProps })}
          />

          {/* Visual circle (peer sibling — receives peer-checked, peer-focus-visible, peer-disabled) */}
          <span className={circleClass} aria-hidden />

          {/* Inner dot (peer sibling — opacity toggled by peer-checked) */}
          <span className={dotWrapperClass} aria-hidden>
            <span className="size-1.5 rounded-[var(--radius-full)] bg-[var(--color-palette-white)]" />
          </span>
        </span>

        {label && <span className={labelClass}>{label}</span>}
      </span>

      {/* Description row — indented by spacing-lg (24px = 16px circle + 8px gap) */}
      {description && (
        <span className="pl-[var(--spacing-lg)]">
          <span className={descriptionClass}>{description}</span>
        </span>
      )}
    </label>
  );
}
