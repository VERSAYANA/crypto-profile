export interface WalletAddresses {
  [coin: string]: {
    [network: string]: string
  }
}

export interface Addresses {
  [network: string]: string
}

export type ToastDetails = {
  hidden: boolean
  message: string
  type?: string
}
