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
    mapping(uint256 => Proposal) public proposals;

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

    event Propose(
      uint256 id,
      uint256 amount,
      address recipient,
      address creator
    );

    modifier onlyInvestor() {
      // SENDER MUST BE A HOLDER OF DAO TOKEN
      require(Token(tokenContract).balanceOf(msg.sender) > 0 , "Sender must be a token holder");
      _;
    }

    function createProposal(
      string memory _name,
      uint256 _amount,
      address payable _recipient
    ) external onlyInvestor {
      // DAO HAS FUNDS TO COMMIT TO A PROPOSAL
      require(address(this).balance >= _amount, "Proposal is underfunded. Cannot be paid for");

      // CONTINUE
      proposalCount++;

      // Create proposal & add to the list of curated proposals
      proposals[proposalCount] = Proposal(
        proposalCount, // id
        _name,
        _amount,
        _recipient,
        0, // votes
        false // finalized
      );

      emit Propose(
        proposalCount, // id
        _amount,
        _recipient,
        msg.sender // creator
      );
    }
}
