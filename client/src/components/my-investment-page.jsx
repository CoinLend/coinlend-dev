import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react'
import { EthContext } from '../contexts/EthProvider'
import MyInvestmentCard from './my-investment-card';
const { abi } = require('../contracts/Credit.json');

export default function MyInvestmentsPage() {

    const [myInvestments, setmyInvestments] = useState([]);
    const { contract, signer, account } = useContext(EthContext);

    useEffect(() => {

        const getMyInvestments = async () => {
            try {

                const credits = await contract.getCredits();
                credits.forEach(async (address) => {

                    const creditContract = new ethers.Contract(address, abi, signer);
                    const isInvester = await creditContract.lenders(account);
                    if (isInvester) {
                        setmyInvestments([...myInvestments, address]);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }

        getMyInvestments();

    }, [])

    console.log(myInvestments);


    return (
        <div>
            <div className='grid grid-cols-2 gap-5 w-full'>
                {
                    myInvestments.length != 0 &&
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
