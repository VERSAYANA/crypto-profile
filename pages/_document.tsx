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
        <meta
          property="og:title"
          content="Make your crypto profile"
          key="title"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cryptoprofile.vercel.app/" />
        <meta
          property="og:description"
          content="Share all of your cryptocurrency addresses in one page."
        />
        <meta
          property="og:image"
          content="https://cryptoprofile.vercel.app/mycryptoprofile.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />

        <meta
          property="twitter:url"
          content="https://cryptoprofile.vercel.app/"
        />
        <meta property="twitter:title" content="Make your crypto profile" />
        <meta
          property="twitter:description"
          content="Share all of your cryptocurrency addresses in one page."
        />
        <meta
          property="twitter:image"
          content="https://cryptoprofile.vercel.app/mycryptoprofile.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
