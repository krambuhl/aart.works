import type { LazyResponsive } from 'lib/responsive'
import type { CoreComponent } from 'types/core'
import type { SizeToken } from 'types/tokens'
import type { PartialFor } from 'types/utils'

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
