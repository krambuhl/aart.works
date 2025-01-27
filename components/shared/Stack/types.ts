import type { LazyResponsive } from 'lib/responsive';
import type { CoreComponent } from 'types/core';
import type { SizeToken } from 'types/tokens';

export type StackDirection = 'vertical' | 'horizontal';
export type StackAlignment = 'start' | 'center' | 'end';
export type StackJustify = 'start' | 'center' | 'end';

export interface StackProps extends CoreComponent {
  as?: 'div' | 'section' | 'header' | 'footer';
  direction?: LazyResponsive<StackDirection>;
  alignment?: LazyResponsive<StackAlignment>;
  justify?: LazyResponsive<StackJustify>;
  gap?: LazyResponsive<SizeToken>;
}
