import Head from 'next/head'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Link from 'next/link'
import Landing from '../components/Landing'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <>
      <Head>
        <title>Crypto Profile</title>
        <meta property="og:title" content="Crypto Profile" key="title" />
      </Head>
      <div id="home" className="container mx-auto flex flex-1 justify-center">
        <div className="flex w-full max-w-4xl flex-1 items-center justify-center p-4">
          {!session ? <Landing /> : <Account session={session} />}
        </div>
      </div>
    </>
  )
}
