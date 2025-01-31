import { defineConfig } from '@pandacss/dev';

import { tokens } from 'tokens';

export default defineConfig({
  eject: true,
  utilities: {
    pt: { property: 'paddingTop', values: tokens.space },
    pb: { property: 'paddingBottom', values: tokens.space },
    pl: { property: 'paddingLeft', values: tokens.space },
    pr: { property: 'paddingRight', values: tokens.space },
    mt: { property: 'marginTop', values: tokens.space },
    mb: { property: 'marginBottom', values: tokens.space },
    ml: { property: 'marginLeft', values: tokens.space },
    mr: { property: 'marginRight', values: tokens.space },
  },
  outdir: 'styled-system',
});
