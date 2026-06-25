// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — design system body text token
// Lightweight label element — pairs with Switch (or any form control) via htmlFor/id.

import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  function Label({ className, children, ...props }, ref) {
    return (
      <label
        ref={ref}
        className={[
          'text-[length:var(--font-size-body)]',
          'leading-[var(--line-height-body)]',
          'tracking-[var(--letter-spacing-body)]',
          'font-normal',
          'text-[var(--color-neutrals-content)]',
          'select-none',
          'cursor-pointer',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </label>
    );
  },
);
