"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthRedirect from '@/components/AuthRedirect'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetAllProductAPI } from '../services/api/admin/products'
import { addToCartAPI, getuserApi } from '../services/api/user'
import Link from 'next/link'


var val={}
let n=1
const page = () => {
    const router=useRouter()
    const [profile, setprofile] = useState<boolean>(false);
    const [data, setData] = useState([]);
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const handledelete=()=>{
        localStorage.removeItem("userdata")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("id")
        router.replace("/")    
    }
  
  const fetchproducts=async()=>{
         const allproducts=await GetAllProductAPI()
        // console.log(allproducts.status)
        if(allproducts?.status===200){
          setData(allproducts?.data?.products)
        }else{
          toast.error("error")
        }
  }
const userdetail=async()=>{
  const response=await getuserApi()
  console.log(response)
  if(response?.status===200){
    setname(response?.userData?.fullName)
     setemail(response?.userData?.email)
  }else{
    toast.error(response?.message)
  }
}
useEffect(()=>{
   fetchproducts()
  userdetail()
},[])
 const showdetail=()=>{
  console.log("show")
 }

const addcart = async(val:any) => {
  console.log(val)
  const notify = () => toast.success("Product added successfully");
  const response=await addToCartAPI(val)
  console.log(response)
  if(response?.status===200 || response?.status===201){
    notify()
  }else{
    toast.error("error")
  }
 
};
  
  return (
      <>
      <AuthRedirect/>
      <div>
     <div className='flex justify-between m-4 mx-6'>
        <div className='text-3xl font-bold text-pretty'>
            <p>₿~cart</p>
        </div>
        <div className='flex justify-between gap-5'>
            <Link href={'/user/cart'}>
            <button className='text-lg bg-red-800 text-white px-3 py-1 rounded-md '>Cart</button>
            </Link>
            
       <div>
        
<button  id="dropdownInformationButton" onClick={()=>setprofile(true)} data-dropdown-toggle="dropdownInformation" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Profile<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>


<div id="dropdownInformation" hidden={!profile? true :false} className="z-10   bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div>{name}</div>
      <div className="font-medium truncate">{email}</div>
    </div>
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
      <li>
        <Link href={'/user/order'}  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
         Your orders
        </Link>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">---</a>
      </li>
    </ul>
    <div className="py-2">
      <a  onClick={handledelete} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
    </div>
</div>
        </div>   

              
        </div>

      </div>
      </div> 
     <div>
     <div className='m-4'>
      <h2 className='font-bold text-red-700 text-2xl flex justify-center'>All Products</h2>
      <div className='grid grid-cols-3 m-4'>
      {data.map((product: {
        _id: string
        productDescription: string ,productName: string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; productPrice: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; productImg: string | undefined 
       }, index: React.Key | null | undefined) => (
        <div className='flex  p-8 justify-center items-center '>

            <div key={index} className='h-[80%] w-[80%]'>
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link href={`/user/item/${product._id}`}>
                        <img className="p-8 rounded-t-lg w-full" src={product.productImg} onClick={showdetail} />
                    </Link>
                    <div className="px-5 pb-5">
                    <Link href={`/user/item/${product._id}`}>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.productName}</h5>
                        </Link>
                        <div className="flex items-center mt-2.5 mb-5">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.productPrice}</span>
                            <a  onClick={()=>{
                              val={
                                productId:product._id,
                                productName:product.productName
                              }
                              addcart(val)
                            }}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))}
      </div>
      </div>
        <ToastContainer />
    </div>
    </>
  )
}

export default page