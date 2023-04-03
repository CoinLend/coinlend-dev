import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react'
import { EthContext } from '../contexts/EthProvider'
import MyInvestmentCard from './my-investment-card';
const { abi } = require('../contracts/Credit.json');

export default function MyInvestmentsPage() {

    // const [myInvestments, setmyInvestments] = useState([]);
    const { contract, signer, account ,myInvestments } = useContext(EthContext);




    return (
        <div>
            <div className='grid grid-cols-2 gap-5 w-full'>
                {
                    myInvestments &&
                    myInvestments.map((address) => {
                        const contract = new ethers.Contract(address, abi, signer);

                        return (
                            <MyInvestmentCard contract={contract} />
                        )
                    })
                }
            </div>
        </div>
    )
}
