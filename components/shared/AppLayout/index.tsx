import type { AppLayoutProps } from './types'

import NextLink from 'next/link'
import styled from 'styled-components'

import { Area } from 'components/shared/Area'
import { Space } from 'components/shared/Space'
import { Stack } from 'components/shared/Stack'
import { HeadingText } from 'components/shared/Text'
import { constants } from 'data'
import { tokens } from 'tokens'

const Root = styled(Area)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`

const Header = styled(Stack)`
  justify-content: space-between;
  border-bottom: ${tokens.size.x2} solid ${tokens.bg.alt.default};
`

const Main = styled(Space)`
  flex-grow: 1;
  width: 100%;
`

export function AppLayout({
  width = tokens.width.x1280,
  menu,
  children,
  ...props
}: AppLayoutProps) {
  const { SITE_NAME } = constants

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
