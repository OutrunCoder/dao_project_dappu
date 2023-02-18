
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
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
