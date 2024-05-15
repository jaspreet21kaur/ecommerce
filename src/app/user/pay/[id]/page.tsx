
"use client"
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, {  useEffect, useState } from 'react'
import { ApiResponse , payment} from '@/app/types/userTypes';
import { createPaymentAPI } from '@/app/services/api/payment';
import { CircularProgress } from '@nextui-org/react';

const page = () => {
    const {id}=useParams()
    const router=useRouter()
    const token=localStorage.getItem("token")
    if(!token){
        router.replace("/")
    }
    // console.log(id)
    const payId=id
    const getcatbyid= async()=>{
          
        const token=localStorage.getItem("token")
        if(token){
          await  axios.get("https://cart-app-ibuu.onrender.com/api/v1/user/get-cart-item/"+payId,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }).then((res)=>{
                // console.log(res?.data)
                payment(res?.data?.data)               
            }).catch((error)=>{
                console.log(error)
            })
        }
    }



    const payment = async(responseData: ApiResponse,) => {
        const { cartItems, totalCartAmount } = responseData;
        if (cartItems.length > 0) {
            const { _id: cartId, productDetails, quantity,itemPrice } = cartItems[0];
            const { productId, productName, productPrice, productDescription } = productDetails;
            const bodydata: payment= {
              totalProduct: [
                  {
                      cartId: cartId,
                      productId: productId,
                      productName: productName,
                      productPrice: productPrice,
                      productDescription: productDescription,
                      productQuantity: quantity,
                      itemPrice:itemPrice
                  }
              ],
              totalCartAmount: totalCartAmount
          };
            
            console.log(bodydata);
            if (process.env.NEXT_PUBLIC_API_KEY) {
              const stripe = await loadStripe(process.env.NEXT_PUBLIC_API_KEY);
              const response=await createPaymentAPI(bodydata)
              if (response?.status === 201) {
                const session = await response
                console.log(session.sessionId);
                const result = await stripe?.redirectToCheckout({
                    sessionId: session.sessionId,

                });
                if (result?.error) {
                    
                    console.error("Error redirecting to Checkout:", result.error);
                } else {
                    console.log("Redirecting to Checkout...");
                    
                }
            } else {
                
                console.error("Unexpected response status:", response?.status);
            }
            
          } else {
              console.error("NEXT_PUBLIC_API_KEY is undefined");
             
          }
          
        
    }
  }
    useEffect(() => {
        getcatbyid();
    }, []);
    return (   
    <>
    <CircularProgress />
    </>
  )
}

export default page