// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 440:13 (Switch component set, page 436:438)
//
// Token mapping — Figma variable → project DS token:
// UI/neutrals/bg                      → --color-neutrals-bg          (track OFF fill)
// UI/primary/bg                       → --color-primary-bg            (track ON fill)
// UI/neutrals/bg-noninteractive       → --color-neutrals-bg-noninteractive (track disabled fill)
// UI/neutrals/border-noninteractive   → --color-neutrals-border-noninteractive (track border + thumb stroke)
// UI/neutrals/bg-canvas               → --color-neutrals-bg-canvas    (thumb fill)
// UI/primary/border                   → --color-primary-border         (focus ring)
//
// TOKEN MISSING:
//   cornerRadius 9999 (pill) — no radius/full variable in Primitives collection; hardcoded to 9999px
//   disabled opacity 0.4     — no disabled-opacity token; hardcoded to 0.4 on wrapper

import type { ChangeEvent, ReactNode } from 'react';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  id?: string;
  'aria-label'?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
  forceState?: 'default' | 'hover' | 'focus' | 'disabled';
}

export function Switch({
  checked,
  defaultChecked,
  disabled = false,
  label,
  id,
  'aria-label': ariaLabel,
  onChange,
  className,
  forceState,
}: SwitchProps) {
  const isDisabled = disabled || forceState === 'disabled';
  const isControlled = checked !== undefined;

  const trackClass = [
    'sw-track',
    'absolute inset-0',
    'rounded-[9999px]',
    // Figma 434:5419: track border = same color as fill → invisible seam
    'border border-[var(--color-neutrals-bg-muted)]',
    'bg-[var(--color-neutrals-bg-muted)]',
    'transition-colors duration-150',
    // Checked
    'peer-checked:bg-[var(--color-primary-bg)]',
    'peer-checked:border-transparent',
    // Disabled (compound for disabled+checked override lives in switch.css)
    'peer-disabled:bg-[var(--color-neutrals-bg-noninteractive)]',
    'peer-disabled:border-[var(--color-neutrals-border-noninteractive)]',
    // Focus ring
    !isDisabled && 'peer-focus-visible:outline-2',
    !isDisabled && 'peer-focus-visible:outline-[var(--color-primary-border)]',
    !isDisabled && 'peer-focus-visible:outline-offset-2',
    !isDisabled && forceState === 'focus' && 'outline-2 outline-[var(--color-primary-border)] outline-offset-2',
  ].filter(Boolean).join(' ');

  const thumbClass = [
    'absolute top-0.5 left-0.5',
    'size-3',
    'rounded-[9999px]',
    // Figma 434:5419: thumb fill = bg-canvas (white); thumb border = bg-muted (blends with track)
    'bg-[var(--color-neutrals-bg-canvas)]',
    'border border-[var(--color-neutrals-bg-muted)]',
    'transition-transform duration-150',
    'pointer-events-none',
    // ON: shift right by (track width 32px - thumb 12px - 2px left padding - 2px right padding) = 16px
    'peer-checked:translate-x-4',
  ].join(' ');

  const wrapperClass = [
    'inline-flex items-center gap-2',
    isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ');

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

  return (
    <label className={wrapperClass}>
      {/* 32×16px relative container for peer selector scope */}
      <span className="relative shrink-0 w-8 h-4">
        <input
          type="checkbox"
          role="switch"
          id={id}
          aria-label={ariaLabel}
          className="peer sw-input sr-only"
          disabled={isDisabled}
          aria-disabled={isDisabled || undefined}
          {...(isControlled
            ? { checked, onChange: (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked) }
            : { defaultChecked, onChange: (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked) })}
        />
        <span className={trackClass} aria-hidden />
        <span className={thumbClass} aria-hidden />
      </span>

      {label && <span className={labelClass}>{label}</span>}
    </label>
  );
}
