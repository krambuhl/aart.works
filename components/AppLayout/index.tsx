import NextLink from 'next/link'
import styled from 'styled-components'
import type { AppLayoutProps } from './types'

import { constants } from 'data'
import { Stack } from 'components/Stack'
import { Space } from 'components/Space'
import { HeadingText } from 'components/Text'
import { Area } from 'components/Area'
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

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
`

const Footer = styled.footer``

export function AppLayout({
  width = tokens.width.x1280,
  showHeader = false,
  showFooter = false,
  menu,
  footer,
  children,
  ...props
}: AppLayoutProps) {
  const { SITE_NAME } = constants

  return (
    <Root width={width} {...props}>
      {showHeader && (
        <Header as="header" direction="horizontal">
          <NextLink href="/">
            <a>
              <Space pa={tokens.size.x20}>
                <HeadingText as="h1" size="xs">
                  {SITE_NAME}
                </HeadingText>
              </Space>
            </a>
          </NextLink>

          {menu ?? <div />}
        </Header>
      )}

      <Main id="content">
        <Space
          pv={{
            xs: tokens.size.x32,
            sm: tokens.size.x56,
            md: tokens.size.x72,
          }}
          ph={tokens.size.x24}
        >
          {children}
        </Space>
      </Main>

      {showFooter && <Footer />}
    </Root>
  )
}

AppLayout.StyledRoot = Root
