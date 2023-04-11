import React, { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { EthContext } from '../contexts/EthProvider';

export default function MyCreditCard({ contract }) {

  const states =["investment" , "repayment", "expired" ,"repayment complete"];

    // console.log(contract);
    const [creditData, setcreditData] = useState(null);
    const [repayAmount, setrepayAmount] = useState(null);
    const {setTransaction} = useContext(EthContext);

    const repay = async()=>{

        try {
            
            var value = parseInt(creditData.loanAmount)+parseInt(creditData.loanAmount)*creditData.interestRate/100;
            console.log(value);
            value = ethers.utils.parseEther(value.toString());
            const res = await contract.repay({value:value});

             setTransaction(res);
        } catch (error) {
            console.log(error);
        }
    }
    const withdraw = async () => {

        if (creditData.balance == '0.0') {
            window.alert("There is not balance exists to withdraw !!")
            return;
        }
        try {
            const res = await contract.withdraw();
            window.alert("payment withdrawn complete transaction added to the block !!")
            setTransaction(res);

        } catch (error) {
            console.log(error);
        }
    }

    const BigToInt = (bigNumber) => {

        const integerValue = parseInt(bigNumber.toString());;
        return integerValue;

    }

    useEffect(() => {

        const getCreditData = async () => {

            try {
                const data = await contract.getCreditDetails();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const balance = await provider.getBalance(contract.address);
                const value = parseInt(ethers.utils.formatEther(data[1])) + (parseInt(ethers.utils.formatEther(data[1])) * BigToInt(data[2])) / 100;
                const state = await contract.state();
                // console.log(parseInt(ethers.utils.formatEther(data[1])));
                //  console.log(state);
                setcreditData({
                    balance: ethers.utils.formatEther(balance),
                    borrower: data[0],
                    loanAmount: ethers.utils.formatEther(data[1]),
                    interestRate: BigToInt(data[2]),
                    repayAmount: value,
                    state: states[state]
                });


            } catch (error) {
                console.log(error);
            }
        }

        getCreditData();
    }, [])

   

    return (
        <div className='mx-auto my-5 text-white font-mono w-fit  p-5 rounded bg-black shadow-lg'>

            <div className="md:flex gap-8">
                <div className='credit-info'>

                    <div>
                        <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'>credit address :</p>
                        <p>{creditData&&contract.address}</p>
                    </div>

                    <div className='my-4'>
                        <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'>credit current balance :</p>
                        <p>{creditData && creditData.balance} Ethers</p>
                    </div>

                    <div className='my-4'>
                        <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'> loan amount :</p>
                        <p>{creditData && creditData.loanAmount} Ethers</p>
                    </div>

                    <div className='my-4'>
                        <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'>repayment amount :</p>
                        <p>{creditData && creditData.repayAmount} Ethers</p>
                    </div>

                    <div className='my-4'>
                        <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'>interest rate :</p>
                        <p>{creditData && creditData.interestRate} %</p>
                    </div>

                    <div className='my-4'>
                        <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'>Status :</p>
                        <p className='text-green-400 font-semibold'>{creditData && creditData.state}</p>
                    </div>
                </div>

                <div>
                <img src="etherIcon.png" className='ml-20 h-40 w-40' alt="" />
                    <div className='  gap-5'>
                        <button className='text-center w-full p-1 rounded my-4 text-black bg-orange-300 font-semibold' onClick={repay}>repay now</button>
                        <button className='text-center w-full p-1 rounded my-4 text-black bg-green-400 font-semibold' onClick={withdraw}>withdraw balance</button>
                        <button className='text-center col-span-2 w-full p-1 rounded my-4 text-black bg-red-400 font-semibold'>Discard</button>

                    </div>
                </div>
            </div>

        </div>
    )
}
