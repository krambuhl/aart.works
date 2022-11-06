import { PropertiesHyphen } from 'csstype'
import type { SizeToken } from 'types/tokens'

import { LazyResponsive } from 'lib/responsive'
import { CoreComponent } from 'types/core'

export type StackDirection = 'vertical' | 'horizontal'

export interface StackProps extends CoreComponent {
  as?: 'div' | 'section' | 'header' | 'footer'
  direction?: LazyResponsive<StackDirection>
  alignment?: LazyResponsive<PropertiesHyphen['align-items']>
  gap?: LazyResponsive<SizeToken>
}
