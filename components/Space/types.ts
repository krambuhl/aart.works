import type { SizeToken } from 'types/tokens'

import { LazyResponsive } from 'lib/responsive'
import { CoreComponent } from 'types/core'
import { PartialFor } from 'types/utils'

export type Directions = 't' | 'r' | 'b' | 'l' | 'h' | 'v' | 'a'

export type MarginProps = {
  [MarginProperty in `m${Directions}`]?: LazyResponsive<SizeToken>
}

export type PaddingProps = {
  [PaddingProperty in `p${Directions}`]?: LazyResponsive<SizeToken>
}

export interface SpaceProps
  extends PartialFor<CoreComponent, 'children'>,
    MarginProps,
    PaddingProps {
  height?: LazyResponsive<SizeToken>
  width?: LazyResponsive<SizeToken>
}
