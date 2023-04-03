import React, { useState , useEffect, createContext, useContext } from "react";
import {ethers} from "ethers";
import { reducer, actions, initialState } from "./state";

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
  const [contractAddress, setcontractAddress] = useState("0x11989455976e12983b11655e293e7B1e602d0313");
  const [score, setscore] = useState(0);

  useEffect(() => {

    // console.log('test1'); 
    const web3Connector = async () => {

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // console.log(accounts);
        const tempP = new ethers.providers.Web3Provider(window.ethereum);
        const tempSighner = tempP.getSigner(); 
        const Contract = new ethers.Contract(contractAddress, mainABI.abi, tempSighner);
        // console.log(Contract); 
       const _myinvestments = await Contract.getInvestedCredits();
      //  console.log("investments",_myinvestments);
        const _credits = await Contract.getUserCredits();
        const _score = await Contract.getScore(accounts[0]);
 
        setscore(parseInt(_score));

        setaccount(accounts[0]);
        setmyInvestments(_myinvestments);
        setMycredits(_credits); 
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
    <EthContext.Provider value={{provider ,signer ,score ,contract ,account ,Mycredits ,myInvestments ,setmyInvestments}}>
      {children}
    </EthContext.Provider>
  );
}


export default EthProvider;
