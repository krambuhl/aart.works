import type { CoreComponent } from 'types/core';

export interface ButtonProps extends CoreComponent {
  onClick?: (ev: React.MouseEvent) => void;
  disabled?: boolean;
}

export interface ButtonLinkProps extends ButtonProps {
  href?: string;
}
