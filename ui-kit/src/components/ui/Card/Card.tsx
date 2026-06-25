// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 413:1320 (docs frame)
// Component symbols: Card=408:18, _CardHeader=408:8, _CardFooter=408:15
//
// Token mapping — Figma variable → project DS token:
//   ui/neutrals/bg-canvas       → --color-neutrals-bg-canvas
//   ui/neutrals/border          → --color-neutrals-border
//   ui/neutrals/content         → --color-neutrals-content
//   ui/neutrals/content-subdued → --color-neutrals-content-subdued
//   radius/radius-8             → --radius-md (8px)
//   spacing/spacing-20 (20px)   → Tailwind px-5  (horizontal padding on all zones)
//   spacing/spacing-12 (12px)   → Tailwind py-3  (vertical padding on CardHeader)
//   spacing/spacing-24 (24px)   → Tailwind pb-6  (CardFooter bottom)
//   spacing/spacing-4  (4px)    → Tailwind gap-1 (CardHeader title↔description gap)
//   spacing/spacing-none (0px)  → Tailwind pt-0  (CardFooter top)
//   H3: Roboto Medium 20px/24lh → --font-size-h3 / --line-height-h3 / font-medium
//   body: Regular 14px/22lh/0.1 → --font-size-body / --line-height-body / --letter-spacing-body
//   No drop shadow in Figma — no shadow prop
//   letter-spacing for H3 = 0px (browser default) — no tracking class needed

import type { HTMLAttributes } from 'react';

function cx(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// ── Card ─────────────────────────────────────────────────────────────────────

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cx(
        'flex flex-col overflow-hidden',
        'rounded-[var(--radius-md)]',
        'border border-[var(--color-neutrals-border)]',
        'bg-[var(--color-neutrals-bg-canvas)]',
        className,
      )}
      {...props}
    />
  );
}

// ── CardHeader ────────────────────────────────────────────────────────────────
// Figma: px-5 (20px horizontal), py-3 (12px vertical), gap-1 (4px between title and description)

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cx('flex flex-col gap-1 px-5 py-3', className)}
      {...props}
    />
  );
}

// ── CardTitle ─────────────────────────────────────────────────────────────────
// Figma: Roboto Medium 20px / 24px line-height / 0px tracking → H3 token set

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({ as: Tag = 'h3', className, ...props }: CardTitleProps) {
  return (
    <Tag
      className={cx(
        'text-[length:var(--font-size-h3)]',
        'font-medium',
        'leading-[var(--line-height-h3)]',
        'text-[var(--color-neutrals-content)]',
        className,
      )}
      {...props}
    />
  );
}

// ── CardDescription ───────────────────────────────────────────────────────────
// Figma: Roboto Regular 14px / 22px line-height / 0.1px tracking → body token set

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cx(
        'text-[length:var(--font-size-body)]',
        'font-normal',
        'leading-[var(--line-height-body)]',
        'tracking-[var(--letter-spacing-body)]',
        'text-[var(--color-neutrals-content-subdued)]',
        className,
      )}
      {...props}
    />
  );
}

// ── CardContent ───────────────────────────────────────────────────────────────
// Figma: content zone has no intrinsic vertical padding — px-5 matches CardHeader/Footer horizontal rhythm

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      className={cx('px-5', className)}
      {...props}
    />
  );
}

// ── CardFooter ────────────────────────────────────────────────────────────────
// Figma: px-5 (20px horizontal), pb-6 (24px bottom), pt-0; flex items-center justify-between

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cx('flex items-center justify-between px-5 pb-6 pt-0', className)}
      {...props}
    />
  );
}
