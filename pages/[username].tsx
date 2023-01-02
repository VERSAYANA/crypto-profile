/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Database } from '../utils/database.types'
import Avatar from '../components/Avatar'
import { GitHub, Twitter, Link as LinkIcon, Copy } from 'react-feather'
import { getValidUrlFromUsernameOrUrl, orderCoins } from '../utils/functions'
import { GetStaticPaths, GetStaticProps } from 'next'
import { supabase as supabaseClient } from '../utils/supabase'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import AddressesTableView from '../components/AddressesTableView'

type Profiles = Database['public']['Tables']['profiles']['Row']

interface IParams extends ParsedUrlQuery {
  username: string
}

type Props = {
  profile: Profiles
}

function Username({ profile }: Props) {
  // console.log(profile)
  const router = useRouter()
  const [toast, setToast] = useState({
    hidden: true,
    message: '',
  })
  const [activeQR, setActiveQR] = useState({
    asset: '',
    network: '',
    address: '',
  })

  const { username } = router.query
  // Hide toast after 1.5s
  useEffect(() => {
    const timer = setTimeout(
      () =>
        setToast({
          hidden: true,
          message: '',
        }),
      1500
    )
    return () => clearTimeout(timer)
  }, [toast])

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
          <div className="flex w-full flex-col">
            <div className="mt-6">
              {profile?.avatar_url ? (
                <Avatar url={profile?.avatar_url || ''} />
              ) : null}
            </div>

            <div className="my-4 flex flex-col items-center">
              {profile?.full_name ? (
                <h2 className="text-xl font-bold">{profile.full_name}</h2>
              ) : null}
              <h3 className="text-md opacity-85">@{username}</h3>
            </div>
            <div className="mb-4 flex flex-col items-center">
              {profile?.bio ? (
                <p className="text-md opacity-85">{profile.bio}</p>
              ) : null}

              <div className="my-4 flex gap-4">
                {profile?.twitter ? (
                  <a
                    href={`${getValidUrlFromUsernameOrUrl(
                      profile.twitter,
                      'https://twitter.com/'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Twitter size={28} />
                  </a>
                ) : null}

                {profile?.github ? (
                  <a
                    href={`${getValidUrlFromUsernameOrUrl(
                      profile.github,
                      'https://github.com/'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHub size={28} />
                  </a>
                ) : null}
                {profile?.website ? (
                  <a href={profile.website}>
                    <LinkIcon size={28} />
                  </a>
                ) : null}
              </div>
            </div>
            <div
              className={`toast-center toast toast-top z-10 w-80 text-center md:w-96 md:toast-bottom ${
                toast.hidden ? 'hidden' : ''
              }`}
            >
              <div className="alert alert-success">
                <div className="flex w-full items-center">
                  <span className="w-full">{toast.message}</span>
                </div>
              </div>
            </div>
            {profile?.addresses ? (
              <AddressesTableView
                assetAddresses={orderCoins(profile.addresses)}
                setToast={setToast}
              />
            ) : null}
          </div>
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
