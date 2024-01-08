const bn = require('bn.js')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')
const { ZkEvmClient, use } = require('@maticnetwork/maticjs')
const SCALING_FACTOR = new bn(10).pow(new bn(18))
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')

use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const userAddress = config.user1.address

const getZkEvmClient = (optional = {}, network = 'testnet', version = 'starfish') => {
  const zkEvmClient = new ZkEvmClient()
  return zkEvmClient.init({
    ...optional,
    log: true,
    network: network,
    version: version,
    child: {
      provider: new HDWalletProvider(privateKey, config.rpc.zkEvm.cycle),
      defaultConfig: {
        from: userAddress,
      },
    },
    parent: {
      provider: new HDWalletProvider(privateKey, config.rpc.zkEvm.goerli),
      defaultConfig: {
        from: userAddress,
      },
    },
  })
}

const zkEvm = {
  parent: config.zkEvm.goerli,
  child: config.zkEvm.cycle
}

module.exports = {
  SCALING_FACTOR,
  getZkEvmClient: getZkEvmClient,
  zkEvm: zkEvm,
  from: config.user1.address,
  privateKey: config.user1.privateKey,
  to: config.user2.address,
  proofApi: config.proofApi,
}
