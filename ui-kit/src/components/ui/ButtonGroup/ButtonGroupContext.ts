import { createContext } from 'react';
import type { ButtonSize } from '../../Button/Button';

export interface ButtonGroupContextValue {
  size: ButtonSize;
  orientation: 'horizontal' | 'vertical';
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue>({
  size: 'md',
  orientation: 'horizontal',
});
