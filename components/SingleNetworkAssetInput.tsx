/* eslint-disable @next/next/no-img-element */
import { CoinDetails } from '@/utils/constants'

type Props = {
  coin: CoinDetails
  loading: boolean
  coinsState: any
  dispatch: (value: any) => void
}

function SingleNetworkAssetInput({
  coin,
  loading,
  coinsState,
  dispatch,
}: Props) {
  return (
    <div className="flex h-16 items-center justify-between rounded-lg bg-base-200 px-2 text-xs md:px-4 md:text-sm">
      <div className="flex w-24 items-center gap-2 md:w-52 md:gap-3">
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
}

export default SingleNetworkAssetInput
