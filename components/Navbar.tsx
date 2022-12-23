import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
import Avatar from './Avatar'
import { ChevronDown } from 'react-feather'
type Profiles = Database['public']['Tables']['profiles']['Row']

function Navbar() {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        if (!user) throw new Error('No user')

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, avatar_url`)
          .eq('id', user.id)
          .single()

        if (data) {
          setUsername(data.username)
          setAvatarUrl(data.avatar_url)
        }

        if (error && status !== 406) {
          throw error
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const signIn = () => {
    console.log('sign in')
  }

  const signInButton = (
    <Link href="/auth" className="btn-ghost btn">
      Sign In
    </Link>
  )

  const userDropDown = (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn">
        <div className="flex items-center gap-4">
          <ChevronDown />
          {username ? <span>{username}</span> : null}
          <Avatar url={avatarUrl} width={40} height={40} />
        </div>
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        {username ? (
          <li>
            <Link href={`/u/${username}`}>Profile</Link>
          </li>
        ) : null}
        <li>
          <Link href={`/`}>Edit Profile</Link>
        </li>
        <li>
          <a onClick={() => supabase.auth.signOut()}>Logout</a>
        </li>
      </ul>
    </div>
  )

  let topRight = null
  if (user) {
    topRight = userDropDown
  } else {
    topRight = signInButton
  }

  return (
    <div className="navbar sticky top-0 z-10 items-center justify-center  bg-base-100 shadow">
      <div className="container flex w-full justify-between">
        <div>{/* <button className="btn-accent btn">Save</button> */}</div>
        <div className="flex justify-end">{topRight}</div>
      </div>
    </div>
  )
}

export default Navbar
