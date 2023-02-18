// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const NAME = 'Dapp University'
  const SYMBOL = 'DAPP'
  const MAX_SUPPLY = '1000000'

  // Deploy Token
  const Token_CF = await hre.ethers.getContractFactory('Token')
  let tokenContract = await Token_CF.deploy(NAME, SYMBOL, MAX_SUPPLY)

  await tokenContract.deployed()
  console.log(`Token contract deployed to: ${tokenContract.address}\n`)

  // Deploy the DAO
  const Dao_CF = await hre.ethers.getContractFactory('DAO');
  let daoContract = await Dao_CF.deploy({
    _tokenContractAddress: tokenContract.address,
    _quorum: '500000000000000000000001' // = over 50% // TODO - FROM PROJECT CONFIG <<<
  });

  await daoContract.deployed()
  console.log(`DAO contract deployed to: ${daoContract.address}\n`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
