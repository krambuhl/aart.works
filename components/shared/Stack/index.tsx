import type { StackProps } from './types'
import styled from 'styled-components'
import type { SizeToken } from 'types/tokens'

import { tokens } from 'tokens'
import { responsiveProp, responsiveToken } from 'lib/responsive'

export const Stack = styled.div<StackProps>`
  display: flex;
  width: 100%;

  ${({ direction = 'vertical' }) =>
    responsiveProp('flex-direction', direction, (value) =>
      direction === 'vertical' ? 'column' : 'row'
    )};

  ${({ alignment = 'center' }) => responsiveProp('align-items', alignment)};
  ${({ gap = tokens.size.x0 }) => responsiveToken<SizeToken>('gap', gap)};
`
