import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
     
    
  return (
    <>
    <div>
        <h1>Error</h1>
        <p>Try sometime later</p>
        <Link href={'/user'}>
        <button>Go back</button>
        </Link>
    </div>
    </>
  )
}

export default page