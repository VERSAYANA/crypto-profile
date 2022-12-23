/* eslint-disable @next/next/no-img-element */
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Database } from '../../utils/database.types'
import Image from 'next/image'
import Avatar from '../../components/Avatar'
import Link from 'next/link'
import { GitHub, Twitter, Link as LinkIcon, Copy } from 'react-feather'
import { getValidUrlFromUsernameOrUrl } from '../../utils/functions'
import { QR } from '../../components/Icons/QR'
import CopyToClipboard from 'react-copy-to-clipboard'
import { QRCodeSVG } from 'qrcode.react'
import { coinsMap } from '../../utils/constants'

type Profiles = Database['public']['Tables']['profiles']['Row']

const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    console.log('Content copied to clipboard')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

function Username() {
  const router = useRouter()
  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profiles | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [coin, setCoin] = useState('')
  const [qr, setQR] = useState(['', ''])

  console.log(profile)

  const { username } = router.query

  useEffect(() => {
    if (!loading && !username) {
      router.push('/')
    }
  }, [loading, router, username])

  // Hide toast after 0.8s
  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 800)
    return () => clearTimeout(timer)
  }, [showToast])

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        if (!username) throw new Error('No username')

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('username', username)
          .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setProfile(data)
        }
      } catch (error) {
        alert('Error loading user data!')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (username) {
      getProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  let coins = null
  if (profile?.addresses) {
    coins = Object.entries(profile.addresses).map(([key, value]) => {
      if (value) {
        return (
          <div key={key} className="flex flex-col gap-2">
            <div
              className={`flex items-center justify-between gap-1  ${
                key === qr[0] && qr[1] ? 'font-bold' : ''
              }`}
            >
              {/* <p
                className={`${key === qr[0] && qr[1] ? 'font-bold' : ''}`}
              >{`${key}: ${value}`}</p> */}
              <div className="flex h-12 w-1/3 items-center gap-2 rounded-lg bg-base-200 px-2 md:gap-4 md:px-4">
                <img
                  alt={`${coinsMap.get(key)?.abbreviation} Logo`}
                  src={coinsMap.get(key)?.logo}
                  width={24}
                  height={24}
                />
                <div className="flex flex-col text-sm">
                  <span className="hidden md:flex">
                    {coinsMap.get(key)?.name}
                  </span>
                  <span className="md:opacity-40">
                    {coinsMap.get(key)?.abbreviation}
                  </span>
                </div>
              </div>
              <CopyToClipboard
                text={value}
                onCopy={() => {
                  setShowToast(true)
                  setCoin(coinsMap.get(key)?.abbreviation || '')
                }}
              >
                <span
                  className={`flex h-12 w-2/3 cursor-pointer items-center overflow-hidden rounded-lg border border-base-300 p-2 text-sm ${
                    key === qr[0] && qr[1] ? 'font-bold' : ''
                  }`}
                >
                  {value}
                  {/* <input
                    disabled
                    className="input-bordered input !cursor-pointer"
                    value={value}
                  /> */}
                </span>
              </CopyToClipboard>
              {/* <p
                className={`${key === qr[0] && qr[1] ? 'font-bold' : ''}`}
              >{`${key}: ${value}`}</p> */}

              <div className="flex">
                <div className="tooltip" data-tip="Copy to clipboard">
                  <CopyToClipboard
                    text={value}
                    onCopy={() => {
                      setShowToast(true)
                      setCoin(coinsMap.get(key)?.abbreviation || '')
                    }}
                  >
                    <button className="btn-ghost btn-square btn">
                      <Copy size={24} />
                    </button>
                  </CopyToClipboard>
                </div>
                <div>
                  <button
                    onClick={() => {
                      if (key === qr[0] && qr[1]) {
                        setQR([key, ''])
                      } else {
                        setQR([key, value])
                      }
                    }}
                    className="btn-ghost btn-square btn"
                  >
                    <QR width="24" height="24" />
                  </button>
                </div>
              </div>
            </div>
            {key === qr[0] && qr[1] ? (
              <div className="flex items-center justify-center">
                <QRCodeSVG value={qr[1]} />
              </div>
            ) : null}
          </div>
        )
      }
    })
  }

  if (loading) {
    return <h2>loading</h2>
  }

  return (
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
            className={`toast-center toast toast-top z-10 w-80 text-center md:toast-bottom ${
              showToast ? '' : 'hidden'
            }`}
          >
            <div className="alert alert-success">
              <div className="flex w-full items-center">
                <span className="w-full">
                  {coin} address copied to clipboard.
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">{coins}</div>
        </div>
      </div>
    </div>
  )
}

export default Username
