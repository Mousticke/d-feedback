const GANACHE_LOCALHOST = process.env.GANACHE_LOCALHOST;
const GANACHE_PRIVATE_KEY_DEPLOYER = process.env.GANACHE_PRIVATE_KEY_DEPLOYER;
const GANACHE_ADDRESS_DEPLOYER = process.env.GANACHE_ADDRESS_DEPLOYER;
const DEPLOYED_CONTRACT_ADDRESS = process.env.DEPLOYED_CONTRACT_ADDRESS;

const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/Feedback.sol/Feedback.json");

// Provider - Ganache
const provider = new ethers.providers.JsonRpcProvider(GANACHE_LOCALHOST);

// Signer - Agent interacting
const signer = new ethers.Wallet(GANACHE_PRIVATE_KEY_DEPLOYER, provider);

// Contract instance
const feedBackContract = new ethers.Contract(
  DEPLOYED_CONTRACT_ADDRESS,
  contract.abi,
  signer,
);

async function main() {
  const gasPrice = await provider.getGasPrice();
  const balance = await signer.getBalance();
  const gasLimit = await feedBackContract.estimateGas.createFeed(
    5,
    "First Feedback from test",
    "Mousticke",
  );
  const tx = await feedBackContract.createFeed(
    5,
    "First Feedback from test",
    "Mousticke",
    {
      gasPrice: ethers.utils.formatUnits(gasPrice, "wei"),
      gasLimit: ethers.utils.formatUnits(gasLimit, "wei"),
    },
  );
  await tx.wait();
  console.log(await feedBackContract.feeds(0));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//npx hardhat run .\scripts\interact.js --network ropsten
