
const hre = require("hardhat");

const tokensToWei = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

const etherToWei = tokensToWei;

async function main() {
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
