// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 417:11499 (Text field component set)
//
// Token mapping — Figma variable → project DS token:
//   ui/neutrals/bg-canvas              → --color-neutrals-bg-canvas        (container bg)
//   ui/neutrals/border                 → --color-neutrals-border            (default border)
//   (hover inferred from token set)    → --color-neutrals-border-hover      (hover border)
//   ui/primary/border                  → --color-primary-border             (focus border)
//   ui/critical/border                 → --color-critical-border            (error border)
//   ui/neutrals/bg-noninteractive      → --color-neutrals-bg-noninteractive (disabled bg)
//   ui/neutrals/border-noninteractive  → --color-neutrals-border-noninteractive (disabled border)
//   ui/neutrals/content                → --color-neutrals-content           (label + input text)
//   ui/neutrals/content-noninteractive → --color-neutrals-content-noninteractive (placeholder)
//   ui/neutrals/content-subdued        → --color-neutrals-content-subdued   (helper text)
//   ui/critical/content                → --color-critical-content           (error text + asterisk)
//   radius/radius-4 (4px)              → --radius-sm
//   px 12px                            → px-3  (Tailwind = 12 px)
//   py 8px                             → py-2  (Tailwind = 8 px)
//   gap 8px (box items)                → gap-2 (Tailwind = 8 px)
//   gap 4px (outer col + content row)  → gap-1 (Tailwind = 4 px)
//   gap 2px (label–asterisk)           → gap-0.5 (Tailwind = 2 px)
//   leading icon 20 px                 → size-5
//   trailing / error icon 16 px        → size-4

import React, { useId } from 'react';
import { AlertCircle } from '../../../icons/components/alerts-feedback/AlertCircle';

function cx(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label rendered above the input. */
  label?: string;
  /** Marks the field required — adds the * indicator and aria-required. */
  required?: boolean;
  /** Shows "(optional)" text next to the label. */
  optional?: boolean;
  /** Helper text below the input. Hidden when error is present. */
  helperText?: string;
  /** Error message — puts the field into error state and replaces helperText. */
  error?: string;
  /** Leading icon — any React node; rendered at 20 × 20 px. */
  leadingIcon?: React.ReactNode;
  /** Trailing icon — any React node; rendered at 16 × 16 px. Replaced by the error icon when error is set. */
  trailingIcon?: React.ReactNode;
  /** QA / Storybook only — forces a visual state without interaction. */
  forceState?: 'default' | 'hover' | 'focus' | 'error' | 'disabled';
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      required,
      optional,
      helperText,
      error,
      leadingIcon,
      trailingIcon,
      forceState,
      className,
      disabled,
      id,
      name,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? (name ? `input-${name}` : generatedId);
    const helperId = `${inputId}-helper`;
    const errorId  = `${inputId}-error`;

    const isDisabled = disabled || forceState === 'disabled';
    const isError    = !!error  || forceState === 'error';
    const isHover    = forceState === 'hover';
    const isFocus    = forceState === 'focus';

    const forceAttr = forceState ? { [`data-force-${forceState}`]: true } : {};

    // ── Box border ────────────────────────────────────────────────────────────
    const borderClass = isDisabled
      ? 'border-[var(--color-neutrals-border-noninteractive)]'
      : isError
        ? 'border-[var(--color-critical-border)]'
        : isFocus
          ? 'border-[var(--color-primary-border)]'
          : isHover
            ? 'border-[var(--color-neutrals-border-hover)]'
            : 'border-[var(--color-neutrals-border)] hover:border-[var(--color-neutrals-border-hover)] focus-within:border-[var(--color-primary-border)]';

    const boxClass = cx(
      'flex items-center gap-2 px-3 py-2',
      'border border-solid rounded-[var(--radius-sm)]',
      'transition-colors',
      isDisabled
        ? 'bg-[var(--color-neutrals-bg-noninteractive)]'
        : 'bg-[var(--color-neutrals-bg-canvas)]',
      borderClass,
    );

    const inputClass = cx(
      'flex-1 min-w-0 bg-transparent outline-none border-none',
      'text-[length:var(--font-size-body)] leading-[var(--line-height-body)] tracking-[var(--letter-spacing-body)] font-normal',
      'placeholder:text-[var(--color-neutrals-content-noninteractive)]',
      isDisabled
        ? 'cursor-not-allowed text-[var(--color-neutrals-content-noninteractive)]'
        : 'text-[var(--color-neutrals-content)]',
    );

    const captionClass =
      'text-[length:var(--font-size-caption)] leading-[var(--line-height-caption)] tracking-[var(--letter-spacing-caption)] font-normal';

    // Trailing slot: error icon overrides user's trailingIcon
    const showTrailing   = isError || !!trailingIcon;
    const trailingContent = isError
      ? <AlertCircle className="size-4 text-[var(--color-critical-content)]" />
      : trailingIcon;

    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <div
        className={cx('flex flex-col gap-1', className)}
        aria-disabled={isDisabled || undefined}
        {...forceAttr}
      >
        {/* ── Label ─────────────────────────────────────────────────────────── */}
        {label && (
          <div className="flex gap-0.5 items-start">
            <div className="flex gap-1 items-center">
              <label
                htmlFor={inputId}
                className={cx(
                  'text-[length:var(--font-size-body)] leading-[var(--line-height-body)] tracking-[var(--letter-spacing-body)] font-normal',
                  'text-[var(--color-neutrals-content)]',
                )}
              >
                {label}
              </label>
              {optional && (
                <span
                  className={cx(
                    captionClass,
                    'italic text-[var(--color-neutrals-content-noninteractive)]',
                  )}
                >
                  (optional)
                </span>
              )}
            </div>
            {required && (
              <span
                aria-hidden="true"
                className="text-[var(--color-critical-content)] text-[length:var(--font-size-body)] leading-[var(--line-height-body)] font-medium"
              >
                *
              </span>
            )}
          </div>
        )}

        {/* ── Input box ─────────────────────────────────────────────────────── */}
        <div className={boxClass}>
          {/* Content row: leading icon + native input */}
          <div className="flex-1 flex items-center gap-1 min-w-0">
            {leadingIcon && (
              <span className="shrink-0 size-5 flex items-center justify-center text-[var(--color-neutrals-content-noninteractive)]">
                {leadingIcon}
              </span>
            )}
            <input
              ref={ref}
              id={inputId}
              name={name}
              disabled={isDisabled}
              aria-required={required || undefined}
              aria-invalid={isError || undefined}
              aria-describedby={describedBy}
              aria-errormessage={error ? errorId : undefined}
              className={inputClass}
              {...props}
            />
          </div>

          {/* Trailing icon slot — absent from DOM when empty */}
          {showTrailing && (
            <span className="shrink-0 size-4 flex items-center justify-center text-current">
              {trailingContent}
            </span>
          )}
        </div>

        {/* ── Helper / error text ────────────────────────────────────────────── */}
        {error ? (
          <p
            id={errorId}
            role="alert"
            className={cx(captionClass, 'text-[var(--color-critical-content)]')}
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className={cx(captionClass, 'text-[var(--color-neutrals-content-subdued)]')}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

// ── Textarea ──────────────────────────────────────────────────────────────────
// Same token mapping as Input; no icon slots.

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  helperText?: string;
  error?: string;
  rows?: number;
  forceState?: 'default' | 'hover' | 'focus' | 'error' | 'disabled';
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      required,
      optional,
      helperText,
      error,
      rows = 4,
      forceState,
      className,
      disabled,
      id,
      name,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? (name ? `textarea-${name}` : generatedId);
    const helperId = `${inputId}-helper`;
    const errorId  = `${inputId}-error`;

    const isDisabled = disabled || forceState === 'disabled';
    const isError    = !!error  || forceState === 'error';
    const isHover    = forceState === 'hover';
    const isFocus    = forceState === 'focus';

    const forceAttr = forceState ? { [`data-force-${forceState}`]: true } : {};

    const borderClass = isDisabled
      ? 'border-[var(--color-neutrals-border-noninteractive)]'
      : isError
        ? 'border-[var(--color-critical-border)]'
        : isFocus
          ? 'border-[var(--color-primary-border)]'
          : isHover
            ? 'border-[var(--color-neutrals-border-hover)]'
            : 'border-[var(--color-neutrals-border)] hover:border-[var(--color-neutrals-border-hover)] focus-within:border-[var(--color-primary-border)]';

    const boxClass = cx(
      'px-3 py-2',
      'border border-solid rounded-[var(--radius-sm)]',
      'transition-colors',
      isDisabled
        ? 'bg-[var(--color-neutrals-bg-noninteractive)]'
        : 'bg-[var(--color-neutrals-bg-canvas)]',
      borderClass,
    );

    const textareaClass = cx(
      'w-full bg-transparent outline-none border-none resize-y',
      'text-[length:var(--font-size-body)] leading-[var(--line-height-body)] tracking-[var(--letter-spacing-body)] font-normal',
      'placeholder:text-[var(--color-neutrals-content-noninteractive)]',
      isDisabled
        ? 'cursor-not-allowed text-[var(--color-neutrals-content-noninteractive)]'
        : 'text-[var(--color-neutrals-content)]',
    );

    const captionClass =
      'text-[length:var(--font-size-caption)] leading-[var(--line-height-caption)] tracking-[var(--letter-spacing-caption)] font-normal';

    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <div
        className={cx('flex flex-col gap-1', className)}
        aria-disabled={isDisabled || undefined}
        {...forceAttr}
      >
        {label && (
          <div className="flex gap-0.5 items-start">
            <div className="flex gap-1 items-center">
              <label
                htmlFor={inputId}
                className={cx(
                  'text-[length:var(--font-size-body)] leading-[var(--line-height-body)] tracking-[var(--letter-spacing-body)] font-normal',
                  'text-[var(--color-neutrals-content)]',
                )}
              >
                {label}
              </label>
              {optional && (
                <span className={cx(captionClass, 'italic text-[var(--color-neutrals-content-noninteractive)]')}>
                  (optional)
                </span>
              )}
            </div>
            {required && (
              <span
                aria-hidden="true"
                className="text-[var(--color-critical-content)] text-[length:var(--font-size-body)] leading-[var(--line-height-body)] font-medium"
              >
                *
              </span>
            )}
          </div>
        )}

        <div className={boxClass}>
          <textarea
            ref={ref}
            id={inputId}
            name={name}
            rows={rows}
            disabled={isDisabled}
            aria-required={required || undefined}
            aria-invalid={isError || undefined}
            aria-describedby={describedBy}
            aria-errormessage={error ? errorId : undefined}
            className={textareaClass}
            {...props}
          />
        </div>

        {error ? (
          <p
            id={errorId}
            role="alert"
            className={cx(captionClass, 'text-[var(--color-critical-content)]')}
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className={cx(captionClass, 'text-[var(--color-neutrals-content-subdued)]')}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);
