import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link key="icon" rel="icon" href="/btc.png" />
        <meta
          key="description"
          name="description"
          content="Share all of your cryptocurrency addresses in one page"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://send-me-crypto.vercel.app" />
        <meta
          property="og:description"
          content="Share all of your cryptocurrency addresses in one page."
        />
        <meta
          property="og:image"
          content="https://send-me-crypto.vercel.app/sendmecrypto.jpeg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
