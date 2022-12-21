export const coins = [
  ['BTC', '/svg/icon/btc.svg'],
  ['ETH', '/svg/icon/eth.svg'],
  ['USDT', '/svg/icon/usdt.svg'],
  ['USDC', '/svg/icon/usdc.svg'],
  ['BUSD', '/svg/icon/busd.svg'],
  ['BNB', '/svg/icon/bnb.svg'],
  ['XRP', '/svg/icon/xrp.svg'],
  ['DOGE', '/svg/icon/doge.svg'],
  ['ADA', '/svg/icon/ada.svg'],
  ['MATIC', '/svg/icon/matic.svg'],
]

interface CoinDetails {
  name: string
  abbreviation: string
  logo: string
}

export const coinsMap = new Map<number, CoinDetails>()
coinsMap.set(0, {
  name: 'Bitcoin',
  abbreviation: 'BTC',
  logo: '/svg/icon/btc.svg',
})
coinsMap.set(1, {
  name: 'Ethereum',
  abbreviation: 'ETH',
  logo: '/svg/icon/eth.svg',
})
coinsMap.set(2, {
  name: 'Tether',
  abbreviation: 'USDT',
  logo: '/svg/icon/usdt.svg',
})
coinsMap.set(3, {
  name: 'USD Coin',
  abbreviation: 'USDC',
  logo: '/svg/icon/usdc.svg',
})
coinsMap.set(4, {
  name: 'Binance USD',
  abbreviation: 'BUSD',
  logo: '/svg/icon/busd.png',
})
coinsMap.set(5, {
  name: 'Binance Coin',
  abbreviation: 'BNB',
  logo: '/svg/icon/bnb.svg',
})
coinsMap.set(6, {
  name: 'XRP',
  abbreviation: 'XRP',
  logo: '/svg/icon/xrp.svg',
})
coinsMap.set(7, {
  name: 'Dogecoin',
  abbreviation: 'DOGE',
  logo: '/svg/icon/doge.svg',
})
coinsMap.set(8, {
  name: 'Cardano',
  abbreviation: 'ADA',
  logo: '/svg/icon/ada.svg',
})
coinsMap.set(9, {
  name: 'Polygon',
  abbreviation: 'MATIC',
  logo: '/svg/icon/matic.svg',
})
coinsMap.set(10, {
  name: 'TRON',
  abbreviation: 'TRX',
  logo: '/svg/icon/trx.svg',
})
coinsMap.set(11, {
  name: 'Dai',
  abbreviation: 'DAI',
  logo: '/svg/icon/dai.svg',
})
coinsMap.set(12, {
  name: 'Litecoin',
  abbreviation: 'LTC',
  logo: '/svg/icon/ltc.svg',
})
coinsMap.set(13, {
  name: 'Polkadot',
  abbreviation: 'DOT',
  logo: '/svg/icon/dot.svg',
})
coinsMap.set(14, {
  name: 'Monero',
  abbreviation: 'XMR',
  logo: '/svg/icon/xmr.svg',
})
coinsMap.set(15, {
  name: 'Avalanche',
  abbreviation: 'AVAX',
  logo: '/svg/icon/avax.svg',
})
coinsMap.set(16, {
  name: 'Toncoin',
  abbreviation: 'TON',
  logo: '/svg/icon/ton.png',
})
coinsMap.set(17, {
  name: 'Bitcoin Cash',
  abbreviation: 'BCH',
  logo: '/svg/icon/bch.svg',
})
coinsMap.set(18, {
  name: 'Cosmos',
  abbreviation: 'ATOM',
  logo: '/svg/icon/atom.svg',
})
coinsMap.set(19, {
  name: 'Stellar',
  abbreviation: 'XLM',
  logo: '/svg/icon/xlm.svg',
})

coinsMap.forEach((coin, key) => {})
// coinsMap.set(12, {
//   name: 'Stellar',
//   abbreviation: 'XLM',
//   logo: '/svg/icon/xlm.svg',
// })

// coinsMap.set(14, {
//   name: 'THETA',
//   abbreviation: 'THETA',
//   logo: '/svg/icon/theta.svg',
// })
// coinsMap.set(15, {
//   name: 'EOS',
//   abbreviation: 'EOS',
//   logo: '/svg/icon/eos.svg',
// })
