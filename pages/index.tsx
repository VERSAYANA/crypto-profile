import Head from 'next/head'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()
  console.log(session)

  return (
    <>
      <Head>
        <title>Send Me Crypto</title>
        <meta name="description" content="Send Me Crypto" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/btc.svg" />
        <link rel="icon" href="/btc.png" />
      </Head>
      <div className="container mx-auto flex justify-center">
        <div className="flex w-full max-w-2xl items-center justify-center p-4">
          {!session ? (
            <div className="w-full">
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  className: {
                    button: '!btn',
                    input: '!input !input-bordered !text-base-content',
                    label: '!label-text',
                    anchor: '!link',
                  },
                }}
                theme="default"
              />
            </div>
          ) : (
            <Account session={session} />
          )}
        </div>
      </div>
    </>
  )
}
