import { useState } from "react";
import { Form, Button, Spinner, FormControl } from "react-bootstrap";
import { ethers } from "ethers";

const Create = ({ provider, daoContract, setIsloading }) => {
  const handleCreateProposal = (e) => {
    e.preventDefault();
    console.log(`>> Creating Proposal...`);

    try {

      // setIsloading(true);
    } catch(err) {
      console.error('(!) CREATE PROPOSAL FAILED:', err);
      window.alert('(!) User rejected or transaction reverted. (!)');
    }
  };

  return (
    <Form onSubmit={handleCreateProposal}>
      <Form.Group style={{ maxWidth: '500px', margin: '50px auto'}}>
        <FormControl type="text" placeholder="Enter name" className='my-2'/>
        <FormControl type="number" placeholder="Enter amount" className='my-2'/>
        <FormControl type="text" placeholder="Enter address" className='my-2'/>
        <Button variant="primary" type="submit" style={{ width: '100%'}}> Create Proposal</Button>
      </Form.Group>
    </Form>
  );
};

export default Create;