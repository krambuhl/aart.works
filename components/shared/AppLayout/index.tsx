import type { AppLayoutProps } from './types';

import cx from 'classnames';
import styled from 'styled-components';

import { Area } from 'components/shared/Area';
import { Space } from 'components/shared/Space';
import { tokens } from 'tokens';

import * as styles from './AppLayout.module.css';

const Main = styled(Space)`
  flex-grow: 1;
  width: 100%;
`;

export function AppLayout({
  width = tokens.size.x1280,
  className,
  children,
  ...props
}: AppLayoutProps) {
  const classList = cx(styles.root, className);
  return (
    <Area width={width} {...props} className={classList}>
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
    </Area>
  );
}
