/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'

import Profile from '@/components/Profile'
import { Database } from '@/utils/database.types'
import { supabase as supabaseClient } from '@/utils/supabase'

type Profiles = Database['public']['Tables']['profiles']['Row']

interface IParams extends ParsedUrlQuery {
  username: string
}

type Props = {
  profile: Profiles
}

function Username({ profile }: Props) {
  return (
    <>
      <Head>
        <title>
          {profile?.username ? profile.username.toUpperCase() : 'User Profile'}
        </title>
        <meta
          property="og:title"
          content={
            profile?.username ? profile.username.toUpperCase() : 'User Profile'
          }
          key="title"
        />
      </Head>
      <div className="container mx-auto mb-4 flex h-full justify-center">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center p-4">
          <Profile profile={profile} />
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: { params: { username: string } }[] = []

  try {
    let { data, error, status } = await supabaseClient
      .from('profiles')
      .select(`username`)

    if (error && status !== 406) {
      throw error
    }

    if (data) {
      for (const profile of data) {
        if (profile.username) {
          paths.push({
            params: { username: profile.username },
          })
        }
      }
    }
  } catch (error) {
    console.log(error)
  }

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { username } = context.params as IParams

  let profile = null

  try {
    const { data, error, status } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (error && status !== 406) {
      throw error
    }

    if (data) {
      profile = data
    } else {
      return {
        notFound: true,
      }
    }
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      profile,
    },
  }
}

export default Username
