import styled, { css } from 'styled-components'

import { tokens } from 'tokens'

import { ButtonLinkProps, ButtonProps } from './types'

const sharedButtonStyles = css`
  display: inline-block;
  cursor: pointer;
  padding: ${tokens.size.x12} ${tokens.size.x24};
  background-color: ${tokens.bg.base.default};
  border: 2px solid ${tokens.fg.muted.default};
  color: ${tokens.fg.muted.default};
  border-radius: ${tokens.size.x8};
`

const interactiveButtonStyles = css`
  &:hover {
    background-color: ${tokens.bg.base.hover};
    border-color: ${tokens.fg.muted.hover};
    color: ${tokens.fg.muted.hover};
  }

  &:active {
    background-color: ${tokens.bg.base.pressed};
    border-color: ${tokens.fg.muted.pressed};
    color: ${tokens.fg.muted.pressed};
  }
`

const disabledButtonStyled = css`
  background-color: ${tokens.bg.alt.default};
  border-color: ${tokens.bg.alt.pressed};
  color: ${tokens.fg.muted.default};
  cursor: not-allowed;
  opacity: 0.6;
`

export const Button = styled.button<ButtonProps>`
  ${sharedButtonStyles};

  ${({ disabled }) =>
    disabled ? disabledButtonStyled : interactiveButtonStyles}
`

export const ButtonLink = styled.a<ButtonLinkProps>`
  ${sharedButtonStyles};
  ${interactiveButtonStyles}
`
