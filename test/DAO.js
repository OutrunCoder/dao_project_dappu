const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokensToWei = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

const etherToWei = tokensToWei;

describe('DAO', () => {
  const tokenContractName = 'Dapp University';
  let tokenTotalSupply = '1000000';
  // let tokenTotalSupplyInWei = tokensToWei(tokenTotalSupply);
  const quromThreshold = '500000000000000000000001';
  //
  let tokenContract;
  let daoContract;
  //
  let accounts;
  let deployer;
  let funder;
  let investor_1;
  //
  let deployerAddress;
  let funderAddress;
  let investor_1Address;
  let tknContractAddress;
  let daoContractAddress;
  //
  const initialFunding = etherToWei(100);
  
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
    daoContractAddress = daoContract.address;

    // Collect Accounts
    accounts = await ethers.getSigners();
    // ACTORS
    [
      deployer,
      funder,
      investor_1
    ] = accounts;
    deployerAddress = deployer.address;
    funderAddress = funder.address;
    investor_1Address = investor_1.address;

    // FUND THE DAO !
    await funder.sendTransaction({ to: daoContractAddress, value: initialFunding});
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

    it('sends ether to the DAO treasury', async() => {
      expect(await ethers.provider.getBalance(daoContractAddress)).to.equal(initialFunding);
    });
  });

  describe('Proposal Creation', () => {
    describe('Success', () => {
      beforeEach(async() => {

      });

      it('', async () => {});
    });

    describe('Failure', () => {});
  });
})