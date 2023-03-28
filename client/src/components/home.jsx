import React from 'react'

export default function Home() {
  return (
    <div className='h-screen flex text-white home relative'>
    <div className="absolute bg-black opacity-70 w-full h-full"></div>
    
        <div className='w-1/2 mt-32 ml-24 z-30'>
        <p className="text-6xl text-green-500 font-bold">Coin-Lend</p>
        <p className="text-4xl mt-12">The best P2P Ethereum Lending and borrowing Platform</p>
        </div>
    </div>
  )
}
