import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Database } from '../../utils/database.types'
import Image from 'next/image'
import Avatar from '../../components/Avatar'
import Link from 'next/link'
import { GitHub, Twitter, Link as LinkIcon } from 'react-feather'
import { getValidUrlFromUsernameOrUrl } from '../../utils/functions'

type Profiles = Database['public']['Tables']['profiles']['Row']

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
  }, [supabase, username])

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
    </div>
  )
}

export default Username
