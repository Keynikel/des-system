// Source of truth: Figma component set 290:33, node 286:870 (file uo2jhkx6oBwYpiFJxWnLJf).
// AccordionGroup = node 288:2122. Example = node 288:1901.
//
// Figma's static "state" variants map to runtime CSS:
//   Hover  → CSS :hover on the trigger button
//   Disabled → `disabled` prop
// The "collapsed" prop (Figma variant) becomes runtime toggle state.

import { createContext, useContext, useId, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from '../icons/components/arrows/ChevronDown';
import { ChevronUp } from '../icons/components/arrows/ChevronUp';

// ─── Group context ─────────────────────────────────────────────────────────────

interface GroupCtxValue {
  openIds: Set<string>;
  registerDefault: (id: string) => void;
  toggle: (id: string) => void;
}

const GroupCtx = createContext<GroupCtxValue | null>(null);

// ─── AccordionGroup ────────────────────────────────────────────────────────────

export interface AccordionGroupProps {
  children: React.ReactNode;
  /** Allow multiple items to be open simultaneously. Defaults to false (single-open). */
  multiple?: boolean;
  className?: string;
}

export function AccordionGroup({
  children,
  multiple = false,
  className = '',
}: AccordionGroupProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const firstRegistered = useRef(false);

  function registerDefault(id: string) {
    if (multiple) {
      setOpenIds(prev => new Set([...prev, id]));
    } else {
      if (!firstRegistered.current) {
        firstRegistered.current = true;
        setOpenIds(new Set([id]));
      }
    }
  }

  function toggle(id: string) {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <GroupCtx.Provider value={{ openIds, registerDefault, toggle }}>
      <div
        className={[
          'flex flex-col items-start w-full rounded-[var(--radius-lg)]',
          className,
        ].filter(Boolean).join(' ')}
      >
        {children}
      </div>
    </GroupCtx.Provider>
  );
}

// ─── AccordionItem ─────────────────────────────────────────────────────────────
//
// Spacing from Figma tokens (mapped to project equivalents):
//   item px  = --spacing/spacing-xs (4 px)  → var(--spacing-xs)
//   trigger py = --spacing/spacing-lg (12 px) → py-3
//   trigger gap  = 8 px                       → gap-2
//   content pb = --spacing/spacing-md (8 px)  → pb-2

export interface AccordionItemProps {
  title: string;
  children?: React.ReactNode;
  disabled?: boolean;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  disabled = false,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onToggle,
  className = '',
}: AccordionItemProps) {
  const uid = useId();
  // useId produces strings like ":r0:" — sanitise for use in HTML id attributes
  const safeId = uid.replace(/:/g, '');
  const triggerId = `acc-trigger-${safeId}`;
  const contentId = `acc-content-${safeId}`;

  const ctx = useContext(GroupCtx);
  const [standalone, setStandalone] = useState(defaultExpanded);
  const registered = useRef(false);

  // Register with the group synchronously before first paint (useLayoutEffect)
  // so the group opens this item without a visible flash.
  useLayoutEffect(() => {
    if (ctx && defaultExpanded && !registered.current) {
      registered.current = true;
      ctx.registerDefault(uid);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isExpanded = ctx
    ? ctx.openIds.has(uid)
    : controlledExpanded !== undefined
      ? controlledExpanded
      : standalone;

  function handleToggle() {
    if (disabled) return;
    if (ctx) {
      ctx.toggle(uid);
    } else if (controlledExpanded !== undefined) {
      onToggle?.(!isExpanded);
    } else {
      setStandalone(v => !v);
    }
  }

  return (
    <div
      className={[
        'flex flex-col items-start w-full px-[var(--spacing-xs)]',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* AccordionTrigger ── Figma: flex gap-8px py-12px */}
      <button
        type="button"
        id={triggerId}
        disabled={disabled}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={handleToggle}
        className={[
          'flex w-full gap-2 items-center py-3 text-left',
          'outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-border)] focus-visible:ring-inset',
          disabled
            ? 'cursor-not-allowed'
            : 'cursor-pointer hover:bg-[var(--color-neutrals-bg-hover)]',
        ].join(' ')}
      >
        {/* Title ── Figma: Roboto Medium 16/20, ui/neutrals/content */}
        <span
          className={[
            'flex-1 font-medium text-base leading-5 min-w-0',
            disabled
              ? 'text-[var(--color-neutrals-content-noninteractive)]'
              : 'text-[var(--color-neutrals-content)]',
          ].join(' ')}
        >
          {title}
        </span>

        {/* ChevronIcon ── 16 px; down=51:893 collapsed, up=51:917 expanded */}
        {isExpanded && !disabled ? (
          <ChevronUp
            width={16}
            height={16}
            aria-hidden
            className="shrink-0 text-[var(--color-neutrals-content)]"
          />
        ) : (
          <ChevronDown
            width={16}
            height={16}
            aria-hidden
            className={[
              'shrink-0',
              disabled
                ? 'text-[var(--color-neutrals-content-noninteractive)]'
                : 'text-[var(--color-neutrals-content)]',
            ].join(' ')}
          />
        )}
      </button>

      {/* AccordionContent ── CSS grid-rows trick for height animation */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={[
          'grid w-full transition-[grid-template-rows] duration-200 ease-out',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="overflow-hidden">
          {/* pb = --spacing/spacing-md (8 px) */}
          <div className="pb-2">
            {children}
          </div>
        </div>
      </div>

      {/* Divider ── ui/neutrals/border, always at item bottom */}
      <div
        aria-hidden
        className="bg-[var(--color-neutrals-border)] h-px w-full shrink-0"
      />
    </div>
  );
}
