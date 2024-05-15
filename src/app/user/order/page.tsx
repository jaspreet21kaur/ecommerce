"use client"
import { GetAllProductAPI } from '@/app/services/api/admin/products'
import { getallpaymentdetailAPI } from '@/app/services/api/payment'
import auth from '@/config/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer ,toast} from 'react-toastify'


const page = () => {
    const router=useRouter()
    const token=localStorage.getItem(auth.storageTokenKeyName)
    if(!token){
        router.replace("/")
    }
    const [data,setdata]=useState([])
    const [payment,setpayment]=useState("")
    const fetchdata=async()=>{
        const response=await getallpaymentdetailAPI()
        // console.log(response)
        if(response?.status===200){
            console.log(response?.payments)
           setdata(response?.payments)
            // setdata(response?.data?.products)
        }
    }
    useEffect(()=>{
        fetchdata()
    },[])
  return (
    <>
    <div className='bg-red-900 text-white '>
        <Link href={'/user'}>
            <button>Home</button>
        </Link>
    </div>
        <h1>Your orders</h1>
    <div>
        <hr />
        {data.map((data:any,index)=>(
            <div key={index}>
                <div>
                    {data?.totalProduct.map((element:any,index:any)=>(
                        <div key={index}>
                                   <h2>{index+1} {element.productName[0].toUpperCase()+element.productName.slice(1)}</h2>
                                   <h3>Qunatity:{element.productQuantity}</h3>
                                   <h4>Price:${element.productPrice}</h4>
                        </div>
                    ))}
                </div>
                <h2>Payment: {data.paymentStatus}</h2>
                <h3>Total Price: ${data.totalCartAmount}</h3>
                <hr />
            </div>
            
        ))}
    </div>
    <ToastContainer/>

    
    </>
  )
}

export default page