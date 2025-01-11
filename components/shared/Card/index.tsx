import styled from 'styled-components';

import { tokens } from 'tokens';

import { CardProps } from './types';

function getPadding(padding: CardProps['padding']) {
  switch (padding) {
    case 'none':
      return tokens.size.x0;
    default:
      return tokens.size.x16;
  }
}

export const Card = styled.div<CardProps>`
  border: ${tokens.size.x2} solid ${tokens.bg.inverted.default};
  border-radius: ${tokens.size.x12};
  box-shadow: ${tokens.shadow.mid};
  color: ${tokens.fg.inverted.default};
  padding: ${({ padding }) => getPadding(padding)};
`;

export const CardPadding = styled.div<CardProps>`
  padding: ${({ padding }) => getPadding(padding)};
`;
