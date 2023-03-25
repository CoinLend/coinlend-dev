import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import InvestFormWindow from "./invest-form-window";
const creditABI = require("../contracts/Credit.json");

export default function CreditBox({ address, signer }) {

  const [creditContract, setcreditContract] = useState(null);
  const [creditData, setcreditData] = useState(null);
  const [openInvestForm, setopenInvestForm] = useState(false);

  const BigToInt = (bigNumber) => {

    const integerValue = parseInt(bigNumber.toString());;
    return integerValue;

  }


  useEffect(() => {

    console.log(address, signer);
    const connectWithContract = async () => {
      try {
        const contract = new ethers.Contract(address, creditABI.abi, signer);
        const data = await contract.getCreditDetails();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        const _state = await contract.state();

        setcreditContract(contract);
        // console.log(data);
        setcreditData({
          balance: ethers.utils.formatEther(balance),
          borrower: data[0],
          loanAmount: BigToInt(data[1]),
          interestRate: BigToInt(data[2]),
          state: _state
        });
      } catch (error) {
        console.log(error);
      }
    };

    connectWithContract();


  }, []);

  //console.log(openInvestForm);
  return (

    <>
      <div className="text-center cursor-pointer grid grid-cols-5 p-2 mt-2 justify-between  rounded-lg shadow-md bg-[#151515] " onClick={() => setopenInvestForm(true)}>


        <img className="w-10 h-10 rounded-full" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAAB7CAMAAAAfU9HRAAAAaVBMVEX///+MjIw0NDQUFBQ5OTk8PDuQkJAsLCxlZWUAAABoaGeJiYmGhoYxMTHw8PAjIyPZ2dnq6uri4uJPT0+AgIAdHR3Gxsb5+fm5ubnQ0NCWlpanp6dCQkKhoaEODg5JSUlzc3OwsLBdXV2d/hxsAAAD/klEQVR4nO2b27qqIBRGl6ASiZJ5yKxMff+H3JiQaGqHG6b7Y1x2Ndb8/snk4Pr7s1gsFovFYrFYLBaL5T8hNi3wK9Fuq+pFm5pW+I0j29GzaYmfKP0dT0xL/ELO/B3hF9Ma3xM5jjAP0faa9MI6c8Rr0yLfcmCPmiPEc9Mq33EqA2lOkpNpma/IRcl7c4Q31aRRJy7NUXY0rfMFTaCZ8w1N0kPqaOao2k6T+sHInFxNC31K8Uj5YI54aVrpMyLHmZhvZZLegqk54q1pqU84sJeai5VxA00alcGMOUki02JvyZ8l180RvpkWe0ecOrPmiEKfpJdgwZzUptXWOWslH5ujqjAtt4rjLJqHoWm5NRq2bI64b1pvmThYqTkKCdwmLVfNxaJuWnCJUXvOmINt0qh03piHd5g7r4JNxMtdODZHGcgmjcdZ8Z004dmk6DAnqT49Hd+vkxCRCk/cyR7eHcZZy4of7D2EXJfgDqJnBsNrUm2LyHbX0O3ozTHmg3vITYtOUdOzi3dX7pG57s4D06pjjoEWb9d9McfVM/DkYFp2xGN6+kF9dQfvkfkQeFiTtJueoi1lvJfMK/yoOwXUpGJ6irYclXvOXAYe0iRtnLRF4dR71ly4kwxMkx73yWu9F80xziiUJs3dbM57ybyiIZjbl+hGyMfmtCoh3b0c0momLzPmlNZQoqLIE/J+banoFUxQNEo0jczUnELbnx/lpjuqebhiTuleBvwM5nOAS6OU2mzJvKKJ9I1Ybcx0SuT7Mr6nRl9lNHNaqb+uuV8BrS1xmt7kkhH5Q2TIEBRH2uY7jEEtLgULgkLKHVqORuZ6UELEgd1Hi1MoS3N5yGwSrplTt+l/jhpMPFQDO4lG3cmflWqVcbJQmlPKVPsmxPO8ClDIe/oTdHqRO9hjLSJDRFD2R/UDdoU4AbQ5V/Qv5sxXarlLOMWFzEZ57QruEZAv6U5/FmWOmjO3u3rBLTzeFdxDrim5VdRzYsAuMssyOXFNHt6i5BB3LX/as1yQFkMfxj5FvbcH93u04f6c+SoyxZ1Iby+8G7VbI/KHG7r0sUKek8xV4u4Vzsn5Bf1yUQzVWIxM70nWmNZb4zK6Q0/I4A10QXwS+fpL7l6ruAvolmWWI1sw56B2iHMU6aw5tHPcDKfh7UIzRwDfKl4Y3os08218s/hcGgdzDnCHOIfKy9M8rE0rfchJfa8ozd3rBkLeI3eNynwLn58p+udoaU6AHZlXOfXvRg9ztK0P0KOnuYs2sSAOdKeMhzkBvUOco/sPEWEO/ZO5GcSuUZijO7jrlfccmDCH8yL0DQXbY/g7xDlOt7bdYFY64hb8aWIJ4Oc3i8VisVgsFovFYrFYPucfjOM397dxXiUAAAAASUVORK5CYII=" alt="" />
        <p> {creditData && creditData.loanAmount} Ethers</p>
        <p> {creditData && creditData.interestRate} %</p>
        <p>{creditData && creditData.balance} Ethers</p>
        <button className="p-1 px-1 bg-green-500 font-semibold cursor-pointer hover:bg-green-600 rounded-md">invest</button>

      </div>
      {openInvestForm && <InvestFormWindow creditData={creditData && creditData} contract={creditContract} cancel={() => setopenInvestForm(false)} />}
    </>


  );
}
