import hre from 'hardhat'
import * as keys from '../utils/keys'

async function main() {
  const tokens = await hre.gmx.getTokens()
  const addressToSymbol: { [address: string]: string } = {}
  for (const [tokenSymbol, tokenConfig] of Object.entries(tokens)) {
    let address = tokenConfig.address
    if (!address) {
      const contract = await hre.ethers.getContractAt('BetaToken', tokenSymbol)
      address = contract.address
    }
    addressToSymbol[address] = tokenSymbol
  }

  // console.log("hre.ethers", hre.ethers);

  const readerDeployment = await hre.deployments.get('Reader')
  const dataStoreDeployment = await hre.deployments.get('DataStore')
  const reader = await hre.ethers.getContractAt(
    'Reader',
    readerDeployment.address
  )
  const dataStore = await hre.ethers.getContractAt(
    'DataStore',
    dataStoreDeployment.address
  )
  console.log(
    'reading data from DataStore %s Reader %s',
    dataStore.address,
    reader.address
  )

  const markets = [...(await reader.getMarkets(dataStore.address, 0, 100))]
  markets.sort((a, b) => a.indexToken.localeCompare(b.indexToken))
  for (const market of markets) {
    const isDisabled = await dataStore.getBool(
      keys.isMarketDisabledKey(market.marketToken)
    )
    const indexTokenSymbol = addressToSymbol[market.indexToken]
    const longTokenSymbol = addressToSymbol[market.longToken]
    const shortTokenSymbol = addressToSymbol[market.shortToken]
    console.log(
      '%s index: %s long: %s short: %s is disabled: %s',
      market.marketToken,
      indexTokenSymbol?.padEnd(5) || '(swap only)',
      longTokenSymbol?.padEnd(5),
      shortTokenSymbol?.padEnd(5),
      isDisabled
    )
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((ex) => {
    console.error(ex)
    process.exit(1)
  })
