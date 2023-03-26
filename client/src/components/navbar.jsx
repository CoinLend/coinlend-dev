import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='p-2 flex justify-center bg-black gap-8 text-white font-semibold'>
    <NavLink to={'/invest'}>
    <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>Invest</div>
    </NavLink>
    <NavLink to={'/borrow'}>
    <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>Borrow</div>
    </NavLink>
        <NavLink to={'/MyCredits'}>
        <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>My Credits</div>
        </NavLink>
        <NavLink>
        <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>My investments</div>
        </NavLink>
    </div>
  )
}
