/* eslint-disable @next/next/no-img-element */

import { Disclosure } from '@headlessui/react'
import { QRCodeSVG } from 'qrcode.react'
import { SetStateAction } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { ChevronDown, Copy } from 'react-feather'
import { coinsMap, networksMap } from '../utils/constants'
import { QR } from './Icons/QR'

type Props = {
  asset: string
  addresses: {
    network: string
    address: string
  }[]
  activeQR: {
    asset: string
    network: string
    address: string
  }
  setActiveQR: (
    value: SetStateAction<{
      asset: string
      network: string
      address: string
    }>
  ) => void
  setToast: (
    value: SetStateAction<{
      hidden: boolean
      message: string
    }>
  ) => void
}

function MultipleNetworksAssetView({
  asset,
  addresses,
  activeQR,
  setActiveQR,
  setToast,
}: Props) {
  return (
    <Disclosure
      defaultOpen={false}
      as="div"
      className="flex flex-col rounded-lg bg-base-200 px-2 text-xs md:px-4 md:text-sm"
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="flex h-14 w-full items-center justify-between">
            <div className="flex w-24 items-center gap-1 md:w-48 md:gap-2">
              <img
                className="h-6 w-6 md:h-8 md:w-8"
                src={coinsMap.get(asset)?.logo}
                alt={`${coinsMap.get(asset)?.name} Logo`}
              />
              <div className="flex flex-col items-start justify-end">
                <span className="hidden md:flex">
                  {coinsMap.get(asset)?.name}
                </span>
                <span className="md:opacity-40">
                  {coinsMap.get(asset)?.abbreviation}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`h-6 w-6 md:h-8 md:w-8 ${
                open ? 'rotate-180 transform' : ''
              }`}
            />
          </Disclosure.Button>

          <Disclosure.Panel className="flex flex-col">
            {addresses.map(({ address, network }) => (
              // <SingleNetworkAssetView
              //   key={addressObject.network}
              //   asset={asset}
              //   network={addressObject.network}
              //   address={addressObject.address}
              //   activeQR={activeQR}
              //   setActiveQR={setActiveQR}
              //   setToast={setToast}
              // />

              <div key={network} className="flex flex-col">
                <div
                  className={`flex h-14 items-center justify-between ${
                    activeQR.asset === asset && activeQR.network === network
                      ? 'font-bold'
                      : ''
                  }`}
                >
                  <div className="flex w-20 items-center gap-1 md:w-48 md:gap-3">
                    <div className="relative h-6 w-6 md:h-8 md:w-8">
                      <img
                        className="h-6 w-6 md:h-8 md:w-8"
                        src={coinsMap.get(asset)?.logo}
                        alt={`${coinsMap.get(asset)?.name} Logo`}
                      />
                      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 rounded-full bg-white">
                        <img
                          className="h-3 w-3 md:h-4 md:w-4"
                          src={networksMap.get(network)?.logo}
                          alt={`${networksMap.get(network)?.logo} Logo`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-end text-xs md:text-sm">
                      <span className="hidden">
                        {networksMap.get(network)?.name}
                      </span>
                      <span className="opacity-90">
                        {networksMap.get(network)?.abbreviation}
                      </span>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
                    <CopyToClipboard
                      text={address}
                      onCopy={() => {
                        setToast({
                          hidden: false,
                          message: `${asset} address on ${network} network copied to clipboard`,
                        })
                      }}
                    >
                      <div className="flex h-10 w-full cursor-pointer items-center overflow-x-hidden rounded-lg bg-base-300 px-2">
                        {address}
                      </div>
                    </CopyToClipboard>

                    <div className="flex">
                      <div className="tooltip" data-tip="Copy to clipboard">
                        <CopyToClipboard
                          text={address}
                          onCopy={() => {
                            setToast({
                              hidden: false,
                              message: `${asset} address on ${network} network copied to clipboard`,
                            })
                          }}
                        >
                          <button className="btn-ghost btn-square btn">
                            <Copy size={24} />
                          </button>
                        </CopyToClipboard>
                      </div>

                      <button
                        onClick={() => {
                          if (
                            activeQR.asset === asset &&
                            activeQR.network === network
                          ) {
                            setActiveQR({
                              address: '',
                              network: '',
                              asset: '',
                            })
                          } else {
                            setActiveQR({
                              address,
                              network,
                              asset,
                            })
                          }
                        }}
                        className="btn-ghost btn-square btn"
                      >
                        <QR width="24" height="24" />
                      </button>
                    </div>
                  </div>
                </div>
                {activeQR.asset === asset && activeQR.network === network ? (
                  <div className="flex items-center justify-center pt-2 pb-4">
                    <QRCodeSVG value={activeQR.address} />
                  </div>
                ) : null}
              </div>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default MultipleNetworksAssetView
