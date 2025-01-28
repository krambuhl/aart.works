import type { SpacerProps } from './types';

import cx from 'classnames';
import React from 'react';

import { responsiveClassList } from 'utilities/css-utils';

import * as styles from './Spacer.module.css';
import { wrapAndMergeResponsiveSides } from './lib';

export function Spacer({
  as: Component = 'div',
  ma,
  mh,
  mv,
  mt,
  mr,
  mb,
  ml,
  pa,
  ph,
  pv,
  pt,
  pr,
  pb,
  pl,
  className,
  children,
  ...props
}: SpacerProps) {
  const padding = wrapAndMergeResponsiveSides({
    a: pa,
    v: pv,
    h: ph,
    t: pt,
    b: pb,
    l: pl,
    r: pr,
  });
  const margin = wrapAndMergeResponsiveSides({
    a: ma,
    v: mv,
    h: mh,
    t: mt,
    b: mb,
    l: ml,
    r: mr,
  });

  const classList = cx(
    styles.root,
    responsiveClassList(styles, 'padding-top', padding.top),
    responsiveClassList(styles, 'padding-bottom', padding.bottom),
    responsiveClassList(styles, 'padding-left', padding.left),
    responsiveClassList(styles, 'padding-right', padding.right),
    responsiveClassList(styles, 'margin-top', margin.top),
    responsiveClassList(styles, 'margin-bottom', margin.bottom),
    responsiveClassList(styles, 'margin-left', margin.left),
    responsiveClassList(styles, 'margin-right', margin.right),
    className
  );

  return (
    <Component className={classList} {...props}>
      {children}
    </Component>
  );
}
