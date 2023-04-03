import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { EthContext } from '../contexts/EthProvider';

export default function Navbar() {

  const { score } = useContext(EthContext);

  return (
    <div className='p-2 flex  bg-black gap-8 text-white font-semibold justify-around sticky top-0 z-50 w-full'>
      <p className="font-bold text-2xl mr-56">
        <span className='text-green-500'>C</span>
        oin-
        <span className='text-orange-400'>L</span>
        end</p>

      <div className="flex gap-8">
      
        <NavLink to={'/'}>
          <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>home</div>
        </NavLink>

        <NavLink to={'/invest'}>
          <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>Invest</div>
        </NavLink>

        <NavLink to={'/borrow'}>
          <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>Borrow</div>
        </NavLink> 

        <NavLink to={'/MyCredits'}>
          <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>My Credits</div>
        </NavLink>

        <NavLink to={'/MyInvestments'}>
          <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>My Investments</div>
        </NavLink> 

        <div className='p-1 rounded hover:bg-transparent hover:bg-green-500 cursor-pointer text-yellow-400'>🪙 {score}</div>
      
      </div>
    </div>
  )
}

