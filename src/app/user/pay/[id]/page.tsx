
"use client"
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { ApiResponse ,ProductDetails,BuyerUser,CartItem} from '@/app/types/userTypes';

const page = () => {
    const {id}=useParams()
    const router=useRouter()
    const token=localStorage.getItem("token")
    if(!token){
        router.replace("/")
    }
    console.log(id)
    const payId=id
    const [data, setdata] = useState<ApiResponse>({ cartItems: [], totalCartAmount: 0 });
    const getcatbyid= async()=>{
          
        const token=localStorage.getItem("token")
        if(token){
          await  axios.get("https://cart-app-ibuu.onrender.com/api/v1/user/get-cart-item/"+payId,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }).then((res)=>{
                console.log(res?.data)
                setdata(res?.data?.data) 
                payment(res?.data?.data)               
            }).catch((error)=>{
                console.log(error)
            })
        }
    }

    const payment = (responseData: ApiResponse) => {
        const { cartItems, totalCartAmount } = responseData;
        if (cartItems.length > 0) {
            const { _id: cartId, productDetails, quantity } = cartItems[0];
            const { productId, productName, productPrice, productDescription } = productDetails;

            const bodydata = {
                totalProduct: [{
                    cartId,
                    productId,
                    productName,
                    productPrice,
                    productDescription,
                    productQuentity: quantity
                }],
                totalCartAmount
            };
            
            console.log(bodydata);
            // const makepayment =async()=>{
            //     const stripe=await loadStripe(process.env.NEXT_PUBLIC_API_KEY)
            //     const body=bodydata
            //     const headers={
            //         'Content-Type':'appplication/josn'
            //     }
            //     const response=await fetch("https://cart-app-ibuu.onrender.com/api/v1/user/process-payment",{
            //        method:'POST',
            //        headers:headers,
            //        body:JSON.stringify(body)
            //     })
            //     const session= await response.json()
            //     const result=stripe?.redirectToCheckout({
            //         sessionId:session.id
            //     })
            // }
            // // const token = localStorage.getItem("token");
            // // if (token) {
            // //     axios.post("https://cart-app-ibuu.onrender.com/api/v1/user/process-payment", body, {
            // //         headers: {
            // //             "Authorization": `Bearer ${token}`,
            // //         }
            // //     }).then((res) => {
            // //         console.log(res);
            // //         router.replace("/user")
            // //     }).catch((error) => {
            // //         console.log(error);
            // //     });
            // // }
            // makepayment()
        }
    }
    useEffect(() => {
        getcatbyid();
    }, []);
    return (   
    <>
       <div>
  {/* {data.cartItems.map((el, index) => (
    <div key={index}>
      <div>
        <h1>Payment--Succesfull</h1>
        <h1>{el.productDetails.productName}</h1>
        <p>{el.productDetails.productDescription}</p>
        <img src={el.productDetails.productImage} width="50%" height="50%" alt={el.productDetails.productName} />
      </div>
      <p>
        Quantity :
        {el.quantity}
      </p>
    </div>
  ))} */}
  <div>
    <h2>Total Cart Amount</h2>
    {/* <h3>{data.totalCartAmount}</h3> */}
  </div>
</div>

    </>
  )
}

export default page