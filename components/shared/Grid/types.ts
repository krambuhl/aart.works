import type { PropertiesHyphen } from 'csstype';
import type { CoreComponent } from 'types/core';
import type { SizeToken, WidthToken } from 'types/tokens';

export interface GridProps extends CoreComponent {
  gap?: SizeToken;
  columns?: PropertiesHyphen['grid-template-columns'];
  rows?: PropertiesHyphen['grid-template-rows'];
}

export interface AutoGridProps extends CoreComponent {
  gap?: SizeToken;
  width: WidthToken;
}
