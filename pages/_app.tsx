import Head from 'next/head'
import Script from 'next/script'
import type { AppProps } from 'next/app'

import { HtmlTitle } from 'components/HtmlTitle'
import { AppLayout } from 'components/AppLayout'

import 'the-new-css-reset/css/reset.css'
import 'tokens/tokens.css'
import 'styles/globals.css'
import 'styles/tokens.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout showHeader>
      <HtmlTitle />

      <Script
        src="https://unpkg.com/@ffmpeg/ffmpeg@0.7.0/dist/ffmpeg.min.js"
        strategy="beforeInteractive"
      />

      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </AppLayout>
  )
}

export default CustomApp
