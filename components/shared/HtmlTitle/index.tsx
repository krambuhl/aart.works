import type { HtmlTitleProps } from './types'

import Head from 'next/head'

import { constants } from 'data'

export function HtmlTitle({ title }: HtmlTitleProps) {
  const { SITE_NAME } = constants

  const pageTitle = title ? ` — ${title}` : ''
  const fullTitle = `${SITE_NAME}${pageTitle}`

  return (
    <Head>
      <title>{fullTitle}</title>
    </Head>
  )
}
