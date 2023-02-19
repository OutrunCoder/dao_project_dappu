import { Table, Button } from "react-bootstrap";
import { ethers } from 'ethers';

const Proposals = ({ provider, daoContract, listOfProps, quorum, setIsLoading }) => {
  console.log('>> PROPS TABLE HAS LIST:');
  console.log(listOfProps);
  // console.table(listOfProps);
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Proposal Name</th>
          <th>Recipient Address</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Total Votes</th>
          <th>Cast Votes</th>
          <th>Finalize</th>
        </tr>
      </thead>
      <tbody>
        {listOfProps.map((prop, i) => {
          const { id, name, recipient, amount, finalized, votes } = prop;
          return (
            <tr key={i}>
              <td>{id.toString()}</td>
              <td>{name}</td>
              <td>{recipient}</td>
              <td>{ethers.utils.formatUnits(amount, 'ether')} ETH</td>
              <td>{finalized ? 'Approved' : 'In Progress'}</td>
              <td>{votes.toString()}</td>
              <td>
                <Button>Vote</Button>
              </td>
              <td>
                <Button>Finalize</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Proposals;