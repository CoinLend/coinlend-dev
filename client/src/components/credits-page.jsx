import React, { useContext, useEffect, useState } from 'react'
import { EthContext } from '../contexts/EthProvider';
import CreditBox from './credit-box';

export default function CreditsPage() {

    const { contract, signer, account, Mycredits } = useContext(EthContext);
    const [credits, setcredits] = useState([]);

    const applyForCredit = async () => {

        try {
            const credit = await contract.applyForCredit(6, 8, 8);
            
        } catch (error) {

            console.log(error.message);
        }

    }


    useEffect(() => {
        const getAllCredits = async () => {
            try {
    
                const _credits = await contract.getCredits();
                setcredits(_credits);
                console.log(_credits);
            } catch (error) { 
                console.log(error);
            }
        }
        getAllCredits();
    }, [])
    

    return (
        <div className=" text-white h-screen">

            <h3>address : {account}</h3>

            <button onClick={applyForCredit}>apply</button>


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
    )
}
