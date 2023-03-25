import React from 'react'

export default function Navbar() {
  return (
    <div className='p-2 flex justify-center bg-black gap-8 text-white font-semibold'>
        <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>Invest</div>
        <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>Borrow</div>
        <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>My Credits</div>
        <div className='p-1 rounded hover:bg-green-500 cursor-pointer'>My investments</div>
    </div>
  )
}
