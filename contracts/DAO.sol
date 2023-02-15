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

    //
    uint256 public proposalCount;

    constructor(DAODeploymentArgs memory args) {
      owner = msg.sender;
      tokenContract = args._tokenContractAddress;
      quorum = args._quorum;
    }

    // DAO treasury
    receive() external payable {}

    struct Proposal {
      uint256 id;
      string name;
      uint256 amount;
      address payable recipient;
      uint256 votes;
      bool finalized;
    }

    function createProposal(
      string memory _name,
      uint256 _amount,
      address payable _recipient
    ) external {
      proposalCount++;

      // Create proposal model
      Proposal(
        proposalCount, // id
        _name,
        _amount,
        _recipient,
        0, // votes
        false // finalized
      );  
    }
}
