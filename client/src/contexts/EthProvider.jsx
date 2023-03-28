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

  const [totalCredits, settotalCredits] = useState([]);
  const [contractAddress, setcontractAddress] = useState("0xe065aC3781Ac93aF0158248b022a8Ebda641fF51");

  useEffect(() => {

    console.log('test1');
    const web3Connector = async () => {

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const tempP = new ethers.providers.Web3Provider(window.ethereum);
        const tempSighner = tempP.getSigner();
        const Contract = new ethers.Contract(contractAddress, mainABI.abi, tempSighner);
        const _credits = await Contract.getUserCredits();

        setaccount(accounts[0]);
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
    <EthContext.Provider value={{provider ,signer ,contract ,account ,Mycredits}}>
      {children}
    </EthContext.Provider>
  );
}


export default EthProvider;
