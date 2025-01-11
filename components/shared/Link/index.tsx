import NextLink from 'next/link';
import styled from 'styled-components';

import { tokens } from 'tokens';

export const Link = styled(NextLink)`
  text-decoration: underline;
  color: ${tokens.primary.action.default};

  &:hover {
    text-decoration-thickness: 0.2em;
    color: ${tokens.primary.action.hover};
  }

  &:active {
    color: ${tokens.primary.action.pressed};
    text-decoration-color: var(--primary-action-default);
  }
`;
