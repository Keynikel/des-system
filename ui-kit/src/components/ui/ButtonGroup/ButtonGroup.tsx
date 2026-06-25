/* Figma: uo2jhkx6oBwYpiFJxWnLJf  node 387:696
 *
 * The ButtonGroup page was empty at inspection time — component not yet built
 * in Figma. Design follows DS conventions: zero-gap inline-flex with shared
 * 1 px borders (--color-neutrals-border) and outer-only --radius-md corners.
 *
 * Border collapsing is handled in src/styles/button-group.css (unlayered CSS
 * so it outranks Tailwind @layer utilities on Button's rounded-[...] class).
 *
 * Reusable at both levels:
 *   <ButtonGroup asRow>          — outer row wrapper with --spacing-2 gap
 *     <ButtonGroup>…</ButtonGroup>   — inner sub-group (border-collapsed)
 *   </ButtonGroup>
 */

import type { ReactNode } from 'react';
import { ButtonGroupContext } from './ButtonGroupContext';
import type { ButtonSize } from '../../Button/Button';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Propagated via context so child Buttons self-align their size without
   * receiving the prop explicitly. Defaults to "md".
   */
  size?: ButtonSize;

  /**
   * "vertical" collapses top/bottom borders and stacks children.
   * Defaults to "horizontal".
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Render the outer row wrapper (gap between sub-groups, no border collapse).
   * Use on the outermost ButtonGroup when nesting sub-groups inside it.
   */
  asRow?: boolean;

  children?: ReactNode;
}

export function ButtonGroup({
  size = 'md',
  orientation = 'horizontal',
  asRow = false,
  className,
  children,
  ...rest
}: ButtonGroupProps) {
  if (asRow) {
    return (
      <div
        className={['btn-group-row', className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <ButtonGroupContext.Provider value={{ size, orientation }}>
      <div
        className={['btn-group', className].filter(Boolean).join(' ')}
        data-orientation={orientation === 'vertical' ? 'vertical' : undefined}
        {...rest}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}
