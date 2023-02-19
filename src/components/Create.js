import { useState } from "react";
import { Form, Button, Spinner, FormControl } from "react-bootstrap";
import { ethers } from "ethers";

const Create = ({ provider, daoContract, setIsloading }) => {
  return (
    <Form>
      <Form.Group>
        <FormControl type="text"/>
        <FormControl type="number"/>
        <FormControl type="text"/>
      </Form.Group>
    </Form>
  );
};

export default Create;