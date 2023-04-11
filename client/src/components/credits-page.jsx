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
                // console.log(_credits);
            } catch (error) {
                console.log(error);
            }
        }
        getAllCredits();
    }, [])


    return (
        <div className=" text-white h-screen">
            <div className="text-white font-mono flex h-screen " >
                <div className="w-1/2 my-auto">
                    <p className="font-semibold p-8 text-center text-4xl">

                        Invest in credit and get profitable returns

                    </p>


                    <button onClick={() => window.scrollTo(0, 820)} className='scroll-smooth block ml-24 px-4 p-2 bg-orange-500 rounded-lg mt-10'>Start investing {'->'}</button>
                </div>

                <div>
                    <img src="investImg.png" className='w-full h-3/4 ml-6 mt-10 ' alt="" />
                </div>

            </div>

            <h3>address : {account}</h3>

            <div className="h-screen">
                <div className=' w-[85%] h-[80%] overflow-y-scroll p-2 rounded-md bg-black shadow-lg  m-auto'>
                    <div className='w-full'>

                    <p className="text-3xl font-semibold mb-8 text-center"> <span className='text-green-500'>| Credit</span> Market Place |</p>
                        <div className="grid grid-cols-5 text-center justify-between font-bold text-gray-400">
                            <div className="w-24"></div>
                            <div>Loan amount</div>
                            <div>Interest rate</div>
                            <div>Credit balance</div> 
                            <div>Credit Score</div>


                        </div>

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
        </div>
    )
}
