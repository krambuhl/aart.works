import type {
  HeadingTextProps,
  BodyTextProps,
  DataTextProps,
} from './types'
import styled, { css } from 'styled-components'

import { tokens } from 'tokens'

export const HeadingText = styled.div<HeadingTextProps>`
  ${({ size = 'md' }) =>
    css`
      font-family: ${tokens.fontFamily.heading};
      font-weight: ${tokens.fontWeight.heading};
      font-size: ${tokens.fontSize.heading[size]};
      line-height: ${tokens.lineHeight.heading};
    `}
`

export const BodyText = styled.div.attrs<BodyTextProps>({
  as: 'p',
})<BodyTextProps>`
  ${({ size = 'xl' }) =>
    css`
      font-family: ${tokens.fontFamily.body};
      font-weight: ${tokens.fontWeight.body};
      font-size: ${tokens.fontSize.body[size]};
      line-height: ${tokens.lineHeight.body};
    `}
`

export const DataText = styled.div<DataTextProps>`
  ${({ size = 'md' }) =>
    css`
      font-family: ${tokens.fontFamily.data};
      font-weight: ${tokens.fontWeight.data};
      font-size: ${tokens.fontSize.data[size]};
      line-height: ${tokens.lineHeight.data};
    `}
`
