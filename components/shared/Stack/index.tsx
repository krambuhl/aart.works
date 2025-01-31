import type { StackProps } from './types';

import cx from 'classnames';
import React from 'react';

import { tokens } from 'tokens';
import { responsiveClassList } from 'utilities/css-utils';
import { wrapResponsive } from 'utilities/opaque-responsive';

import * as styles from './Stack.module.css';

export function Stack({
  as: Component = 'div',
  direction = 'vertical',
  alignment = 'center',
  justify = 'start',
  gap = tokens.space.x0,
  className,
  children,
  ...props
}: StackProps) {
  const responsiveDirection = wrapResponsive(direction);
  const responsiveAlignment = wrapResponsive(alignment);
  const responsiveJustify = wrapResponsive(justify);
  const responsiveGap = wrapResponsive(gap);
  const classList = cx(
    styles.root,
    responsiveClassList(styles, 'direction', responsiveDirection),
    responsiveClassList(styles, 'alignment', responsiveAlignment),
    responsiveClassList(styles, 'justify', responsiveJustify),
    responsiveClassList(styles, 'gap', responsiveGap),
    className
  );

  return (
    <Component className={classList} {...props}>
      {children}
    </Component>
  );
}
