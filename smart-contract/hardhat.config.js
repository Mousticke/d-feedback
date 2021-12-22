/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
const { GANACHE_LOCALHOST, GANACHE_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: GANACHE_LOCALHOST,
      accounts: [GANACHE_PRIVATE_KEY],
    },
  },
};
