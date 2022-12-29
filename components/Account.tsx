/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useReducer } from 'react'
import { useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
import Avatar from './Avatar'
import { coinsMap, networksMap } from '../utils/constants'
import { useRouter } from 'next/router'
import PersonalInfoInput from './PersonalInfoInput'
import Head from 'next/head'
import { ChevronDown } from 'react-feather'
import { Disclosure } from '@headlessui/react'
type Profiles = Database['public']['Tables']['profiles']['Row']

function reducer(state: any, action: any) {
  if (action.type === 'update') {
    return {
      ...state,
      [action.coin]: {
        ...state[action.coin],
        [action.network]: action.newValue,
      },
    }
  } else if (action.type === 'fetched') {
    return action.newState
  }
}

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const { user } = session
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [dbUsername, setDbUsername] = useState<Profiles['username']>(null)

  const [full_name, setFullname] = useState<Profiles['full_name']>(null)
  const [bio, setBio] = useState<Profiles['bio']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [twitter, setTwitter] = useState<Profiles['twitter']>(null)
  const [github, setGithub] = useState<Profiles['github']>(null)

  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const [coinsState, dispatch] = useReducer(reducer, {})

  const [toast, setToast] = useState({
    hidden: true,
    message: '',
    type: '',
  })
  useEffect(() => {
    const timer = setTimeout(
      () =>
        setToast({
          hidden: true,
          message: '',
          type: '',
        }),
      1000
    )
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        if (!user) throw new Error('No user')

        let { data, error, status } = await supabase
          .from('profiles')
          .select(
            `username, bio, website, twitter, github, avatar_url, addresses, full_name`
          )
          .eq('id', user.id)
          .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setUsername(data.username)
          setDbUsername(data.username)
          setFullname(data.full_name)
          setBio(data.bio)
          setWebsite(data.website)
          setTwitter(data.twitter)
          setGithub(data.github)
          setAvatarUrl(data.avatar_url)
          dispatch({
            type: 'fetched',
            newState: data.addresses ? data.addresses : {},
          })
        }
      } catch (error) {
        setToast({
          hidden: false,
          message: 'Error loading user data!',
          type: 'error',
        })
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function updateProfile({
    username,
    website,
    avatar_url,
    addresses,
    twitter,
    bio,
    github,
    full_name,
  }: {
    username: Profiles['username']
    website: Profiles['website']
    avatar_url: Profiles['avatar_url']
    addresses: Profiles['addresses']
    twitter: Profiles['twitter']
    bio: Profiles['bio']
    github: Profiles['github']
    full_name: Profiles['full_name']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')
      const updates = {
        id: user.id,
        username: username?.toLowerCase(),
        website,
        avatar_url,
        addresses,
        twitter,
        bio,
        github,
        full_name,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) throw error
      setToast({
        hidden: false,
        message: 'Profile updated!',
        type: 'success',
      })
      setDbUsername(username)
    } catch (error) {
      setToast({
        hidden: false,
        message: 'Error updating the data!',
        type: 'error',
      })
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/btc.svg" />
        <link rel="icon" href="/btc.png" />
      </Head>
      <div className="flex w-full flex-col">
        {user ? (
          <Avatar
            uid={user.id}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url)
              updateProfile({
                username,
                website,
                avatar_url: url,
                addresses: coinsState,
                twitter,
                bio,
                github,
                full_name,
              })
            }}
          />
        ) : null}
        <div>
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input-bordered input w-full"
            id="email"
            type="text"
            value={user?.email || ''}
            disabled
          />
        </div>
        <div>
          <label htmlFor="username" className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            disabled={!!dbUsername || loading}
            className="input-bordered input-error input w-full"
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <PersonalInfoInput
          id="fullname"
          label="Full Name"
          value={full_name}
          setValue={setFullname}
          loading={loading}
        />
        <PersonalInfoInput
          id="bio"
          label="Bio"
          value={bio}
          setValue={setBio}
          loading={loading}
        />
        <PersonalInfoInput
          id="website"
          label="Website"
          value={website}
          setValue={setWebsite}
          loading={loading}
        />
        <PersonalInfoInput
          id="twitter"
          label="Twitter"
          value={twitter}
          setValue={setTwitter}
          loading={loading}
        />
        <PersonalInfoInput
          id="github"
          label="Github"
          value={github}
          setValue={setGithub}
          loading={loading}
        />
        <h2 className="text-md my-4 pl-1">Coins</h2>

        <div className="flex flex-col gap-y-4">
          {[...coinsMap].map(([key, coin]) => {
            if (coin.networks.length <= 1) {
              return (
                <div
                  key={key}
                  className="flex h-16 items-center justify-between rounded-lg bg-base-200 px-2 text-xs md:px-3 md:text-sm"
                >
                  <div className="flex w-24 items-center gap-2 md:w-48 md:gap-3">
                    <img
                      className="h-6 w-6 md:h-8 md:w-8"
                      src={coin.logo}
                      alt={`${coin.abbreviation} Logo`}
                    />
                    <div className="flex flex-col items-start justify-start text-xs md:text-sm">
                      <span className="hidden md:flex">{coin.name}</span>
                      <span className="md:opacity-40">{coin.abbreviation}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-end">
                    <input
                      disabled={loading}
                      value={
                        coinsState[coin.abbreviation]?.[coin.networks[0]]
                          ? coinsState[coin.abbreviation][coin.networks[0]]
                          : ''
                      }
                      onChange={(e) =>
                        dispatch({
                          type: 'update',
                          coin: coin.abbreviation,
                          newValue: e.target.value,
                          network: coin.networks[0],
                        })
                      }
                      className="input-bordered input h-10 w-full text-xs md:text-sm"
                    />
                  </div>
                </div>
              )
            } else {
              return (
                <Disclosure
                  key={key}
                  as="div"
                  className="flex flex-col  rounded-lg bg-base-200 px-2 md:px-3"
                >
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex h-16 items-center justify-between">
                        <div className="flex w-24 items-center gap-2 md:w-48 md:gap-3">
                          <img
                            className="h-6 w-6 md:h-8 md:w-8"
                            src={coin.logo}
                            alt={`${coin.abbreviation} Logo`}
                          />
                          <div className="flex flex-col items-start justify-start text-xs md:text-sm">
                            <span className="hidden md:flex">{coin.name}</span>
                            <span className="md:opacity-40">
                              {coin.abbreviation}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <ChevronDown
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-6 w-6 md:h-8 md:w-8`}
                          />
                        </div>
                      </Disclosure.Button>

                      <Disclosure.Panel>
                        {coin.networks.map((network) => (
                          <div
                            key={network}
                            className="flex h-16 items-center justify-between text-xs md:text-sm"
                          >
                            <div className="flex w-24 items-center gap-2 md:w-48 md:gap-3">
                              <div className="relative h-6 w-6 md:h-8 md:w-8">
                                <img
                                  className="h-6 w-6 md:h-8 md:w-8"
                                  src={coin.logo}
                                  alt={`${coin.abbreviation} Logo`}
                                />
                                <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 rounded-full bg-white">
                                  <img
                                    className=" h-3 w-3  md:h-4 md:w-4"
                                    src={networksMap.get(network)?.logo}
                                    alt={`${
                                      networksMap.get(network)?.logo
                                    } Logo`}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-start justify-start text-xs md:text-sm">
                                <span className="hidden md:flex">
                                  {networksMap.get(network)?.name}
                                </span>
                                <span className="md:opacity-40">
                                  {networksMap.get(network)?.abbreviation}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-1 items-center justify-end ">
                              <input
                                disabled={loading}
                                value={
                                  coinsState[coin.abbreviation]?.[network]
                                    ? coinsState[coin.abbreviation][network]
                                    : ''
                                }
                                onChange={(e) =>
                                  dispatch({
                                    type: 'update',
                                    coin: coin.abbreviation,
                                    newValue: e.target.value,
                                    network: network,
                                  })
                                }
                                className="input-bordered input h-10 w-full text-xs md:text-sm"
                              />
                            </div>
                          </div>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )
            }
          })}
        </div>

        <div className="my-4 flex justify-end gap-x-2">
          {dbUsername ? (
            <div>
              <button
                className="btn-warning btn w-full"
                onClick={() => router.push(`/${dbUsername}`)}
              >
                Visit Profile
              </button>
            </div>
          ) : null}

          <div>
            <button
              className={`btn-accent btn w-full ${loading ? 'loading' : ''}`}
              onClick={() =>
                updateProfile({
                  username,
                  website,
                  avatar_url,
                  addresses: coinsState,
                  twitter,
                  bio,
                  github,
                  full_name,
                })
              }
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>
        </div>
        <div
          className={`toast-center toast toast-top z-10 w-80 text-center md:toast-bottom ${
            toast.hidden ? 'hidden' : ''
          }`}
        >
          <div className={`alert alert-${toast.type}`}>
            <div className="flex w-full items-center">
              <span className="w-full">{toast.message}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
