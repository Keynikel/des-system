// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 417:5907 (Chip component set)
//
// Token mapping — Figma variable → project DS token:
//   ui/neutrals/bg-muted         → --color-neutrals-bg-muted        (filled default bg)
//   ui/neutrals/bg-canvas        → --color-neutrals-bg-canvas        (outlined bg)
//   ui/neutrals/bg-noninteractive → --color-neutrals-bg-noninteractive (disabled bg)
//   ui/primary/bg-muted          → --color-primary-bg-muted
//   ui/critical/bg-muted         → --color-critical-bg-muted
//   ui/warning/bg-muted          → --color-warning-bg-muted
//   ui/success/bg-muted          → --color-success-bg-muted
//   ui/neutrals/border           → --color-neutrals-border
//   ui/primary/border            → --color-primary-border
//   ui/critical/border           → --color-critical-border
//   ui/warning/border            → --color-warning-border
//   ui/success/border            → --color-success-border
//   ui/neutrals/content          → --color-neutrals-content
//   ui/neutrals/content-noninteractive → --color-neutrals-content-noninteractive
//   spacing/1,5 (12px)           → px-3
//   spacing/0,5 (4px)            → gap-1 / pr-1
//   radius/s (4px)               → --radius-sm
//   Size/Default h=32px          → h-8
//   Size/Small h=24px            → h-6
//   Size/s (14px body)           → --font-size-body / --line-height-body / --letter-spacing-body
//   Size/xs (12px caption)       → --font-size-caption / --line-height-caption / --letter-spacing-caption
//   Type=Highlighted              → font-semibold (600); same bg as Filled

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { XClose } from '../../../icons/components/general/XClose';

function cx(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export type TagType  = 'filled' | 'outlined' | 'highlighted';
export type TagColor = 'default' | 'primary' | 'error' | 'warning' | 'success';
export type TagSize  = 'sm' | 'md';

export interface TagProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  type?: TagType;
  color?: TagColor;
  size?: TagSize;
  icon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  forceState?: 'hover' | 'focus' | 'disabled';
}

// ── Color maps ────────────────────────────────────────────────────────────────

const filledBg: Record<TagColor, string> = {
  default: 'bg-[var(--color-neutrals-bg-muted)]',
  primary: 'bg-[var(--color-primary-bg-muted)]',
  error:   'bg-[var(--color-critical-bg-muted)]',
  warning: 'bg-[var(--color-warning-bg-muted)]',
  success: 'bg-[var(--color-success-bg-muted)]',
};

const outlinedBorder: Record<TagColor, string> = {
  default: 'border-[var(--color-neutrals-border)]',
  primary: 'border-[var(--color-primary-border)]',
  error:   'border-[var(--color-critical-border)]',
  warning: 'border-[var(--color-warning-border)]',
  success: 'border-[var(--color-success-border)]',
};

// ── Tag ───────────────────────────────────────────────────────────────────────

export function Tag({
  label,
  type = 'filled',
  color = 'default',
  size = 'md',
  icon,
  removable = false,
  onRemove,
  disabled,
  forceState,
  className,
  onClick,
  ...props
}: TagProps) {
  const isDisabled = disabled || forceState === 'disabled';

  const containerBase = cx(
    'inline-flex items-center gap-1 overflow-hidden',
    'rounded-[var(--radius-sm)]',
    'transition-colors',
    removable ? 'pl-3 pr-1' : 'px-3',
    size === 'sm' ? 'h-6' : 'h-8',
  );

  const containerColor = isDisabled
    ? 'bg-[var(--color-neutrals-bg-noninteractive)]'
    : type === 'outlined'
      ? cx('bg-[var(--color-neutrals-bg-canvas)]', 'border border-solid', outlinedBorder[color])
      : filledBg[color];

  const textBase = cx(
    'min-w-0 truncate',
    size === 'sm'
      ? 'text-[length:var(--font-size-caption)] leading-[var(--line-height-caption)] tracking-[var(--letter-spacing-caption)]'
      : 'text-[length:var(--font-size-body)] leading-[var(--line-height-body)] tracking-[var(--letter-spacing-body)]',
    type === 'highlighted' && !isDisabled ? 'font-semibold' : 'font-normal',
    isDisabled
      ? 'text-[var(--color-neutrals-content-noninteractive)]'
      : 'text-[var(--color-neutrals-content)]',
  );

  const forceAttr = forceState ? { [`data-force-${forceState}`]: true } : {};

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={cx(containerBase, containerColor, className)}
      onClick={onClick}
      {...forceAttr}
      {...props}
    >
      {icon && (
        <span className="shrink-0 size-4 flex items-center justify-center text-current">
          {icon}
        </span>
      )}
      <span className={textBase}>{label}</span>
      {removable && (
        <button
          type="button"
          disabled={isDisabled}
          aria-label={`Remove ${label}`}
          onClick={e => {
            e.stopPropagation();
            onRemove?.();
          }}
          className={cx(
            'shrink-0 size-4 flex items-center justify-center opacity-90',
            'rounded-[var(--radius-sm)]',
            'transition-opacity hover:opacity-100',
            isDisabled && 'pointer-events-none',
          )}
        >
          <XClose className="size-3 text-current" />
        </button>
      )}
    </button>
  );
}
