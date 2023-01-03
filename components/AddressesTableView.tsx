/* eslint-disable @next/next/no-img-element */
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Copy } from 'react-feather'
import { coinsMap } from '../utils/constants'
import { QR } from './Icons/QR'

type Props = {
  assetAddresses: {
    asset: string
    addresses: {
      network: string
      address: string
    }[]
  }[]
}

type ToastDetails = {
  hidden: boolean
  message: string
}

function AddressesTableView({ assetAddresses }: Props) {
  const [activeQR, setActiveQR] = useState({
    asset: '',
    network: '',
    address: '',
  })

  const [toast, setToast] = useState<ToastDetails>({
    hidden: true,
    message: '',
  })

  const toggleToast = (toastDetails: ToastDetails) => {
    setToast(toastDetails)
    setTimeout(() => setToast({ hidden: true, message: '' }), 1500)
  }

  return (
    <div className="flex flex-col gap-y-3 text-xs sm:text-sm md:gap-y-4">
      <div className="flex px-3 font-bold md:px-4">
        <div className="flex w-24 md:w-44 lg:w-48">Asset</div>
        <div className="flex w-16 md:w-24">Network</div>
        <div className="flex flex-1">Address</div>
      </div>

      {assetAddresses.map(({ asset, addresses }) => {
        const coinDetails = coinsMap.get(asset)!

        if (addresses.length > 0) {
          return (
            <div
              key={asset}
              className="flex flex-col rounded-lg bg-base-200 px-3 py-1 drop-shadow-sm md:py-2 md:px-4"
            >
              {addresses.map(({ network, address }, i) => {
                return (
                  <div key={network + asset} className="flex flex-col">
                    <div
                      className={`flex h-14 items-center ${
                        activeQR.asset === asset && activeQR.network === network
                          ? 'font-bold'
                          : ''
                      }`}
                    >
                      <div className="flex w-24 md:w-44 lg:w-48">
                        {i === 0 ? (
                          <div
                            className={`flex items-center gap-2 md:gap-3 ${
                              activeQR.asset === asset ? 'font-bold' : ''
                            }`}
                          >
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
                      <div className="flex w-16 md:w-20 lg:w-24 ">
                        {network}
                      </div>
                      <div className="flex w-full flex-1 overflow-x-hidden">
                        <CopyToClipboard
                          text={address}
                          onCopy={() => {
                            toggleToast({
                              hidden: false,
                              message: `${asset} address copied to clipboard`,
                            })
                          }}
                        >
                          <div className=" flex h-10 w-full cursor-pointer items-center rounded-lg bg-base-300 px-2 text-xs sm:text-sm md:px-4">
                            {address}
                          </div>
                        </CopyToClipboard>
                      </div>

                      <div className="hidden items-center justify-between md:flex md:pl-2">
                        <CopyToClipboard
                          text={address}
                          onCopy={() => {
                            toggleToast({
                              hidden: false,
                              message: `${asset} address copied to clipboard`,
                            })
                          }}
                        >
                          <button className="btn-ghost btn-square btn">
                            <Copy size={24} />
                          </button>
                        </CopyToClipboard>
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
                          className="btn-ghost btn-square btn "
                        >
                          <QR width="24" height="24" />
                        </button>
                      </div>
                    </div>
                    {activeQR.asset === asset &&
                    activeQR.network === network ? (
                      <div className="flex items-center justify-center pt-2 pb-4">
                        <QRCodeSVG value={activeQR.address} />
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          )
        }
      })}
      <div
        className={`toast-center toast toast-top z-10 w-80 text-center md:w-96 md:toast-bottom ${
          toast.hidden ? 'hidden' : ''
        }`}
      >
        <div className="alert alert-success">
          <div className="flex w-full items-center">
            <span className="w-full">{toast.message}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressesTableView
