import Head from 'next/head'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Link from 'next/link'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <>
      <Head>
        <title>Send Me Crypto</title>
        <meta name="description" content="Send Me Crypto" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/btc.svg" />
        <link rel="icon" href="/btc.png" />
      </Head>
      <div id="home" className="container mx-auto flex flex-1 justify-center">
        <div className="flex w-full max-w-3xl flex-1 items-center justify-center p-3 md:p-4">
          {!session ? (
            <div className="flex w-full flex-col items-center justify-center gap-8">
              <h1 className="max-w-xl text-center text-3xl md:text-5xl">
                Share your cryptocurrency addresses with ease
              </h1>
              <h2 className="text-center text-lg opacity-80 md:text-2xl">
                Create a profile like{' '}
                <Link target={'_blank'} href="/versayana">
                  <span className="link">this</span>
                </Link>{' '}
                to receive cryptocurrency payments or donations.
              </h2>
              <div className="flex w-full flex-col items-center gap-y-4 px-4 md:p-0">
                <div className="hidden w-full max-w-xl items-center justify-between rounded-full border border-base-200 bg-base-200 py-2 pl-4 pr-2 text-xl md:flex">
                  <div className="flex">
                    <span>send-me-crypto.vercel.app/</span>
                    <span className="opacity-50">username</span>
                  </div>
                  <Link
                    href={'/auth'}
                    className="btn-secondary btn ml-2 rounded-full normal-case"
                  >
                    Create my page
                  </Link>
                </div>

                <div className="flex h-12 w-full max-w-xl items-center justify-between rounded-full border border-base-200 bg-base-200 py-2 pl-4 pr-2 text-base md:hidden">
                  <div className="flex">
                    <span>send-me-crypto.vercel.app/</span>
                    <span className="opacity-50">username</span>
                  </div>
                </div>
                <Link
                  href={'/auth'}
                  className="btn-secondary btn w-full rounded-full normal-case md:hidden"
                >
                  Create my page
                </Link>
              </div>
            </div>
          ) : (
            <Account session={session} />
          )}
        </div>
      </div>
    </>
  )
}
