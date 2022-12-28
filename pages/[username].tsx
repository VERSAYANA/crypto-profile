/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Database } from '../utils/database.types'
import Avatar from '../components/Avatar'
import {
  GitHub,
  Twitter,
  Link as LinkIcon,
  Copy,
  ChevronDown,
} from 'react-feather'
import { getValidUrlFromUsernameOrUrl } from '../utils/functions'
import { QR } from '../components/Icons/QR'
import CopyToClipboard from 'react-copy-to-clipboard'
import { QRCodeSVG } from 'qrcode.react'
import { coinsMap, networksMap } from '../utils/constants'
import { GetStaticPaths, GetStaticProps } from 'next'
import { supabase as supabaseClient } from '../utils/supabase'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import { Disclosure } from '@headlessui/react'

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
  const [qr, setQR] = useState({
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

  let assets = null

  if (profile.addresses) {
    assets = Object.entries(profile.addresses).map(([asset, value]) => {
      const addr = Object.entries(value)
      const coin = coinsMap.get(asset)!

      if (coin?.networks.length <= 1) {
        return (
          <div
            key={asset}
            className="flex flex-col rounded-lg bg-base-200 text-xs md:text-sm"
          >
            <div
              className={`flex h-14 items-center gap-2 px-2 md:px-4 ${
                qr.asset === asset && qr.network === addr[0][0]
                  ? 'font-bold'
                  : ''
              }`}
            >
              <div className="flex w-32 items-center gap-2 md:w-96 md:gap-2">
                <img
                  className="h-6 w-6 md:h-8 md:w-8"
                  src={coinsMap.get(asset)?.logo}
                  alt={`${coinsMap.get(asset)?.name} Logo`}
                />
                <div className="flex flex-col items-start justify-end text-xs md:text-sm">
                  <span className="hidden md:flex">
                    {coinsMap.get(asset)?.name}
                  </span>
                  <span className="md:opacity-40">
                    {coinsMap.get(asset)?.abbreviation}
                  </span>
                </div>
              </div>

              <CopyToClipboard
                text={addr[0][1] as string}
                onCopy={() => {
                  setToast({
                    hidden: false,
                    message: `${asset} address copied to clipboard`,
                  })
                }}
              >
                <div className="w-full cursor-pointer overflow-x-hidden rounded-lg bg-base-300 px-2 py-2">
                  {addr[0][1] as string}
                </div>
              </CopyToClipboard>

              <div className="flex">
                <div className="tooltip" data-tip="Copy to clipboard">
                  <CopyToClipboard
                    text={addr[0][1] as string}
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
                </div>
                <button
                  onClick={() => {
                    if (qr.asset === asset && qr.network === addr[0][0]) {
                      setQR({
                        address: '',
                        network: '',
                        asset: '',
                      })
                    } else {
                      setQR({
                        address: addr[0][1] as string,
                        network: addr[0][0],
                        asset: asset,
                      })
                    }
                  }}
                  className="btn-ghost btn-square btn"
                >
                  <QR width="24" height="24" />
                </button>
              </div>
            </div>
            {qr.asset === asset && qr.network === addr[0][0] ? (
              <div className="flex items-center justify-center pt-2 pb-4">
                <QRCodeSVG value={qr.address} />
              </div>
            ) : null}
          </div>
        )
      } else {
        return (
          <Disclosure
            defaultOpen={false}
            key={asset}
            as="div"
            className="flex flex-col rounded-lg bg-base-200 px-2 text-xs md:px-4 md:text-sm"
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="flex h-14 w-full items-center justify-between">
                  <div className="flex w-32 items-center gap-2 md:w-96 md:gap-2">
                    <img
                      className="h-6 w-6 md:h-8 md:w-8"
                      src={coinsMap.get(asset)?.logo}
                      alt={`${coinsMap.get(asset)?.name} Logo`}
                    />
                    <div className="flex flex-col items-start justify-end">
                      <span className="hidden md:flex">
                        {coinsMap.get(asset)?.name}
                      </span>
                      <span className="md:opacity-40">
                        {coinsMap.get(asset)?.abbreviation}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 md:h-8 md:w-8 ${
                      open ? 'rotate-180 transform' : ''
                    }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-col">
                  {addr.map(([network, address]) => (
                    <div key={network} className="flex flex-col">
                      <div
                        className={`flex h-14 items-center gap-2 ${
                          qr.asset === asset && qr.network === network
                            ? 'font-bold'
                            : ''
                        }`}
                      >
                        <div className="flex w-32 items-center gap-2 md:w-96 md:gap-2">
                          <div className="relative h-6 w-6 md:h-8 md:w-8">
                            <img
                              className="h-6 w-6 md:h-8 md:w-8"
                              src={coinsMap.get(asset)?.logo}
                              alt={`${coinsMap.get(asset)?.name} Logo`}
                            />
                            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 rounded-full bg-white">
                              <img
                                className="h-3 w-3 md:h-4 md:w-4"
                                src={networksMap.get(network)?.logo}
                                alt={`${networksMap.get(network)?.logo} Logo`}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col items-start justify-end text-xs md:text-sm">
                            <span className="hidden md:flex">
                              {networksMap.get(network)?.name}
                            </span>
                            <span className="md:opacity-40">
                              {networksMap.get(network)?.abbreviation}
                            </span>
                          </div>
                        </div>

                        <CopyToClipboard
                          text={address as string}
                          onCopy={() => {
                            setToast({
                              hidden: false,
                              message: `${asset} address on ${network} network copied to clipboard`,
                            })
                          }}
                        >
                          <div className="w-full cursor-pointer overflow-x-hidden rounded-lg bg-base-300 px-2 py-2">
                            {address as string}
                          </div>
                        </CopyToClipboard>

                        <div className="flex">
                          <div className="tooltip" data-tip="Copy to clipboard">
                            <CopyToClipboard
                              text={address as string}
                              onCopy={() => {
                                setToast({
                                  hidden: false,
                                  message: `${asset} address on ${network} network copied to clipboard`,
                                })
                              }}
                            >
                              <button className="btn-ghost btn-square btn">
                                <Copy size={24} />
                              </button>
                            </CopyToClipboard>
                          </div>

                          <button
                            onClick={() => {
                              if (
                                qr.asset === asset &&
                                qr.network === network
                              ) {
                                setQR({
                                  address: '',
                                  network: '',
                                  asset: '',
                                })
                              } else {
                                setQR({
                                  address: address as string,
                                  network: network,
                                  asset: asset,
                                })
                              }
                            }}
                            className="btn-ghost btn-square btn"
                          >
                            <QR width="24" height="24" />
                          </button>
                        </div>
                      </div>
                      {qr.asset === asset && qr.network === network ? (
                        <div className="flex items-center justify-center pt-2 pb-4">
                          <QRCodeSVG value={qr.address} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )
      }
    })
  }

  return (
    <>
      <Head>
        <title>
          {profile.username ? profile.username.toUpperCase() : 'User Profile'}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/btc.svg" />
        <link rel="icon" href="/btc.png" />
      </Head>
      <div className="container mx-auto flex justify-center">
        <div className="flex w-full max-w-2xl flex-col items-center justify-center p-4">
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
            <div className="flex flex-col gap-4">{assets}</div>
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
