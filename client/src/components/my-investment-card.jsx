import { ethers } from 'ethers';
import React, { useState, useEffect, useContext } from 'react'
import { EthContext } from '../contexts/EthProvider';

export default function MyInvestmentCard({ contract }) {

  const states =["investment", "repayment", "expired" ,"repaymentComplete"];

  const { account } = useContext(EthContext);
  const [creditData, setcreditData] = useState(null);
  const [repayAmount, setrepayAmount] = useState(null);


  const BigToInt = (bigNumber) => {

    const integerValue = parseInt(bigNumber.toString());;
    return integerValue;

  }

  const withdrawInvestment = async () => {

    console.log(creditData.state);
    if (creditData.state != "repaymentComplete") {
      window.alert("repayment is not complete on this credit withdraw after completion on repayment from borrower");
      return;
    }
    try {

      const res = await contract.getRefund();
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    const getCreditData = async () => {

      try {
        const data = await contract.getCreditDetails();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contract.address);
        //const value = parseInt(ethers.utils.formatEther(data[1])) + (parseInt(ethers.utils.formatEther(data[1])) * BigToInt(data[2])) / 100;
        const investedamount = await contract.lendersInvestedAmount(account);
        const state = await contract.state();
        // console.log(parseInt(ethers.utils.formatEther(data[1])));
        // console.log(BigToInt(data[2])); 
        setcreditData({
          balance: ethers.utils.formatEther(balance),
          borrower: data[0],
          loanAmount: ethers.utils.formatEther(data[1]),
          interestRate: BigToInt(data[2]),
          investedAmount: ethers.utils.formatEther(investedamount),
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

      <div className='credit-info grid gap-10  grid-cols-2'>

        <div className='my-2 col-span-2'>
          <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'>credit Address: </p>
          <p>{creditData && creditData.borrower} </p>
        </div>

        <div className='my-4'>
          <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'>credit current balance: </p>
          <p>{creditData && creditData.balance} Ethers</p>
        </div>

        <div className='my-4'>
          <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'>Invested amount: </p>
          <p>{creditData && creditData.investedAmount} Ethers</p>
        </div>

        <div className='my-4'>
          <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'>interest rate: </p>
          <p>{creditData && creditData.interestRate} %</p>
        </div>

        <div className='my-6'>
          <p className='my-1 font-semibold  bg-gradient-to-b text-gray-400'>Status: </p>
          <p className='text-green-400 font-semibold'>{creditData && creditData.state}</p>
        </div>
      </div>

      <div>
        <button className='px-2 py-1 bg-green-600  my-4 mx-auto rounded-lg ' onClick={withdrawInvestment}>withdraw from credit</button>
      </div>
    </div> 
  )
}
