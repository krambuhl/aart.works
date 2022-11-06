import type { AutoGridProps, GridProps } from './types'

import styled from 'styled-components'

export const Grid = styled.div<GridProps>`
  display: grid;
  width: 100%;

  ${({ gap }) => (gap ? `gap: ${gap}` : '')};
  ${({ columns }) => (columns ? `grid-template-columns: ${columns}` : '')};
  ${({ rows }) => (rows ? `grid-template-rows: ${rows}` : '')};
`

export const AutoGrid = styled.div<AutoGridProps>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(${({ width }) => width}, 95vw), 1fr)
  );

  ${({ gap }) => (gap ? `gap: ${gap}` : '')};
`
