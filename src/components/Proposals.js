import { Table, Button } from "react-bootstrap";
import { ethers } from 'ethers';

const Proposals = ({ provider, daoContract, listOfProps, quorum, setIsLoading }) => {
  console.log('>> PROPS TABLE HAS LIST:');
  console.table(listOfProps);
  return (
    <>
      <h1>PROPS TABLE IS STARTED!</h1>
    </>
  );
};

export default Proposals;