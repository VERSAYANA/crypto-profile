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
  const [qr, setQR] = useState(['', ''])

  console.log(profile)

  const { username } = router.query

  useEffect(() => {
    if (!loading && !username) {
      router.push('/')
    }
  }, [loading, router, username])

  // Hide toast after 1s
  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 1000)
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
            <div className="flex items-center justify-between gap-1">
              {/* <p
                className={`${key === qr[0] && qr[1] ? 'font-bold' : ''}`}
              >{`${key}: ${value}`}</p> */}
              <div>{coinsMap.get(key)?.name}</div>
              <CopyToClipboard text={value} onCopy={() => setShowToast(true)}>
                <span
                  className={`w-80 cursor-pointer overflow-x-hidden rounded-lg border border-base-300 p-2 ${
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
                    onCopy={() => setShowToast(true)}
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
    <div className="flex flex-col items-center">
      <div className="mt-6">
        <Avatar url={profile?.avatar_url || ''} />
      </div>

      <div className="my-4 flex flex-col items-center">
        {profile?.full_name ? (
          <h2 className="text-xl font-bold">{profile.full_name}</h2>
        ) : null}
        <h3 className="text-md opacity-85">@{username}</h3>
      </div>
      <div className="flex flex-col items-center">
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
        className={`toast-center toast toast-bottom w-60 text-center ${
          showToast ? '' : 'hidden'
        }`}
      >
        <div className="alert alert-success">
          <div className="flex w-full items-center">
            <span className="w-full">Copied to clipboard.</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">{coins}</div>
    </div>
  )
}

export default Username