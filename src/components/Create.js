import { useState } from "react";
import { Form, Button, Spinner, FormControl } from "react-bootstrap";
import { ethers } from "ethers";

const Create = ({ provider, daoContract, setIsloading }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');

  const [isWaiting, setIsWaiting] = useState(false);

  const handleCreateProposal = async(e) => {
    e.preventDefault();
    console.log(`>> Creating Proposal...`);
    setIsWaiting(true);

    console.table({ name, amount, recipient});

    try {
      const signer = await provider.getSigner();
      const formattedAmount = ethers.utils.parseUnits(amount.toString(), 'ether');
      const trx = await daoContract.connect(signer).createProposal(name, formattedAmount, recipient);
      await trx.wait();
    } catch(err) {
      console.error('(!) CREATE PROPOSAL FAILED:', err);
      window.alert('(!) User rejected or transaction reverted. (!)');
    }

    setIsloading(true);
  };

  return (
    <Form onSubmit={handleCreateProposal}>
      <Form.Group style={{ maxWidth: '500px', margin: '50px auto'}}>
        <FormControl
          type="text"
          placeholder="Enter name"
          className='my-2'
          onChange={(e) => setName(e.target.value)}
          />
        <FormControl
          type="number"
          placeholder="Enter amount"
          className='my-2'
          onChange={(e) => setAmount(e.target.value)}
          />
        <FormControl
          type="text"
          placeholder="Enter address"
          className='my-2'
          onChange={(e) => setRecipient(e.target.value)}
          />
          {isWaiting ? (
            <Spinner animation="border" style={{ display: 'block', margin: '0 auto'}}/>
          ) : (
            <Button
              variant="primary"
              type="submit"
              style={{ width: '100%'}}>
              Create Proposal
            </Button>
          )}
      </Form.Group>
    </Form>
  );
};

export default Create;