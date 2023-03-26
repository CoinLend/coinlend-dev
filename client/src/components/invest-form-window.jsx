import React, { useState } from 'react'
import { ethers } from 'ethers';

export default function InvestFormWindow({ contract, creditData, cancel }) {

  const [amount, setamount] = useState(0);
  const [returns, setreturns] = useState(0);
  const states = ["investment" ,"repayment" ,"repayment complete"];

  const invest = async () => {


    try {


      const valueToSend = ethers.utils.parseEther(amount.toString()); // Convert 1 ETH to wei
      console.log(valueToSend);
      await contract.invest({ value: valueToSend });
      window.alert(`investment of ${amount} successfull!!`)
      cancel();

    } catch (error) {
      console.log(error);
    }
  }

  const handleOnchange = (e) => {
    var value = parseInt(e.target.value);
    setamount(value);

    const returnValue = value + ((value * (creditData && creditData.interestRate)) / 100);

    setreturns(returnValue);

  }
  return (

    <div className=' fixed  top-0 right-0 left-0 backdrop-blur-sm bottom-0'>

      <div className="h-full w-full flex justify-center items-center">

        <div className="flex p-8 justify-between rounded-lg bg-black  absolute shadow-lg">

          <div className="credit-info mr-12 border-2 rounded-md border-gray-400 p-5">

            <p className="font-semibold text-center my-2 text-xl">Credit Details </p>

            <div className='mb-5'>
              <p>Credit State </p>
              <p className='font-semibold text-green-500'>{states[creditData && creditData.state]}</p>
            </div>
            <div className='mb-5'>
              <p>Interrest rate : </p>
              <p>{creditData && creditData.interestRate}%</p>
            </div>
            <div className='mb-5'>
              <p>Total Loan Amount : </p>
              <p>{creditData && creditData.loanAmount} ethers</p>
            </div>
            <div className='mb-5'>
              <p>Invested amount : </p>
              <p className=''>{creditData.balance} ethers</p>
            </div>
            <div className='mb-5'>
              <p>Return end days : </p>
              <p>{7}</p>
            </div>
            <div className='mb-5'>
              <p>Borrower Address : </p>
              <p>{creditData && creditData.borrower}</p>
            </div>
          </div>
          <div className="form  ">
            <div>
              <label htmlFor="amount">Enter the investment amount : </label>
              <input name='amount' id='about' value={amount ? amount : 0} onChange={handleOnchange} placeholder='(in ethers) ' className='my-2 bg-transparent border-b-2 block border-green-400 px-3 outline-none' type="number" />
            </div>

            <div className='flex justify-between mt-10'>
              <div>
                <p>Investment :</p>
                <p>{amount} Ethers</p>
              </div>
              <div>
                <p>returns :</p>
                <p>{returns} Ethers</p>
              </div>

            </div>
            <div className="flex justify-between mt-10">
              <button className='bg-green-500 rounded px-3 py-1 hover:bg-green-600' onClick={invest}>Transact</button>
              <button className='bg-red-500 rounded px-3 py-1 hover:bg-red-600' onClick={() => cancel()}>Cancel</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
