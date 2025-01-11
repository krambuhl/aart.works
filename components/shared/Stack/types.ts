import type { PropertiesHyphen } from 'csstype';
import type { LazyResponsive } from 'lib/responsive';
import type { CoreComponent } from 'types/core';
import type { SizeToken } from 'types/tokens';

export type StackDirection = 'vertical' | 'horizontal';

export interface StackProps extends CoreComponent {
  as?: 'div' | 'section' | 'header' | 'footer';
  direction?: LazyResponsive<StackDirection>;
  alignment?: LazyResponsive<PropertiesHyphen['align-items']>;
  gap?: LazyResponsive<SizeToken>;
}
