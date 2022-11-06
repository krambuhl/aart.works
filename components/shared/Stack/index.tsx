import type { StackProps } from './types'
import type { SizeToken } from 'types/tokens'

import styled from 'styled-components'

import { responsiveProp, responsiveToken } from 'lib/responsive'
import { tokens } from 'tokens'

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
