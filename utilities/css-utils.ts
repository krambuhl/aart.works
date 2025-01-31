import { breakpoints } from 'tokens';
import { Breakpoint, OpaqueResponsive, reduceResponsive } from 'utilities/opaque-responsive';

/**
 * Returns a css-module style name from a namespace and a token value.
 * Also supports an optional breakpoint value to suppoort responsive styles.
 *
 * @param ns string representing the style namespace
 * @param token a token reference
 * @param breakpoint a optionalbreakpoint
 *
 * @returns a string representing a css-module style name
 */
export function styleName({
  name,
  value,
  breakpoint,
}: {
  name: string;
  value: string;
  breakpoint: Breakpoint;
}): `${string}--${string}--${Breakpoint}` | `${string}--${string}` {
  if (breakpoint) {
    return `${name}--${value}--${breakpoint}`;
  }
  return `${name}--${value}`;
}

export function responsiveClassList<T extends string>(
  styles: Record<string, string>,
  name: string,
  responsiveValues: OpaqueResponsive<T>,
  transform?: (value: T) => string,
): string;
export function responsiveClassList<T>(
  styles: Record<string, string>,
  name: string,
  responsiveValues: OpaqueResponsive<T>,
  transform: (value: T) => string,
): string;
export function responsiveClassList<T>(
  styles: Record<string, string>,
  name: string,
  responsiveValues: OpaqueResponsive<T>,
  transform?: (value: T) => string,
) {
  return reduceResponsive(
    responsiveValues,
    (acc, value, breakpoint) => {
      const transformedValue = transform ? transform(value) : (value as string);
      const styleKey = styleName({
        name,
        value: transformedValue.replace('var(--', '').replace(')', ''),
        breakpoint,
      });
      return [...acc, styles[styleKey]];
    },
    [] as string[],
  ).join(' ');
}

export function responsiveStyleList<T>(
  responsiveValues: OpaqueResponsive<T>,
  transform: (value: T, breakpoint: Breakpoint) => string,
) {
  return reduceResponsive(
    responsiveValues,
    (acc, value, breakpoint) => {
      const transformedValue = transform(value, breakpoint);
      if (transformedValue) {
        return acc + ' ' + transformedValue;
      }
      return acc;
    },
    '',
  );
}

export function generateRules(ruleset: Record<string, string>, tokenset: Record<string, string>) {
  // Generate base padding/margin utilities
  const baseRules = Object.entries(tokenset).flatMap(([tokenKey, tokenValue]) =>
    Object.entries(ruleset).map(([rule, prop]) => [`${rule}-${tokenKey}`, { [prop]: tokenValue }]),
  );

  // Generate responsive padding/margin utilities
  const responsiveRules = Object.entries(breakpoints).flatMap(([bpKey, bpValue]) =>
    Object.entries(tokenset).flatMap(([tokenKey, tokenValue]) =>
      Object.entries(ruleset).map(([rule, prop]) => [
        `${bpKey}:${rule}-${tokenKey}`,
        {
          [`@media (min-width: ${bpValue}px)`]: {
            [prop]: tokenValue,
          },
        },
      ]),
    ),
  );

  return [...baseRules, ...responsiveRules];
}
