import { defineConfig } from 'unocss';

import { breakpoints } from 'tokens';

import { rules as spacerRules } from './components/shared/Spacer/uno.rules';

const rules = [...spacerRules];
const safelist = rules.map(([rule]) => rule);

console.log(safelist);

export default defineConfig({
  presets: [],
  variants: [
    (matcher) => {
      if (matcher.startsWith('xs:')) {
        return {
          matcher: matcher.slice(3),
          parent: `@media (min-width: ${breakpoints.xs})`,
        };
      }
      if (matcher.startsWith('sm:')) {
        return {
          matcher: matcher.slice(3),
          parent: `@media (min-width: ${breakpoints.sm}px)`,
        };
      }
      if (matcher.startsWith('md:')) {
        return {
          matcher: matcher.slice(3),
          parent: `@media (min-width: ${breakpoints.md}px)`,
        };
      }
      if (matcher.startsWith('lg:')) {
        return {
          matcher: matcher.slice(3),
          parent: `@media (min-width: ${breakpoints.lg}px)`,
        };
      }
      if (matcher.startsWith('xl:')) {
        return {
          matcher: matcher.slice(3),
          parent: `@media (min-width: ${breakpoints.xl}px)`,
        };
      }
      if (matcher.startsWith('xxl:')) {
        return {
          matcher: matcher.slice(4),
          parent: `@media (min-width: ${breakpoints.xxl}px)`,
        };
      }
      return matcher;
    },
  ],
  rules,
  safelist,
});
