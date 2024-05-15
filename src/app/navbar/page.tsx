import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='flex justify-around m-4'>
        <div className='text-xl font-bold text-pretty'>
            <p>₿~cart</p>
        </div>
        <div className='flex justify-between gap-5'>
            <Link href={'/user/cart'}>
            <button className='text-xl bg-red-800 text-white px-3 py-1 rounded-md '>Cart</button>
            </Link>
            <Link href={'/user'}>
            <button className='text-xl bg-red-800 text-white px-3 py-1 rounded-md '>Home</button>
            </Link>
        </div>


    </div>
    </>
  )
}

export default page