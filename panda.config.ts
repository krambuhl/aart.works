import { defineConfig } from '@pandacss/dev';

import { tokens, breakpoints } from 'tokens';

export default defineConfig({
  // eject: true,
  // presets: [],
  include: ['./components/**/*.{ts,tsx,js,jsx}', './pages/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      tokens: {
        spacing: {
          x0: { value: tokens.space.x0 },
          x2: { value: tokens.space.x2 },
          x4: { value: tokens.space.x4 },
          x6: { value: tokens.space.x6 },
          x8: { value: tokens.space.x8 },
          x12: { value: tokens.space.x12 },
          x16: { value: tokens.space.x16 },
          x24: { value: tokens.space.x24 },
          x32: { value: tokens.space.x32 },
          x40: { value: tokens.space.x40 },
          x48: { value: tokens.space.x48 },
          x56: { value: tokens.space.x56 },
        },
      },
    },
  },
  utilities: {
    extend: {
      pt: { property: 'paddingTop', values: 'spacing' },
      pb: { property: 'paddingBottom', values: 'spacing' },
      pl: { property: 'paddingLeft', values: 'spacing' },
      pr: { property: 'paddingRight', values: 'spacing' },
      mt: { property: 'marginTop', values: 'spacing' },
      mb: { property: 'marginBottom', values: 'spacing' },
      ml: { property: 'marginLeft', values: 'spacing' },
      mr: { property: 'marginRight', values: 'spacing' },
    },
  },
  globalCss: {
    body: { background: 'white', color: 'black' }, // Ensures at least one style is output
  },
  outdir: 'styled-system',
});
