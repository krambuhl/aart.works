import { createComponent } from 'utilities/core';
import { WidthToken } from 'types/tokens';

import styles from './Area.module.css';

export interface AreaProps {
  width?: WidthToken;
}

export const Area = createComponent<HTMLDivElement, AreaProps>({
  tagName: 'div',
  className: styles.root,
  variants: {
    width: styles.width,
  },
});
