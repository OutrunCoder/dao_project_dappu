const { ethers } = require('hardhat');
const { expect } = require('chai');

// const tokensToWei = (n) => {
//   return ethers.utils.parseUnits(n.toString(), 'ether');
// }

// const etherToWei = tokensToWei;

describe('DAO', () => {
  const tokenContractName = 'Dapp University';
  let tokenTotalSupply = '1000000';
  // let tokenTotalSupplyInWei = tokensToWei(tokenTotalSupply);
  const quromThreshold = '500000000000000000000001';
  //
  let tokenContract;
  let daoContract;
  //
  // let accounts: Array<any>;
  // let deployer: any;
  // let user1: any;
  //
  // let deployerAddress: string;
  // let user1Address: string;
  let tknContractAddress;
  // let daoContractAddress;
  
  beforeEach(async() => {
    // Load contracts
    const tknContractFactory = await ethers.getContractFactory('Token');
    const daoContractFactory = await ethers.getContractFactory('DAO');

    // DEPLOY TOKEN !
    tokenContract = await tknContractFactory.deploy(tokenContractName, 'DAPP', tokenTotalSupply);
    tknContractAddress = tokenContract.address;

    // DEPLOY DAO !
    daoContract = await daoContractFactory.deploy({
      _tokenContractAddress: tknContractAddress,
      _quorum: quromThreshold
    });
    // daoContractAddress = daoContract.address;

    // // Collect Accounts
    // accounts = await ethers.getSigners();
    // // ACTORS
    // [
    //   deployer,
    //   user1
    // ] = accounts;
    // deployerAddress = deployer.address;
    // user1Address = user1.address;
  });

  describe('Deployment', () => {
    it('token contract has correct name', async() => {
      expect(await tokenContract.name()).to.equal(tokenContractName);
    });

    it('returns the Token address', async () => {
      expect(await daoContract.tokenContract()).to.equal(tknContractAddress);
    });

    it('returns quorum', async() => {
      expect(await daoContract.quorum()).to.equal(quromThreshold);
    });
  });

})