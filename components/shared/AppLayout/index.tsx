import type { AppLayoutProps } from './types'

import styled from 'styled-components'

import { Area } from 'components/shared/Area'
import { Space } from 'components/shared/Space'
import { tokens } from 'tokens'

const Root = styled(Area)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`

const Main = styled(Space)`
  flex-grow: 1;
  width: 100%;
`

export function AppLayout({
  width = tokens.width.x1280,
  children,
  ...props
}: AppLayoutProps) {
  return (
    <Root width={width} {...props}>
      <Main
        id="content"
        pv={{
          xs: tokens.size.x32,
          sm: tokens.size.x56,
          md: tokens.size.x72,
        }}
        ph={tokens.size.x24}
      >
        {children}
      </Main>
    </Root>
  )
}

AppLayout.StyledRoot = Root
