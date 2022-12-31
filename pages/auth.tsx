import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function AuthPage() {
  const supabase = useSupabaseClient()
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <>
      <Head>
        <title>Sing in / Sign up</title>
        <meta name="description" content="Send Me Crypto" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/btc.svg" />
        <link rel="icon" href="/btc.png" />
      </Head>
      <div className="container mx-auto flex w-full max-w-2xl flex-1 items-center justify-center">
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
      </div>
    </>
  )
}

export default AuthPage
