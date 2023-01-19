/* eslint-disable @next/next/no-img-element */
import { Disclosure } from '@headlessui/react'
import { ChevronDown } from 'react-feather'

import { CoinDetails, networksMap } from '@/utils/constants'

type Props = {
  coin: CoinDetails
  loading: boolean
  coinsState: any
  dispatch: (value: any) => void
}

function MultipleNetworksAssetInput({
  coin,
  loading,
  coinsState,
  dispatch,
}: Props) {
  return (
    <Disclosure
      as="div"
      className="flex flex-col  rounded-lg bg-base-200 px-2 md:px-4"
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="flex h-16 items-center justify-between">
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
                <div className="flex w-24 items-center gap-2 md:w-52 md:gap-3">
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
                        alt={`${networksMap.get(network)?.logo} Logo`}
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

export default MultipleNetworksAssetInput
