
const hre = require("hardhat");

const tokensToWei = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

const etherToWei = tokensToWei;

async function main() {
  console.log('>> Fetch accouts and network...\n');

  const accounts = await hre.ethers.getSigners();
  // ACTORS
  const [
    deployer,
    funder,
    //
    investor_1,
    investor_2,
    investor_3,
    investor_4,
    investor_5,
    //
    recipient_1,
    randomUser
  ] = accounts;

  console.log('>> Fetch Token contract... \n');
  const tokenContract = await hre.ethers.getContractAt('Token', '0x5FbDB2315678afecb367f032d93F642f64180aa3');
  console.log(`Token fetched: ${tokenContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
