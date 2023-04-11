import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

const mainABI = require('../contracts/Main.json');

export const EthContext = createContext();

function EthProvider({ children }) {

  const [account, setaccount] = useState(null);
  const [signer, setsigner] = useState();
  const [provider, setprovider] = useState();
  const [contract, setcontract] = useState(null);
  const [Mycredits, setMycredits] = useState(null);
  const [credits, setcredits] = useState(null);
  const [myInvestments, setmyInvestments] = useState(null);

  const [totalCredits, settotalCredits] = useState([]);
  const [contractAddress, setcontractAddress] = useState("0x1aA4b9e139AAAa5a09A08A4F1E4b7B2De4941c04");
  const [score, setscore] = useState(0);
  const [Transaction, setTransaction] = useState(null);

  useEffect(() => {

    // console.log('test1'); 
    const web3Connector = async () => {

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const tempP = new ethers.providers.Web3Provider(window.ethereum);
        const tempSighner = tempP.getSigner();
        const Contract = new ethers.Contract(contractAddress, mainABI.abi, tempSighner);
        // console.log(Contract); 
        const _myinvestments = await Contract.getInvestedCredits();

        // console.log("investments",_myinvestments);

        const _credits = await Contract.getUserCredits();
        const _score = await Contract.getScore(accounts[0]);

        setscore(parseInt(_score));

        setaccount(accounts[0]);
        setmyInvestments(_myinvestments);
        setMycredits(_credits);
        setprovider(tempP);
        setsigner(tempSighner);
        setcontract(Contract);

        
        //on account changed
        window.ethereum.on('accountsChanged', function (accounts) {
          const selectedAccount = accounts[0];
          setaccount(selectedAccount);
          console.log(`Selected account changed to ${selectedAccount}`);
        });

      } catch (error) {
        console.log(error);
      }
    }

    web3Connector();
  }, [account ,Transaction ,contract])

  return (
    <EthContext.Provider value={{ setTransaction ,provider, signer, score, contract, account, Mycredits, myInvestments, setmyInvestments }}>
      {children}
    </EthContext.Provider>
  );
}


export default EthProvider;
