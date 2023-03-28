import logo from './logo.svg';
import './App.css';
import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';
import CreditBox from './components/credit-box';
import InvestFormWindow from './components/invest-form-window';
import Home from './components/home';
import Navbar from './components/navbar';

import { Routes, Route } from "react-router-dom";
import { EthContext } from './contexts/EthProvider';
import CreditsPage from './components/credits-page';
import MyCredits from './components/MyCredits';
import Borrow from './components/borrow-page';
import MyInvestmentsPage from './components/my-investment-page';

function App() {



  const {account} = useContext(EthContext);
  // console.log(account);
  // const applyForCredit = async () => {

  //   try {
  //     const credit = await contract.applyForCredit(6, 8, 8);

  //   } catch (error) {

  //     console.log(error.message);
  //   }

  // }


  return (
    <>

    <div >
    <Navbar />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/invest' element={<CreditsPage />} />
    <Route path='/MyCredits' element={<MyCredits />} />
    <Route path='/borrow' element={<Borrow/>}/>
    <Route path='/MyInvestments' element={<MyInvestmentsPage/>}/>
    
    </Routes>
    </div>
     


    </>
  );
}


export default App;
