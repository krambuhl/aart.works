import type { SpacerProps } from './types';

import cx from 'classnames';
import React from 'react';

import { tokens } from 'tokens';
import { SpaceToken } from 'types/tokens';
import { responsiveStyleList } from 'utilities/css-utils';

import * as styles from './Spacer.module.css';
import { wrapAndMergeResponsiveSides } from './lib';

const tokenToClassName: Record<SpaceToken, string> = {
  [tokens.space.x0]: 'x0',
  [tokens.space.x2]: 'x2',
  [tokens.space.x4]: 'x4',
  [tokens.space.x6]: 'x6',
  [tokens.space.x8]: 'x8',
  [tokens.space.x12]: 'x12',
  [tokens.space.x16]: 'x16',
  [tokens.space.x24]: 'x24',
  [tokens.space.x32]: 'x32',
  [tokens.space.x40]: 'x40',
  [tokens.space.x48]: 'x48',
  [tokens.space.x56]: 'x56',
};

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
    responsiveStyleList(padding.top, (value, bp) => `${bp}:stu-pt-${tokenToClassName[value]}`),
    responsiveStyleList(padding.bottom, (value, bp) => `${bp}:stu-pb-${tokenToClassName[value]}`),
    responsiveStyleList(padding.left, (value, bp) => `${bp}:stu-pl-${tokenToClassName[value]}`),
    responsiveStyleList(padding.right, (value, bp) => `${bp}:stu-pr-${tokenToClassName[value]}`),
    responsiveStyleList(margin.top, (value, bp) => `${bp}:stu-mt-${tokenToClassName[value]}`),
    responsiveStyleList(margin.bottom, (value, bp) => `${bp}:stu-mb-${tokenToClassName[value]}`),
    responsiveStyleList(margin.left, (value, bp) => `${bp}:stu-ml-${tokenToClassName[value]}`),
    responsiveStyleList(margin.right, (value, bp) => `${bp}:stu-mr-${tokenToClassName[value]}`),
    className,
  );

  return (
    <Component className={classList} {...props}>
      {children}
    </Component>
  );
}
