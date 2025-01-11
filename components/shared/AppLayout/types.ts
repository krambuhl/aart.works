import type { CoreComponent } from 'types/core';
import type { WidthToken } from 'types/tokens';

export interface AppLayoutProps extends CoreComponent {
  width?: WidthToken;
  showHeader?: boolean;
  showFooter?: boolean;
  menu?: React.ReactNode;
  footer?: React.ReactNode;
}
