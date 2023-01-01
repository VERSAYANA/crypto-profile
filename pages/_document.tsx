import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          key="description"
          name="description"
          content="Share all of your cryptocurrency addresses in one page"
        />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link key="icon" rel="icon" href="/btc.svg" />
        <link key="icon" rel="icon" href="/btc.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
