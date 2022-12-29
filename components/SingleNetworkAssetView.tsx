/* eslint-disable @next/next/no-img-element */

import { QRCodeSVG } from 'qrcode.react'
import { SetStateAction } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Copy } from 'react-feather'
import { coinsMap } from '../utils/constants'
import { QR } from './Icons/QR'

type Props = {
  asset: string
  network: string
  address: string
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

function SingleNetworkAssetView({
  asset,
  network,
  address,
  activeQR,
  setActiveQR,
  setToast,
}: Props) {
  return (
    <div className="flex w-full flex-col rounded-lg bg-base-200 px-2 text-xs md:px-4 md:text-sm">
      <div
        className={`flex h-14 items-center justify-between  ${
          activeQR.asset === asset && activeQR.network === network
            ? 'font-bold'
            : ''
        }`}
      >
        <div className="flex w-20 items-center gap-1 md:w-48 md:gap-3">
          <img
            className="h-6 w-6 md:h-8 md:w-8"
            src={coinsMap.get(asset)?.logo}
            alt={`${coinsMap.get(asset)?.name} Logo`}
          />
          <div className="flex flex-col items-start justify-end text-xs md:text-sm">
            <span className="hidden md:flex">{coinsMap.get(asset)?.name}</span>
            <span className="md:opacity-40">
              {coinsMap.get(asset)?.abbreviation}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
          <CopyToClipboard
            text={address}
            onCopy={() => {
              setToast({
                hidden: false,
                message: `${asset} address copied to clipboard`,
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
                    message: `${asset} address copied to clipboard`,
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
                if (activeQR.asset === asset && activeQR.network === network) {
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
  )
}

export default SingleNetworkAssetView
