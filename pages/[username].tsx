/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Database } from '../utils/database.types'
import Avatar from '../components/Avatar'
import { GitHub, Twitter, Link as LinkIcon, Copy } from 'react-feather'
import { getValidUrlFromUsernameOrUrl, orderCoins } from '../utils/functions'
import { coinsMap } from '../utils/constants'
import { GetStaticPaths, GetStaticProps } from 'next'
import { supabase as supabaseClient } from '../utils/supabase'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import CopyToClipboard from 'react-copy-to-clipboard'
import { QR } from '../components/Icons/QR'
import { QRCodeSVG } from 'qrcode.react'

type Profiles = Database['public']['Tables']['profiles']['Row']

interface IParams extends ParsedUrlQuery {
  username: string
}

type Props = {
  profile: Profiles
}

function Username({ profile }: Props) {
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

  let tableView = null

  // let assets = null

  if (profile?.addresses) {
    const coins = orderCoins(profile.addresses)

    tableView = coins.map(({ asset, addresses }) => {
      const coinDetails = coinsMap.get(asset)!
      // console.log(addresses)

      return (
        <div
          key={asset}
          className="flex flex-col rounded-lg bg-base-200 px-3 py-1 drop-shadow-sm md:py-2 md:px-4"
        >
          {addresses.map(({ network, address }, i) => {
            return (
              <div key={network + asset} className="flex flex-col">
                <div
                  className={`flex h-14 items-center ${
                    activeQR.asset === asset && activeQR.network === network
                      ? 'font-bold'
                      : ''
                  }`}
                >
                  <div className="flex w-24 md:w-44">
                    {i === 0 ? (
                      <div
                        className={`flex items-center gap-2 md:gap-3 ${
                          activeQR.asset === asset ? 'font-bold' : ''
                        }`}
                      >
                        <img
                          className="h-6 w-6 md:h-8 md:w-8"
                          src={coinDetails.logo}
                          alt={`${coinDetails.abbreviation} Logo`}
                        />
                        <div className="flex flex-col items-start justify-start text-xs md:text-sm">
                          <span className="hidden md:flex">
                            {coinDetails.name}
                          </span>
                          <span className="md:opacity-40">
                            {coinDetails.abbreviation}
                          </span>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="flex w-16 md:w-20 lg:w-24 ">{network}</div>
                  <div className="flex w-full flex-1 overflow-x-hidden">
                    <CopyToClipboard
                      text={address}
                      onCopy={() => {
                        setToast({
                          hidden: false,
                          message: `${asset} address copied to clipboard`,
                        })
                      }}
                    >
                      <div className=" flex h-10 w-full cursor-pointer items-center rounded-lg bg-base-300 px-2 text-xs sm:text-sm md:px-4">
                        {address}
                      </div>
                    </CopyToClipboard>
                  </div>

                  <div className="hidden items-center justify-between md:flex md:pl-2">
                    <CopyToClipboard
                      text={address}
                      onCopy={() => {
                        setToast({
                          hidden: false,
                          message: `${asset} address copied to clipboard`,
                        })
                      }}
                    >
                      <button className="btn-ghost btn-square btn">
                        <Copy size={24} />
                      </button>
                    </CopyToClipboard>
                    <button
                      onClick={() => {
                        if (
                          activeQR.asset === asset &&
                          activeQR.network === network
                        ) {
                          setActiveQR({
                            address: '',
                            network: '',
                            asset: '',
                          })
                        } else {
                          setActiveQR({
                            address,
                            network,
                            asset,
                          })
                        }
                      }}
                      className="btn-ghost btn-square btn "
                    >
                      <QR width="24" height="24" />
                    </button>
                  </div>
                </div>
                {activeQR.asset === asset && activeQR.network === network ? (
                  <div className="flex items-center justify-center pt-2 pb-4">
                    <QRCodeSVG value={activeQR.address} />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      )
    })

    // assets = coins.map(({ asset, addresses }) => {
    //   const coin = coinsMap.get(asset)!
    //   // console.log(addresses)

    //   if (coin?.networks.length <= 1) {
    //     return (
    //       <SingleNetworkAssetView
    //         key={asset}
    //         asset={asset}
    //         network={addresses[0].network}
    //         address={addresses[0].address}
    //         activeQR={activeQR}
    //         setActiveQR={setActiveQR}
    //         setToast={setToast}
    //       />
    //     )
    //   } else {
    //     return (
    //       <MultipleNetworksAssetView
    //         key={asset}
    //         asset={asset}
    //         addresses={addresses}
    //         activeQR={activeQR}
    //         setActiveQR={setActiveQR}
    //         setToast={setToast}
    //       />
    //     )
    //   }
    // })
  }

  return (
    <>
      <Head>
        <title>
          {profile?.username ? profile.username.toUpperCase() : 'User Profile'}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/btc.svg" />
        <link rel="icon" href="/btc.png" />
      </Head>
      <div className="container mx-auto mb-4 flex h-full justify-center">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center p-4">
          <div className="flex w-full flex-col">
            <div className="mt-6">
              <Avatar url={profile?.avatar_url || ''} />
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
            {/* <div className="flex flex-col gap-4 md:hidden">{assets}</div> */}
            <div className="flex flex-col gap-y-3 text-xs sm:text-sm md:gap-y-4">
              <div className="flex px-3 font-bold md:px-4">
                <div className="flex w-24 md:w-44 lg:w-48">Asset</div>
                <div className="flex w-16 md:w-24">Network</div>
                <div className="flex flex-1">Address</div>
              </div>
              {tableView}
            </div>
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
