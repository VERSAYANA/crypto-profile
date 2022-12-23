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

  console.log(profile)

  const { username } = router.query

  useEffect(() => {
    if (!loading && !username) {
      router.push('/')
    }
  }, [loading, router, username])

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
          <div key={key} className="flex items-center justify-between gap-1">
            <p>{`${key}: ${value}`}</p>
            <div className="flex">
              <div className="tooltip" data-tip="Copy to clipboard">
                <button
                  onClick={() => copyContent(value)}
                  className="btn-ghost btn-square btn"
                >
                  <Copy size={24} />
                </button>
              </div>
              <div>
                <button
                  onClick={() => copyContent(value)}
                  className="btn-ghost btn-square btn"
                >
                  <QR width="24" height="24" />
                </button>
              </div>
            </div>
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

      <div className="flex flex-col">{coins}</div>
    </div>
  )
}

export default Username
