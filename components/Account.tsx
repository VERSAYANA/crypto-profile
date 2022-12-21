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
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [dbUsername, setDbUsername] = useState<Profiles['username']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  const [coinsState, dispatch] = useReducer(reducer, {})

  console.log(coinsState)

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        if (!user) throw new Error('No user')

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url, addresses`)
          .eq('id', user.id)
          .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setUsername(data.username)
          setDbUsername(data.username)
          setWebsite(data.website)
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
  }, [session, supabase, user])

  async function updateProfile({
    username,
    website,
    avatar_url,
    addresses,
  }: {
    username: Profiles['username']
    website: Profiles['website']
    avatar_url: Profiles['avatar_url']
    addresses: any
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
          className="input-bordered input w-full"
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website" className="label">
          <span className="label-text">Website</span>
        </label>
        <input
          className="input-bordered input w-full"
          id="website"
          type="text"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
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
            <button className="btn-warning btn w-full" onClick={() => {}}>
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
