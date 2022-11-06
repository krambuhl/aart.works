import NextLink from 'next/link'
import styled from 'styled-components'
import type { LinkProps } from './types'

import { tokens } from 'tokens'

const Root = styled.a`
  text-decoration: underline;
  color: ${tokens.primary.action.default};

  &:hover {
    text-decoration-thickness: 0.2em;
    color: ${tokens.primary.action.hover};
  }

  &:active {
    color: ${tokens.primary.action.pressed};
    text-decoration-color: var(--primary-action-default);
  }
`

export function Link({ href, children, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <Link.StyledRoot {...props}>{children}</Link.StyledRoot>
    </NextLink>
  )
}

Link.StyledRoot = Root
