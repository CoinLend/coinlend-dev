import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';
import CreditBox from './components/credit-box';
import InvestFormWindow from './components/invest-form-window';
import Home from './components/home';
import Navbar from './components/navbar';
const mainABI = require('./contracts/Main.json');

function App() {

  const [account, setaccount] = useState(null);
  const [signer, setsigner] = useState();
  const [provider, setprovider] = useState();
  const [contract, setcontract] = useState(null);
  const [Mycredits, setMycredits] = useState(null);
  const [credits, setcredits] = useState(null);

  const [totalCredits, settotalCredits] = useState([]);
  const [contractAddress, setcontractAddress] = useState("0xdF2240d693591EA04bF04F2e4C578AC2e73a8AeC");


  const applyForCredit = async () => {

    try {
      const credit = await contract.applyForCredit(6, 8, 8);

    } catch (error) {

      console.log(error.message);
    }

  }

  const getAllCredits = async () => {
    try {

      const _credits = await contract.getCredits();
      setcredits(_credits);
      console.log(_credits);
    } catch (error) {
      console.log(error);
    }
  }

  const getMyCredits = async () => {

    try {

      const credits = await contract.getUserCredits();
      setMycredits(credits);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    console.log('test1');
    const web3Connector = async () => {

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const tempP = new ethers.providers.Web3Provider(window.ethereum);
        const tempSighner = tempP.getSigner();
        const Contract = new ethers.Contract(contractAddress, mainABI.abi, tempSighner);

        setaccount(accounts[0]);
        setprovider(tempP);
        setsigner(tempSighner);
        setcontract(Contract);

      } catch (error) {
        console.log(error);
      }
    }

    web3Connector();
  }, [])


  return (
    <>
      <Navbar />
      <Home />
      <div className=" text-white h-screen">

        <h3>address : {account}</h3>
        <button onClick={applyForCredit}>apply</button>
        <button onClick={getMyCredits}>get credits</button>
        <button className='text-red-400' onClick={getAllCredits}>getAllCredits</button>


        <div className='w-[85%] p-2 rounded-md bg-black shadow-lg  m-auto'>
          <div className='w-full'>
            <p className="text-xl mb-10 font-semibold text-center">Credits Market place</p>

            {credits &&
              credits.map((credit) => {
                return (

                  <CreditBox address={credit} signer={signer} />

                )
              })
            }

          </div>

        </div>
      </div>
    </>
  );
}

export default App;
