import { coinOrder, networkOrder } from './constants'
import { WalletAddresses, Addresses } from './types'

export function getValidUrlFromUsernameOrUrl(
  usernameOrUrl: string,
  websitePrefix: string
): string {
  if (!usernameOrUrl.startsWith('http') && !usernameOrUrl.startsWith('www')) {
    return websitePrefix + usernameOrUrl
  }
  return usernameOrUrl
}

export function orderCoins(input: WalletAddresses) {
  const result = []
  const addr = Object.entries(input)
  for (const coin of coinOrder) {
    if (input[coin]) {
      result.push({
        asset: coin,
        addresses: orderNetwork(input[coin]),
      })
    }
  }
  return result
}

function orderNetwork(input: Addresses) {
  const result = []
  for (const network of networkOrder) {
    if (input[network]) {
      result.push({
        network: network,
        address: input[network],
      })
    }
  }
  return result
}
