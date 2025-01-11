import type { Directions } from './types';
import type { SizeToken } from 'types/tokens';

import { convertToResponsive, Responsive } from 'lib/responsive';
import { tokens } from 'tokens';

export function generateSpace({
  a,
  h,
  v,
  t,
  r,
  b,
  l,
}: { [Prop in Directions]?: SizeToken | Responsive<SizeToken> }) {
  const ra = convertToResponsive(a);
  const rt = convertToResponsive(t);
  const rr = convertToResponsive(r);
  const rl = convertToResponsive(l);
  const rb = convertToResponsive(b);
  const rv = convertToResponsive(v);
  const rh = convertToResponsive(h);

  const top = { xs: tokens.size.x0, ...ra, ...rv, ...rt };
  const bottom = { xs: tokens.size.x0, ...ra, ...rv, ...rb };
  const left = { xs: tokens.size.x0, ...ra, ...rh, ...rl };
  const right = { xs: tokens.size.x0, ...ra, ...rh, ...rr };

  return { top, left, right, bottom };
}
