import cx from 'classnames';

import { tokens } from 'tokens';
import { CoreComponent } from 'types/core';
import { SizeToken } from 'types/tokens';
import { responsiveClassList } from 'utilities/css-utils';
import { ValueOrResponsive, wrapResponsive } from 'utilities/opaque-responsive';

import * as styles from './Area.module.css';

export interface AreaProps extends CoreComponent {
  as?: 'div' | 'section' | 'header' | 'footer';
  width?: ValueOrResponsive<SizeToken>;
}

export function Area({
  as: Component = 'div',
  width = tokens.size.x768,
  className,
  children,
  ...props
}: AreaProps) {
  const responsiveWidth = wrapResponsive(width);
  const classList = cx(
    styles.root,
    responsiveClassList(styles, 'width', responsiveWidth),
    className
  );

  return (
    <Component className={classList} {...props}>
      {children}
    </Component>
  );
}
