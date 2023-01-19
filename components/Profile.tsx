import { Twitter, GitHub, Link } from 'react-feather'

import Avatar from './Avatar'
import AddressesTableView from './AddressesTableView'
import { Database } from '@/utils/database.types'
import { getValidUrlFromUsernameOrUrl, orderCoins } from '@/utils/functions'

type Profiles = Database['public']['Tables']['profiles']['Row']

type Props = {
  profile: Profiles
}

function Profile({ profile }: Props) {
  return (
    <div className="flex w-full flex-col">
      <div className="mt-6">
        {profile?.avatar_url ? (
          <Avatar url={profile?.avatar_url || ''} />
        ) : null}
      </div>

      <div className="my-4 flex flex-col items-center">
        {profile?.full_name ? (
          <h2 className="text-xl font-bold">{profile.full_name}</h2>
        ) : null}
        <h3 className="text-md opacity-85">@{profile.username}</h3>
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
              <Link size={28} />
            </a>
          ) : null}
        </div>
      </div>

      {profile?.addresses ? (
        <AddressesTableView assetAddresses={orderCoins(profile.addresses)} />
      ) : null}
    </div>
  )
}

export default Profile
