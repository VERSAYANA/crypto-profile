/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useReducer } from 'react'
import { useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Avatar from './Avatar'
import PersonalInfoInput from './PersonalInfoInput'
import { Database } from '@/utils/database.types'
import { ToastDetails } from '@/utils/types'
import { coinsMap } from '@/utils/constants'

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

  const [toast, setToast] = useState<ToastDetails>({
    hidden: true,
    message: '',
    type: '',
  })

  const toggleToast = (toastDetails: ToastDetails) => {
    setToast(toastDetails)
    setTimeout(() => setToast({ hidden: true, message: '', type: '' }), 1500)
  }

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
        toggleToast({
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
        username: username?.toLowerCase().trim(),
        website: website?.trim(),
        avatar_url: avatar_url?.trim(),
        addresses,
        twitter: twitter?.trim(),
        bio: bio?.trim(),
        github: github?.trim(),
        full_name: full_name?.trim(),
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) throw error
      toggleToast({
        hidden: false,
        message: 'Profile updated!',
        type: 'success',
      })
      setDbUsername(username)
    } catch (error) {
      toggleToast({
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
        <meta property="og:title" content="Edit Profile" key="title" />
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
        <h2 className="text-md mb-4 mt-6 pl-1">Cryptocurrency Addresses</h2>

        <div className="flex flex-col gap-y-3 text-xs sm:text-sm md:gap-y-4">
          <div className="flex px-3 font-bold md:px-4">
            <div className="flex w-24 md:w-48">Asset</div>
            <div className="flex w-16 md:w-24">Network</div>
            <div className="flex flex-1">Address</div>
          </div>
          {[...coinsMap].map(([coin, coinDetails]) => {
            return (
              <div
                key={coin}
                className="flex flex-col rounded-lg bg-base-200 px-3 py-1 drop-shadow-sm md:py-2 md:px-4"
              >
                {coinDetails.networks.map((network, i) => {
                  return (
                    <div
                      key={network + coin}
                      className="flex h-14 items-center"
                    >
                      <div className="flex w-24 md:w-48">
                        {i === 0 ? (
                          <div className="flex items-center gap-2 md:gap-3">
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
                      <div className="flex w-16 md:w-24">{network}</div>
                      <div className="flex flex-1">
                        <input
                          disabled={loading}
                          value={
                            coinsState[coinDetails.abbreviation]?.[network]
                              ? coinsState[coinDetails.abbreviation][network]
                              : ''
                          }
                          onChange={(e) =>
                            dispatch({
                              type: 'update',
                              coin: coinDetails.abbreviation,
                              newValue: e.target.value.trim(),
                              network: network,
                            })
                          }
                          className="input h-10 w-full px-2 text-xs sm:text-sm md:px-4"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* <div className="mt-4 flex flex-col gap-y-4">
          {[...coinsMap].map(([key, coin]) => {
            if (coin.networks.length <= 1) {
              return (
                <SingleNetworkAssetInput
                  key={key}
                  coin={coin}
                  coinsState={coinsState}
                  dispatch={dispatch}
                  loading={loading}
                />
              )
            } else {
              return (
                <MultipleNetworksAssetInput
                  key={key}
                  coin={coin}
                  coinsState={coinsState}
                  dispatch={dispatch}
                  loading={loading}
                />
              )
            }
          })}
        </div> */}

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
              {loading ? 'Loading ...' : 'Save'}
            </button>
          </div>
        </div>
        <div
          className={`toast-center toast toast-top z-10 w-80 text-center md:toast-bottom ${
            toast.hidden ? 'hidden' : ''
          }`}
        >
          <div className={`alert shadow-lg alert-${toast.type}`}>
            <div className="flex w-full items-center">
              <span className="w-full">{toast.message}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
