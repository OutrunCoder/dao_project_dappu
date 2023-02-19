import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { ethers } from 'ethers'

// Components
import Navigation from './Navigation';
import Loading from './Loading';

// ABIs: Import your contract ABIs here
import DAO_ABI from '../abis/DAO.json'

// Config: Import your network config here
import config from '../config.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [daoContract, setDaoContract] = useState(null);

  const [treasuryBalance, setTreasuryBalance] = useState(0);

  const [listOfProps, setListOfProps]= useState([]);
  const [quorum, setQuorum] = useState(0);

  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  const loadBlockchainData = async () => {
    // const network = 
    const { token, dao } = config[31337];

    // Initiate provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    // initialize contracts
    const daoContract = new ethers.Contract(dao.address, DAO_ABI, provider);

    setDaoContract(daoContract);

    // TB
    let treasuryBalance = await provider.getBalance(daoContract.address);
    treasuryBalance = ethers.utils.formatUnits(treasuryBalance, 18);
    setTreasuryBalance(treasuryBalance);


    // Fetch accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)

    // Collect proposals
    const propItems = [];
    const proposalCount = await daoContract.proposalCount();
    for(let i = 0; i < proposalCount; i++) {
      const propId = i + 1;
      // collect on the loop
      const prop = await daoContract.proposals(propId);
      propItems.push(prop);
    }
    
    setListOfProps(propItems);

    setQuorum(await daoContract.quorum());

    setIsLoading(false)

    // ! DEMO IMP BELOW
    // Fetch account balance
    // let balance = await provider.getBalance(account)
    // balance = ethers.utils.formatUnits(balance, 18)
    // setBalance(balance)
    // <p className='text-center'><strong>Your ETH Balance:</strong> {balance} ETH</p>
    // <p className='text-center'>Edit App.js to add your code here.</p>
  }

  useEffect(() => {
    if (isLoading) {
      loadBlockchainData()
    }
  }, [isLoading]);

  return(
    <Container>
      <Navigation account={account} />

      <h1 className='my-4 text-center'>Welcome to our DAO!</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <hr/>

          <p className='text-center'><strong>Treasury Balance:</strong> {treasuryBalance} ETH</p>

          <hr/>
        </>
      )}
    </Container>
  )
}

export default App;
