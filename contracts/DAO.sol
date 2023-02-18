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
      require(tokenContract.balanceOf(msg.sender) > 0 , "Sender must be a token holder");
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

    mapping(address => mapping(uint256 => bool)) votes;

    event Vote(
      uint256 id,
      address investor
    );

    function vote(uint256 _id) external onlyInvestor {
      // Verify if investor has previously voted
      bool previouslyVoted = votes[msg.sender][_id];
      require(!previouslyVoted, 'Investor has previously voted on this proposal.');
      
      // NOTE - how to read and modify in solidity 
      // Fetch proposal from mapping by id
      Proposal storage proposal = proposals[_id];
      // update votes - implemented token weighted voting
      proposal.votes += tokenContract.balanceOf(msg.sender);

      // Track that user has voted
      // ! should keep track on the proposal itself but...
      // Course wants to use nested mapping to cross-ref voter to proposal
      // makes sense for maintaining anonimity though
      votes[msg.sender][_id] = true;

      // Emit an event
      emit Vote(_id, msg.sender);
    }

    event Finalize(uint256 id);

    function finalizeProposal(uint256 _id) external onlyInvestor  {
      // collect the proposal
      Proposal storage proposal = proposals[_id];

      // REQUIRE prop is not finalized twice
      require(!proposal.finalized, 'Proposal has been finalized already');

      // mark finalized
      proposal.finalized = true;

      // check for votes passsing
      require(proposal.votes >= quorum, "Must reach quorum to finalize proposal");

      // Check that the contract has enough to payout
      require(address(this).balance >= proposal.amount);

      // invoke Transfer if passed
      // A. - Insecure
      // proposal.recipient.transfer(proposal.amount);

      // B. - better and more secure
      (bool valueWasSent, ) = proposal.recipient.call{value: proposal.amount}("");
      require(valueWasSent, "Proposal amount value was never sent.");

      // Emit event
      emit Finalize(_id);
    }
}