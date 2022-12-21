import { useState, useEffect, useReducer } from 'react'
import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react'
import Image from 'next/image'
import { Database } from '../utils/database.types'
import Avatar from './Avatar'
import { coinsMap } from '../utils/constants'
import { useRouter } from 'next/router'
import PersonalInfoInput from './PersonalInfoInput'
type Profiles = Database['public']['Tables']['profiles']['Row']

function reducer(state: any, action: any) {
  if (action.type === 'update') {
    return {
      ...state,
      [action.coin]: action.newValue,
    }
  } else if (action.type === 'fetched') {
    return action.newState
  }
}

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
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

  console.log(full_name)

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
        alert('Error loading user data!')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getProfile()
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
    console.log(full_name)
    try {
      setLoading(true)
      if (!user) throw new Error('No user')
      console.log(full_name)
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
      alert('Profile updated!')
      setDbUsername(username)
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
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
          value={session.user.email}
          disabled
        />
      </div>
      <div>
        <label htmlFor="username" className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          disabled={!!dbUsername || loading}
          className="input-bordered input w-full"
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

      {[...coinsMap].map(([key, coin]) => (
        <div key={key} className="my-2 flex gap-3">
          <div className="flex h-12 w-1/3 items-center gap-4 rounded-lg bg-slate-100 px-4">
            <Image alt="btc logo" src={coin.logo} width={32} height={32} />
            <div className="flex flex-col text-sm">
              <span>{coin.name}</span>
              <span className="opacity-40">{coin.abbreviation}</span>
            </div>
          </div>
          <input
            disabled={loading}
            value={
              coinsState[coin.abbreviation] ? coinsState[coin.abbreviation] : ''
            }
            onChange={(e) =>
              dispatch({
                type: 'update',
                coin: coin.abbreviation,
                newValue: e.target.value,
              })
            }
            className="input-bordered input w-2/3 text-sm"
          />
        </div>
      ))}

      <div className="my-4 flex justify-end gap-x-2">
        {dbUsername ? (
          <div>
            <button
              className="btn-warning btn w-full"
              onClick={() => router.push(`/u/${dbUsername}`)}
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
    </div>
  )
}
