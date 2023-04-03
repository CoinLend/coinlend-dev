import React, { useContext } from 'react'
import { EthContext } from '../contexts/EthProvider'
import MyCreditCard from './my-credit-card'
import { ethers } from 'ethers';

const {abi} = require('../contracts/Credit.json');

export default function MyCredits() {

  const {Mycredits ,signer} = useContext(EthContext);
   
  return (
    <div>
    {
        Mycredits &&
        Mycredits.map((address)=>{

            const contract = new ethers.Contract(address ,abi ,signer);
            return (

                <MyCreditCard contract={contract}/>
            )
        })
    }
    </div>
  )
}
