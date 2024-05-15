"use client"
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'
import { addToCartAPI, getProductByIdApi, getallcartAPI } from '@/app/services/api/user'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

interface Product {
  productPrice: ReactNode
  productDescription: ReactNode
  productImg: string | undefined
  _id: string;
  productName: string;

}
const page = () => {
    const {id}=useParams()
    const cartId=id
    const router=useRouter()
  const token=localStorage.getItem("token")
  if(!token){
    router.replace("/")
  }
  const [data, setdata] = useState<Product | null>(null);
    const [name,setname]=useState("")
    const [already,setalready]=useState(false)
    const getbyproductId=async()=>{
      const response=await getProductByIdApi(cartId)
      if(response?.status===200){
        setdata(response?.getProduct)
        setname(response?.getProduct?.productName)
        cartitems()
      }else{
        toast.error(response?.message)
      }
    }
    const cartitems = async () => {
      const response=await getallcartAPI()
      // console.log(response)
      if(response?.status===200){
        const cartItemsWithProductDetails = response?.data?.cartItems.filter((el: { productDetails: any }) => el.productDetails);
        cartItemsWithProductDetails?.map((data:any)=>{
          // console.log("cartItemsWithProductDetails---------",data.productDetails.productId)
          if(cartId === data.productDetails.productId ){
            setalready(true);
          }
        })
      }else{
        toast.error(response?.message)
      }
    };
    
    useEffect(()=>{
      getbyproductId()
      cartitems()
    },[])
    const addtobag=async()=>{
         let val={
          productId:cartId,
          productName:name
         }
         const response=await addToCartAPI(val)
         console.log(response)
         if(response?.status===201 || response?.status===200){
             cartitems()
         }else{
          toast.error(response?.message)
         }
    }

  return (
    <>
    
    <div className='flex justify-between m-4 mx-6'>
        <div className='text-3xl font-bold text-pretty'>
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


      {data && (
  <div className='flex justify-center  m-3 p-3'>
    <div key={data._id}>
      <div >
     <img  className='m-3 rounded-md shadow-md shadow-black' src={data.productImg} alt={data.productName} />
      </div>
      <div className='flex items-center justify-between'>

      <h2 className='m-3 font-bold text-2xl'>{data.productName[0].toUpperCase()+data.productName.slice(1)}</h2>
      <div className='mt-2'>
      {already ? <Link className='bg-red-900 text-white rounded-md px-3 py-2 m-3' href={'/user/cart'}>Go to bag</Link> : <button className='bg-red-900 text-white rounded-md px-3 py-2 m-3' onClick={addtobag}>Add to cart</button>}
      </div>
      </div>
     <div>
      <div className='grid m-3'>
        <div className='flex gap-x-3 justify-between'>
          <p className='italic font-light'>{data.productDescription}</p>
          <h2 className='font-bold'>Price-:${data.productPrice}</h2>
        </div>
          <div className='animate animate-bounce my-3 text-red-700'>Grab it now and get best deals !</div>
          <div >
          <h4 className='font-bold text-md'>✔️ Best Quality</h4>
          <h4 className='font-bold text-md'>✔️ Best Price</h4>
          <h4 className='font-bold text-md'>✔️ Eligble for offers</h4>
          <h4 className='font-bold text-md'>✔️ Best Deal</h4>
          </div>
      </div>
     </div>
    </div>
  </div>
)}

<ToastContainer/>
    </>
  )
}

export default page