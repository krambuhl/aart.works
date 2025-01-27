import type { HeadingTextProps, BodyTextProps, DataTextProps } from './types';

import cx from 'classnames';
import React from 'react';

import { tokens } from 'tokens';
import { responsiveClassList } from 'utilities/css-utils';
import { wrapResponsive } from 'utilities/opaque-responsive';

import * as styles from './Text.module.css';

export function HeadingText({
  as: Component = 'h3',
  size = 'md',
  className,
  children,
  ...props
}: HeadingTextProps) {
  const responsiveSize = wrapResponsive(size);
  const classList = cx(
    styles.heading,
    responsiveClassList(
      styles,
      'heading-size',
      responsiveSize,
      (size) => tokens.fontSize.heading[size]
    ),
    className
  );

  return (
    <Component className={classList} {...props}>
      {children}
    </Component>
  );
}

export function BodyText({
  as: Component = 'p',
  size = 'md',
  className,
  children,
  ...props
}: BodyTextProps) {
  const responsiveSize = wrapResponsive(size);
  const classList = cx(
    styles.body,
    responsiveClassList(
      styles,
      'body-size',
      responsiveSize,
      (size) => tokens.fontSize.body[size]
    ),
    className
  );

  return (
    <Component className={classList} {...props}>
      {children}
    </Component>
  );
}

export function DataText({
  as: Component = 'p',
  size = 'md',
  className,
  children,
  ...props
}: DataTextProps) {
  const responsiveSize = wrapResponsive(size);
  const classList = cx(
    styles.data,
    responsiveClassList(
      styles,
      'data-size',
      responsiveSize,
      (size) => tokens.fontSize.data[size]
    ),
    className
  );

  return (
    <Component className={classList} {...props}>
      {children}
    </Component>
  );
}
