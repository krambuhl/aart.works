import { SpaceToken } from 'types/tokens';
import { mergeResponsivePreferringLastValue, ValueOrResponsive, wrapResponsive } from 'utilities/opaque-responsive';

interface SpacingProps {
  a?: ValueOrResponsive<SpaceToken>;
  v?: ValueOrResponsive<SpaceToken>;
  h?: ValueOrResponsive<SpaceToken>;
  t?: ValueOrResponsive<SpaceToken>;
  b?: ValueOrResponsive<SpaceToken>;
  l?: ValueOrResponsive<SpaceToken>;
  r?: ValueOrResponsive<SpaceToken>;
}

/**
 * Wraps the responsive sides and merges them into a single responsive object
 * which contains the top, bottom, left and right values.
 */
export function wrapAndMergeResponsiveSides({ a, v, h, t, b, l, r }: SpacingProps) {
  const responsiveA = wrapResponsive(a);
  const responsiveV = wrapResponsive(v);
  const responsiveH = wrapResponsive(h);
  const responsiveT = wrapResponsive(t);
  const responsiveB = wrapResponsive(b);
  const responsiveL = wrapResponsive(l);
  const responsiveR = wrapResponsive(r);

  // Cascade the responsive values to get the final responsive value
  // for each side: start with all, then override with vertical/horizontal, then the specfic side
  return {
    top: mergeResponsivePreferringLastValue([responsiveA, responsiveV, responsiveT]),
    bottom: mergeResponsivePreferringLastValue([responsiveA, responsiveV, responsiveB]),
    left: mergeResponsivePreferringLastValue([responsiveA, responsiveH, responsiveL]),
    right: mergeResponsivePreferringLastValue([responsiveA, responsiveH, responsiveR]),
  };
}
