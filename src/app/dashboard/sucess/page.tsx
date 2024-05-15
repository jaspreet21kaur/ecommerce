"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const router=useRouter()
    useEffect(()=>{
    setTimeout(() => {
       router.replace("/user")
    }, 3000);
    },[])
  return (
    <>
    <div>
        <h1>Payment Sucessfull</h1>
        <p>Thanks for purchasing</p>
        <Link href={'/user'}>
        <button>Go back</button>
        </Link>
    </div>
    </>
  )
}

export default page