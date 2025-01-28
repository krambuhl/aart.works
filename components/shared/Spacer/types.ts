import type { CoreComponent } from 'types/core';
import type { SizeToken } from 'types/tokens';

import { ValueOrResponsive } from 'utilities/opaque-responsive';

export type Directions = 't' | 'r' | 'b' | 'l' | 'h' | 'v' | 'a';

export type MarginProps = {
  [MarginProperty in `m${Directions}`]?: ValueOrResponsive<SizeToken>;
};

export type PaddingProps = {
  [PaddingProperty in `p${Directions}`]?: ValueOrResponsive<SizeToken>;
};

export interface SpacerProps extends CoreComponent, MarginProps, PaddingProps {
  as?: 'div' | 'section' | 'header' | 'footer';
}
