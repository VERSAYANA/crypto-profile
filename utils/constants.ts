export const coins = [
  ['BTC', '/svg/icon/btc.svg'],
  ['ETH', '/svg/icon/eth.svg'],
  ['USDT', '/svg/icon/usdt.svg'],
  ['USDC', '/svg/icon/usdc.svg'],
  ['BUSD', '/svg/icon/busd.svg'],
  ['BNB', '/svg/ icon/bnb.svg'],
  ['XRP', '/svg/icon/xrp.svg'],
  ['DOGE', '/svg/icon/doge.svg'],
  ['ADA', '/svg/icon/ada.svg'],
  ['MATIC', '/svg/icon/matic.svg'],
]

export const coinOrder = new Set([
  'BTC',
  'ETH',
  'USDT',
  'USDC',
  'BUSD',
  'BNB',
  'XRP',
  'DOGE',
  'ADA',
  'MATIC',
  'TRX',
  'SOL',
  'DAI',
  'LTC',
  'DOT',
  'XMR',
  'AVAX',
  'TON',
  'BCH',
  'ATOM',
  'XLM',
])

export const networkOrder = new Set([
  'BTC',
  'ETH',
  'TRX',
  'BSC',
  'BNB',
  'Polygon',
  'XRP',
  'DOGE',
  'ADA',
  'LTC',
  'DOT',
  'SOL',
  'ALGO',
  'AVAX',
  'ATOM',
  'TON',
  'XMR',
  'BCH',
  'XLM',
])

export const networksMap = new Map<string, Network>()
networksMap.set('ETH', {
  name: 'Ethereum',
  abbreviation: 'ETH',
  logo: '/svg/black/eth.svg',
})
networksMap.set('TRX', {
  name: 'Tron',
  abbreviation: 'TRX',
  logo: '/svg/black/trx.svg',
})
networksMap.set('BSC', {
  name: 'Binance Smart Chain',
  abbreviation: 'BSC',
  logo: '/svg/black/bsc.png',
})
networksMap.set('BNB', {
  name: 'Binance Beacon Chain',
  abbreviation: 'BNB',
  logo: '/svg/black/bnb.svg',
})
networksMap.set('Polygon', {
  name: 'Polygon',
  abbreviation: 'Polygon',
  logo: '/svg/black/matic.svg',
})
networksMap.set('SOL', {
  name: 'Solana',
  abbreviation: 'SOL',
  logo: '/svg/black/sol.svg',
})
networksMap.set('ALGO', {
  name: 'Algorand',
  abbreviation: 'ALGO',
  logo: '/svg/black/algo.svg',
})
networksMap.set('AVAX', {
  name: 'Avalanche',
  abbreviation: 'AVAX',
  logo: '/svg/black/avax.svg',
})
networksMap.set('ATOM', {
  name: 'Cosmos',
  abbreviation: 'ATOM',
  logo: '/svg/black/atom.svg',
})

export interface CoinDetails {
  name: string
  abbreviation: string
  logo: string
  networks: string[]
}

interface Network {
  abbreviation: string
  name: string
  logo: string
}

export const coinsMap = new Map<string, CoinDetails>()
coinsMap.set('BTC', {
  name: 'Bitcoin',
  abbreviation: 'BTC',
  logo: '/svg/icon/btc.svg',
  networks: ['BTC'],
})
coinsMap.set('ETH', {
  name: 'Ethereum',
  abbreviation: 'ETH',
  logo: '/svg/icon/eth.svg',
  networks: ['ETH'],
})
coinsMap.set('USDT', {
  name: 'Tether',
  abbreviation: 'USDT',
  logo: '/svg/icon/usdt.svg',
  networks: ['ETH', 'TRX', 'BSC', 'Polygon', 'SOL'],
})
coinsMap.set('USDC', {
  name: 'USD Coin',
  abbreviation: 'USDC',
  logo: '/svg/icon/usdc.svg',
  networks: ['ETH', 'TRX', 'BSC', 'Polygon', 'SOL'],
})
coinsMap.set('BUSD', {
  name: 'Binance USD',
  abbreviation: 'BUSD',
  logo: '/svg/icon/busd.png',
  networks: ['BNB', 'BSC'],
})
coinsMap.set('BNB', {
  name: 'Binance Coin',
  abbreviation: 'BNB',
  logo: '/svg/icon/bnb.svg',
  networks: ['BNB', 'BSC'],
})
coinsMap.set('XRP', {
  name: 'XRP',
  abbreviation: 'XRP',
  logo: '/svg/icon/xrp.svg',
  networks: ['XRP'],
})
coinsMap.set('DOGE', {
  name: 'Dogecoin',
  abbreviation: 'DOGE',
  logo: '/svg/icon/doge.svg',
  networks: ['DOGE'],
})
coinsMap.set('ADA', {
  name: 'Cardano',
  abbreviation: 'ADA',
  logo: '/svg/icon/ada.svg',
  networks: ['ADA'],
})
coinsMap.set('MATIC', {
  name: 'Polygon',
  abbreviation: 'MATIC',
  logo: '/svg/icon/matic.svg',
  networks: ['ETH', 'Polygon'],
})
coinsMap.set('TRX', {
  name: 'Tron',
  abbreviation: 'TRX',
  logo: '/svg/icon/trx.svg',
  networks: ['TRX'],
})
coinsMap.set('SOL', {
  name: 'Solana',
  abbreviation: 'SOL',
  logo: '/svg/icon/sol.svg',
  networks: ['SOL'],
})
coinsMap.set('DAI', {
  name: 'Dai',
  abbreviation: 'DAI',
  logo: '/svg/icon/dai.svg',
  networks: ['ETH', 'Polygon'],
})
coinsMap.set('LTC', {
  name: 'Litecoin',
  abbreviation: 'LTC',
  logo: '/svg/icon/ltc.svg',
  networks: ['LTC'],
})
coinsMap.set('DOT', {
  name: 'Polkadot',
  abbreviation: 'DOT',
  logo: '/svg/icon/dot.svg',
  networks: ['DOT'],
})
coinsMap.set('XMR', {
  name: 'Monero',
  abbreviation: 'XMR',
  logo: '/svg/icon/xmr.svg',
  networks: ['XMR'],
})
coinsMap.set('AVAX', {
  name: 'Avalanche',
  abbreviation: 'AVAX',
  logo: '/svg/icon/avax.svg',
  networks: ['AVAX'],
})

coinsMap.set('TON', {
  name: 'Toncoin',
  abbreviation: 'TON',
  logo: '/svg/icon/ton.png',
  networks: ['TON'],
})
coinsMap.set('BCH', {
  name: 'Bitcoin Cash',
  abbreviation: 'BCH',
  logo: '/svg/icon/bch.svg',
  networks: ['BCH'],
})
coinsMap.set('ATOM', {
  name: 'Cosmos',
  abbreviation: 'ATOM',
  logo: '/svg/icon/atom.svg',
  networks: ['ATOM'],
})
coinsMap.set('XLM', {
  name: 'Stellar',
  abbreviation: 'XLM',
  logo: '/svg/icon/xlm.svg',
  networks: ['XLM'],
})

export let themes = [
  {
    name: '🌝  light',
    id: 'light',
  },
  {
    name: '🌚  dark',
    id: 'dark',
  },
  {
    name: 'rosepine',
    id: 'rosepine',
  },
  {
    name: 'Rosepine Moon',
    id: 'rosepine-moon',
  },
  {
    name: 'Rosepine Dawn',
    id: 'rosepine-dawn',
  },
  {
    name: '🧁  cupcake',
    id: 'cupcake',
  },
  {
    name: '🐝  bumblebee',
    id: 'bumblebee',
  },
  {
    name: '✳️  Emerald',
    id: 'emerald',
  },
  {
    name: '🏢  Corporate',
    id: 'corporate',
  },
  {
    name: '🌃  synthwave',
    id: 'synthwave',
  },
  {
    name: '👴  retro',
    id: 'retro',
  },
  {
    name: '🤖  cyberpunk',
    id: 'cyberpunk',
  },
  {
    name: '🌸  valentine',
    id: 'valentine',
  },
  {
    name: '🎃  halloween',
    id: 'halloween',
  },
  {
    name: '🌷  garden',
    id: 'garden',
  },
  {
    name: '🌲  forest',
    id: 'forest',
  },
  {
    name: '🐟  aqua',
    id: 'aqua',
  },
  {
    name: '👓  lofi',
    id: 'lofi',
  },
  {
    name: '🖍  pastel',
    id: 'pastel',
  },
  {
    name: '🧚‍♀️  fantasy',
    id: 'fantasy',
  },
  {
    name: '📝  Wireframe',
    id: 'wireframe',
  },
  {
    name: '🏴  black',
    id: 'black',
  },
  {
    name: '💎  luxury',
    id: 'luxury',
  },
  {
    name: '🧛‍♂️  dracula',
    id: 'dracula',
  },
  {
    name: '🖨  CMYK',
    id: 'cmyk',
  },
  {
    name: '🍁  Autumn',
    id: 'autumn',
  },
  {
    name: '💼  Business',
    id: 'business',
  },
  {
    name: '💊  Acid',
    id: 'acid',
  },
  {
    name: '🍋  Lemonade',
    id: 'lemonade',
  },
  {
    name: '🌙  Night',
    id: 'night',
  },
  {
    name: '☕️  Coffee',
    id: 'coffee',
  },
  {
    name: '❄️  Winter',
    id: 'winter',
  },
]

export const versayanaProfileData = {
  id: 'f672a995-395e-4544-8de8-777fc05301cf',
  updated_at: '2023-01-01T10:53:44.358+00:00',
  username: 'versayana',
  full_name: 'Ramtin Khalatbari',
  avatar_url: 'f672a995-395e-4544-8de8-777fc05301cf.png',
  bio: 'Front-end Developer',
  website: null,
  twitter: 'VERSAYANA',
  github: 'VERSAYANA',
  instagram: null,
  tiktok: null,
  youtube: null,
  ens: null,
  created_at: '2022-12-27T06:56:06.244367+00:00',
  addresses: {
    BCH: {
      BCH: 'qzawgmvmqq3cnjpjtm5vz5fdpzw0snxrqcd5k3nyp9',
    },
    ATOM: {
      ATOM: 'cosmos1tqpjwaj6nu3k4fy8ygytrtspg37lvvkakcw543',
    },
    USDT: {
      ETH: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
      TRX: 'TRjDMzHruaBorqLTxbH7pthnqJXRF4yceE',
      BSC: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
      Polygon: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
      SOL: 'Cv38ejKg12jXkjuPYqDfQGDGRTpd5tfzGVek298HHbXB',
    },
    USDC: {
      ETH: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
      TRX: 'TRjDMzHruaBorqLTxbH7pthnqJXRF4yceE',
      BSC: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
      Polygon: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
      SOL: 'Cv38ejKg12jXkjuPYqDfQGDGRTpd5tfzGVek298HHbXB',
    },
    BUSD: {
      BSC: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
      BNB: 'bnb1yj2w8jmmcstwchxpq8cp3vq6gjsxfygy5s097c',
    },
    BNB: {
      BSC: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
      BNB: 'bnb1yj2w8jmmcstwchxpq8cp3vq6gjsxfygy5s097c',
    },
    DAI: {
      ETH: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
      Polygon: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
    },
    XRP: {
      XRP: 'rPSBxzoMwg9x7LLcQsyFXFWjnvEEsFSigc',
    },
    MATIC: {
      ETH: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
      Polygon: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
    },
    ETH: {
      ETH: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
    },
    BTC: {
      BTC: 'bc1qtxf9cgj3stdnpw7cwh3preqrntgx8ztavrwgek',
    },
    DOGE: {
      DOGE: 'D7pUeC7kYdUF1pMj6QWfG7QnuKvTK5RP5H',
    },
    XLM: {
      XLM: 'GDYT4UQ3MIAPMVOUGDZD6E3Q7ARIUAC5DLRYANKOD3QPSMARKC5GY7AU',
    },
    AVAX: {
      AVAX: '0xd904d808fB3e0F91E41bC3A4B858A5024dBE2F0a',
    },
    LTC: {
      LTC: 'LPPMfLkRbWr6ofeCyoGdYZXNUMHvVKTPvt',
    },
    ADA: {
      ADA: 'addr1q89t23wmx5uhvvwpthytzgnnjeakqhy4r4rtwfmkyk6gc4k2k4zakdfewccuzhwgky3889nmvpwf282xkunhvfd533tqz3ag5k',
    },
    TRX: {
      TRX: 'TRjDMzHruaBorqLTxbH7pthnqJXRF4yceE',
    },
    DOT: {
      DOT: '12o3aNYUGuU6LGUeuraVxXVsFfWj337hF8fzJ62SoQTx5QUz',
    },
    SOL: {
      SOL: 'Cv38ejKg12jXkjuPYqDfQGDGRTpd5tfzGVek298HHbXB',
    },
    TON: {
      TON: '',
    },
  },
}
