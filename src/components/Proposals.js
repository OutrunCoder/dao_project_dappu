import { Table, Button } from "react-bootstrap";
import { ethers } from 'ethers';

const Proposals = ({ provider, daoContract, listOfProps, quorum, setIsLoading }) => {
  console.log('>> PROPS TABLE HAS LIST:');
  console.table(listOfProps);
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
        {listOfProps.map((prop) => {
          return (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Proposals;