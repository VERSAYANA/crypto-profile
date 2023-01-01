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
        <meta property="og:title" content="Sing in / Sign up" key="title" />
      </Head>
      <div className="container mx-auto flex w-full max-w-2xl flex-1 items-center justify-center">
        <div className="w-full p-4">
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
