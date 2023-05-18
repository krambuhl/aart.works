import type { SpaceProps } from './types'

import styled, { css } from 'styled-components'

import { responsiveProp } from 'lib/responsive'

import { generateSpace } from './lib'

export const Space = styled.div.withConfig({
  shouldForwardProp: (prop) => ![
    'height', 'width',
    'ma', 'mh', 'mv', 'mt', 'mr', 'mb', 'ml',
    'pa', 'ph', 'pv', 'pt', 'pr', 'pb', 'pl',
  ].includes(prop),
})<SpaceProps>`
  width: 100%;

  ${({ ma, mh, mv, mt, mr, mb, ml }) => {
    if (ma || mh || mv || mt || mr || mb || ml) {
      const space = generateSpace({
        a: ma,
        h: mh,
        v: mv,
        t: mt,
        r: mr,
        b: mb,
        l: ml,
      })

      return css`
        ${responsiveProp('margin-top', space.top)}
        ${responsiveProp('margin-bottom', space.bottom)}
        ${responsiveProp('margin-left', space.left)}
        ${responsiveProp('margin-right', space.right)}
      `
    }
  }}

  ${({ pa, ph, pv, pt, pr, pb, pl }) => {
    if (pa || ph || pv || pt || pr || pb || pl) {
      const space = generateSpace({
        a: pa,
        h: ph,
        v: pv,
        t: pt,
        r: pr,
        b: pb,
        l: pl,
      })

      return css`
        ${responsiveProp('padding-top', space.top)}
        ${responsiveProp('padding-bottom', space.bottom)}
        ${responsiveProp('padding-left', space.left)}
        ${responsiveProp('padding-right', space.right)}
      `
    }
  }}

  ${({ height }) => (height ? responsiveProp('height', height) : '')};
  ${({ width }) => (width ? responsiveProp('width', width) : '')};
`
