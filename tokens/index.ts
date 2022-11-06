export const tokens = {
  size: {
    x0: 'var(--size-0)',
    x2: 'var(--size-2)',
    x4: 'var(--size-4)',
    x6: 'var(--size-6)',
    x8: 'var(--size-8)',
    x12: 'var(--size-12)',
    x16: 'var(--size-16)',
    x20: 'var(--size-20)',
    x24: 'var(--size-24)',
    x32: 'var(--size-32)',
    x40: 'var(--size-40)',
    x48: 'var(--size-48)',
    x56: 'var(--size-56)',
    x64: 'var(--size-64)',
    x72: 'var(--size-72)',
    x96: 'var(--size-96)',
    x128: 'var(--size-128)',
  },
  width: {
    x128: 'var(--width-128)',
    x192: 'var(--width-192)',
    x256: 'var(--width-256)',
    x384: 'var(--width-384)',
    x512: 'var(--width-512)',
    x640: 'var(--width-640)',
    x768: 'var(--width-768)',
    x1024: 'var(--width-1024)',
    x1280: 'var(--width-1280)',
    x1440: 'var(--width-1440)',
    x1600: 'var(--width-1600)',
    x1920: 'var(--width-1920)',
  },
  shadow: {
    low: 'var(--shadow-low)',
    mid: 'var(--shadow-mid)',
    high: 'var(--shadow-high)',
  },
  fontSize: {
    heading: {
      xs: 'var(--font-size-heading-xs)',
      sm: 'var(--font-size-heading-sm)',
      md: 'var(--font-size-heading-md)',
      lg: 'var(--font-size-heading-lg)',
      xl: 'var(--font-size-heading-xl)',
    },
    body: {
      xs: 'var(--font-size-body-xs)',
      sm: 'var(--font-size-body-sm)',
      md: 'var(--font-size-body-md)',
      lg: 'var(--font-size-body-lg)',
      xl: 'var(--font-size-body-xl)',
    },
    data: {
      xs: 'var(--font-size-data-xs)',
      sm: 'var(--font-size-data-sm)',
      md: 'var(--font-size-data-md)',
      lg: 'var(--font-size-data-lg)',
      xl: 'var(--font-size-data-xl)',
    },
  },
  fontWeight: {
    heading: 'var(--font-weight-heading)',
    body: 'var(--font-weight-body)',
    data: 'var(--font-weight-data)',
  },
  fontFamily: {
    heading: 'var(--font-family-heading)',
    body: 'var(--font-family-body)',
    data: 'var(--font-family-data)',
  },
  lineHeight: {
    heading: 'var(--line-height-heading)',
    body: 'var(--line-height-body)',
    data: 'var(--line-height-data)',
  },
  bg: {
    base: {
      default: 'var(--bg-base-default)',
      hover: 'var(--bg-base-hover)',
      pressed: 'var(--bg-base-pressed)',
    },
    alt: {
      default: 'var(--bg-alt-default)',
      hover: 'var(--bg-alt-hover)',
      pressed: 'var(--bg-alt-pressed)',
    },
    inverted: {
      default: 'var(--bg-inverted-default)',
      hover: 'var(--bg-inverted-hover)',
      pressed: 'var(--bg-inverted-pressed)',
    },
  },
  fg: {
    base: {
      default: 'var(--fg-base-default)',
      hover: 'var(--fg-base-hover)',
      pressed: 'var(--fg-base-pressed)',
    },
    muted: {
      default: 'var(--fg-muted-default)',
      hover: 'var(--fg-muted-hover)',
      pressed: 'var(--fg-muted-pressed)',
    },
    inverted: {
      default: 'var(--fg-inverted-default)',
      hover: 'var(--fg-inverted-hover)',
      pressed: 'var(--fg-inverted-pressed)',
    },
  },
  primary: {
    action: {
      default: 'var(--primary-action-default)',
      hover: 'var(--primary-action-hover)',
      pressed: 'var(--primary-action-pressed)',
    },
    muted: {
      default: 'var(--primary-muted-default)',
      hover: 'var(--primary-muted-hover)',
      pressed: 'var(--primary-muted-pressed)',
    },
  },
  success: {
    action: {
      default: 'var(--success-action-default)',
      hover: 'var(--success-action-hover)',
      pressed: 'var(--success-action-pressed)',
    },
    muted: {
      default: 'var(--success-muted-default)',
      hover: 'var(--success-muted-hover)',
      pressed: 'var(--success-muted-pressed)',
    },
  },
  warning: {
    action: {
      default: 'var(--warning-action-default)',
      hover: 'var(--warning-action-hover)',
      pressed: 'var(--warning-action-pressed)',
    },
    muted: {
      default: 'var(--warning-muted-default)',
      hover: 'var(--warning-muted-hover)',
      pressed: 'var(--warning-muted-pressed)',
    },
  },
  critical: {
    action: {
      default: 'var(--critical-action-default)',
      hover: 'var(--critical-action-hover)',
      pressed: 'var(--critical-action-pressed)',
    },
    muted: {
      default: 'var(--critical-muted-default)',
      hover: 'var(--critical-muted-hover)',
      pressed: 'var(--critical-muted-pressed)',
    },
  },
} as const
