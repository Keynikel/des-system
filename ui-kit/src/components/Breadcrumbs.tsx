// Source of truth: Figma 293:1319 (file uo2jhkx6oBwYpiFJxWnLJf).
// BreadcrumbLink 293:1416 · BreadcrumbSeparator 293:1454 · Breadcrumbs 293:1481.
//
// Token mapping:
//   spacing/0,5 = 2px → --spacing-0-5
//   body style (Roboto Regular 14/22/0.1px) → --font-size-body / --line-height-body / --letter-spacing-body
//   Caption style (Roboto Regular 12/20/0.2px) → --font-size-caption / --line-height-caption / --letter-spacing-caption
//   link/sep color: UI/neutrals/content-subdued → --color-neutrals-content-subdued
//   current/disabled: UI/neutrals/content-noninteractive → --color-neutrals-content-noninteractive
//   hover underline stroke: UI/neutrals/border → --color-neutrals-border
//   cut bg: UI/neutrals/bg-canvas → --color-neutrals-bg-canvas

import { useState } from 'react';
import { ChevronRight } from '../icons/components/arrows/ChevronRight';

// ── Typography class strings (Figma text styles) ──────────────────────────────

// "body": Roboto Regular 14/22, 0.1px letter-spacing
const BODY = [
  'font-normal',
  'text-[length:var(--font-size-body)]',
  'leading-[var(--line-height-body)]',
  'tracking-[var(--letter-spacing-body)]',
].join(' ');

// "Caption": Roboto Regular 12/20, 0.2px letter-spacing
const CAPTION = [
  'font-normal',
  'text-[length:var(--font-size-caption)]',
  'leading-[var(--line-height-caption)]',
  'tracking-[var(--letter-spacing-caption)]',
].join(' ');

// ── BreadcrumbLink ────────────────────────────────────────────────────────────
// Figma: 293:1416.
//   state=Default → <a> with hover underline (group-hover border-b neutrals/border)
//   state=Disabled/current → non-interactive <span> with aria-current="page"
//   type=cut → <button> "…" (Caption style) to expand collapsed items

export interface BreadcrumbLinkProps {
  label: string;
  href?: string;
  /** Optional 16 px leading icon; consumer sizes it. Inherits currentColor. Figma: 293:1418. */
  icon?: React.ReactNode;
  /** 'text' = normal link; 'cut' = "…" expand trigger (Caption style). */
  type?: 'text' | 'cut';
  /** Current page — non-interactive, aria-current="page". Figma state=Disabled. */
  current?: boolean;
  onClick?: () => void;
  className?: string;
}

export function BreadcrumbLink({
  label,
  href,
  icon,
  type = 'text',
  current = false,
  onClick,
  className = '',
}: BreadcrumbLinkProps) {
  // gap between icon and label: spacing/0,5 = 2px
  const base = 'inline-flex items-center gap-[var(--spacing-0-5)] shrink-0';
  const focusRing = 'outline-none rounded-[var(--radius-xs)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary-border)] focus-visible:ring-offset-1';

  if (type === 'cut') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={[
          base,
          CAPTION,
          'text-[var(--color-neutrals-content-subdued)] cursor-pointer',
          focusRing,
          className,
        ].filter(Boolean).join(' ')}
      >
        …
      </button>
    );
  }

  if (current) {
    return (
      <span
        aria-current="page"
        className={[base, className].filter(Boolean).join(' ')}
      >
        {icon && (
          <span
            className="shrink-0 size-4 inline-flex items-center justify-center text-[var(--color-neutrals-content-noninteractive)]"
            aria-hidden
          >
            {icon}
          </span>
        )}
        <span
          className={[
            BODY,
            'text-[var(--color-neutrals-content-noninteractive)]',
            'max-w-[360px] overflow-hidden text-ellipsis whitespace-nowrap',
            // Reserve underline space permanently; keep transparent so height == active link height.
            'border-b border-transparent',
          ].join(' ')}
        >
          {label}
        </span>
      </span>
    );
  }

  return (
    <a
      href={href}
      className={[base, 'group', focusRing, className].filter(Boolean).join(' ')}
    >
      {icon && (
        <span
          className="shrink-0 size-4 inline-flex items-center justify-center text-[var(--color-neutrals-content-subdued)]"
          aria-hidden
        >
          {icon}
        </span>
      )}
      {/* 1px border always present; color transitions from transparent → neutrals/border on hover. No layout shift. */}
      <span
        className={[
          BODY,
          'text-[var(--color-neutrals-content-subdued)]',
          'max-w-[360px] overflow-hidden text-ellipsis whitespace-nowrap',
          'border-b border-transparent transition-colors',
          'group-hover:border-[var(--color-neutrals-border)]',
        ].join(' ')}
      >
        {label}
      </span>
    </a>
  );
}

// ── BreadcrumbSeparator ───────────────────────────────────────────────────────
// Figma: 293:1454.
//   "/" variant (293:1455): body-sized text character, px = spacing/0,5.
//   ">" variant (293:1457): ChevronRight icon at 16 px, px = spacing/0,5.

export type BreadcrumbSeparatorType = '/' | '>';

export interface BreadcrumbSeparatorProps {
  separator?: BreadcrumbSeparatorType;
  className?: string;
}

export function BreadcrumbSeparator({ separator = '/', className = '' }: BreadcrumbSeparatorProps) {
  return (
    <span
      aria-hidden
      className={[
        'inline-flex items-center justify-center shrink-0',
        'px-[var(--spacing-0-5)]',
        className,
      ].filter(Boolean).join(' ')}
    >
      {separator === '/' ? (
        <span
          className={[
            'text-[length:var(--font-size-body)] tracking-[var(--letter-spacing-body)]',
            'text-[var(--color-neutrals-content-subdued)] select-none leading-none',
          ].join(' ')}
        >
          /
        </span>
      ) : (
        <ChevronRight
          width={16}
          height={16}
          className="text-[var(--color-neutrals-content-subdued)]"
        />
      )}
    </span>
  );
}

// ── Breadcrumbs ───────────────────────────────────────────────────────────────
// Figma: 293:1481.
//   Items drive the trail; the last item is always current (aria-current="page").
//   collapsible: collapses middle items behind a "…" cut button (Figma: Cutted=True).
//   Clicking "…" expands to the full trail.

export interface BreadcrumbItem {
  label: string;
  href?: string;
  /** Optional 16 px leading icon (sized by consumer). */
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparatorType;
  /** When true, collapses middle items behind a "…" button when items.length > 2. */
  collapsible?: boolean;
  className?: string;
}

type VisibleEntry =
  | { kind: 'item'; item: BreadcrumbItem; current: boolean }
  | { kind: 'cut' };

export function Breadcrumbs({
  items,
  separator = '/',
  collapsible = false,
  className = '',
}: BreadcrumbsProps) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const isCollapsed = collapsible && !expanded && items.length > 2;

  const entries: VisibleEntry[] = isCollapsed
    ? [
        { kind: 'item', item: items[0],                current: false },
        { kind: 'cut' },
        { kind: 'item', item: items[items.length - 1], current: true  },
      ]
    : items.map((item, i) => ({
        kind: 'item' as const,
        item,
        current: i === items.length - 1,
      }));

  return (
    <nav aria-label="Breadcrumb">
      <ol className={['inline-flex items-center flex-wrap', className].filter(Boolean).join(' ')}>
        {entries.map((entry, idx) => {
          const isLast = idx === entries.length - 1;
          return (
            <li key={idx} className="inline-flex items-center">
              {entry.kind === 'cut' ? (
                <BreadcrumbLink
                  label="…"
                  type="cut"
                  onClick={() => setExpanded(true)}
                />
              ) : (
                <BreadcrumbLink
                  label={entry.item.label}
                  href={entry.item.href}
                  icon={entry.item.icon}
                  current={entry.current}
                />
              )}
              {!isLast && <BreadcrumbSeparator separator={separator} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
