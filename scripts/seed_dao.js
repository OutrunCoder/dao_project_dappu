
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
  console.log(`Token fetched: ${tokenContract.address}\n`);

  console.log('>> Distribute to investors... \n');
  // TODO - BRING IN ASYNC AWAIT LIB SERIES MANAGEMENT
  // DIST DAO TOKENS TO INVESTORS
  // [].forEach((investor) => {});
  // REFACTOR into async series >>>
  let distTrx;
  const distDAO_tokenAmount = tokensToWei(200000); // = 20%
  distTrx = await tokenContract.transfer(investor_1.address, distDAO_tokenAmount);
  await distTrx.wait();
  distTrx = await tokenContract.transfer(investor_2.address, distDAO_tokenAmount);
  await distTrx.wait();
  distTrx = await tokenContract.transfer(investor_3.address, distDAO_tokenAmount);
  await distTrx.wait();
  // distTrx = await tokenContract.transfer(investor_4.address, distDAO_tokenAmount);
  // await distTrx.wait();
  // distTrx = await tokenContract.transfer(investor_5.address, distDAO_tokenAmount);
  // await distTrx.wait();
  // REFACTOR <<<
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
