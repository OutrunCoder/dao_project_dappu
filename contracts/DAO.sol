//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

struct DAODeploymentArgs {
  Token _tokenContractAddress;
  uint256 _quorum;
}

contract DAO {
    // STATE
    address owner;
    Token public tokenContract;
    uint256 public quorum;

    constructor(DAODeploymentArgs memory args) {
      owner = msg.sender;
      tokenContract = args._tokenContractAddress;
      quorum = args._quorum;
    }


}
