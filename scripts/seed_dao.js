
const hre = require("hardhat");

const tokensToWei = (n) => {
  return hre.ethers.utils.parseUnits(n.toString(), 'ether');
}

const etherToWei = tokensToWei;

async function main() {
  console.log('>> Fetch accouts and network...\n');

  const accounts = await hre.ethers.getSigners();
  // ACTORS
  const [
    // deployer,
    funder,
    //
    investor_1,
    investor_2,
    investor_3,
    // investor_4,
    // investor_5,
    //
    recipient_1,
    // randomUser
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

  console.log('>> Fetch DAO contract... \n');
  const daoContract = await hre.ethers.getContractAt('DAO', '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');
  console.log(`DAO fetched: ${daoContract.address}\n`);

  console.log('>> Fund the DAO... \n');
  let fundTrx;
  fundTrx = await funder.sendTransaction({ to: daoContract.address, value: etherToWei(1000)});
  await fundTrx.wait();

  console.log('>> Add mock proposal history to contract... \n');
  for (let i = 0; i < 3; i++) {
    const propId = i + 1;
    // Create prop
    let trx = await daoContract.connect(investor_1).createProposal(`Prop_${propId}`, etherToWei(100), recipient_1.address);
    await trx.wait();

    // voting...
    trx = await daoContract.connect(investor_1).vote(propId);
    await trx.wait();
    trx = await daoContract.connect(investor_2).vote(propId);
    await trx.wait();
    trx = await daoContract.connect(investor_3).vote(propId);
    await trx.wait();

    // Finalize
    trx = await daoContract.connect(investor_1).finalizeProposal(propId);

    console.log(`>> Created and finalized proposal ${propId}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
