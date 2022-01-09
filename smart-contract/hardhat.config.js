/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const {
  GANACHE_LOCALHOST,
  GANACHE_PRIVATE_KEY_DEPLOYER,
  ETHERSCAN_API_KEY,
  ROPSTEN_PRIVATE_KEY_DEPLOYER,
  ROPSTEN_URL,
} = process.env;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: GANACHE_LOCALHOST,
      accounts: [GANACHE_PRIVATE_KEY_DEPLOYER],
    },
    ropsten: {
      url: ROPSTEN_URL,
      accounts: [ROPSTEN_PRIVATE_KEY_DEPLOYER],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
