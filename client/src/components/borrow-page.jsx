import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { EthContext } from "../contexts/EthProvider";

export default function Borrow() {

    const [loanAmount, setloanAmount] = useState(0);
    const [interestRate, setinterestRate] = useState(0);
    const [endDays, setendDays] = useState(0);

    const {contract ,account} = useContext(EthContext);
    const applyForCredit  =async()=>{

        try {
            
            var loan = ethers.utils.parseEther(loanAmount.toString()); 
            const res = await contract.applyForCredit(loan ,interestRate,endDays );
           
            window.alert("credit created successfully !!! ");
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="text-white font-mono flex h-screen ">
            <div className="w-1/2 my-auto">
                <p className="font-semibold p-8 text-center text-5xl">
                    Create your <span className="text-green-500">Credit </span>
                    Let Investers invest

                </p>
                <p className="p-5 text-2xl ml-10">repay in time to improve your credit score and get more investments</p>
            </div>

            <div className="my-auto w-1/2 ">
                <div className="p-8 overflow-hidden  bg-black w-[70%] rounded-lg relative">
                    <div className="w-64 h-64 absolute rounded-full left-[55%] blur-lg  bottom-[65%] bg-pink-600"></div>

                    <div className="mb-6">
                        <p>required loan amount in ethers :</p>
                        <input type="number" value={loanAmount} onChange={(e) => setloanAmount(parseInt(e.target.value))} className="bg-transparent border-b-2 outline-none p-1 border-b-green-500" />
                    </div>
                    <div className="mb-6">
                        <p>interest rate  :</p>
                        <input type="number" value={interestRate} onChange={(e) => setinterestRate(parseInt(e.target.value))} className="bg-transparent border-b-2 outline-none p-1 border-b-green-500" />
                    </div>
                    <div className="mb-6">
                        <p>for days  :</p>
                        <input type="number" value={endDays} onChange={(e) => setendDays(parseInt(e.target.value))} className="bg-transparent border-b-2 outline-none p-1 border-b-green-500" />
                    </div>

                    <div className="my-5">
                        <p>amount you will repay  : {(loanAmount) + (loanAmount * interestRate) / 100} Ethers</p>
                    </div>
                    <button onClick={applyForCredit} className="p-2 text-center hover:bg-green-600 bg-green-500 font-semibold w-full rounded cursor-pointer mt-3">Create</button>
                </div>
            </div>

        </div>
    );
}
