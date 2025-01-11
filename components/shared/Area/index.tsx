import type { AreaProps } from './types';

import styled from 'styled-components';

import { tokens } from 'tokens';

export const Area = styled.div<AreaProps>`
  margin: auto;
  max-width: ${({ width = tokens.size.x768 }) => width};
  width: 100%;
`;
