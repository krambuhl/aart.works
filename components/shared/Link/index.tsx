import cx from 'classnames';
import NextLink from 'next/link';

import { CoreComponent } from 'types/core';

import * as styles from './Link.module.css';

export type LinkProps = CoreComponent;

export function Link({ className, children, ...props }: LinkProps) {
  const classList = cx(styles.root, className);
  return (
    <NextLink {...props} className={classList}>
      {children}
    </NextLink>
  );
}
