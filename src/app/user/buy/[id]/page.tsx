"use client"
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {ApiResponse } from '@/app/types/userTypes';
import { deleteQuantityAPI, getcartItemAPI, updatequantityAPI } from '@/app/services/api/user';

const page = () => {
    const {id}=useParams()
    const router=useRouter()
    const token=localStorage.getItem("token")
    if(!token){
      router.replace("/")
    }
    const [data, setdata] = useState<ApiResponse>({ cartItems: [], totalCartAmount: 0 });
    // console.log(id)
    const cartid=id
    const getcatbyid=async()=>{
        console.log(cartid)
        const response=await getcartItemAPI(cartid)
        // console.log("response--------------",response)
        if(response?.status===200){
          setdata(response?.data)
        }else{
          toast.error(response?.message)
        }
    }
    useEffect(()=>{
        getcatbyid()
    },[])

    const  updatequantity = async(id:string,name:string,cartid:string) => {
        toast.success(`
        Product ${name}-- quantity increased by 1`)
        let val={
          productId:id,
          productName:name,
          quantity:1
        }
       const response=await updatequantityAPI(cartid,val)
       console.log("response",response)
       if(response?.status===200){
        getcatbyid()
       }
      else{
        console.log("Error")
      }
      };

      const handlequnatitydelete=async(id:string,name:string)=>{
        console.log(id)
        let removeid=id
        toast.success(`Product ${name}--quantity decreased by 1`)
        const response=await deleteQuantityAPI(removeid)
        console.log("delete",response)
        if(response?.status===200){
          getcatbyid()
        }else{
          toast.error(response?.message)
        }
       
     }
   
  return (
    <>
    <Link href={'/user'}>
    <button>Home</button>
    </Link>
    <Link href={'/user/cart'}>
    <button>Cart</button>
    </Link>
    <div>
  {data.cartItems.map((el, index) => (
    <div key={index}>
      <div>
        <h1>Description</h1>
        <h1>{el.productDetails.productName}</h1>
        <p>{el.productDetails.productDescription}</p>
        <img src={el.productDetails.productImage} width="50%" height="50%" alt={el.productDetails.productName} />
      </div>
      <p>
        Quantity :
        <button disabled={el.quantity === 1} onClick={() => handlequnatitydelete(el._id, el.productDetails.productName)}>-</button>
        {el.quantity}
        <button onClick={() => updatequantity(el.productDetails.productId, el.productDetails.productName, el._id)}>+</button>
      </p>
    </div>
  ))}
  <div>
    <h2>Total Cart Amount</h2>
    <h3>{data.totalCartAmount}</h3>
  </div>
</div>

    <div>
        <div>
            <label htmlFor="method">Select Payment method</label>
            <select name="paymethod"  >
                <option value="Gpay">Gpay</option>
                <option value="PhoneP">PhoneP</option>
                <option value="LazyPay">LazyPay</option>
                <option value="Credit">Credit</option>
            </select>
        </div>
        {data.cartItems.map((el,index)=>(

        <Link key={index} href={`/user/pay/${el._id}`}>
          <button >Pay now</button>
         </Link>
        ))}
    </div>
    </>
    
  )
}

export default page