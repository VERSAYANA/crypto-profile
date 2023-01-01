import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
import Avatar from './Avatar'
import { ChevronDown, Home } from 'react-feather'
import { themeChange } from 'theme-change'

type Profiles = Database['public']['Tables']['profiles']['Row']

type Theme = 'dark' | 'light' | 'system' | null

function Navbar() {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    themeChange(false)
  }, [])

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
    <div className="dropdown-bottom dropdown">
      <label tabIndex={0} className="btn-ghost btn">
        <div className="flex items-center gap-4">
          <ChevronDown />
          {username ? <span>{username}</span> : null}
          <Avatar url={avatarUrl} width={40} height={40} />
        </div>
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
      >
        {username ? (
          <li>
            <Link href={`/${username}`}>Profile</Link>
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
    <div className="navbar sticky top-0 z-10 items-center justify-center bg-base-200 px-2 shadow-md md:px-4">
      <div className="container flex w-full justify-between">
        <div className="flex gap-2">
          <Link href={'/'} className="btn-ghost btn-square btn">
            <Home size={24} />
          </Link>

          {/* <div title=" Theme" className="dropdown">
            <div tabIndex={0} className={`btn-ghost btn gap-1 normal-case`}>
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              <span className="hidden md:inline">Theme</span>
              <svg
                width="12px"
                height="12px"
                className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
              </svg>

              <div
                className={`dropdown-content rounded-t-box rounded-b-box top-px mt-16 h-[70vh] max-h-96 w-40 overflow-y-auto bg-base-200 text-base-content shadow-2xl md:w-52`}
              >
                <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className="overflow-hidden rounded-lg outline outline-2 outline-offset-2 outline-base-content"
                      data-set-theme={theme.id}
                      data-act-class="outline"
                    >
                      <div
                        data-theme={theme.id}
                        className="w-full cursor-pointer bg-base-100 font-sans text-base-content"
                      >
                        <div className="grid grid-cols-5 grid-rows-3">
                          <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                            <div className="flex-grow text-sm font-bold">
                              {theme.id}
                            </div>
                            <div className="flex flex-shrink-0 flex-wrap gap-1">
                              <div className="w-2 rounded bg-primary" />
                              <div className="w-2 rounded bg-secondary" />
                              <div className="w-2 rounded bg-accent" />
                              <div className="w-2 rounded bg-neutral" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="flex justify-end gap-1 md:gap-2">{topRight}</div>
      </div>
    </div>
  )
}

export default Navbar
