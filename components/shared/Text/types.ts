import type { CoreComponent } from 'types/core';

import { ValueOrResponsive } from 'utilities/opaque-responsive';

export type TextElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div';
export type TextType = 'heading' | 'body' | 'data';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface HeadingTextProps extends CoreComponent {
  as: TextElement;
  size?: ValueOrResponsive<TextSize>;
}

export interface BodyTextProps extends CoreComponent {
  as?: TextElement;
  size?: ValueOrResponsive<TextSize>;
}

export interface DataTextProps extends CoreComponent {
  as?: TextElement;
  size?: ValueOrResponsive<TextSize>;
}
