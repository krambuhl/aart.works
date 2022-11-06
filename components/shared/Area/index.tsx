import styled from 'styled-components'
import type { AreaProps } from './types'

import { tokens } from 'tokens'

export const Area = styled.div<AreaProps>`
  margin: auto;
  max-width: ${({ width = tokens.width.x768 }) => width};
  width: 100%;
`
